import { MollieProviderSettingID, PaymentProviderID } from "checkout-common";
import { defineMessages } from "react-intl";

export const paymentProvidersMessages = defineMessages<PaymentProviderID>({
  mollie: {
    defaultMessage: "Mollie",
    id: "messages/paymentProviders/CQH/Vb",
    description: "payment provider",
  },
  dummy: {
    defaultMessage: "Dummy Payment",
    id: "messages/paymentProviders/LtD8zn",
    description: "dummy payment provider",
  },
});

export const molliePaymentProviderMessages = defineMessages<MollieProviderSettingID>({
  profileId: {
    defaultMessage: "Profile ID",
    id: "messages/paymentProviders/t7YEMr",
    description: "payment provider setting",
  },
  apiKey: {
    defaultMessage: "API key",
    id: "messages/paymentProviders/9hBUgM",
    description: "payment provider setting",
  },
});

export const dummyPaymentProviderMessages = defineMessages<any>({
  publishableKey: {
    defaultMessage: "Publishable Key",
    id: "messages/paymentProviders/YBcvvL",
    description: "payment provider setting",
  },
  secretKey: {
    defaultMessage: "Secret Key",
    id: "messages/paymentProviders/fQ20+Q",
    description: "payment provider setting",
  },
  webhookSecret: {
    defaultMessage: "Webhookd Secret",
    id: "messages/paymentProviders/glq8nA",
    description: "payment provider setting",
  },
});
