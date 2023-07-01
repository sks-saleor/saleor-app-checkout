import { Money, Title } from "@/checkout-storefront/components";
import { useCheckout } from "@/checkout-storefront/hooks/useCheckout";
import { PaymentSectionSkeleton } from "@/checkout-storefront/sections/PaymentSection/PaymentSectionSkeleton";
import { usePayments } from "@/checkout-storefront/sections/PaymentSection/usePayments";
import { useCheckoutUpdateState } from "@/checkout-storefront/state/updateStateStore";

export const PaymentMethods = () => {
  const { fetching } = usePayments();
  const {
    changingBillingCountry,
    updateState: { checkoutDeliveryMethodUpdate },
  } = useCheckoutUpdateState();

  const { checkout } = useCheckout();

  // delivery methods change total price so we want to wait until the change is done
  if (changingBillingCountry || fetching || checkoutDeliveryMethodUpdate === "loading") {
    return <PaymentSectionSkeleton />;
  }
  const { totalPrice } = checkout;

  return (
    <div className="mb-3">
      <div className="flex justify-between pb-4 pt-2">
        <Title>Cash</Title>
        <Money ariaLabel="totalPrice" money={totalPrice?.gross} />
      </div>
    </div>
  );
};
