
const express = require('express');
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyForJob,
  updateApplicationStatus,
  getMyJobs,
  getMyApplications,
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.route('/').get(getJobs).post(protect, authorize('recruiter', 'admin'), createJob);
router.route('/my-jobs').get(protect, authorize('recruiter', 'admin'), getMyJobs);
router.route('/my-applications').get(protect, getMyApplications);
router.route('/:id').get(getJobById).put(protect, authorize('recruiter', 'admin'), updateJob).delete(protect, authorize('recruiter', 'admin'), deleteJob);
router.route('/:id/apply').post(protect, applyForJob);
router.route('/application/update-status').put(protect, authorize('recruiter', 'admin'), updateApplicationStatus);

module.exports = router;
