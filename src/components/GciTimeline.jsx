import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Slider } from '@mui/material';
import { CalendarMonthOutlined } from '@mui/icons-material';


export default function GciTimeline({ marks, setSelected, step }) {
    const [value, setValue] = useState(marks.length);
    
    

    function handleChange(e) {
        const value = e.target.value;
        setValue(value);
        setSelected(value);
    };

    useEffect(() => {
        if (marks) {
            setValue(marks.length)
        }

    }, [marks, step])


    return (
        <>
            <Box sx={{
                width: '90%',
                bgcolor: 'secondary.light',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 1,
                fontSize: '4px',
                zIndex: 999
            }}
                m={1}
                px={2}
                py={0.5}
            >
                <CalendarMonthOutlined size={'5px'} color='primary'/>
                <Slider
                    track={false}
                    aria-labelledby='timeline'
                    marks
                    valueLabelDisplay='off'
                    min={0}
                    max={marks.length}
                    value={value}
                    step={step}
                    onChange={handleChange}
                    size='small'
                    color='primary'
                    sx={{
                        
                    }}

                />
            </Box>
        </>
    )
}
