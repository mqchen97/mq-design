import React, { ReactNode, useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectFn = (selectedKey: string) => void
export interface MenuProps {
  className?: string;
  mode?: MenuMode;
  activeIndex?: string;
  onSelect?: SelectFn;
  style?: React.CSSProperties;
  children?: ReactNode;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  active: string;
  onSelect?: SelectFn;
  mode: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ active: '0', mode: 'horizontal' })

const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    activeIndex,
    onSelect,
    style,
    children,
    defaultOpenSubMenus
  } = props
  const [active, setActive] = useState(activeIndex)
  const handleSelect = (active: string) => {
    setActive(active)
    if (onSelect) {
      onSelect(active)
    }
  }
  const passedContext: IMenuContext = {
    active: active ? active : '0',
    onSelect: handleSelect,
    mode: mode ? mode : 'horizontal',
    defaultOpenSubMenus,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement,
          {
            index: childElement.props.index ? childElement.props.index : index.toString(),
            key: index.toString()
          }
        )
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }

  const classes = classNames('mq-Menu', className, {
    'menu-horizontal': mode === 'horizontal',
    'menu-vertical': mode === 'vertical'
  })

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  activeIndex: '0',
  defaultOpenSubMenus: []
}

export default Menu