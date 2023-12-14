import dayjs from 'dayjs';

export type TInput = {
  type: 'text' | 'date' | 'time';
};

export type TInputText = {
  type: 'text';
  args: {
    minLength?: {
      value: number;
      message?: string;
    };
    maxLength?: {
      value: number;
      message?: string;
    };
    pattern?: {
      value: RegExp;
      message?: string;
    };
    required?: {
      value: boolean;
      message?: string;
    };
  };
} & TInput;

export type TInputDate = {
  type: 'date';
  args: {
    min?: {
      value: dayjs.Dayjs;
      message?: string;
    };
    max?: {
      value: dayjs.Dayjs;
      message?: string;
    };
    required?: {
      value: boolean;
      message?: string;
    };
  };
} & TInput;

export type TInputTime = {
  type: 'time';
  args: {
    min?: {
      value: string;
      message?: string;
    };
    max?: {
      value: string;
      message?: string;
    };
    required?: {
      value: boolean;
      message?: string;
    };
  };
} & TInput;

export type CombinedInput = TInputText | TInputDate | TInputTime;
