import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import 'dayjs/locale/de';
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import GciAppBar from "@/components/GciAppBar";
import { Suspense } from "react";
import Loading from "./loading";
import theme from "./theme";




export const metadata = {
  title: "Geocircle Platform",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <GciAppBar color="primary" />
            <main>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
