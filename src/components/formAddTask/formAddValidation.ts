import { ValidationType } from 'types/validationType';

export const validationAddTask: ValidationType = {
  text: {
    type: 'text',
    args: {
      maxLength: {
        value: 30,
        message: 'Out boundaries the maximum length',
      },
    },
  },
};
