import React, { useState } from 'react';
import { useEffect } from 'react';
import { Stack, IconButton, Tooltip } from '@mui/material';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useLeafletContext } from '@react-leaflet/core';
import { useDispatch } from 'react-redux';
import { setaoi } from '@/app/_store/features/controlSlice';
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
    repeatMode: false // Enable repeat mode
};


export default function Controls() {
    const context = useLeafletContext();
    const dispatch = useDispatch();
    const [active, setActive] = useState(null);
    const [activeDraw, setActiveDraw] = useState(null)
    const { map } = context;


    const CoordToGeoJSON = ({ coord }) => {
        const geojsonData = {
            type: 'FeatureCollection',
            id: String(Date.now()),
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [
                            coord
                        ]
                    },
                    properties: {
                        name: 'aoi'
                    }
                },
                // Add more features as needed
            ]
        };
        return geojsonData
    }

    const handleClick = ({ drawType, index }) => {
        if (activeDraw) {
            activeDraw.disable();
        };

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
            default:
                drawControl = new L.Draw.Marker(map);
        };

        setActiveDraw(drawControl);

        if (index === active) {
            drawControl.disable();
            return setActive(null);
        }

        drawControl.enable();
        return setActive(index);
    };



    const handleDeleteFeature = (idx) => {
        setActive(idx);
        dispatch(setaoi({ aoi: null }));
        setActive(null);
    }


    useEffect(() => {
        map.on(L.Draw.Event.CREATED, (e) => {
            const layer = e.layer;
            const latlngs = layer._latlngs[0]; // Get the array of LatLngs representing the polygon
            const coordinates = latlngs.map(latlng => [latlng.lng, latlng.lat]);
            const geojson = CoordToGeoJSON({ coord: coordinates });
            dispatch(setaoi({ aoi: geojson }))
            setActive(null);
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
    }, [context]);


    const CreatePolygon = ({ idx }) => {
        return (
            <IconButton size='medium' disableRipple onClick={() => handleClick({ drawType: 'polygon', index: idx })} >
                <PentagonOutlinedIcon color='primary' />
            </IconButton>

        );
    }

    const CreateRectangle = ({ idx }) => {
        return (
            <IconButton size='medium' disableRipple onClick={() => handleClick({ drawType: 'rectangle', index: idx })} >
                <CropSquareOutlinedIcon color='primary' />
            </IconButton>

        );
    }

    const Analize = ({ idx }) => {
        return (
            <IconButton size='medium' disableRipple >
                <InsertChartOutlinedIcon color='primary' />
            </IconButton>


        );
    }


    const Measure = ({ idx }) => {
        return (
            <IconButton size='medium' disableRipple >
                <SquareFootOutlinedIcon color='primary' />
            </IconButton>

        )
    }

    const Delete = ({ idx }) => {
        return (
            <IconButton size='medium' disableRipple onClick={() => handleDeleteFeature(idx)} >
                <DeleteOutlineOutlinedIcon color='primary' />
            </IconButton>

        )
    }


    const ControlList = [
        {
            title: "Create Polygon",
            component: <CreatePolygon idx={0} />
        },
        {
            title: "Create Rectangle",
            component: <CreateRectangle idx={1} />
        },
        {
            title: "Delete feature",
            component: <Delete idx={2} />
        },
        {
            title: "Spectral Analysis",
            component: <Analize idx={3} />
        },
        {
            title: "Measure",
            component: <Measure idx={4} />
        },

    ]


    return (
        <div className={styles.ControlContainer}>
            <Stack spacing={1} >
                {ControlList.map((obj, idx) => (
                    <Tooltip title={obj.title} placement='left-start' key={idx}>
                        <div className={active !== idx ? styles.ControlButtonContainer : styles.ControlButtonContainerActive} >
                            {obj.component}
                        </div>
                    </Tooltip>
                ))}
            </Stack>
        </div>
    )
}
