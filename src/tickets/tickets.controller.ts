import { Request, Response } from 'express';
import { ticketsService, getTicketService, createTicketService, updateTicketService, deleteTicketService } from '../tickets/tickets.service';

export const getTickets = async (req: Request, res: Response) => {
    const tickets = await ticketsService(req.query.limit ? Number(req.query.limit) : undefined);
    res.json(tickets);
};

export const getTicket = async (req: Request, res: Response) => {
    const ticket = await getTicketService(Number(req.params.id));
    ticket ? res.json(ticket) : res.status(404).send('Ticket not found');
};

export const createTicket = async (req: Request, res: Response) => {
    const message = await createTicketService(req.body);
    res.status(201).json({ message });
};

export const updateTicket = async (req: Request, res: Response) => {
    const message = await updateTicketService(Number(req.params.id), req.body);
    res.json({ message });
};

export const deleteTicket = async (req: Request, res: Response) => {
    const message = await deleteTicketService(Number(req.params.id));
    res.json({ message });
};
