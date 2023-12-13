import dayjs from 'dayjs';
import { CombinedInput, TInputTime } from 'types/inputType';

export const isTimeInput = (input: CombinedInput): input is TInputTime => {
  return input.type === 'time';
};

export const validateTime = (input: TInputTime, value: string) => {
  const errors: string[] = [];
  const timeValue = dayjs(`2000-01-01T${value}`);
  Object.keys(input.args).forEach((elem) => {
    if (elem === 'max') {
      const timeMax = dayjs(`2000-01-01T${input.args[elem].value}`);
      if (timeValue.isAfter(timeMax, 'seconds')) {
        errors.push(input.args[elem].message);
      }
    }
    if (elem === 'min') {
      const timeMin = dayjs(`2000-01-01T${input.args[elem].value}`);
      if (timeValue.isBefore(timeMin, 'seconds')) {
        errors.push(input.args[elem].message);
      }
    }
    if (elem === 'required' && input.args[elem].value && value !== undefined) {
      errors.push(input.args[elem].message);
    }
  });
  return errors;
};
