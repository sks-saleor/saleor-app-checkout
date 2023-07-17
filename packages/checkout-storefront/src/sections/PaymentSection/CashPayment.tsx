import React, { useCallback, useEffect, useMemo } from "react";
import { Button } from "@/checkout-storefront/components";
import { useCheckoutPaymentCreateMutation } from "@/checkout-storefront/graphql";
import { useSubmit } from "@/checkout-storefront/hooks/useSubmit";
import { useCheckoutComplete } from "@/checkout-storefront/hooks/useCheckoutComplete";
import { getQueryParams } from "@/checkout-storefront/lib/utils/url";

enum PostMessageActions {
  ERROR = "rn-error",
  SUCCESS = "rn-success",
  SUMMITTING = "rn-submitting",
  CHECKOUT_LOADED = "rn-checkoutLoaded",
  PLACE_ORDER = "rn-placeOrder",
}

interface IProps {
  checkout: any;
}
export const CashPayment: React.FC<IProps> = React.memo(({ checkout }) => {
  const { totalPrice } = checkout;
  const [, checkoutPaymentCreateMutation] = useCheckoutPaymentCreateMutation();
  const { onCheckoutComplete } = useCheckoutComplete();
  const { refreshToken: reactNative } = getQueryParams();
  const isReactNative = !!reactNative;

  // create a function to post message to react natives
  const postMessage = useCallback(
    (action: PostMessageActions, data: Record<string, any>) => {
      if (!isReactNative) return;
      (window as any)?.ReactNativeWebView?.postMessage(
        JSON.stringify({ action: action, data: data })
      );
    },
    [isReactNative]
  );

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
          postMessage(PostMessageActions.SUCCESS, data);
        },
        onError: (e) => {
          console.log("error", e);
          postMessage(PostMessageActions.ERROR, e);
        },
      }),
      [checkout]
    )
  );

  const handleReactNativeMessage = useCallback(
    (event: MessageEvent<any | undefined>) => {
      if (!isReactNative) return;
      try {
        const data = JSON.parse(event.data);
        if (data.action === PostMessageActions.PLACE_ORDER) {
          handleSubmit();
        }
      } catch (error) {
        postMessage(PostMessageActions.ERROR, error as any);
      }
    },
    [isReactNative]
  );

  useEffect(() => {
    window.addEventListener("message", handleReactNativeMessage);
    postMessage(PostMessageActions.CHECKOUT_LOADED, {});
    return () => window.removeEventListener("message", handleReactNativeMessage);
  }, [handleReactNativeMessage]);

  if (isReactNative) return null;

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
