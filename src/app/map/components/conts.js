import PlanetNICFI from "./desc/PlanetNICFI";
import PlanetHandler from "./handler/PlanetHandler";
import Sentinel2handler from "./handler/Sentinel2handler";
import Sentinel2 from "./desc/Sentinel2";
import Landsat45 from "./desc/Landsat45";
import Landsat89 from "./desc/Landsat89";
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';



export const BASEMAPS = [
    {
        title: 'Planet NICFI',
        desc: <PlanetNICFI />,
        disabled: false,
        component: <PlanetHandler />
    },
    {
        title: 'Sentinel-2',
        desc: <Sentinel2 />,
        disabled: false,
        component: <Sentinel2handler/>
    },
    {
        title: 'Landsat 8-9',
        desc: <Landsat89 />,
        disabled: false,
        component: null
    },
    {
        title: 'Landsat 7 ETM+',
        disabled: false,
        component: null
    },
    {
        title: 'Landsat 4-5 TM',
        desc: <Landsat45 />,
        disabled: false,
        component: null
    },
    
    
    {
        title: 'Wheather',
        disabled: true,
        component: null
    }
];



export const ANALYSIS_TABS = [
    {
        title: 'Spectral',
        icon: <QueryStatsOutlinedIcon />,
        component: null
    },
    {
        title: 'Deforestation',
        icon: <ForestOutlinedIcon />,
        component: null
    },
    {
        title: 'Hotspot',
        icon: <WhatshotOutlinedIcon />,
        component: null
    }
]