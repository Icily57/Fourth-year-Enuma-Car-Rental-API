import { Request, Response } from 'express';
import { paymentsService, getPaymentService, createPaymentService, updatePaymentService, deletePaymentService } from '../payment/payment.service';

export const getPayments = async (req: Request, res: Response) => {
    const payments = await paymentsService(req.query.limit ? Number(req.query.limit) : undefined);
    res.json(payments);
};

export const getPayment = async (req: Request, res: Response) => {
    const payment = await getPaymentService(Number(req.params.id));
    payment ? res.json(payment) : res.status(404).send('Payment not found');
};

export const createPayment = async (req: Request, res: Response) => {
    const message = await createPaymentService(req.body);
    res.status(201).json({ message });
};

export const updatePayment = async (req: Request, res: Response) => {
    const message = await updatePaymentService(Number(req.params.id), req.body);
    res.json({ message });
};

export const deletePayment = async (req: Request, res: Response) => {
    const message = await deletePaymentService(Number(req.params.id));
    res.json({ message });
};
