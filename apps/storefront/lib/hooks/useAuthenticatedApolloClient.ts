import { ApolloClient, TypePolicies, InMemoryCache, ApolloLink } from "@apollo/client";
import { useMemo } from "react";
import { Fetch } from "@saleor/auth-sdk";
import { createUploadLink } from "apollo-upload-client";

interface Options {
  uri: string;
  fetchWithAuth: Fetch;
  typePolicies?: TypePolicies;
}

export const useAuthenticatedApolloClient = ({
  uri,
  fetchWithAuth: fetch,
  typePolicies,
}: Options) => {
  const attachVariablesLink = new ApolloLink((operation, forward) =>
    forward(operation).map((data) => ({
      ...data,
      extensions: {
        ...data.extensions,
        variables: operation.variables,
      },
    }))
  );

  const link = attachVariablesLink.concat(
    createUploadLink({ credentials: "include", uri, fetch }) as unknown as ApolloLink // type mismatch between apollo-upload-client and @apollo/cient
  );

  const apolloClient = useMemo(
    () =>
      new ApolloClient({
        link,
        cache: new InMemoryCache({ typePolicies }),
      }),
    []
  );

  return {
    apolloClient,
    reset: () => apolloClient.resetStore(),
    refetch: () => apolloClient.refetchQueries({ include: "active" }),
  };
};
