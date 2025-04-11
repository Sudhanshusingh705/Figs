const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'CREATE',
      'UPDATE',
      'DELETE',
      'LOGIN',
      'LOGOUT',
      'PASSWORD_CHANGE',
      'ROLE_CHANGE',
      'SETTINGS_UPDATE',
      'CONTENT_APPROVE',
      'CONTENT_REJECT',
      'CONTENT_DELETE',
      'USER_BAN',
      'USER_UNBAN',
      'REPORT_HANDLE'
    ]
  },
  entityType: {
    type: String,
    required: true,
    enum: [
      'USER',
      'QUIZ',
      'COURSE',
      'STUDY_MATERIAL',
      'BLOG',
      'ARTICLE',
      'SETTINGS',
      'REPORT'
    ]
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  changes: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  ipAddress: String,
  userAgent: String,
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILURE'],
    required: true
  },
  errorMessage: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
auditLogSchema.index({ action: 1, entityType: 1, timestamp: -1 });
auditLogSchema.index({ user: 1, timestamp: -1 });
auditLogSchema.index({ entityId: 1, timestamp: -1 });

// Static method to create audit log
auditLogSchema.statics.log = async function(data) {
  try {
    const log = new this({
      user: data.user,
      action: data.action,
      entityType: data.entityType,
      entityId: data.entityId,
      description: data.description,
      changes: data.changes,
      metadata: data.metadata,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      status: data.status || 'SUCCESS',
      errorMessage: data.errorMessage
    });

    await log.save();
    return log;
  } catch (error) {
    console.error('Error creating audit log:', error);
    // Don't throw error to prevent disrupting main operation
    return null;
  }
};

// Method to format log for display
auditLogSchema.methods.format = function() {
  return {
    id: this._id,
    user: this.user,
    action: this.action,
    entityType: this.entityType,
    description: this.description,
    timestamp: this.timestamp,
    status: this.status,
    metadata: this.metadata
  };
};

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog; 