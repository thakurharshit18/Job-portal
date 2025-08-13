import express from 'express';
import { getAlljobs, Jobdetails, postanewjob } from '../controllers/jobs.controller.js';
import { restrictTo, verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();


// router.get('/jobs',getAlljobs);

router.post('/',postanewjob);
router.get('/',getAlljobs);
router.get('/:id',Jobdetails);
export default router;