import React, { useState } from 'react'
import classNames from 'classnames';

export type alertStyles = 'info' | 'warning' | 'error' | 'success'

export interface alertProps {
  level?: alertStyles;
  closeable?: boolean;
  title?: string;
  description?: string;
  onClose?: () => void;
}

const Alert: React.FC<alertProps> = (props) => {
  const { level, title, description, closeable, onClose } = props
  const [hidden, setHidden] = useState(false)
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose()
    }

    setHidden(true)
  }
  const classes = classNames({
    [`${level}`]: level
  })
  return (
    <div>
      <div className={classes}>
        <span>{title}</span>
        {description && <span>{description}</span>}
        {closeable && <span onClick={handleClose}></span>}
      </div>
    </div>
  )
}

Alert.defaultProps = {
  closeable: true,
  level: 'info'
}

export default Alert
