import React from 'react';
import { useState } from 'react';
import moment from 'moment';
import { Stack, Box, Typography, Slider, styled, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import GciButton from '@/components/GciButton';
import { useDispatch } from 'react-redux';
import { setbasemapurl } from '@/app/_store/features/controlSlice';
import axios from 'axios';
import { ErrorMessage } from '@/components/GciAlert';


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


export default function Sentinel2handler() {
    const [data, setData] = useState({collection: 'COPERNICUS/S2_SR_HARMONIZED', maxcloud: 20});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    function handleChange(e, key) {
        const value =  moment(e['$d']).format('YYYY-MM-DD');
        setData({...data, [key]: value})
    };

    function handleSlider(e){
        setData({...data, maxcloud: e.target.value})
    }

    async function handleSubmit () {
       
    
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
                
            })
            .catch((e) => {
               ErrorMessage(e)
               setLoading(false)
            })
        } catch (e) {
            console.log(e)
            setLoading(false)
        }

    }

    const Err = !data['startdate'] || !data['enddate'];


    return (
        <>
            <Stack style={{ minHeight: '20vh', marginTop: '5px', padding: '5px' }} spacing={1} direction={'column'} alignItems={'start'} alignContent={'center'}>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Typography>Date Range</Typography>
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 0,
                    }}>
                        <DatePicker label={'start date'} sx={style} onAccept={(e)=> handleChange(e, 'startdate')} format='YYYY-MM-DD'/>
                        <DatePicker label={'end date'} sx={style} onAccept={(e)=> handleChange(e, 'enddate')} format='YYYY-MM-DD'/>
                    </Box>
                </LocalizationProvider>
                <br />
                <Box sx={{padding: '5px'}}>
                    <Typography>Cloud Cover (%)</Typography>
                    <PrettoSlider aria-label="cloudcover" min={0} max={100} defaultValue={20} onChange={(e) => handleSlider(e)}/>
                </Box>
                
                <GciButton color={"secondary"} variant={"contained"} onClick={handleSubmit} isLoading={loading} disabled={Err}>
                    Search
                </GciButton>
            </Stack>
        </>
    )
}
