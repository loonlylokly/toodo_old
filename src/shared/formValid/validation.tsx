import { ValidationType } from 'types/validationType';
import { CombinedInput } from 'types/inputType';
import { EStatusEditTask } from 'types/task';
import { isTextInput, validateText } from './validationInput/validationText';
import { isDateInput, validateDate } from './validationInput/validationDate';
import { isTimeInput, validateTime } from './validationInput/validationTime';

export function Validation(validation: ValidationType) {
  const validateInput = (input: CombinedInput, key: string, value: string) => {
    const errors = [];
    if (isTextInput(input)) {
      errors.push(...validateText(input, value));
    }

    if (isDateInput(input)) {
      errors.push(...validateDate(input, value));
    }

    if (isTimeInput(input)) {
      errors.push(...validateTime(input, value));
    }

    return errors.join(', ');
  };

  const validate = (
    data: Record<string, string>
  ): { status: EStatusEditTask; errors: Record<string, string> } => {
    let status: EStatusEditTask = EStatusEditTask.success;
    const errors: Record<string, string> = {};
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
