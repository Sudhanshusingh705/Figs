const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Course = require('../models/Course');
const StudyMaterial = require('../models/StudyMaterial');
const Blog = require('../models/Blog');
const Article = require('../models/Article');
const { validateAdmin } = require('../middleware/authMiddleware');
const { AppError } = require('../utils/errorHandler');

// Get admin dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Quiz.countDocuments(),
      Course.countDocuments(),
      StudyMaterial.countDocuments(),
      Blog.countDocuments(),
      Article.countDocuments(),
      User.find({ role: 'user', createdAt: { $gte: new Date(Date.now() - 30*24*60*60*1000) } }).countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers: stats[0],
        totalQuizzes: stats[1],
        totalCourses: stats[2],
        totalStudyMaterials: stats[3],
        totalBlogs: stats[4],
        totalArticles: stats[5],
        newUsersThisMonth: stats[6]
      }
    });
  } catch (error) {
    throw new AppError('Error fetching dashboard statistics', 500);
  }
};

// Get all users with pagination and filters
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    const query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    };

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    throw new AppError('Error fetching users', 500);
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    throw new AppError('Error updating user role', 500);
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    throw new AppError('Error deleting user', 500);
  }
};

// Get content statistics
exports.getContentStats = async (req, res) => {
  try {
    const [quizStats, courseStats, studyMaterialStats, blogStats, articleStats] = await Promise.all([
      Quiz.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        }
      ]),
      Course.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        }
      ]),
      StudyMaterial.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        }
      ]),
      Blog.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        }
      ]),
      Article.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    res.status(200).json({
      success: true,
      data: {
        quizzes: quizStats,
        courses: courseStats,
        studyMaterials: studyMaterialStats,
        blogs: blogStats,
        articles: articleStats
      }
    });
  } catch (error) {
    throw new AppError('Error fetching content statistics', 500);
  }
};

