import express from 'express';
import * as specificationsController from '../specifications/specifications.controller';

const router = express.Router();

router.get('/', specificationsController.getSpecifications);
router.get('/:id', specificationsController.getSpecification);
router.post('/', specificationsController.createSpecification);
router.put('/:id', specificationsController.updateSpecification);
router.delete('/:id', specificationsController.deleteSpecification);

export default router;
