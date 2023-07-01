import { PaymentGatewayConfig } from "@/checkout-storefront/graphql";

export type PaymentGatewayId = "mirumee.payments.dummy";

export type ParsedDummyGateway = ParsedPaymentGateway<{}>;

export type ParsedPaymentGateways = {
  dummy?: ParsedDummyGateway;
};

export interface ParsedPaymentGateway<TData extends Record<string, any>>
  extends Omit<PaymentGatewayConfig, "data" | "id"> {
  data: TData;
  id: PaymentGatewayId;
}

export type PaymentStatus = "paidInFull" | "overpaid" | "none" | "authorized";
