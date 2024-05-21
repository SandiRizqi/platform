import React from 'react';
import { BASEMAPS } from '../conts';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Divider, IconButton} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setbasemap, setbasemapurl } from '@/app/_store/features/controlSlice';
import { RemoveRedEye, TuneRounded, RestartAltRounded } from '@mui/icons-material';



const BasemapStyler = () => {
  return (
    <>
      <Box style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        alignItems: 'center',
        padding: '3px',
        height: '20px'
      }}
      sx={{bgcolor: 'secondary.light'}}
      >

        <IconButton disableRipple size='small'>
          <RemoveRedEye fontSize='small'/>
        </IconButton>
        <IconButton disableRipple size='small'>
          <TuneRounded fontSize='small'/>
        </IconButton>
        <IconButton disableRipple size='small'>
          <RestartAltRounded fontSize='small'/>
        </IconButton>

      </Box>
    </>
  )
}


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
            <Typography>
            {obj.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{maxHeight: '10vh', overflowY: 'auto'}}>
              {obj?.desc}
            </Typography>
            <br />
            <Divider />
            <BasemapStyler />
            <Box sx={{maxHeight: '25vh', overflowY: 'auto'}}>
              {obj?.component}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </React.Fragment>
  )
}
