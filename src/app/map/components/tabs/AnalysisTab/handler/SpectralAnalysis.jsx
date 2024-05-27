import React from 'react';
import { useEffect, useState } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setmodal } from '@/app/_store/features/controlSlice';
import { ErrorMessage } from '@/components/GciAlert';
import axios from 'axios';
import { LineChart } from '@mui/x-charts';
import {CircularProgress } from '@mui/material';
import { DownloadOutlined, ZoomIn} from '@mui/icons-material';





export default function SpectralAnalysis() {
    const AOI = useSelector((state) => state.control.aoi);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();


    let query =
        {
            collection: "COPERNICUS/S2_SR_HARMONIZED",
            startdate: "2010-01-01",
            enddate: "2024-05-01",
            maxcloud: 20
        };


    async function getSpectralData() {
        setData(null);
        query['geometry']  = AOI;

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        try {
      
            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/timeseries`, query, config)
            .then((res) => {
                setData(res['data']);
                
            })
            .catch((e) => {
               ErrorMessage(e)
            })
        } catch (e) {
            console.log(e);
        }

    };


    useEffect(() => {
        if(AOI) {
            getSpectralData();
        }
    },[AOI]);


    function handleDetails() {
        const Chart = (
            <LineChart
                xAxis={[{ data: data['Date'].map(obj => new Date(obj)), scaleType: "time", }]}
                series={[
                    {
                        data: data['Values'],
                    },
                ]}
                height={200}
                width={500}
                margin={{ left: 35, right: 15, top: 10, bottom: 20 }}
                grid={{ vertical: false, horizontal: false }}
            />
        )
        dispatch(setmodal({modal: {isOpen: true, title: 'Spectral Analysis', component: Chart}}))
    }
   



  return (
    <>
    <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', overflowX: 'auto',  height: '100%'}} >
        {data && (
                  <Stack sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginBottom: '1rem'}} direction={'column'} spacing={2} >
                      <LineChart
                          xAxis={[{ data: data['Date'].map(obj => new Date(obj)), scaleType: "time", }]}
                          series={[
                              {
                                  data: data['Values'],
                              },
                          ]}
                          height={150}
                          width={250}
                          margin={{ left: 35, right: 15, top: 10, bottom: 20 }}
                          grid={{ vertical: false, horizontal: false }}
                      />
                      <Box >
                          <IconButton size='small'>
                            <DownloadOutlined />
                          </IconButton>
                          <IconButton size='small' onClick={handleDetails}>
                            <ZoomIn />
                          </IconButton>
                      </Box>
                  </Stack>
        )}
    
        
        {!data  && AOI && (<CircularProgress color="inherit" />)}
        
    </Box>
    </>
  )
}
