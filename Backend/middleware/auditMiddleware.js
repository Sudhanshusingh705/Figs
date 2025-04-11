const AuditLog = require('../models/AuditLog');

const auditMiddleware = (action, entityType) => {
  return async (req, res, next) => {
    // Store the original send function
    const originalSend = res.send;

    // Override the send function
    res.send = function(data) {
      // Restore the original send function
      res.send = originalSend;

      // Get response data
      const responseData = JSON.parse(data);
      const success = responseData.success;
      const status = success ? 'SUCCESS' : 'FAILURE';

      // Create audit log
      const logData = {
        user: req.user._id,
        action,
        entityType,
        entityId: req.params.id || responseData.data?._id || null,
        description: `${action} ${entityType.toLowerCase()}`,
        changes: {
          body: req.body,
          params: req.params,
          query: req.query
        },
        metadata: {
          method: req.method,
          path: req.path,
          response: responseData
        },
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        status,
        errorMessage: !success ? responseData.message : null
      };

      // Log asynchronously without blocking the response
      AuditLog.log(logData).catch(error => {
        console.error('Error creating audit log:', error);
      });

      // Call the original send function
      return originalSend.call(this, data);
    };

    next();
  };
};

// Helper function to create audit log manually
const createAuditLog = async (user, action, entityType, entityId, description, metadata = {}) => {
  try {
    const logData = {
      user: user._id,
      action,
      entityType,
      entityId,
      description,
      metadata,
      status: 'SUCCESS'
    };

    return await AuditLog.log(logData);
  } catch (error) {
    console.error('Error creating manual audit log:', error);
    return null;
  }
};

module.exports = {
  auditMiddleware,
  createAuditLog
}; 