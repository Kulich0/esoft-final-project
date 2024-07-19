import { Request, Response } from 'express';
import { createPayment } from '../services/paymentService';

export const createPaymentController = async (req: Request, res: Response) => {
  const { amount, description, userId } = req.body;

  try {
    const payment = await createPayment(amount, description, userId);
    res.json({ confirmation_url: payment.confirmation.confirmation_url });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};
