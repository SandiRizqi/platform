import React from 'react';
import { Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function Sentinel2handler() {


    function handleOpen() {
        var nodes = document.querySelectorAll('div');
        for (var i = 0; i < nodes.length; i++) {
            if (/\b(Handtekening|MUI X Missing license key)\b/i.test(nodes[i].textContent)) {
                nodes[i].style.display = 'none';
            }
        }


    }
    


    return (
        <div style={{marginTop: '5px'}}>
            <br />
            <Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker localeText={{
                        start: '',
                        end: '',
                    }}
                    format="YYYY/M/D"
                    label="Date Range"
                    onOpen={handleOpen}

                    />

                </LocalizationProvider>
            </Stack>
        </div>
    )
}
