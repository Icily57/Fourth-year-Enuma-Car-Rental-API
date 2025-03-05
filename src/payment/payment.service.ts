import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIPayment, TSPayment, PaymentTable } from '../drizzle/schema';

export const paymentsService = async (limit?: number): Promise<TSPayment[] | null> => {
    if (limit) {
        return await db.query.PaymentTable.findMany({ limit });
    }
    return await db.query.PaymentTable.findMany();
};

export const getPaymentService = async (id: number): Promise<TIPayment | undefined> => {
    return await db.query.PaymentTable.findFirst({
        where: eq(PaymentTable.id, id)
    });
};

export const createPaymentService = async (payment: TIPayment) => {
    await db.insert(PaymentTable).values(payment);
    return "Payment created successfully";
};

export const updatePaymentService = async (id: number, payment: TIPayment) => {
    await db.update(PaymentTable).set(payment).where(eq(PaymentTable.id, id));
    return "Payment updated successfully";
};

export const deletePaymentService = async (id: number) => {
    await db.delete(PaymentTable).where(eq(PaymentTable.id, id));
    return "Payment deleted successfully";
};
