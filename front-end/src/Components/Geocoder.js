import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import '../Styles/Geocoder.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Geocoder = props => {
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    });

    useEffect(() => {
        geocoder.addTo('#geocoder');

        geocoder.on('result', (result) => {
            props.updateLocation({ address: result.result.place_name, lng: result.result.geometry.coordinates[0], lat: result.result.geometry.coordinates[1] })
        });

        geocoder.on('clear', () => {
            //props.updateLocation({ address: '', lng: 0, lat: 0 })
        });

    }, [])

    return (
        <div>
            <div id="geocoder"></div>
        </div>
    );
};

export default Geocoder;
