import React from 'react';
import { BASEMAPS } from '../conts';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setbasemap, setbasemapurl } from '@/app/_store/features/controlSlice';


export default function BasemapTab() {
  const selectedBasemap = useSelector((state) => state.control.selectedBasemap);
  const dispatch =  useDispatch();
  //const [active, setActive] = React.useState(selectedBasemap);

  function handleClick (title) {
    if (title === selectedBasemap) {
      return dispatch(setbasemap({basemap: ''}))
    }
    dispatch(setbasemap({basemap: title}))
    dispatch(setbasemapurl({basemapUrl: null}))
  };



  return (
    <React.Fragment>
      {BASEMAPS.map((obj, idx) => (
        <Accordion key={idx} expanded={obj.title === selectedBasemap} onChange={() => handleClick(obj.title)}>
          <AccordionSummary>
            {obj.title}
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{marginBottom: '5px'}}>
              {obj?.desc}
            </Typography>
            <br />
            <Divider />
            <Box sx={{marginTop: '5px'}}>
              {obj?.component}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </React.Fragment>
  )
}
