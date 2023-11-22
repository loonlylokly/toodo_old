import styles from './button.module.css';

type props = {
  type?: 'submit'|'reset'|'button',
  width?: string,
  height?: string,
  title?: string,
  styleType?: 'primary'|'secondary',
  styleClass?: string,
  disabled?: boolean,
  onClick?: () => void
  children?: string|React.ReactHTMLElement<HTMLElement>,
};

export function Button({
  type='button',
  width='',
  height='',
  title='',
  styleType='primary',
  styleClass='',
  disabled=false,
  onClick=()=>{},
  children='Кнопка',
}: props) {
  return (
    <button
      className={`${styleClass} ${styles[styleType]}`}
      type={type}
      title={title}
      style={{width: width, height: height}}
      disabled={disabled}
      onClick={onClick}
      >
      {children}
    </button>
  )
}