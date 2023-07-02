import React, { useMemo } from "react";
import { Button } from "@/checkout-storefront/components";
import { useCheckoutPaymentCreateMutation } from "@/checkout-storefront/graphql";
import { useSubmit } from "@/checkout-storefront/hooks/useSubmit";
import { useCheckoutComplete } from "@/checkout-storefront/hooks/useCheckoutComplete";

interface IProps {
  checkout: any;
}
export const CashPayment: React.FC<IProps> = React.memo(({ checkout }) => {
  const { totalPrice } = checkout;
  const [, checkoutPaymentCreateMutation] = useCheckoutPaymentCreateMutation();
  const { onCheckoutComplete } = useCheckoutComplete();

  const handleSubmit = useSubmit<{}, typeof checkoutPaymentCreateMutation>(
    useMemo(
      () => ({
        onSubmit: checkoutPaymentCreateMutation,
        parse: () => {
          console.log("checkout::: ", checkout);
          const payment = checkout.availablePaymentGateways[0];
          const variables = {
            id: checkout.id,
            paymentInput: {
              gateway: payment.id,
              amount: totalPrice?.gross.amount ?? 0,
              token: "cash",
            },
          };
          console.log("variables:: ", variables);
          return variables;
        },
        onSuccess: async ({ data }) => {
          console.log("success::: ", data);
          await onCheckoutComplete();
        },
        onError: (e) => {
          console.log("error", e);
        },
      }),
      [checkout]
    )
  );

  return (
    <Button
      onClick={handleSubmit}
      variant="primary"
      label="Place order"
      ariaLabel="Place order"
      className="my-4 w-full"
      id="PlaceOrder"
    />
  );
});
