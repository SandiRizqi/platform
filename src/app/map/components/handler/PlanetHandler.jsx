import React from 'react';
import { useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, ListItemButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setbasemapparams } from '@/app/_store/features/controlSlice';


import RGB  from '@/assets/icons/rgb.png';
import NDVI from '@/assets/icons/ndvi.png';
import NDWI from '@/assets/icons/ndwi.png';
import MSAVI2 from '@/assets/icons/msavi2.png';
import MTVI2 from '@/assets/icons/mtvi2.png';
import VARI from '@/assets/icons/vari.png';
import TGI from '@/assets/icons/tgi.png';


const OPTIONS = [{
    title: 'True Color',
    image: RGB.src,
    desc: 'Based on Band 3,2,1',
    url: null
},
{
    title: 'NDVI',
    image: NDVI.src,
    desc: 'Base on Band IR and Red (IR-R)/(IR+R)',
    url: '&proc=ndvi'
},
{
    title: 'NDWI',
    image: NDWI.src,
    desc: 'Base on Band Green and IR (G-IR)/(G+IR)',
    url: '&proc=ndwi'
},
{
    title: 'MSAVI2',
    image: MSAVI2.src,
    desc: 'Modified Soil-adjusted Vegetation Index',
    url: '&proc=msavi2'
},
{
    title: 'MTVI2',
    image: MTVI2.src,
    desc: 'Modified Triangular Vegetation Index',
    url: '&proc=mtvi2'
},
{
    title: 'VARI',
    image: VARI.src,
    desc: 'Base on Band Green Red and Blue (G-R)/(G+R-B)',
    url: '&proc=vari'
},
{
    title: 'TGI',
    image: TGI.src,
    desc: 'Base on RGB Band (120 *(R-B))-(190*(R-G))/2',
    url: '&proc=tgi'
}
]

export default function PlanetHandler() {
    const [visual, setVisual] = useState(null);
    const dispatch = useDispatch();


    function changeVisual(idx) {
        setVisual(idx)
        const item = OPTIONS[idx];
        dispatch(setbasemapparams({basemapParams: item['url'] }));
    };

    



    return (
        <div >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="planetvis">
                {OPTIONS.map((obj, idx) => (
                    <ListItemButton onClick={() => changeVisual(idx)} key={idx} disableRipple sx={{bgcolor: idx === visual ? 'secondary.light': 'background.paper', 
                    "&:hover": {
                        bgcolor: idx === visual ? 'secondary.light': 'background.paper'
                    }
                    }}>
                        <ListItem alignItems="flex-start" disablePadding >
                            <ListItemAvatar>
                                <Avatar src={obj?.image}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={obj.title}
                                secondary={
                                    <Typography style={{fontSize: '12px'}}>
                                        {obj?.desc}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider  component="li" />
                    </ListItemButton>
                ))}

            </List>
        </div>
    )
}
