import { ValidationType } from 'types/validationType';

export const validationTask: ValidationType = {
  text: {
    type: 'text',
    args: {
      maxLength: {
        value: 10,
        message: 'Out boundaries the maximum length',
      },
      minLength: {
        value: 3,
        message: 'Out boundaries the minimum length',
      },
      pattern: {
        value: /[a-z]/i,
        message: 'Does not match the sample',
      },
      required: {
        value: true,
        message: 'Empty task text',
      },
    },
  },
  datetime: {
    type: 'datetime',
    args: {
      required: {
        value: true,
        message: 'Empty date',
      },
    },
  },
};
