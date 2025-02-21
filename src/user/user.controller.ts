import { Request, Response } from 'express';
import { usersService, getUserService, createUserService, updateUserService, deleteUserService, getMoreUsersInfoService } from '../user/user.sevice';

export const getUsers = async (req: Request, res: Response) => {
    const users = await usersService(req.query.limit ? Number(req.query.limit) : undefined);
    res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const user = await getUserService(Number(req.params.id));
    user ? res.json(user) : res.status(404).send('User not found');
};

export const createUser = async (req: Request, res: Response) => {
    const message = await createUserService(req.body);
    res.status(201).json({ message });
};

export const updateUser = async (req: Request, res: Response) => {
    const message = await updateUserService(Number(req.params.id), req.body);
    res.json({ message });
};

export const deleteUser = async (req: Request, res: Response) => {
    const message = await deleteUserService(Number(req.params.id));
    res.json({ message });
};

export const getMoreUsersInfo = async (req: Request, res: Response) => {
    const usersInfo = await getMoreUsersInfoService();
    res.json(usersInfo);
};