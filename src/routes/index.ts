import express from 'express';
import healthRoute from './health';
import doctorRoute from './auth/authRoutes';
const router = express.Router();


router.use('/', healthRoute);
router.use('/', doctorRoute);


export default router;
