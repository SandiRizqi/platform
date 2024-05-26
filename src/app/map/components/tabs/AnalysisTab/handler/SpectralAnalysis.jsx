import React from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { ErrorMessage } from '@/components/GciAlert';
import axios from 'axios';
import { LineChart } from '@mui/x-charts';
import {CircularProgress } from '@mui/material';


export default function SpectralAnalysis() {
    const AOI = useSelector((state) => state.control.aoi);
    const [data, setData] = useState(null);
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



  return (
    <>
    <Box sx={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', display: 'flex', height: "100%"}}>
        {data && (
            <LineChart
            xAxis={[{ data: data['Date'].map(obj => new Date(obj)), scaleType: "time", }]}
            series={[
              {
                data: data['Values'],
              },
            ]}
            height={200}
            width={400}
            margin={{ left: 35, right: 10, top: 10, bottom: 20 }}
            grid={{ vertical: true, horizontal: true }}
          />
        )}

        {!data  && AOI && (<CircularProgress color="inherit" />)}
    </Box>
    </>
  )
}
