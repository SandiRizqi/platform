'use client';
import { createTheme } from "@mui/material";


const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(255,255,255)",
     
      
    },
    secondary: {
        main: "rgb(117, 164, 127)",
        light: "rgba(117, 164, 127, 0.3)",
     
       
    }
  },
  components: {
    MuiToolbar: {
        styleOverrides: {
            dense: {
                height: 45,
                minHeight: 45
            }
        }
    }
},
});




export default theme;
