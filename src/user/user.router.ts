import express from 'express';
import * as userController from '../user/user.controller';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

export default router;