import { ValidationType } from 'types/validationType';
import { CombinedInput } from 'types/inputType';
import { EStatusEditTask } from 'types/task';
import { isTextInput, validateText } from './validationInput/validationText';
import { isDateInput, validateDate } from './validationInput/validationDate';
import { isTimeInput, validateTime } from './validationInput/validationTime';
import {
  isDatetimeInput,
  validateDatetime,
} from './validationInput/validationDatetime';

export function Validation(validation: ValidationType) {
  const validateInput = (input: CombinedInput, key: string, value: string) => {
    if (isTextInput(input)) {
      return validateText(input, value);
    }

    if (isDateInput(input)) {
      return validateDate(input, value);
    }

    if (isTimeInput(input)) {
      return validateTime(input, value);
    }

    if (isDatetimeInput(input)) {
      return validateDatetime(input, value);
    }
    return [];
  };

  const validate = (
    data: Record<string, string>
  ): { status: EStatusEditTask; errors: Record<string, string[]> } => {
    let status: EStatusEditTask = EStatusEditTask.success;
    const errors: Record<string, string[]> = {};
    Object.keys(data).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(validation, key)) {
        errors[key] = validateInput(validation[key], key, data[key]);
        if (errors[key].length) {
          status = EStatusEditTask.error;
        }
      }
    });
    return { status, errors };
  };

  return { validate };
}
