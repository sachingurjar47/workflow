import type { Node } from "@xyflow/react";

export type CountryProps = Node<
  { currency: string; country: string; countryCode: string },
  "currency" | "country" | "countryCode"
>;

export type PaymentInitialzedProps = Node<{ amount: number }, "amount">;

export type PaymentProvider = Node<
  { label: string; key: string },
  "name" | "key"
>;
