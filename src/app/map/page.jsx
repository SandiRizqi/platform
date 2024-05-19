'use client';
import React from 'react';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { store } from '@/app/_store/store';
import MapCanvas from './MapCanvas';
import { useTheme, useMediaQuery } from '@mui/material';
import MapSidebar from './components/MapSidebar';
import styles from './style.module.css';








export default function Maps() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    







    return (
        <Provider store={store}>
            <Fragment >
                <div className={styles.mapcontainer}>
                    <div className={styles.mapcanvas}>
                        <MapCanvas
                            controlpanel={matches && (<MapSidebar />)}
                        >
                        </MapCanvas>
                    </div>
                </div>
            </Fragment>
        </Provider>
    )
}
