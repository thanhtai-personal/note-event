import { createMuiTheme } from '@material-ui/core';

const darkTheme = createMuiTheme({
  overrides: {
    MuiContainer: {
      root: {
        backgroundColor: '#E2EEE2',
      }
    },
  }
});

export default darkTheme