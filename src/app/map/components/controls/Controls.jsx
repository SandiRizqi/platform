import React from 'react';
import { useEffect } from 'react';
import { Stack,  IconButton} from '@mui/material';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import { useLeafletContext } from '@react-leaflet/core';
import L from 'leaflet';
import styles from '../../style.module.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

import markerdefault from '../../../../../public/red-marker.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerdefault.src,
  iconUrl: markerdefault.src,
  shadowUrl: null,
});


const shapeOptions = {
    color: '#3388ff',
    weight: 2,
    opacity: 0.6,
    fillOpacity: 0.4,
  };

  const drawOptions = {
    shapeOptions: shapeOptions,
    showArea: true, // Show area in the tooltip
    repeatMode: true // Enable repeat mode
  };


export default function Controls() {
    const context = useLeafletContext();
    const { map } = context;

    const handleClick = ({drawType}) => {
       
        let drawControl;
    
        switch (drawType) {
          case 'marker':
            drawControl = new L.Draw.Marker(map);
            break;
          case 'circle':
            drawControl = new L.Draw.Circle(map);
            break;
          case 'polygon':
            drawControl = new L.Draw.Polygon(map, drawOptions);
            break;
          case 'rectangle':
            drawControl = new L.Draw.Rectangle(map);
            break;
          case 'polyline':
            drawControl = new L.Draw.Polyline(map);
            break;
          default:
            drawControl = new L.Draw.Marker(map);
        }
    
        drawControl.enable();
    };


    useEffect(() => {
        map.on(L.Draw.Event.CREATED, (e) => {
            const layer = e.layer;
            map.addLayer(layer);
          });
      
        map.on(L.Draw.Event.EDITED, (e) => {
            console.log(e)
            
          });
      
          map.on(L.Draw.Event.DELETED, (e) => {
            console.log(e)
            
          });
      
          return () => {
            map.off(L.Draw.Event.CREATED);
            map.off(L.Draw.Event.EDITED);
            map.off(L.Draw.Event.DELETED);
          };
    }, [context])


  return (
    <div className={styles.ControlContainer}>
        <Stack spacing={1} >
              <div className={styles.ControlButtonContainer} >
                  <IconButton size='medium' disableRipple onClick={() => handleClick({drawType: 'polygon'})} >
                      <PentagonOutlinedIcon color='primary' />
                  </IconButton>
              </div>
              <div className={styles.ControlButtonContainer} >
                  <IconButton size='medium' disableRipple onClick={() => handleClick({drawType: 'marker'})} >
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
