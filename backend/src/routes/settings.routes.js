import  express  from 'express';
import { adminOnly, protectRoute } from '../middleware/auth.middleware.js';
import { changePassword } from '../controller/settings.controller.js';

const routes = express.Router();

routes.patch("/change-password", protectRoute, changePassword)

export default routes;
