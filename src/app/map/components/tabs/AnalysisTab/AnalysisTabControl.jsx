import React from 'react';
import { Grid, Tabs, Tab } from '@mui/material';
import { ANALYSIS_TABS } from '../../conts';
import SpectralAnalysis from './handler/SpectralAnalysis';

export default function AnalysisTabControl() {
  return (
      <>
          <Grid container >
              <Grid item xs={3} >
                  <Tabs 
                  orientation="vertical"
                  value={0}
                  variant="scrollable"
                  textColor="inherit"
                  aria-label="analysis_tabs"
                  sx={{ borderRight: 1, borderColor: 'divider', paddingRight: '5px' }}
                  >
                    {ANALYSIS_TABS.map((obj, idx) => (
                        <Tab key={idx} icon={obj.icon} />
                    ))}
                  </Tabs>
              </Grid>
              <Grid item xs={9} sx={{padding: '5px'}}>
                  <SpectralAnalysis />
              </Grid>
          </Grid>

      </>
  )
}
