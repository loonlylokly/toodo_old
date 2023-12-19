import { ValidationType } from 'types/validationType';

export const validationAddTask: ValidationType = {
  text: {
    type: 'text',
    args: {
      maxLength: {
        value: 5,
        message: 'Out boundaries the maximum length',
      },
      required: {
        value: true,
        message: 'Empty text task',
      },
    },
  },
  datetime: {
    type: 'datetime',
    args: {
      required: {
        value: true,
        message: 'Empty datetime',
      },
    },
  },
};
