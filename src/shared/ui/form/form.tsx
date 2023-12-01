import { FC, FormHTMLAttributes } from "react"

type Props = {} & FormHTMLAttributes<HTMLFormElement>

export const Form: FC<Props> = ({
  children,
  ...props
}) => {
  return (
    <form {...props}>
      {children}
    </form>
  )
}
