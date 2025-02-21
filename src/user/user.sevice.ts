import { Column, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUser, TSUser, UserTable } from '../drizzle/schema';

export const usersService = async (limit?: number): Promise<TSUser[] | null> => {
    if (limit) {
        return await db.query.UserTable.findMany({
            limit: limit
        });
    }
    return await db.query.UserTable.findMany();
}

export const getUserService = async (id: number): Promise<TIUser | undefined> => {
    return await db.query.UserTable.findFirst({
        where: eq(UserTable.id, id)
    })
}

export const createUserService = async (user: TIUser) => {
    await db.insert(UserTable).values(user)
    return "User created successfully";
}

export const updateUserService = async (id: number, user: TIUser) => {
    await db.update(UserTable).set(user).where(eq(UserTable.id, id))
    return "User updated successfully";
}

export const deleteUserService = async (id: number) => {
    await db.delete(UserTable).where(eq(UserTable.id, id))
    return "User deleted successfully";
}

export const getMoreUsersInfoService = async () => {
    return await db.query.UserTable.findMany({
        columns:{
            username: true,
            email: true,
            role: true
        },
        with:{
            booking:{
                columns:{
                    id: true,
                    start_date: true,
                    end_date: true 
                },
                with:{
                    user:{
                        columns:{
                            username: true,
                            email: true
                        }
                    }
                }
            }
        }
        })
    };