import express from 'express';
import * as locationController from '../location/location.controller';

const router = express.Router();

router.get('/', locationController.getLocations);
router.get('/:id', locationController.getLocation);
router.post('/', locationController.createLocation);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

export default router;
