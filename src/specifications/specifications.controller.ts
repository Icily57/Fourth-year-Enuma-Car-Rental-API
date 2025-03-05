import { Request, Response } from 'express';
import { specificationsService, getSpecificationService, createSpecificationService, updateSpecificationService, deleteSpecificationService } from '../specifications/specifications.service';

export const getSpecifications = async (req: Request, res: Response) => {
    const specifications = await specificationsService(req.query.limit ? Number(req.query.limit) : undefined);
    res.json(specifications);
};

export const getSpecification = async (req: Request, res: Response) => {
    const specification = await getSpecificationService(Number(req.params.id));
    specification ? res.json(specification) : res.status(404).send('Specification not found');
};

export const createSpecification = async (req: Request, res: Response) => {
    const message = await createSpecificationService(req.body);
    res.status(201).json({ message });
};

export const updateSpecification = async (req: Request, res: Response) => {
    const message = await updateSpecificationService(Number(req.params.id), req.body);
    res.json({ message });
};

export const deleteSpecification = async (req: Request, res: Response) => {
    const message = await deleteSpecificationService(Number(req.params.id));
    res.json({ message });
};
