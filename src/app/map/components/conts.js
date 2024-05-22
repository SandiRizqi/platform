import PlanetNICFI from "./desc/PlanetNICFI";
import PlanetHandler from "./handler/PlanetHandler";
import Sentinel2handler from "./handler/Sentinel2handler";
import Sentinel2 from "./desc/Sentinel2";
import Landsat45 from "./desc/Landsat45";
import Landsat89 from "./desc/Landsat89";

export const BASEMAPS = [
    {
        title: 'Planet NICFI',
        desc: <PlanetNICFI />,
        component: <PlanetHandler />
    },
    {
        title: 'Sentinel-2',
        desc: <Sentinel2 />,
        component: <Sentinel2handler/>
    },
    {
        title: 'Landsat 8-9',
        desc: <Landsat89 />,
        component: null
    },
    {
        title: 'Landsat 7 ETM+',
        component: null
    },
    {
        title: 'Landsat 4-5 TM',
        desc: <Landsat45 />,
        component: null
    },
    
    
    {
        title: 'Wheather',
        component: null
    }
]