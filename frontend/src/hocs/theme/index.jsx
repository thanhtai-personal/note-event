import React, { useState } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { getThemeByName, themeEnum } from './themes'

export const ThemeContext = React.createContext((themeName) => { })

const useMultiThemes = (ComposedComponent) => {
  const ThemeProvider = (props) => {
    const [themeName, setTheme] = useState(themeEnum.light)
    return (
      <ThemeContext.Provider value={setTheme}>
        <MuiThemeProvider theme={getThemeByName(themeName)}>
          <ComposedComponent {...props} />
        </MuiThemeProvider>
      </ThemeContext.Provider>
    )
  }

  return ThemeProvider
}

export default useMultiThemes

