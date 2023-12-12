import dayjs from 'dayjs';
import {
  CombinedInput,
  TInputDate,
  TInputText,
  TInputTime,
} from '../../types/inputType';

export type ValidationType = Record<string, CombinedInput>;

export function Validation(validation: ValidationType) {
  const isTextInput = (input: CombinedInput): input is TInputText => {
    return input.type === 'text';
  };

  const isDateInput = (input: CombinedInput): input is TInputDate => {
    return input.type === 'date';
  };

  const isTimeInput = (input: CombinedInput): input is TInputTime => {
    return input.type === 'time';
  };

  const validateInput = (input: CombinedInput, key: string, value: string) => {
    const errors = [];
    if (isTextInput(input)) {
      if (
        Object.prototype.hasOwnProperty.call(input, 'maxlength') &&
        input.maxlength.value < value.length
      ) {
        errors.push(input.maxlength.message);
      }
      if (
        Object.prototype.hasOwnProperty.call(input, 'minlength') &&
        input.minlength.value > value.length
      ) {
        errors.push(input.minlength.message);
      }
      if (
        Object.prototype.hasOwnProperty.call(input, 'pattern') &&
        !input.pattern.value.test(value)
      ) {
        errors.push(input.pattern.message);
      }
    }

    if (isDateInput(input)) {
      const dateValue = dayjs(value);
      if (
        Object.prototype.hasOwnProperty.call(input, 'min') &&
        dateValue.isBefore(input.min.value, 'day')
      ) {
        errors.push(input.min.message);
      }
      if (
        Object.prototype.hasOwnProperty.call(input, 'max') &&
        dateValue.isAfter(input.min.value, 'day')
      ) {
        errors.push(input.max.message);
      }
    }

    if (isTimeInput(input)) {
      const timeValue = dayjs(`2000-01-01T${value}`);
      const timeMin = dayjs(`2000-01-01T${input.min.value}`);
      const timeMax = dayjs(`2000-01-01T${input.max.value}`);
      if (
        Object.prototype.hasOwnProperty.call(input, 'min') &&
        timeValue.isBefore(timeMin, 'seconds')
      ) {
        errors.push(input.min.message);
      }
      if (
        Object.prototype.hasOwnProperty.call(input, 'max') &&
        timeValue.isAfter(timeMax, 'seconds')
      ) {
        errors.push(input.max.message);
      }
    }

    return errors.join(', ');
  };

  const validate = (value: string, key: string) => {
    const errors: Record<string, string> = {};
    if (Object.prototype.hasOwnProperty.call(validation, key)) {
      errors[key] = validateInput(validation[key], key, value);
    }
    return errors;
  };

  return { validate };
}
