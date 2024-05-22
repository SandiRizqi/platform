'use client'
import React from 'react'
import { Tab, Tabs, Box } from '@mui/material';
import BasemapTab from './tabs/BasemapTab';
import LayersTab from './tabs/LayersTab';
import AlertTab from './tabs/AlertTab';
import AnalisisTab from './tabs/AnalisisTab';




const TABS_LIST = [
    {
        title: 'BASEMAP',
        component: <BasemapTab/>,
    },
    {
        title: 'LAYERS',
        component: <LayersTab />,
    },
    {
        title: 'ANALYSIS',
        component: <AnalisisTab />,
    },

]



export default function TabSidebar({ CloseButton }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    

    return (
        <React.Fragment>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '350px' }} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 0,
                    }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="tabs"

                >

                    {TABS_LIST.map((obj, idx) => (
                        <Tab label={obj.title} key={idx} />
                    ))}
                    
                    
                </Tabs>
                {CloseButton}
            </Box>
            <Box sx={{minHeight: '10vh', borderRadius: '0 0 5px 5px', color: 'grey', bgcolor: 'primary.main', maxWidth: '375px'}}>
                {TABS_LIST.map((obj, idx) => {
                    if (idx === value){
                        return <div key={idx}>{obj.component}</div>
                    } else {
                        return <div key={idx}></div>
                    }
                })}
            </Box>
        </React.Fragment>
    )
}
