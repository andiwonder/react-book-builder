import { createTheme } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: { main: blue[700] },
    secondary: { main: grey[700] },
    type: 'light',
  },
});

export default theme;
