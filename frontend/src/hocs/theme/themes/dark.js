import { createMuiTheme } from '@material-ui/core';

const darkTheme = createMuiTheme({
  overrides: {
    MuiContainer: {
      root: {
        backgroundColor: 'darkslateblue',
      }
    },
  }
});

export default darkTheme