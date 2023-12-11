import dayjs from 'dayjs';

type MyInput = {
  type: 'text' | 'date' | 'time';
};

type InputText = {
  type: 'text';
  maxlength?: {
    value: number;
    message?: string;
  };
  minlength?: {
    value: number;
    message?: string;
  };
  pattern?: {
    value: RegExp;
    message?: string;
  };
} & MyInput;

type InputDate = {
  type: 'date';
  max?: {
    value: dayjs.Dayjs;
    message?: string;
  };
  min?: {
    value: dayjs.Dayjs;
    message?: string;
  };
} & MyInput;

type InputTime = {
  type: 'time';
  max?: {
    value: string;
    message?: string;
  };
  min?: {
    value: string;
    message?: string;
  };
} & MyInput;

type CombinedInput = InputText | InputDate | InputTime;

export type ValidationType = Record<string, CombinedInput>;

export function Validation(validation: ValidationType) {
  const isTextInput = (input: CombinedInput): input is InputText => {
    return input.type === 'text';
  };

  const isDateInput = (input: CombinedInput): input is InputDate => {
    return input.type === 'date';
  };

  const isTimeInput = (input: CombinedInput): input is InputDate => {
    return input.type === 'time';
  };

  const validateInput = (input: CombinedInput, key: string, value: string) => {
    const errors = [];
    if (isTextInput(input)) {
      if (input.maxlength.value < value.length) {
        errors.push(input.maxlength.message);
      }
      if (input.minlength.value > value.length) {
        errors.push(input.minlength.message);
      }
      if (!input.pattern.value.test(value)) {
        errors.push(input.pattern.message);
      }
    }

    if (isDateInput(input)) {
      const dateValue = dayjs(value);
      if (dateValue.isBefore(input.min.value, 'day')) {
        errors.push(input.min.message);
      }
      if (dateValue.isAfter(input.min.value, 'day')) {
        errors.push(input.max.message);
      }
    }

    if (isTimeInput(input)) {
      const timeValue = dayjs(`2000-01-01T${value}`);
      const timeMin = dayjs(`2000-01-01T${input.min.value}`);
      const timeMax = dayjs(`2000-01-01T${input.max.value}`);
      if (timeValue.isBefore(timeMin, 'seconds')) {
        errors.push(input.min.message);
      }
      if (timeValue.isAfter(timeMax, 'seconds')) {
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
