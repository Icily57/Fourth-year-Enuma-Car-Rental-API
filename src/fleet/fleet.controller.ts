import { Request, Response } from 'express';
import { fleetsService, getFleetService, createFleetService, updateFleetService, deleteFleetService } from '../fleet/fleet.service';

export const getFleets = async (req: Request, res: Response) => {
    const fleets = await fleetsService(req.query.limit ? Number(req.query.limit) : undefined);
    res.json(fleets);
};

export const getFleet = async (req: Request, res: Response) => {
    const fleet = await getFleetService(Number(req.params.id));
    fleet ? res.json(fleet) : res.status(404).send('Fleet not found');
};

export const createFleet = async (req: Request, res: Response) => {
    const message = await createFleetService(req.body);
    res.status(201).json({ message });
};

export const updateFleet = async (req: Request, res: Response) => {
    const message = await updateFleetService(Number(req.params.id), req.body);
    res.json({ message });
};

export const deleteFleet = async (req: Request, res: Response) => {
    const message = await deleteFleetService(Number(req.params.id));
    res.json({ message });
};
