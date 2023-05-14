import React, { ReactNode, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from './Menu'

export interface MenuItemProps {
  className?: string;
  index?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  disabled?: boolean;
  key?: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    className,
    index,
    style,
    children,
    disabled,
    key
  } = props;
  console.log('key', key);
  const context = useContext(MenuContext)
  const { active, onSelect } = context
  const classes = classNames('mq-Menu-Item', className, {
    'is-disabled': disabled,
    'is-active': active === index
  })
  const handleClick = (index: string | undefined) => {
    if (onSelect && !disabled && (typeof index === 'string')) {
      console.log('index', index);
      onSelect(index)
    }
  }
  return (
    <li key={index} className={classes} style={style} onClick={() => { handleClick(index) }}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem