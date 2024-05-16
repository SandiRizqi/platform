'use client';
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Map } from 'react-map-gl';
import GciTimeline from '@/components/GciTimeline';
import useWindowSize from '@/hooks/useWindowSize';
import axios from 'axios';
import styles from './style.module.css';


const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2VvLWNpcmNsZSIsImEiOiJjbDI2MmU2YW4wMTU4M2JubTV6dW1tZTUxIn0.9ixHJIi6DnNloTYC8aQmKw';
const CONFIG_DEFAULT = {
    lat: -0,
    lng: 117,
    zoom: 5,
    bearing: 0,
    pitch: 54,
    exaggeration: 1.5//,
    //exaggeration: ['^', ['get', 'z'], 0.9]
};
const EXTERNAL_ELEMENTS_HEIGHT = 50;



export default function Maps({ configOptions }) {
    const CONFIG = { ...CONFIG_DEFAULT, ...configOptions };
    const mapRef = useRef();
    const windowSize = useWindowSize();
    const [planet, setPlanet] = useState([])
    const [selectedPlanet, setSelectedPlanet] = useState(null);



    function setPlanetLayer(index) {
        setSelectedPlanet(planet[index]);
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




    return (
        <Fragment >
            <div className={styles.mapcontainer}>
                <Map
                    ref={mapRef}
                    initialViewState={{
                        longitude: CONFIG.lng,
                        latitude: CONFIG.lat,
                        zoom: CONFIG.zoom,

                    }}
                    maxPitch={85}
                    style={{
                        width: '100%',
                        height: windowSize.height,
                        zIndex: 1
                    }}
                    mapboxAccessToken={MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/geo-circle/ckyo6x70o435l14mp1eels4bl"
                    terrain={{ source: 'mapbox-dem', exaggeration: CONFIG.exaggeration }}
                    fog={{
                        'color': 'rgba(186, 210, 235,0.3)', // Lower atmosphere
                        'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
                        'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
                        'space-color': 'rgb(11, 11, 25)', // Background color
                        'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
                    }}

                >

                    <div className={styles.timeline}>
                        <GciTimeline marks={planet} setSelected={setPlanetLayer}/>
                    </div>
                </Map>
            </div>
        </Fragment>
    )
}
