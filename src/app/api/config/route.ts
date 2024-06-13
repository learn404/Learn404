'use server';

export async function getStripePublishableKey() {
  return { publishableKey: process.env.STRIPE_PUBLISHABLE_KEY };
}