import invariant from "ts-invariant";
import { IS_TEST } from "../constants";

export const testingVars = {
  mollieKey: process.env.TEST_MOLLIE_KEY!,
  mollieProfileId: process.env.TEST_MOLLIE_PROFILE_ID!,
  stripeSecretKey: process.env.TEST_STRIPE_SECRET_KEY!,
  stripeWebhookSecret: process.env.TEST_STRIPE_WEBHOOK_SECRET!,
  stripePublishableKey: process.env.TEST_STRIPE_PUBLISHABLE_KEY!,
};

if (IS_TEST) {
  invariant(testingVars.mollieKey, "TEST_MOLLIE_KEY is not defined");
  invariant(testingVars.mollieProfileId, "TEST_MOLLIE_PROFILE_ID is not defined");

  invariant(testingVars.stripeSecretKey, "TEST_STRIPE_SECRET_KEY is not defined");
  invariant(testingVars.stripeWebhookSecret, "TEST_STRIPE_WEBHOOK_SECRET is not defined");
  invariant(testingVars.stripePublishableKey, "TEST_STRIPE_PUBLISHABLE_KEY is not defined");
}

export type TestingEnvVar = keyof typeof testingVars;

export type TestingEnvVars = Record<TestingEnvVar, string>;
