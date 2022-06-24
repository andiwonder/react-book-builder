import { createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

const theme = createTheme({
  palette: {
    primary: { main: blue[700] },
    secondary: { main: grey[700] },
    type: 'light',
  },
});

export default theme;
