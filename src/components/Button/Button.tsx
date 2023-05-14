import React from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'md' | 'sm'

export type ButtonType = 'default' | 'primary' | 'danger' | 'link'

export interface BaseButtonProps {
  className?: string,
  disabled?: boolean,
  size?: ButtonSize,
  level?: ButtonType,
  children: React.ReactNode,
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {
  const {
    disabled,
    className,
    size,
    level,
    children,
    ...restProps
  } = props
  const classes = classNames('mq-btn', className, {
    [`mq-btn-${level}`]: level,
    [`mq-btn-${size}`]: size,
    'disabled': level === 'link' && disabled
  })
  if (level === 'link') {
    return (
      // eslint-disable-next-line
      <a
        // href={"javascript:;"}
        className={classes}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  level: 'default',
  size: 'md'
}

export default Button