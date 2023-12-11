import dayjs from 'dayjs';
import { ValidationType } from 'shared/formValid/validation';

export const validation: ValidationType = {
  name: {
    type: 'text',
    maxlength: {
      value: 10,
      message: 'Out boundaries the maximum length',
    },
    minlength: {
      value: 3,
      message: 'Out boundaries the minimum length',
    },
    pattern: {
      value: /[a-z]/i,
      message: 'Does not match the sample',
    },
  },
  date: {
    type: 'date',
    max: {
      value: dayjs(Date.now()),
      message: 'Date too late',
    },
    min: {
      value: dayjs(Date.now()),
      message: 'Date too early',
    },
  },
  time: {
    type: 'time',
    max: {
      value: '22:00:00',
      message: 'Date too late',
    },
    min: {
      value: '07:00:00',
      message: 'Date too early',
    },
  },
};
