import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIFleet, TSFleet, FleetTable } from '../drizzle/schema';

export const fleetsService = async (limit?: number): Promise<TSFleet[] | null> => {
    if (limit) {
        return await db.query.FleetTable.findMany({
            limit: limit
        });
    }
    return await db.query.FleetTable.findMany();
}

export const getFleetService = async (id: number): Promise<TIFleet | undefined> => {
    return await db.query.FleetTable.findFirst({
        where: eq(FleetTable.id, id)
    });
}

export const createFleetService = async (fleet: TIFleet) => {
    await db.insert(FleetTable).values(fleet);
    return "Fleet created successfully";
}

export const updateFleetService = async (id: number, fleet: TIFleet) => {
    await db.update(FleetTable).set(fleet).where(eq(FleetTable.id, id));
    return "Fleet updated successfully";
}

export const deleteFleetService = async (id: number) => {
    await db.delete(FleetTable).where(eq(FleetTable.id, id));
    return "Fleet deleted successfully";
}
