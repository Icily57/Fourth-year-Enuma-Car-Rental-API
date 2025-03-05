import { Request, Response } from 'express';
import { vehiclesService, getVehicleService, createVehicleService, updateVehicleService, deleteVehicleService } from '../vehicle/vehicle.service';

export const getVehicles = async (req: Request, res: Response) => {
    const vehicles = await vehiclesService(req.query.limit ? Number(req.query.limit) : undefined);
    res.json(vehicles);
};

export const getVehicle = async (req: Request, res: Response) => {
    const vehicle = await getVehicleService(Number(req.params.id));
    vehicle ? res.json(vehicle) : res.status(404).send('Vehicle not found');
};

export const createVehicle = async (req: Request, res: Response) => {
    const message = await createVehicleService(req.body);
    res.status(201).json({ message });
};

export const updateVehicle = async (req: Request, res: Response) => {
    const message = await updateVehicleService(Number(req.params.id), req.body);
    res.json({ message });
};

export const deleteVehicle = async (req: Request, res: Response) => {
    const message = await deleteVehicleService(Number(req.params.id));
    res.json({ message });
};
