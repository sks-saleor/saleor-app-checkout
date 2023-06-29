import { Money, Title } from "@/checkout-storefront/components";
import { useCheckout } from "@/checkout-storefront/hooks/useCheckout";
import { AdyenDropIn } from "@/checkout-storefront/sections/PaymentSection/AdyenDropIn/AdyenDropIn";
import { PaymentSectionSkeleton } from "@/checkout-storefront/sections/PaymentSection/PaymentSectionSkeleton";
import { usePayments } from "@/checkout-storefront/sections/PaymentSection/usePayments";
import { useCheckoutUpdateState } from "@/checkout-storefront/state/updateStateStore";

export const PaymentMethods = () => {
  const { availablePaymentGateways, fetching } = usePayments();
  const {
    changingBillingCountry,
    updateState: { checkoutDeliveryMethodUpdate },
  } = useCheckoutUpdateState();
  const { adyen } = availablePaymentGateways;
  const { checkout } = useCheckout();

  // delivery methods change total price so we want to wait until the change is done
  if (changingBillingCountry || fetching || checkoutDeliveryMethodUpdate === "loading") {
    return <PaymentSectionSkeleton />;
  }
  const { totalPrice } = checkout;

  return (
    <div className="mb-3">
      {adyen ? (
        <AdyenDropIn config={adyen} />
      ) : (
        <div className="flex justify-between pb-4 pt-2">
          <Title>Cash</Title>
          <Money ariaLabel="totalPrice" weight="bold" money={totalPrice?.gross} />
        </div>
      )}
    </div>
  );
};
