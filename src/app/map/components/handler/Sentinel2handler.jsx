import React from 'react';
import { Stack, Box, Typography, Slider, styled } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import GciButton from '@/components/GciButton';


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
                        <DatePicker label={'start date'} sx={style} />
                        <DatePicker label={'end date'} sx={style} />
                    </Box>
                </LocalizationProvider>
                <br />
                <Box sx={{padding: '5px'}}>
                    <Typography>Cloud Cover (%)</Typography>
                    <PrettoSlider aria-label="cloudcover" min={0} max={100} defaultValue={20}/>
                </Box>
                <GciButton color={"secondary"} variant={"contained"} isLoading>
                    Search
                </GciButton>
            </Stack>
        </>
    )
}
