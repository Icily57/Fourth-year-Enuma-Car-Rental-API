import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TISpecifications, TSSpecifications, SpecificationsTable } from '../drizzle/schema';

export const specificationsService = async (limit?: number): Promise<TSSpecifications[] | null> => {
    if (limit) {
        return await db.query.SpecificationsTable.findMany({
            limit: limit
        });
    }
    return await db.query.SpecificationsTable.findMany();
}

export const getSpecificationService = async (id: number): Promise<TISpecifications | undefined> => {
    return await db.query.SpecificationsTable.findFirst({
        where: eq(SpecificationsTable.id, id)
    });
}

export const createSpecificationService = async (specification: TISpecifications) => {
    await db.insert(SpecificationsTable).values(specification);
    return "Specification created successfully";
}

export const updateSpecificationService = async (id: number, specification: TISpecifications) => {
    await db.update(SpecificationsTable).set(specification).where(eq(SpecificationsTable.id, id));
    return "Specification updated successfully";
}

export const deleteSpecificationService = async (id: number) => {
    await db.delete(SpecificationsTable).where(eq(SpecificationsTable.id, id));
    return "Specification deleted successfully";
}
