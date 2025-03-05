import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIBooking, TSBooking, BookingTable } from '../drizzle/schema';

export const bookingsService = async (limit?: number): Promise<TSBooking[] | null> => {
    if (limit) {
        return await db.query.BookingTable.findMany({
            limit: limit
        });
    }
    return await db.query.BookingTable.findMany();
}

export const getBookingService = async (id: number): Promise<TIBooking | undefined> => {
    return await db.query.BookingTable.findFirst({
        where: eq(BookingTable.id, id)
    });
}

export const createBookingService = async (booking: TIBooking) => {
    await db.insert(BookingTable).values(booking);
    return "Booking created successfully";
}

export const updateBookingService = async (id: number, booking: TIBooking) => {
    await db.update(BookingTable).set(booking).where(eq(BookingTable.id, id));
    return "Booking updated successfully";
}

export const deleteBookingService = async (id: number) => {
    await db.delete(BookingTable).where(eq(BookingTable.id, id));
    return "Booking deleted successfully";
}
