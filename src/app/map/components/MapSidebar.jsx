'use client'
import React from 'react';
import { Fragment } from 'react';
import styles from '../style.module.css';
import { Box, AppBar } from '@mui/material';
import TabSidebar from './TabSidebar';
import { Fab, IconButton } from '@mui/material';
import { ChevronRightOutlined, ChevronLeftOutlined } from '@mui/icons-material';

export default function MapSidebar() {
    const [toggle, setToggle] = React.useState(true);

    function ToogleButton() {
        return (
            <Fab size="medium" edge="start" color="inherit" arial-label="tooglepanel" disableFocusRipple sx={{ boxShadow: 5 }} onClick={() => setToggle(!toggle)}>
                <ChevronRightOutlined size='medium' />
            </Fab>
        )
    };


    function CloseButton() {
        return (
            <IconButton disableRipple size='medium' onClick={() => setToggle(!toggle)}>
                <ChevronLeftOutlined color='primary' size='medium' />
            </IconButton>
        )
    };

    function TabButton() {
        return (
            <AppBar position='static' color='secondary' sx={{ flexGrow: 1, borderRadius: '5px 5px 0 0', boxShadow: 3 }}>
                <TabSidebar CloseButton={<CloseButton />} />
            </AppBar>
        )
    }


    return (
        <Fragment>
                <Box className={styles.SidebarContainer} sx={{ flexGrow: 1, bgcolor: 'inherit', borderRadius: '5px' }}>
                    {toggle ? (<TabButton />) : <ToogleButton />}
                </Box>
        </Fragment>
    )
}
