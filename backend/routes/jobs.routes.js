import express from 'express';
import { getAlljobs, Jobdetails, postanewjob } from '../controllers/jobs.controller.js';
import { restrictTo, verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();


// router.get('/jobs',getAlljobs);

router.post('/',verifyToken,restrictTo("ORGANIZATION"),postanewjob);
router.get('/',verifyToken,getAlljobs);
router.get('/:id',verifyToken,Jobdetails);
export default router;