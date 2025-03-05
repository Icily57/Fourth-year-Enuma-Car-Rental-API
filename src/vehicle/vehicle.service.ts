import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIVehicle, TSVehicle, VehicleTable } from '../drizzle/schema';

export const vehiclesService = async (limit?: number): Promise<TSVehicle[] | null> => {
    if (limit) {
        return await db.query.VehicleTable.findMany({
            limit: limit
        });
    }
    return await db.query.VehicleTable.findMany();
}

export const getVehicleService = async (id: number): Promise<TIVehicle | undefined> => {
    return await db.query.VehicleTable.findFirst({
        where: eq(VehicleTable.id, id)
    });
}

export const createVehicleService = async (vehicle: TIVehicle) => {
    await db.insert(VehicleTable).values(vehicle);
    return "Vehicle created successfully";
}

export const updateVehicleService = async (id: number, vehicle: TIVehicle) => {
    await db.update(VehicleTable).set(vehicle).where(eq(VehicleTable.id, id));
    return "Vehicle updated successfully";
}

export const deleteVehicleService = async (id: number) => {
    await db.delete(VehicleTable).where(eq(VehicleTable.id, id));
    return "Vehicle deleted successfully";
}
