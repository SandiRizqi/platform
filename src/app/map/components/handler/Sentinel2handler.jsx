import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Stack, Box, Typography, Slider, styled, Tabs,Tab, List, ListItemButton, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import GciButton from '@/components/GciButton';
import { useDispatch, useSelector } from 'react-redux';
import { setbasemapurl } from '@/app/_store/features/controlSlice';
import axios from 'axios';
import { ErrorMessage } from '@/components/GciAlert';

import RGB  from '@/assets/icons/rgb.png';
import NDVI from '@/assets/icons/ndvi.png';


const style = {
    margin: '2px'
}

const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 3,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&::before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&::before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });





const VISUALOPTIONS = [{
    title: 'True Color',
    image: RGB.src,
    desc: 'Based on Band 4,3,2',
    mode: 'rgb'
},
{
    title: 'NDVI',
    image: NDVI.src,
    desc: 'Base on Band IR and Red (IR-R)/(IR+R)',
    mode: 'ndvi'
}]

export default function Sentinel2handler() {
    const selectedBasemap = useSelector((state) => state.control.selectedBasemap);
    const basemapUrl = useSelector((state) => state.control.basemapUrl);
    const [visual, setVisual] = useState('rgb');
    const [data, setData] = useState({collection: 'COPERNICUS/S2_SR_HARMONIZED', maxcloud: 20, mode: visual});
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleTab = (_, newValue) => {
        setActive(newValue);
      };


    function handleChange(e, key) {
        const value =  moment(e['$d']).format('YYYY-MM-DD');
        setData({...data, [key]: value})
    };

    function handleSlider(e){
        setData({...data, maxcloud: e.target.value})
    }

    async function handleSubmit (data) {
       
    
        setLoading(true)
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };


        

        try {
      
            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tiles/basemap`, data, config)
            .then((res) => {
                dispatch(setbasemapurl({basemapUrl: res.data['_tiles']}))
                setLoading(false)
                setActive(1)
                
            })
            .catch((e) => {
               ErrorMessage(e)
               setLoading(false)
            })
        } catch (e) {
            console.log(e)
            setLoading(false)
        }

    };

    async function handleChangeVisual(mode) {
        if(mode === visual) {
            return ;
        }
        let newdata = {...data, mode:mode};
        handleSubmit(newdata);
        setVisual(mode)
    } 


    

    const Err = !data['startdate'] || !data['enddate'];
    const OpenVisual = !Err && basemapUrl && selectedBasemap === 'Sentinel-2';

    const TABS_LIST = [{
        name: 'Search',
        disabled: false
    },
    {
        name: 'Visualize',
        disabled: !OpenVisual
    }];
    

    const SeachComp = (
        <Stack style={{marginTop: '5px', padding: '5px' }} spacing={1} direction={'column'} alignItems={'start'} alignContent={'center'}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Typography>Date Range</Typography>
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 0,
                    }}>
                        <DatePicker label={'start date'} sx={style} onAccept={(e)=> handleChange(e, 'startdate')} format='YYYY-MM-DD' />
                        <DatePicker label={'end date'} sx={style} onAccept={(e)=> handleChange(e, 'enddate')} format='YYYY-MM-DD' />
                    </Box>
                </LocalizationProvider>
                <br />
                <Box sx={{padding: '5px'}}>
                    <Typography>Cloud Cover ({data['maxcloud']}%)</Typography>
                    <PrettoSlider aria-label="cloudcover" min={0} max={100} defaultValue={20} onChange={(e) => handleSlider(e)}/>
                </Box>
                
                <GciButton color={"secondary"} variant={"contained"} onClick={() => handleSubmit(data)} isLoading={loading} disabled={Err}>
                    Search
                </GciButton>
            </Stack>

    );


    const Visual = (
        <div  style={{maxHeight: '25vh', overflowY: 'auto'}}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="planetvis">
                {VISUALOPTIONS.map((obj, idx) => (
                    <ListItemButton onClick={() => handleChangeVisual(obj.mode)} key={idx} disableRipple sx={{bgcolor: obj.mode === visual ? 'secondary.light': 'background.paper', 
                    "&:hover": {
                        bgcolor: obj.mode === visual ? 'secondary.light': 'background.paper'
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



   


    return (
        <>
        <Tabs
          indicatorColor="secondary"
          sx={{bgcolor: "secondary.light"}}
          textColor="inherit"
          variant="fullWidth"
          aria-label="handler-tab"
          value={active}
          onChange={handleTab}
        >
          {TABS_LIST.map((obj, idx) => (
            <Tab label={obj.name} key={idx} disabled={obj.disabled}/>
          ))}
          
        </Tabs>
        {active === 0 ? SeachComp: Visual}
     
            
        </>
    )
}
