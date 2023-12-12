import dayjs from 'dayjs';

export type TInput = {
  type: 'text' | 'date' | 'time';
};

export type TInputText = {
  type: 'text';
  maxlength?: {
    value: number;
    message?: string;
  };
  minlength?: {
    value: number;
    message?: string;
  };
  pattern?: {
    value: RegExp;
    message?: string;
  };
} & TInput;

export type TInputDate = {
  type: 'date';
  max?: {
    value: dayjs.Dayjs;
    message?: string;
  };
  min?: {
    value: dayjs.Dayjs;
    message?: string;
  };
} & TInput;

export type TInputTime = {
  type: 'time';
  max?: {
    value: string;
    message?: string;
  };
  min?: {
    value: string;
    message?: string;
  };
} & TInput;

export type CombinedInput = TInputText | TInputDate | TInputTime;
