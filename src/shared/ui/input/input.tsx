/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { FC, InputHTMLAttributes, MutableRefObject } from 'react';
import styles from './input.module.css';

type Props = {
  errors?: string[];
  label?: string;
  inputStyleClass?: string;
  labelStyleClass?: string;
  errorStyleClass?: string;
  listErrorsStyleClass?: string;
  inputRef?: MutableRefObject<HTMLInputElement> | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({
  errors = [],
  label = '',
  inputStyleClass = '',
  labelStyleClass = '',
  errorStyleClass = '',
  listErrorsStyleClass = '',
  inputRef,
  ...rest
}) => {
  return (
    <>
      <label className={`${styles.label} ${labelStyleClass}`} htmlFor={label}>
        {label}
      </label>
      <input
        name={label}
        className={`${styles.input} ${inputStyleClass}`}
        ref={inputRef}
        {...rest}
      />
      {errors ? (
        <ul className={`${styles.list__errors} ${listErrorsStyleClass}`}>
          {errors.map((error, index) => (
            <li className={`${styles.error} ${errorStyleClass}`} key={index}>
              {error}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