// Get user activity statistics
exports.getUserActivityStats = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000);

    const [quizAttempts, courseEnrollments, activeUsers] = await Promise.all([
      Quiz.aggregate([
        {
          $match: {
            'attempts.date': { $gte: thirtyDaysAgo }
          }
        },
        {
          $unwind: '$attempts'
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$attempts.date' } },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]),
      Course.aggregate([
        {
          $match: {
            'enrollments.date': { $gte: thirtyDaysAgo }
          }
        },
        {
          $unwind: '$enrollments'
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$enrollments.date' } },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]),
      User.aggregate([
        {
          $match: {
            lastActive: { $gte: thirtyDaysAgo }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$lastActive' } },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ])
    ]);

    res.status(200).json({
      success: true,
      data: {
        quizAttempts,
        courseEnrollments,
        activeUsers
      }
    });
  } catch (error) {
    throw new AppError('Error fetching user activity statistics', 500);
  }
};

// Update site settings
exports.updateSiteSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    // Assuming you have a Settings model
    const updatedSettings = await Settings.findOneAndUpdate(
      {},
      settings,
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      data: updatedSettings
    });
  } catch (error) {
    throw new AppError('Error updating site settings', 500);
  }
};

// Manage content approval
exports.getPendingContent = async (req, res) => {
  try {
    const [pendingQuizzes, pendingCourses, pendingStudyMaterials, pendingBlogs, pendingArticles] = await Promise.all([
      Quiz.find({ status: 'pending' }).populate('author', 'name email'),
      Course.find({ status: 'pending' }).populate('instructor', 'name email'),
      StudyMaterial.find({ status: 'pending' }).populate('author', 'name email'),
      Blog.find({ status: 'pending' }).populate('author', 'name email'),
      Article.find({ status: 'pending' }).populate('author', 'name email')
    ]);

    res.status(200).json({
      success: true,
      data: {
        quizzes: pendingQuizzes,
        courses: pendingCourses,
        studyMaterials: pendingStudyMaterials,
        blogs: pendingBlogs,
        articles: pendingArticles
      }
    });
  } catch (error) {
    throw new AppError('Error fetching pending content', 500);
  }
};

// Approve or reject content
exports.updateContentStatus = async (req, res) => {
  try {
    const { contentType, contentId } = req.params;
    const { status, feedback } = req.body;

    let content;
    let Model;

    switch (contentType) {
      case 'quiz':
        Model = Quiz;
        break;
      case 'course':
        Model = Course;
        break;
      case 'studyMaterial':
        Model = StudyMaterial;
        break;
      case 'blog':
        Model = Blog;
        break;
      case 'article':
        Model = Article;
        break;
      default:
        throw new AppError('Invalid content type', 400);
    }

    content = await Model.findByIdAndUpdate(
      contentId,
      { 
        status,
        feedback,
        reviewedBy: req.user._id,
        reviewedAt: Date.now()
      },
      { new: true }
    ).populate('author', 'name email');

    if (!content) {
      throw new AppError('Content not found', 404);
    }

    // Send email notification to content author
    // Assuming you have an emailService
    if (content.author.email) {
      const emailData = {
        to: content.author.email,
        subject: `Your ${contentType} has been ${status}`,
        template: 'contentReview',
        context: {
          authorName: content.author.name,
          contentType,
          contentTitle: content.title,
          status,
          feedback
        }
      };
      // await emailService.sendEmail(emailData);
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    throw new AppError(`Error updating ${req.params.contentType} status`, 500);
  }
};

// Get reported content
exports.getReportedContent = async (req, res) => {
  try {
    const [reportedQuizzes, reportedCourses, reportedStudyMaterials, reportedBlogs, reportedArticles] = await Promise.all([
      Quiz.find({ 'reports.0': { $exists: true } }).populate('author', 'name email'),
      Course.find({ 'reports.0': { $exists: true } }).populate('instructor', 'name email'),
      StudyMaterial.find({ 'reports.0': { $exists: true } }).populate('author', 'name email'),
      Blog.find({ 'reports.0': { $exists: true } }).populate('author', 'name email'),
      Article.find({ 'reports.0': { $exists: true } }).populate('author', 'name email')
    ]);

    res.status(200).json({
      success: true,
      data: {
        quizzes: reportedQuizzes,
        courses: reportedCourses,
        studyMaterials: reportedStudyMaterials,
        blogs: reportedBlogs,
        articles: reportedArticles
      }
    });
  } catch (error) {
    throw new AppError('Error fetching reported content', 500);
  }
};

// Handle reported content
exports.handleReport = async (req, res) => {
  try {
    const { contentType, contentId, reportId } = req.params;
    const { action, message } = req.body;

    let Model;
    switch (contentType) {
      case 'quiz':
        Model = Quiz;
        break;
      case 'course':
        Model = Course;
        break;
      case 'studyMaterial':
        Model = StudyMaterial;
        break;
      case 'blog':
        Model = Blog;
        break;
      case 'article':
        Model = Article;
        break;
      default:
        throw new AppError('Invalid content type', 400);
    }

    const content = await Model.findById(contentId);
    if (!content) {
      throw new AppError('Content not found', 404);
    }

    const reportIndex = content.reports.findIndex(r => r._id.toString() === reportId);
    if (reportIndex === -1) {
      throw new AppError('Report not found', 404);
    }

    content.reports[reportIndex].status = action;
    content.reports[reportIndex].adminResponse = message;
    content.reports[reportIndex].handledBy = req.user._id;
    content.reports[reportIndex].handledAt = Date.now();

    if (action === 'remove') {
      content.status = 'removed';
      content.removedAt = Date.now();
      content.removedBy = req.user._id;
      content.removalReason = message;
    }

    await content.save();

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    throw new AppError('Error handling report', 500);
  }
};

// Get admin audit logs
exports.getAuditLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const logs = await AuditLog.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await AuditLog.countDocuments();

    res.status(200).json({
      success: true,
      data: logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    throw new AppError('Error fetching audit logs', 500);
  }
}; 