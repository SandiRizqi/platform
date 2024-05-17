import React from 'react';
import { BASEMAPS } from '../conts';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';

export default function BasemapTab() {
  const [active, setActive] = React.useState('')
  return (
    <React.Fragment>
      {BASEMAPS.map((obj, idx) => (
        <Accordion key={idx} expanded={obj.title === active} onChange={() => setActive(obj.title)}>
          <AccordionSummary>
            {obj.title}
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sudfdfspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </React.Fragment>
  )
}
