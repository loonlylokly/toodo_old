/* eslint-disable react/require-default-props */
import { MutableRefObject } from 'react';
import styles from './input.module.css';

type props = {
  type?: 'text' | 'checkbox';
  required?: boolean;
  styleClass?: string;
  onChange?: () => void;
  inputRef?: MutableRefObject<HTMLInputElement> | undefined;
};

export function Input({
  type = 'text',
  styleClass = '',
  required = false,
  onChange = () => {},
  inputRef,
}: props) {
  return (
    <input
      className={`${styles.input} ${styleClass}`}
      type={type}
      ref={inputRef}
      required={required}
      onChange={onChange}
    />
  );
}
