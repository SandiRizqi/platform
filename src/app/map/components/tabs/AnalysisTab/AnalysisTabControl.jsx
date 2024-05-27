import React from 'react';
import { useState } from 'react';
import { Grid,Stack, IconButton} from '@mui/material';
import { ANALYSIS_TABS } from '../../conts';
import SpectralAnalysis from './handler/SpectralAnalysis';
import styles from '../../../style.module.css';


export default function AnalysisTabControl() {
    const [active, setActive] = useState(0);


  return (
      <>
          <Grid container sx={{minHeight: '20vh'}} >
              <Grid item xs={2} sx={{ borderRight: '1px solid grey' }}>
                  <Stack
                      sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                  >
                      {ANALYSIS_TABS.map((obj, idx) => (
                          <div key={idx} className={idx === active ? styles.AnalisisTabActive : styles.AnalisisTab}>
                              <IconButton onClick={() => setActive(idx)} >
                                  {obj.icon}
                              </IconButton>
                          </div>
                      ))}
                  </Stack>
              </Grid>
              <Grid item xs={10} sx={{ padding: '5px' }}>
                  <SpectralAnalysis />
              </Grid>
          </Grid>

      </>
  )
}
