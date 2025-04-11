const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    default: 'Learning Platform'
  },
  siteDescription: {
    type: String,
    required: true,
    default: 'A comprehensive learning platform'
  },
  logo: {
    type: String,
    default: '/uploads/default-logo.png'
  },
  favicon: {
    type: String,
    default: '/uploads/default-favicon.ico'
  },
  theme: {
    primaryColor: {
      type: String,
      default: '#007bff'
    },
    secondaryColor: {
      type: String,
      default: '#6c757d'
    },
    fontFamily: {
      type: String,
      default: 'Arial, sans-serif'
    }
  },
  contact: {
    email: {
      type: String,
      required: true,
      default: 'contact@example.com'
    },
    phone: String,
    address: String,
    socialMedia: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String
    }
  },
  features: {
    enableRegistration: {
      type: Boolean,
      default: true
    },
    enableBlog: {
      type: Boolean,
      default: true
    },
    enableQuizzes: {
      type: Boolean,
      default: true
    },
    enableCourses: {
      type: Boolean,
      default: true
    },
    enableStudyMaterials: {
      type: Boolean,
      default: true
    }
  },
  email: {
    fromName: {
      type: String,
      default: 'Learning Platform'
    },
    fromEmail: {
      type: String,
      default: 'noreply@example.com'
    },
    smtp: {
      host: String,
      port: Number,
      secure: Boolean,
      auth: {
        user: String,
        pass: String
      }
    }
  },
  security: {
    passwordMinLength: {
      type: Number,
      default: 8
    },
    passwordRequirements: {
      uppercase: {
        type: Boolean,
        default: true
      },
      lowercase: {
        type: Boolean,
        default: true
      },
      numbers: {
        type: Boolean,
        default: true
      },
      symbols: {
        type: Boolean,
        default: true
      }
    },
    maxLoginAttempts: {
      type: Number,
      default: 5
    },
    lockoutDuration: {
      type: Number,
      default: 15 // minutes
    }
  },
  content: {
    moderationEnabled: {
      type: Boolean,
      default: true
    },
    allowedFileTypes: {
      type: [String],
      default: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    },
    maxFileSize: {
      type: Number,
      default: 5242880 // 5MB in bytes
    }
  },
  notifications: {
    email: {
      newUser: {
        type: Boolean,
        default: true
      },
      newContent: {
        type: Boolean,
        default: true
      },
      contentReport: {
        type: Boolean,
        default: true
      }
    },
    push: {
      enabled: {
        type: Boolean,
        default: false
      },
      vapidPublicKey: String,
      vapidPrivateKey: String
    }
  },
  maintenance: {
    enabled: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'Site is under maintenance. Please check back later.'
    },
    allowedIPs: [String]
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Ensure only one settings document exists
settingsSchema.pre('save', async function(next) {
  const count = await this.constructor.countDocuments();
  if (count > 0 && !this.isModified()) {
    throw new Error('Only one settings document can exist');
  }
  next();
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings; 