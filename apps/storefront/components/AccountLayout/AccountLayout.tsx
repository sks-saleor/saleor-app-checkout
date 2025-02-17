import { useRouter } from "next/router";
import React, { ReactNode } from "react";

import { Layout, Spinner } from "@/components";
import { NavigationPanel } from "@/components/NavigationPanel";
import { usePaths } from "@/lib/paths";
import { useUser } from "@/lib/useUser";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";

export type AccountLayoutProps = { children: ReactNode; bodyOnly?: boolean };

export function AccountLayout({ children, bodyOnly }: AccountLayoutProps) {
  const router = useRouter();
  const paths = usePaths();
  const { authenticated, loading } = useUser();
  const { isAuthenticating } = useSaleorAuthContext();

  if (isAuthenticating || loading) {
    return (
      <Layout bodyOnly={bodyOnly}>
        <Spinner />
      </Layout>
    );
  }

  if (!authenticated) {
    if (router.isReady && typeof window !== "undefined") {
      void router.replace(paths.account.login.$url({ query: { next: router?.asPath } }));
    }
    return null;
  }

  return (
    <Layout bodyOnly={bodyOnly}>
      <div className="py-10">
        <main className="flex flex-col md:flex-row md:container md:px-8">
          {!bodyOnly && (
            <div className="mb-2 flex-initial md:w-3/5">
              <NavigationPanel />
            </div>
          )}
          <div className="flex flex-initial w-full flex-col overflow-y-auto md:px-4 space-y-4">
            {children}
          </div>
        </main>
      </div>
    </Layout>
  );
}
