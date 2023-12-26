import orderRepository from '../../db/repositories/order/order.repository.js';
import { validateByToken } from '../../hooks/auth.hook.js';
import { createOrder, submitOrder, getOrders } from './schemas.js';
import apiError from '../../apiError.js';
import {
  createPaymentIntent,
  retrievePayment,
} from '../../services/stripe.service.js';

/** @type {import('../../index').Route} */
export default async (server) => {
  server.get(
    '/',
    { schema: getOrders, preHandler: validateByToken('access') },
    async (request, reply) => {
      return orderRepository.find({ userId: request.user.id });
    },
  );

  server.post(
    '/',
    { schema: createOrder, preHandler: validateByToken('access') },
    async (request, reply) => {
      const { photobookId, trackingNumber } = request.body;

      const price = 100;

      const paymentIntent = await createPaymentIntent(price);

      const id = await orderRepository.create({
        userId: request.user.id,
        photobookId,
        status: 'pending',
        price,
        paymentId: paymentIntent.id,
        trackingNumber,
      });

      return {
        orderId: id,
        secret: paymentIntent.secret,
      };
    },
  );

  server.post(
    '/:id',
    { schema: submitOrder, preHandler: validateByToken('access') },
    async (request, reply) => {
      const order = await orderRepository.findOne({ id: request.params.id });

      const payment = await retrievePayment(order.paymentId);

      if (payment.status !== 'succeeded') {
        throw apiError.badRequest('Please, fulfill payment.');
      }

      await orderRepository.update(order.id, { status: 'fulfilled' });

      return { success: true };
    },
  );
};
