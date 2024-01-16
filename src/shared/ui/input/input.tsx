/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { FC, InputHTMLAttributes, MutableRefObject } from 'react';
import { debounce } from 'shared/debounce/debounce';
import styles from './input.module.css';

type Props = {
  errors?: string[];
  label?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  debounced?: boolean;
  debounceTime?: number;
  inputStyleClass?: string;
  labelStyleClass?: string;
  errorStyleClass?: string;
  listErrorsStyleClass?: string;
  inputRef?: MutableRefObject<HTMLInputElement> | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({
  errors = [],
  label = '',
  handleChange = () => {},
  debounced = false,
  debounceTime = 600,
  inputStyleClass = '',
  labelStyleClass = '',
  errorStyleClass = '',
  listErrorsStyleClass = '',
  inputRef = null,
  ...rest
}) => {
  let debounceHandleChange;
  if (debounced) {
    debounceHandleChange = debounce(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
      },
      debounceTime
    );
  }

  return (
    <>
      <label className={`${styles.label} ${labelStyleClass}`} htmlFor={label}>
        {label}
      </label>
      <input
        name={label}
        className={`${styles.input} ${inputStyleClass}`}
        onChange={debounced ? debounceHandleChange : handleChange}
        ref={inputRef}
        {...rest}
      />
      {errors.length ? (
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
