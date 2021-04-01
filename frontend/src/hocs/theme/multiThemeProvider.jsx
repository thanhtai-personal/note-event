import React, { useState } from 'react'
import { MuiThemeProvider } from "@material-ui/core"
import { getThemeByName, themeEnum } from './themes'

export const ThemeContext = React.createContext((themeName) => { })

const ThemeProvider = (props) => {
  const [themeName, setTheme] = useState(themeEnum.light)
  const theme = getThemeByName(themeName)
  return (
    <ThemeContext.Provider value={setTheme}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider