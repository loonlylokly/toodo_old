import { useEffect, useRef } from "react";
import styles from './dialog.module.css';

type props = {
  id?: string;
  styleClass?: string;
  isOpen: boolean;
  children: React.ReactNode;
}

export function Dialog({
  id='',
  styleClass='',
  isOpen=false,
  children
}: props) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpen])

  return (
    <dialog
      id={id}
      className={`${styleClass} ${styles.dialog}`}
      ref={dialog}
    >
      {children}
    </dialog>
  )
}
