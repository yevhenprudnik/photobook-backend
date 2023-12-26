import Stripe from 'stripe';
import { STRIPE_TOKEN } from '../environment.js';

const client = new Stripe(STRIPE_TOKEN);

/**
 * @param {number} amount
 * @returns {Promise<{ id: string, secret: string | null }>}
 */
export const createPaymentIntent = async (amount) => {
  const paymentIntent = await client.paymentIntents.create({
    amount,
    currency: 'UAH',
  });

  return {
    id: paymentIntent.id,
    secret: paymentIntent.client_secret,
  };
};

/**
 * @param {string} paymentId
 * @returns {Promise<Pick<Stripe.Response<Stripe.PaymentIntent>, 'status' | 'amount' | 'currency' >>}
 */
export const retrievePayment = async (paymentId) => {
  const paymentIntent = await client.paymentIntents.retrieve(paymentId);

  return {
    status: paymentIntent.status,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
  };
};
