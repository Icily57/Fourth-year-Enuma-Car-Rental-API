import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TITickets, TSTickets, TicketsTable } from '../drizzle/schema';

export const ticketsService = async (limit?: number): Promise<TSTickets[] | null> => {
    if (limit) {
        return await db.query.TicketsTable.findMany({ limit });
    }
    return await db.query.TicketsTable.findMany();
};

export const getTicketService = async (id: number): Promise<TITickets | undefined> => {
    return await db.query.TicketsTable.findFirst({
        where: eq(TicketsTable.id, id)
    });
};

export const createTicketService = async (ticket: TITickets) => {
    await db.insert(TicketsTable).values(ticket);
    return "Ticket created successfully";
};

export const updateTicketService = async (id: number, ticket: TITickets) => {
    await db.update(TicketsTable).set(ticket).where(eq(TicketsTable.id, id));
    return "Ticket updated successfully";
};

export const deleteTicketService = async (id: number) => {
    await db.delete(TicketsTable).where(eq(TicketsTable.id, id));
    return "Ticket deleted successfully";
};
