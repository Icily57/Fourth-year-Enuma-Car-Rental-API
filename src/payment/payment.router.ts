import express from 'express';
import * as paymentController from '../payment/payment.controller';

const router = express.Router();

router.get('/', paymentController.getPayments);
router.get('/:id', paymentController.getPayment);
router.post('/', paymentController.createPayment);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

export default router;
