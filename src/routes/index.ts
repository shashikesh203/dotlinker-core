import express from 'express';
import healthRoute from './health';
import authRoute from './auth/authRoutes';
import commonRoute from './common/commonRoute';
const router = express.Router();


router.use('/', healthRoute);
router.use('/', authRoute);
router.use('/', commonRoute);


export default router;
