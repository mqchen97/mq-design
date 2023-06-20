import React, { InputHTMLAttributes, ReactElement, useState } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';

type InputSize = 'default' | 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  className?: string;
  size?: InputSize;
  icon?: IconProp;
  append?: string | ReactElement;
  prepand?: string | ReactElement;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = (props) => {
  //  取出各种属性
  const { disabled, size, icon, append, prepand, className, ...restProps } = props
  const [value, setValue] = useState()
  // 根据属性计算不同的 className
  const classses = classNames('mq-Input', className,
    {
      [`input-${size}`]: size
    }
  )
  return (
    // 根据属性判断是否要添加特定节点
    <div>
      {prepand ? typeof prepand === 'string' ? <span>{prepand}</span> : prepand : null}
      <input
        className={classses}
        disabled
        value={value}
        onChange={(e) => { }}
      />
      {append ? typeof append === 'string' ? <span>{append}</span> : append : null}
    </div>
  )
}

Input.defaultProps = {
  size: 'default'
}

export default Input
