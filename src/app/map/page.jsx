'use client'
import React from 'react';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/_store/store';
import { useTheme, useMediaQuery } from '@mui/material';
import MapSidebar from './components/MapSidebar';
import Controls from './components/controls/Controls';
import styles from './style.module.css';
import dynamic from 'next/dynamic';










export default function Maps() {
    const MyMap = dynamic(() => import('./MapCanvas'),{ssr: false,});
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));


    



    return (
        <Provider store={store}>
            <Fragment >
                <div className={styles.mapcontainer}>
                    <div className={styles.mapcanvas}>
                        <MyMap
                            sidebar={<MapSidebar />}
                            control={<Controls />}
                        >
                        </MyMap>
                    </div>
                </div>
            </Fragment>
        </Provider>
    )
}
