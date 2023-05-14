import React, { ReactNode, useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import classNames from "classnames";
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'

export interface SubMenuProps {
  className?: string;
  title: string;
  index?: string;
  children?: ReactNode;
  key?: string
}

const SubMenu: React.FC<SubMenuProps> = ({ className, title, index, children, key }) => {
  const context = useContext(MenuContext)
  const { active, mode, defaultOpenSubMenus } = context
  const openSubMenu = defaultOpenSubMenus as Array<string>
  const isOpen = (index && mode === 'vertical') ? openSubMenu.includes(index) : false;
  const [subOpen, setSubOpen] = useState(isOpen)
  const classes = classNames('mq-Menu-Item mq-SubMenu-Item', className,
    {
      'is-active': index === active
    }
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setSubOpen(!subOpen)
  }
  let timer: any
  const handleHover = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setSubOpen(toggle)
    }, 300)
  }

  const HoverEvent = mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => handleHover(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleHover(e, false)
  } : {}
  const ClickEvent = mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('mq-SubMenu',
      {
        'sub-open': subOpen
      }
    )
    const childremComponents = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement,
          {
            index: childElement.props.index ? childElement.props.index : `${index}-${i}`,
            key: `${index}-${i}`
          }
        )
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem component")
      }
    })

    return (
      <ul className={subMenuClasses}>
        {childremComponents}
      </ul>
    )
  }
  return (
    <li key={index} className={classes} {...ClickEvent} {...HoverEvent}>
      <div className="submenu-title" >
        {title}
        <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu