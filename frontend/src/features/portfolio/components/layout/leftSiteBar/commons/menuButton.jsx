import React, { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Color from 'root/utils/color'
import CssVariable from 'root/utils/cssVariable'


const useStyle = makeStyles(theme => {
  return {
    menuButton: {
      width: CssVariable.leftBarWidth,
      height: '50px',
      color: Color.white,
      display: 'flex',
      textDecoration: 'none',
      margin: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
    active: {
      color: Color.green
    },
    inActive: {
    },
    menuItemText: {
      animation: `$textAppearAnim 1000ms ${theme.transitions.easing.easeInOut}`
    },
    '@keyframes textAppearAnim': {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    }
  }
})

const MenuButton = (props) => {
  const { className, iconElement, iconClassName, labelText, active, url, value, rel, target
    , onClick = () => { }
  } = props
  const classes = useStyle()
  const [localLabelText, setLocalLabelText] = useState('')
  const [mouseIn, setMouseIn] = useState(false)
  const onMouseLeave= useCallback(() => {
    setLocalLabelText('')
    setMouseIn(false)
  }, [])

  const onMouseOver= useCallback(() => {
    setLocalLabelText(labelText)
    setMouseIn(true)
  }, [labelText])

  const handleClick = useCallback((e) => {
    if (!url) e.preventDefault()
    onClick && onClick(e, { value })
  }, [onClick, url, value])

  return (
    <a
      href={url || '/'}
      rel={rel}
      className={[classes.menuButton, className, active || mouseIn ? classes.active : classes.inActive].join(' ')}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      target={target}
    >
      {!localLabelText ? iconElement ? iconElement 
        : <i className={iconClassName || ''}></i>
          : <div className={classes.menuItemText}>{localLabelText}</div>
      }
    </a>
  )
}

export default MenuButton