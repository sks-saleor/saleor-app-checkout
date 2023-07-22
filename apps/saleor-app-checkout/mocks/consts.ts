import invariant from "ts-invariant";
import { IS_TEST } from "../constants";

export const testingVars = {
  mollieKey: process.env.TEST_MOLLIE_KEY!,
  mollieProfileId: process.env.TEST_MOLLIE_PROFILE_ID!,
};

if (IS_TEST) {
  invariant(testingVars.mollieKey, "TEST_MOLLIE_KEY is not defined");
  invariant(testingVars.mollieProfileId, "TEST_MOLLIE_PROFILE_ID is not defined");
}

export type TestingEnvVar = keyof typeof testingVars;

export type TestingEnvVars = Record<TestingEnvVar, string>;
