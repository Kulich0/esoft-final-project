import { Router } from 'express';
import { createPaymentController } from '../controllers/paymentController';

const router = Router();

router.post('/create-payment', createPaymentController);

export default router;
