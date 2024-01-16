import dayjs from 'dayjs';
import { CombinedInput, TInputTime } from 'types/inputType';
import { EValidRule } from 'types/validationType';

export const isTimeInput = (input: CombinedInput): input is TInputTime => {
  return input.type === 'time';
};

export const validateTime = (input: TInputTime, value: string) => {
  const errors: string[] = [];
  const timeValue = dayjs(`2000-01-01T${value}`);
  Object.keys(input.args).forEach((rule) => {
    if (rule === EValidRule.max) {
      const timeMax = dayjs(`2000-01-01T${input.args[rule].value}`);
      if (timeValue.isAfter(timeMax, 'seconds')) {
        errors.push(input.args[rule].message);
      }
    }
    if (rule === EValidRule.min) {
      const timeMin = dayjs(`2000-01-01T${input.args[rule].value}`);
      if (timeValue.isBefore(timeMin, 'seconds')) {
        errors.push(input.args[rule].message);
      }
    }
    if (
      rule === EValidRule.required &&
      input.args[rule].value &&
      value !== undefined
    ) {
      errors.push(input.args[rule].message);
    }
  });
  return errors;
};
