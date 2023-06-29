import React, { useMemo } from "react";
import { useCheckout } from "@/checkout-storefront/hooks/useCheckout";
import { Button } from "@/checkout-storefront/components";
import { useCheckoutPaymentCreateMutation } from "@/checkout-storefront/graphql";
import { useSubmit } from "@/checkout-storefront/hooks/useSubmit";
import { getFilteredPaymentGateways } from "./utils";
import { useCheckoutComplete } from "@/checkout-storefront/hooks/useCheckoutComplete";

interface IProps {
  checkout: any;
}

const DUMMY_CREDIT_CARD_GATEWAY = "mirumee.payments.dummy";
export const CashPayment: React.FC<IProps> = React.memo(({ checkout }) => {
  const { totalPrice } = checkout;
  const [, checkoutPaymentCreateMutation] = useCheckoutPaymentCreateMutation();

  //   const handleSubmit = async () => {
  //     console.log("checkout::: ", checkout);
  //     try {
  //       // Create Saleor payment
  //       const data = await checkoutPaymentCreateMutation({
  //         id: checkout.id,
  //         checkoutToken: checkout.token || "",
  //         paymentInput: {
  //           gateway: DUMMY_CREDIT_CARD_GATEWAY,
  //           amount: checkout.totalPrice?.gross.amount ?? 0,
  //           token: "cash",
  //         },
  //       });
  //       console.log("paymentCreateErrors:: ", data);
  //     } catch (err) {
  //       console.log("err::: ", err);
  //     }
  //   };

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
