import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getNotifications, deleteNotifications } from '../controllers/notifications.controller.js';

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/delete", protectRoute, deleteNotifications);

export default router;