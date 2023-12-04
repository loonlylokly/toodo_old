/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { FC, InputHTMLAttributes, MutableRefObject } from 'react';
import styles from './input.module.css';

type Props = {
  styleClass?: string;
  inputRef?: MutableRefObject<HTMLInputElement> | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({ styleClass = '', inputRef, ...rest }) => {
  return (
    <input
      className={`${styles.input} ${styleClass}`}
      ref={inputRef}
      {...rest}
    />
  );
};
