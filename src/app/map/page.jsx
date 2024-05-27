'use client'
import React from 'react';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/_store/store';
import { useTheme, useMediaQuery, Modal, Typography, Box } from '@mui/material';
import MapSidebar from './components/MapSidebar';
import styles from './style.module.css';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { setmodal } from '../_store/features/controlSlice';





const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    border: '2px solid #FFF',
    bgcolor: 'primary.main',
    boxShadow: 24,
    outline: 'none',
    borderRadius: '5px',
    p: 2,
  };




export default function Maps() {
    const MyMap = dynamic(() => import('./MapCanvas'),{ssr: false,});
    const theme = useTheme();
    
    const matches = useMediaQuery(theme.breakpoints.up('md'));


    const DetailsModal = () => {
        const modal = useSelector((state) => state.control.modal);
        const dispatch = useDispatch();

        function handleClose () {
            dispatch(setmodal({modal: {isOpen: false, title: null, component: null}}))
        }


        return (
            <Modal
                keepMounted
                open={modal.isOpen}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h6" mb={1}>
                        {modal.title}
                    </Typography>
                    {modal.component}
                </Box>
            </Modal>
        )
    };


    



    return (
        <Provider store={store}>
            <Fragment >
                <div className={styles.mapcontainer}>
                    <div className={styles.mapcanvas}>
                        <MyMap
                            Sidebar={<MapSidebar />}
                        >
                            {<DetailsModal />}
                        </MyMap>
                        
                    </div>
                </div>
                
            </Fragment>
        </Provider>
    )
}
