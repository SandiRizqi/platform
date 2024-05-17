import React from 'react'
import { Tab, Tabs, Box, Typography } from '@mui/material';
import BasemapTab from './tabs/BasemapTab';
import LayersTab from './tabs/LayersTab';
import AlertTab from './tabs/AlertTab';


const TABS = [
    <BasemapTab key={0}/>,
    <LayersTab key={1}/>,
    <AlertTab key={2}/>
]


function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
        key:{index}
    };
}

export default function TabSidebar({ CloseButton }) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    return (
        <React.Fragment>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '350px' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="BASEMAP" {...a11yProps(0)} />
                    <Tab label="LAYERS" {...a11yProps(1)} />
                    <Tab label="ALERT" {...a11yProps(2)} />
                    {CloseButton}
                </Tabs>
            </Box>
            <Box sx={{minHeight: '10vh', borderRadius: '0 0 5px 5px', color: 'grey', padding: '5px', bgcolor: 'primary.main', maxWidth: '350px'}}>
                {TABS[value]}
            </Box>
        </React.Fragment>
    )
}
