/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */
import { ButtonHTMLAttributes, FC } from 'react';
import styles from './button.module.css';

type Props = {
  styleType?: 'primary' | 'secondary';
  styleClass?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({
  styleType = 'primary',
  styleClass = '',
  children,
  ...props
}) => {
  return (
    <button className={`${styleClass} ${styles[styleType]}`} {...props}>
      {children}
    </button>
  );
};
