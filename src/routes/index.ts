import express from 'express';
import healthRoute from './health';
import authRoute from './auth/authRoutes';
import commonRoute from './common/commonRoute';
import patientRoute from './patient/patientRoute';
import doctorRoute from './doctor/doctorRoute';
const router = express.Router();


router.use('/', healthRoute);
router.use('/', authRoute);
router.use('/', commonRoute);
router.use('/', patientRoute);
router.use('/', doctorRoute);


export default router;
