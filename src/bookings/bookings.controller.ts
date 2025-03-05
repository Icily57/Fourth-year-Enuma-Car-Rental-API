import { Request, Response } from 'express';
import { bookingsService, getBookingService, createBookingService, updateBookingService, deleteBookingService } from '../bookings/bookings.service';

export const getBookings = async (req: Request, res: Response) => {
    const bookings = await bookingsService(req.query.limit ? Number(req.query.limit) : undefined);
    res.json(bookings);
};

export const getBooking = async (req: Request, res: Response) => {
    const booking = await getBookingService(Number(req.params.id));
    booking ? res.json(booking) : res.status(404).send('Booking not found');
};

export const createBooking = async (req: Request, res: Response) => {
    const message = await createBookingService(req.body);
    res.status(201).json({ message });
};

export const updateBooking = async (req: Request, res: Response) => {
    const message = await updateBookingService(Number(req.params.id), req.body);
    res.json({ message });
};

export const deleteBooking = async (req: Request, res: Response) => {
    const message = await deleteBookingService(Number(req.params.id));
    res.json({ message });
};
