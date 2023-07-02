import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import React from "react";
import { SignInFormContainer, SignInFormContainerProps } from "../Contact/SignInFormContainer";
import { Text } from "@saleor/ui-kit";
import { contactMessages } from "../Contact/messages";
import { useUser } from "@/checkout-storefront/hooks/useUser";

interface SignedInUserProps extends Pick<SignInFormContainerProps, "onSectionChange"> {
  onSignOutSuccess: () => void;
}

export const SignedInUser: React.FC<SignedInUserProps> = ({
  onSectionChange,
  onSignOutSuccess,
}) => {
  const formatMessage = useFormattedMessages();
  const { user } = useUser();

  return (
    <SignInFormContainer
      title={formatMessage(contactMessages.account)}
      onSectionChange={onSectionChange}
    >
      <div className="flex flex-row justify-between">
        <Text weight="bold" size="md">
          {user?.email}
        </Text>
      </div>
    </SignInFormContainer>
  );
};
