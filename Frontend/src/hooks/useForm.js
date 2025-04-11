import { useState, useCallback, useEffect } from 'react';
import { createValidator } from '../utils/validation';

const useForm = ({
  initialValues = {},
  validationSchema = {},
  onSubmit,
  validateOnChange = true,
  validateOnBlur = true,
  validateOnMount = false
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [isDirty, setIsDirty] = useState(false);

  const validator = useCallback(
    createValidator(validationSchema),
    [validationSchema]
  );

  const validateField = useCallback(
    async (name, value) => {
      try {
        await validator({ [name]: value });
        setErrors(prev => ({ ...prev, [name]: undefined }));
        return true;
      } catch (validationErrors) {
        setErrors(prev => ({ ...prev, [name]: validationErrors[name] }));
        return false;
      }
    },
    [validator]
  );

  const validateForm = useCallback(
    async (formValues = values) => {
      try {
        await validator(formValues);
        setErrors({});
        return true;
      } catch (validationErrors) {
        setErrors(validationErrors);
        return false;
      }
    },
    [validator, values]
  );

  const handleChange = useCallback(
    async (event) => {
      const { name, type, value, checked, files } = event.target;
      let newValue = value;

      if (type === 'checkbox') {
        newValue = checked;
      } else if (type === 'file') {
        newValue = files;
      } else if (type === 'number' || type === 'range') {
        newValue = value === '' ? '' : Number(value);
      }

      setValues(prev => {
        const newValues = { ...prev, [name]: newValue };
        setIsDirty(true);
        return newValues;
      });

      if (validateOnChange) {
        await validateField(name, newValue);
      }
    },
    [validateOnChange, validateField]
  );

  const handleBlur = useCallback(
    async (event) => {
      const { name } = event.target;
      setTouched(prev => ({ ...prev, [name]: true }));

      if (validateOnBlur) {
        await validateField(name, values[name]);
      }
    },
    [validateOnBlur, validateField, values]
  );

  const setFieldValue = useCallback(
    async (name, value, shouldValidate = validateOnChange) => {
      setValues(prev => ({ ...prev, [name]: value }));
      setIsDirty(true);
      if (shouldValidate) {
        await validateField(name, value);
      }
    },
    [validateOnChange, validateField]
  );

  const setFieldTouched = useCallback(
    async (name, isTouched = true, shouldValidate = validateOnBlur) => {
      setTouched(prev => ({ ...prev, [name]: isTouched }));
      if (shouldValidate) {
        await validateField(name, values[name]);
      }
    },
    [validateOnBlur, validateField, values]
  );

  const resetForm = useCallback(
    (newValues = initialValues) => {
      setValues(newValues);
      setErrors({});
      setTouched({});
      setIsSubmitting(false);
      setIsDirty(false);
    },
    [initialValues]
  );

  const handleSubmit = useCallback(
    async (event) => {
      if (event) {
        event.preventDefault();
      }

      setSubmitCount(c => c + 1);
      setIsSubmitting(true);

      try {
        const isValid = await validateForm();
        if (isValid) {
          await onSubmit(values, {
            setSubmitting: setIsSubmitting,
            resetForm
          });
        }
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, onSubmit, values, resetForm]
  );

  useEffect(() => {
    if (validateOnMount) {
      validateForm();
    }
  }, [validateOnMount, validateForm]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitCount,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setValues,
    setErrors,
    setTouched,
    resetForm,
    validateField,
    validateForm
  };
};

export default useForm; 