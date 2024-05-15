'use client';
import { createTheme } from "@mui/material";


const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(238, 247, 255)",
     
      
    },
    secondary: {
        main: "rgb(77, 134, 156)",
        light: "rgba(77, 134, 156, 0.3)",
     
       
    }
  },
  components: {
    MuiToolbar: {
        styleOverrides: {
            dense: {
                height: 50,
                minHeight: 50
            }
        }
    }
},
});




export default theme;
