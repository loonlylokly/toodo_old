import { MutableRefObject } from 'react';
import styles from './Input.module.css';

type props = {
  type?: 'text'|'checkbox',
  placeholder?: string,
  required?: boolean,
  styleClass?: string,
  onChange?: ()=>void,
  inputRef?: MutableRefObject<HTMLInputElement>|undefined,
};

export function Input({
  type='text',
  styleClass='',
  required=false,
  onChange=()=>{},
  inputRef,
}: props) {
  return (
    <input
      className={`${styles.input} ${styleClass}`}
      type={type} ref={inputRef}
      required={required}
      onChange={onChange}
    />
  )
}
