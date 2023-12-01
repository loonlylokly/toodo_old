import { FC } from 'react';
import { InputHTMLAttributes, MutableRefObject } from 'react';
import styles from './input.module.css';

type Props = {
  styleClass?: string,
  inputRef?: MutableRefObject<HTMLInputElement> | undefined,
} & InputHTMLAttributes<HTMLInputElement>

export const Input: FC<Props> = ({
  styleClass='',
  inputRef,
  children,
  ...rest
}) => {
  return (
    <input 
      className={`${styles.input} ${styleClass}`}
      ref={inputRef}
      {...rest}
    >
      {children}
    </input>
  );
};
