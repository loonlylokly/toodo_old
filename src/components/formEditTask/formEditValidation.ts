import dayjs from 'dayjs';
import { ValidationType } from 'types/validationType';

export const validation: ValidationType = {
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
  date: {
    type: 'date',
    args: {
      min: {
        value: dayjs(Date.now()),
        message: 'Date too early',
      },
      max: {
        value: dayjs(Date.now()),
        message: 'Date too late',
      },
    },
  },
  time: {
    type: 'time',
    args: {
      min: {
        value: '07:00:00',
        message: 'Time too early',
      },
      max: {
        value: '22:00:00',
        message: 'Time too late',
      },
    },
  },
};
