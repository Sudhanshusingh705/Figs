/**
 * Format date string in a readable format
 * 
 * @param {String} dateString - ISO date string
 * @param {Boolean} includeTime - Whether to include time in the formatted output
 * @returns {String} Formatted date string
 */
export const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return date.toLocaleDateString('en-IN', options);
};

/**
 * Calculate percentage
 * 
 * @param {Number} value - Current value
 * @param {Number} total - Total value
 * @returns {Number} Percentage (0-100)
 */
export const calculatePercentage = (value, total) => {
  if (!total) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Truncate text to a specified length
 * 
 * @param {String} text - Text to truncate
 * @param {Number} maxLength - Maximum length before truncation
 * @returns {String} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Format currency in Indian Rupees
 * 
 * @param {Number} amount - Amount to format
 * @returns {String} Formatted amount
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Get readable duration from minutes
 * 
 * @param {Number} minutes - Duration in minutes
 * @returns {String} Formatted duration
 */
export const formatDuration = (minutes) => {
  if (!minutes) return '0 min';
  
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
};

/**
 * Generate a random ID
 * 
 * @param {Number} length - Length of ID
 * @returns {String} Random ID
 */
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Debounce function to limit the rate at which a function can fire
 * 
 * @param {Function} func - Function to debounce
 * @param {Number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validate email address format
 * 
 * @param {String} email - Email to validate
 * @returns {Boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Get initials from name
 * 
 * @param {String} name - Full name
 * @returns {String} Initials (up to 2 characters)
 */
export const getInitials = (name) => {
  if (!name) return '';
  
  const names = name.split(' ').filter(n => n.length > 0);
  
  if (names.length === 0) return '';
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

/**
 * Get grade label based on percentage
 * 
 * @param {Number} percentage - Score percentage
 * @returns {Object} Grade with label and color
 */
export const getGradeFromPercentage = (percentage) => {
  if (percentage >= 90) {
    return { label: 'Excellent', color: '#28a745' };
  } else if (percentage >= 75) {
    return { label: 'Very Good', color: '#5cb85c' };
  } else if (percentage >= 60) {
    return { label: 'Good', color: '#17a2b8' };
  } else if (percentage >= 50) {
    return { label: 'Satisfactory', color: '#ffc107' };
  } else if (percentage >= 33) {
    return { label: 'Pass', color: '#fd7e14' };
  } else {
    return { label: 'Fail', color: '#dc3545' };
  }
};

// Format time duration from seconds
export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Calculate quiz score percentage
export const calculateScore = (correct, total) => {
  return Math.round((correct / total) * 100);
};

// Generate random string (useful for keys, IDs)
export const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Sort array of objects by key
export const sortByKey = (array, key, ascending = true) => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
};

// Group array of objects by key
export const groupByKey = (array, key) => {
  return array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
  }, {});
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

// Format error message
export const formatErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return 'An unexpected error occurred';
};

// Get initials from name
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

// Validate password strength
export const isStrongPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};

// Get readable file type
export const getFileType = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  const fileTypes = {
    pdf: 'PDF Document',
    doc: 'Word Document',
    docx: 'Word Document',
    xls: 'Excel Spreadsheet',
    xlsx: 'Excel Spreadsheet',
    txt: 'Text File',
    jpg: 'Image',
    jpeg: 'Image',
    png: 'Image',
    gif: 'Image',
  };
  return fileTypes[extension] || 'Unknown File Type';
}; 