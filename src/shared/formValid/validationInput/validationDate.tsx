import dayjs from 'dayjs';
import { CombinedInput, TInputDate } from 'types/inputType';

export const isDateInput = (input: CombinedInput): input is TInputDate => {
  return input.type === 'date';
};

export const validateDate = (input: TInputDate, value: string) => {
  const errors: string[] = [];
  const dateValue = dayjs(value);
  Object.keys(input.args).forEach((elem) => {
    if (elem === 'max' && dateValue.isBefore(input.args[elem].value, 'day')) {
      errors.push(input.args[elem].message);
    }
    if (elem === 'min' && dateValue.isAfter(input.args[elem].value, 'day')) {
      errors.push(input.args[elem].message);
    }
    if (elem === 'required' && input.args[elem].value && value !== undefined) {
      errors.push(input.args[elem].message);
    }
  });
  return errors;
};
