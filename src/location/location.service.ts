import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TILocation, TSLocation, LocationTable } from '../drizzle/schema';

export const locationsService = async (limit?: number): Promise<TSLocation[] | null> => {
    if (limit) {
        return await db.query.LocationTable.findMany({
            limit: limit
        });
    }
    return await db.query.LocationTable.findMany();
}

export const getLocationService = async (id: number): Promise<TILocation | undefined> => {
    return await db.query.LocationTable.findFirst({
        where: eq(LocationTable.id, id)
    });
}

export const createLocationService = async (location: TILocation) => {
    await db.insert(LocationTable).values(location);
    return "Location created successfully";
}

export const updateLocationService = async (id: number, location: TILocation) => {
    await db.update(LocationTable).set(location).where(eq(LocationTable.id, id));
    return "Location updated successfully";
}

export const deleteLocationService = async (id: number) => {
    await db.delete(LocationTable).where(eq(LocationTable.id, id));
    return "Location deleted successfully";
}
