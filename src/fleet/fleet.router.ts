import express from 'express';
import * as fleetController from '../fleet/fleet.controller';

const router = express.Router();

router.get('/', fleetController.getFleets);
router.get('/:id', fleetController.getFleet);
router.post('/', fleetController.createFleet);
router.put('/:id', fleetController.updateFleet);
router.delete('/:id', fleetController.deleteFleet);

export default router;
