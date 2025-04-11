// Validation rules
const rules = {
  required: (value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
    if (typeof value === 'string') return value.trim().length > 0;
    if (typeof value === 'number') return true;
    if (typeof value === 'boolean') return true;
    return value != null;
  },
  email: (value) => {
    if (!value) return true;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value);
  },
  min: (value, min) => {
    if (!value) return true;
    if (typeof value === 'string') return value.length >= min;
    if (typeof value === 'number') return value >= min;
    if (Array.isArray(value)) return value.length >= min;
    return true;
  },
  max: (value, max) => {
    if (!value) return true;
    if (typeof value === 'string') return value.length <= max;
    if (typeof value === 'number') return value <= max;
    if (Array.isArray(value)) return value.length <= max;
    return true;
  },
  minLength: (value, min) => {
    if (!value) return true;
    return String(value).length >= min;
  },
  maxLength: (value, max) => {
    if (!value) return true;
    return String(value).length <= max;
  },
  pattern: (value, pattern) => {
    if (!value) return true;
    const regex = new RegExp(pattern);
    return regex.test(value);
  },
  matches: (value, field, formValues) => {
    if (!value) return true;
    return value === formValues[field];
  },
  url: (value) => {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  numeric: (value) => {
    if (!value) return true;
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  integer: (value) => {
    if (!value) return true;
    return Number.isInteger(Number(value));
  },
  positive: (value) => {
    if (!value) return true;
    return Number(value) > 0;
  },
  date: (value) => {
    if (!value) return true;
    const date = new Date(value);
    return date instanceof Date && !isNaN(date);
  },
  future: (value) => {
    if (!value) return true;
    const date = new Date(value);
    return date > new Date();
  },
  past: (value) => {
    if (!value) return true;
    const date = new Date(value);
    return date < new Date();
  },
  fileType: (value, types) => {
    if (!value || !value[0]) return true;
    const allowedTypes = Array.isArray(types) ? types : [types];
    return Array.from(value).every(file => 
      allowedTypes.some(type => file.type.startsWith(type))
    );
  },
  fileSize: (value, maxSize) => {
    if (!value || !value[0]) return true;
    return Array.from(value).every(file => file.size <= maxSize);
  }
};

// Default error messages
const defaultMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  min: (min) => `Please enter a value greater than or equal to ${min}`,
  max: (max) => `Please enter a value less than or equal to ${max}`,
  minLength: (min) => `Please enter at least ${min} characters`,
  maxLength: (max) => `Please enter no more than ${max} characters`,
  pattern: 'Please enter a valid value',
  matches: (field) => `Must match ${field}`,
  url: 'Please enter a valid URL',
  numeric: 'Please enter a valid number',
  integer: 'Please enter a valid integer',
  positive: 'Please enter a positive number',
  date: 'Please enter a valid date',
  future: 'Please enter a future date',
  past: 'Please enter a past date',
  fileType: (types) => `Please upload file(s) of type: ${types.join(', ')}`,
  fileSize: (size) => `File size must not exceed ${size} bytes`
};

// Create validator function from schema
export const createValidator = (schema) => {
  return async (values) => {
    const errors = {};
    
    for (const [field, fieldSchema] of Object.entries(schema)) {
      const value = values[field];
      const fieldErrors = [];

      // Process each validation rule
      for (const [ruleName, ruleConfig] of Object.entries(fieldSchema)) {
        // Skip if the rule doesn't exist
        if (!rules[ruleName]) continue;

        // Handle different rule configurations
        let isValid = true;
        let params = [];
        let message = '';

        if (typeof ruleConfig === 'boolean') {
          isValid = !ruleConfig || rules[ruleName](value);
          message = defaultMessages[ruleName];
        } else if (typeof ruleConfig === 'object') {
          params = Array.isArray(ruleConfig.value) ? ruleConfig.value : [ruleConfig.value];
          isValid = !ruleConfig.value || rules[ruleName](value, ...params, values);
          message = ruleConfig.message || 
                   (typeof defaultMessages[ruleName] === 'function' 
                    ? defaultMessages[ruleName](...params)
                    : defaultMessages[ruleName]);
        }

        if (!isValid) {
          fieldErrors.push(message);
        }
      }

      // Handle custom validation function
      if (fieldSchema.validate) {
        try {
          const customError = await fieldSchema.validate(value, values);
          if (customError) {
            fieldErrors.push(customError);
          }
        } catch (error) {
          fieldErrors.push(error.message);
        }
      }

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
      }
    }

    if (Object.keys(errors).length > 0) {
      throw errors;
    }

    return values;
  };
};

export const combineValidators = (...validators) => {
  return async (values) => {
    const errors = {};

    for (const validator of validators) {
      try {
        await validator(values);
      } catch (validationErrors) {
        Object.assign(errors, validationErrors);
      }
    }

    if (Object.keys(errors).length > 0) {
      throw errors;
    }

    return values;
  };
};

// Example usage:
/*
const loginValidator = createValidator({
  email: [VALIDATION_RULES.required, VALIDATION_RULES.email],
  password: [VALIDATION_RULES.required, VALIDATION_RULES.password]
});

const registerValidator = createValidator({
  email: [VALIDATION_RULES.required, VALIDATION_RULES.email],
  password: [VALIDATION_RULES.required, VALIDATION_RULES.password],
  confirmPassword: [
    VALIDATION_RULES.required,
    VALIDATION_RULES.match('password', 'Password')
  ],
  phone: [VALIDATION_RULES.phone]
});
*/ 