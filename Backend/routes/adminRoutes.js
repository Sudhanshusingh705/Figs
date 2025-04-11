const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { validateAdmin, protect } = require('../middleware/authMiddleware');
const { auditMiddleware } = require('../middleware/auditMiddleware');

// Apply admin protection to all routes
router.use(protect);
router.use(validateAdmin);

// Dashboard routes
router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/content/stats', adminController.getContentStats);
router.get('/user/activity', adminController.getUserActivityStats);

// User management routes
router.get('/users', adminController.getAllUsers);
router.patch(
  '/users/:userId/role',
  auditMiddleware('ROLE_CHANGE', 'USER'),
  adminController.updateUserRole
);
router.delete(
  '/users/:userId',
  auditMiddleware('DELETE', 'USER'),
  adminController.deleteUser
);

// Content management routes
router.get('/content/pending', adminController.getPendingContent);
router.patch(
  '/content/:contentType/:contentId/status',
  auditMiddleware('CONTENT_APPROVE', 'CONTENT'),
  adminController.updateContentStatus
);
router.get('/content/reported', adminController.getReportedContent);
router.patch(
  '/content/:contentType/:contentId/reports/:reportId',
  auditMiddleware('REPORT_HANDLE', 'REPORT'),
  adminController.handleReport
);

// Audit logs
router.get('/audit-logs', adminController.getAuditLogs);

// Site settings
router.put(
  '/settings',
  auditMiddleware('SETTINGS_UPDATE', 'SETTINGS'),
  adminController.updateSiteSettings
);

module.exports = router; 