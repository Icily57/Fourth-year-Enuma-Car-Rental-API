import express from 'express';
import * as bookingController from '../bookings/bookings.controller';

const router = express.Router();

router.get('/', bookingController.getBookings);
router.get('/:id', bookingController.getBooking);
router.post('/', bookingController.createBooking);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

export default router;
