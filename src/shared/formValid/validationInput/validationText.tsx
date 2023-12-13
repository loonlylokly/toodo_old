import { CombinedInput, TInputText } from 'types/inputType';

export const isTextInput = (input: CombinedInput): input is TInputText => {
  return input.type === 'text';
};

export const validateText = (input: TInputText, value: string) => {
  const errors: string[] = [];
  Object.keys(input.args).forEach((elem) => {
    if (elem === 'maxLength' && input.args[elem].value < value.length) {
      errors.push(input.args[elem].message);
    }
    if (elem === 'minLength' && input.args[elem].value > value.length) {
      errors.push(input.args[elem].message);
    }
    if (elem === 'pattern' && !input.args[elem].value.test(value)) {
      errors.push(input.args[elem].message);
    }
    if (elem === 'required' && input.args[elem].value && value === '') {
      errors.push(input.args[elem].message);
    }
  });
  return errors;
};
