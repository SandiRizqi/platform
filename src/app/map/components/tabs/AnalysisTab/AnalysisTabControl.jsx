import React from 'react';
import { Grid,Stack, IconButton} from '@mui/material';
import { ANALYSIS_TABS } from '../../conts';
import SpectralAnalysis from './handler/SpectralAnalysis';

export default function AnalysisTabControl() {
  return (
      <>
          <Grid container >
              <Grid item xs={2} sx={{borderRight: '1px solid grey'}}>
                  <Stack
                  sx={{justifyContent : 'center', alignItems: 'center', display: 'flex'}}
                  >
                    {ANALYSIS_TABS.map((obj, idx) => (
                        <IconButton key={idx} >
                            {obj.icon} 
                        </IconButton>
                    ))}
                  </Stack>
              </Grid>
              <Grid item xs={10} sx={{padding: '5px'}}>
                  <SpectralAnalysis />
              </Grid>
          </Grid>

      </>
  )
}
