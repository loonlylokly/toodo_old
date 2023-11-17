import { MutableRefObject } from 'react';
import styles from './Input.module.css';

type props = {
  type?: 'text'|'checkbox',
  placeholder?: string,
  styleClass?: string,
  onChange?: ()=>void,
  inputRef?: MutableRefObject<HTMLInputElement>|undefined,
};

export function Input({
  type='text',
  styleClass='',
  onChange=()=>{},
  inputRef,
}: props) {
  return (
    <input
      className={`${styles.input} ${styleClass}`}
      type={type} ref={inputRef}
      onChange={onChange}
    />
  )
}
