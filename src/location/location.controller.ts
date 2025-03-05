import { Request, Response } from 'express';
import { locationsService, getLocationService, createLocationService, updateLocationService, deleteLocationService } from '../location/location.service';

export const getLocations = async (req: Request, res: Response) => {
    const locations = await locationsService(req.query.limit ? Number(req.query.limit) : undefined);
    res.json(locations);
};

export const getLocation = async (req: Request, res: Response) => {
    const location = await getLocationService(Number(req.params.id));
    location ? res.json(location) : res.status(404).send('Location not found');
};

export const createLocation = async (req: Request, res: Response) => {
    const message = await createLocationService(req.body);
    res.status(201).json({ message });
};

export const updateLocation = async (req: Request, res: Response) => {
    const message = await updateLocationService(Number(req.params.id), req.body);
    res.json({ message });
};

export const deleteLocation = async (req: Request, res: Response) => {
    const message = await deleteLocationService(Number(req.params.id));
    res.json({ message });
};
