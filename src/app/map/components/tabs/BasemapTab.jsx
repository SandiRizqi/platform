import React from 'react';
import { BASEMAPS } from '../conts';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

export default function BasemapTab() {
  const [active, setActive] = React.useState('')

  function handleClick (title) {
    if (title === active) {
      return setActive('');
    }
    setActive(title);
  }
  return (
    <React.Fragment>
      {BASEMAPS.map((obj, idx) => (
        <Accordion key={idx} expanded={obj.title === active} onChange={() => handleClick(obj.title)}>
          <AccordionSummary>
            <p style={{fontSize: '14px'}}><strong>{obj.title}</strong></p>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {obj?.desc}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </React.Fragment>
  )
}
