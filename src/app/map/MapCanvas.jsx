'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import GciTimeline from '@/components/GciTimeline';
import { useTheme, useMediaQuery } from '@mui/material';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setbasemapurl } from '../_store/features/controlSlice';
import Controls from './components/controls/Controls';
import axios from 'axios';
import L from 'leaflet';
import styles from './style.module.css';



const initMap = {
    long: 117,
    lat: 0,
    zoom: 5
};

const geoJSONStyle = {
    fillColor: 'yellow',
    color: 'blue',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.3
};



function Timeline({ planet, setPlanetLayer, matches }) {
    return (
        planet.length > 0 && (<div className={styles.timeline}>
            <GciTimeline marks={planet} setSelected={setPlanetLayer} step={matches ? 1 : 3} />
        </div>)
    )
};




export default function MapCanvas({ children, Sidebar }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const basemap = useSelector((state) => state.control.selectedBasemap)
    const basemapUrl = useSelector((state) => state.control.basemapUrl);
    const basemapParams = useSelector((state) => state.control.basemapParams);
    const AOI = useSelector((state) => state.control.aoi)
    const dispatch = useDispatch();
    const [planet, setPlanet] = useState([]);






    function setPlanetLayer(index) {
        const selected = planet[index];
        dispatch(setbasemapurl({ basemapUrl: selected._links.tiles }))
    }


    const getMosaic = async (url) => {
        axios
            .get(url)
            .then((res) => {
                const data = res.data.mosaics.filter((item) => item.datatype === "uint16");
                setPlanet((prevData) => [...prevData, ...data]);
                // Check if there's a next page of data to fetch
                if (res.data._links && res.data._links._next) {
                    getMosaic(res.data._links._next); // Recursively fetch next page
                };
            })
            .catch(() => console.log("Something error with server"));

    };


    useEffect(() => {
        getMosaic(`https://api.planet.com/basemaps/v1/mosaics?api_key=${process.env.NEXT_PUBLIC_PLANET_API_KEY}`);
    }, []);


    const AOILayer = useMemo(() => {
        if (AOI) {
            return (
                <GeoJSON attribution="&copy; Geocircle Indonesia" data={AOI} style={geoJSONStyle} key={AOI.id} />
            )
        };
        return null;

    }, [AOI])



    return (
        <Fragment>
            {Sidebar}

            {basemap === 'Planet NICFI' && (<Timeline planet={planet} setPlanetLayer={setPlanetLayer} matches={matches} />)}

            <MapContainer style={{
                width: '100%',
                height: '100vh',
            }}
                center={[initMap.lat, initMap.long]}
                doubleClickZoom={false}
                zoom={initMap.zoom}
                zoomControl={false}

            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {basemapUrl && (<TileLayer
                    attribution='basemap'
                    url={basemapParams ? `${basemapUrl}${basemapParams}` : basemapUrl}
                    tileSize={256}
                />)}

                {AOILayer}
                {children}


                <Controls />
            </MapContainer>

        </Fragment>
    )
}
