import { ValidationType } from 'types/validationType';
import { CombinedInput } from 'types/inputType';
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

  const validate = (value: string, key: string) => {
    const errors: Record<string, string> = {};
    if (Object.prototype.hasOwnProperty.call(validation, key)) {
      errors[key] = validateInput(validation[key], key, value);
    }
    return errors;
  };

  return { validate };
}
