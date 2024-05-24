import React from 'react';
import { Stack,  IconButton} from '@mui/material';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import styles from '../../style.module.css';


export default function Controls() {
  return (
    <div className={styles.ControlContainer}>
        <Stack spacing={1} >
              <div className={styles.ControlButtonContainer} >
                  <IconButton size='medium' disableRipple  >
                      <PentagonOutlinedIcon color='primary' />
                  </IconButton>
              </div>
              <div className={styles.ControlButtonContainer}>
                  <IconButton size='medium' disableRipple >
                      <PlaceOutlinedIcon color='primary' />
                  </IconButton>
              </div>
              <div className={styles.ControlButtonContainer}>
                  <IconButton size='medium' disableRipple >
                      <InsertChartOutlinedIcon color='primary' />
                  </IconButton>
              </div>
              <div className={styles.ControlButtonContainer}>
                  <IconButton size='medium' disableRipple >
                      <SquareFootOutlinedIcon color='primary' />
                  </IconButton>
              </div>
        </Stack>
    </div>
  )
}
