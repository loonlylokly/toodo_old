/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import { FC, FormHTMLAttributes } from 'react';

type Props = FormHTMLAttributes<HTMLFormElement>;

export const Form: FC<Props> = ({ children, ...props }) => {
  return <form {...props}>{children}</form>;
};
