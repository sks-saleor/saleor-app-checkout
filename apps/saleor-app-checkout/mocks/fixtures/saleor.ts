import { encryptSetting } from "@/saleor-app-checkout/backend/configuration/encryption";
import {
  TransactionActionPayloadFragment,
  TransactionFragment,
} from "@/saleor-app-checkout/graphql";
import { PaymentProviderSettingsValues } from "@/saleor-app-checkout/types";
import { testingVars } from "../consts";

export const mollieCompletedOrderId = "ord_kr6ltl";

export const paymentProviders: PaymentProviderSettingsValues<"encrypted"> = {
  mollie: {
    apiKey: encryptSetting(testingVars.mollieKey),
    profileId: {
      encrypted: false,
      value: testingVars.mollieProfileId,
    },
  },
  dummy: { dummyKey: encryptSetting("") },
};

export const appPrivateMetafields = {
  paymentProviders,
};

export const prepareSaleorTransaction = (
  type: "voided" | "charged" | "authorized" | "refunded",
  amount: number,
  currency: string,
  additionalData?: Partial<TransactionFragment>
): TransactionFragment => {
  const common: Pick<
    TransactionFragment,
    "voidedAmount" | "chargedAmount" | "authorizedAmount" | "refundedAmount"
  > = {
    refundedAmount: {
      amount: 0,
      currency,
    },
    authorizedAmount: { amount: 0, currency },
    chargedAmount: { amount: 0, currency },
    voidedAmount: { amount: 0, currency },
  };

  const amounts = { ...common };

  switch (type) {
    case "authorized":
      amounts.authorizedAmount.amount = amount;
      break;
    case "charged":
      amounts.chargedAmount.amount = amount;
      break;
    case "refunded":
      amounts.refundedAmount.amount = amount;
      break;
    case "voided":
      amounts.voidedAmount.amount = amount;
      break;
  }

  return {
    ...amounts,
    reference: "123",
    events: [],
    id: "123",
    ...additionalData,
  };
};

export const transactionActionRequest: Record<
  "missingData" | "mollieRefund",
  Partial<TransactionActionPayloadFragment>
> = {
  missingData: {
    transaction: undefined,
    action: undefined,
  },
  mollieRefund: {
    transaction: {
      id: "VHJhbnNhY3Rpb25JdGVtOjE3Mg==",
      reference: "ord_kr6ltl",
      type: "mollie-creditcard",
      authorizedAmount: {
        amount: 0,
        currency: "USD",
      },
      chargedAmount: {
        amount: 21.67,
      },
      voidedAmount: {
        amount: 0,
      },
      refundedAmount: {
        amount: 0,
      },
    },
    action: {
      actionType: "REFUND",
      amount: 38.61,
    },
  },
};
