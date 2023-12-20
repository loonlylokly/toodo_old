import dayjs from 'dayjs';
import { CombinedInput, TInputDatetime } from 'types/inputType';

export const isDatetimeInput = (
  input: CombinedInput
): input is TInputDatetime => {
  return input.type === 'datetime';
};

export const validateDatetime = (input: TInputDatetime, value: string) => {
  const errors: string[] = [];
  const dateValue = dayjs(value);
  Object.keys(input.args).forEach((elem) => {
    if (elem === 'max' && dateValue.isBefore(input.args[elem].value)) {
      errors.push(input.args[elem].message);
    }
    if (elem === 'min' && dateValue.isAfter(input.args[elem].value)) {
      errors.push(input.args[elem].message);
    }
    if (elem === 'required' && input.args[elem].value && value === '') {
      errors.push(input.args[elem].message);
    }
  });
  return errors;
};
