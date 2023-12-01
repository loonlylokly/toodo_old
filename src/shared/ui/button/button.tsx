import { ButtonHTMLAttributes, FC } from 'react';
import styles from './button.module.css';

type Props = {
  styleType?: 'primary'|'secondary',
  styleClass?: string,
} &  ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<Props> = ({
  styleType='primary',
  styleClass='',
  children,
  ...props
}) => {
  return (
    <button
      className={`${styles[styleType]} ${styleClass}`}
      {...props}
    >
      {children}
    </button>
  );
}
