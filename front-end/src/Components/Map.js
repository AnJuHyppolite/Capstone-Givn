import React, { useRef, useContext, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import { UserContext } from "../Providers/UserProvider";
import '../Styles/Map.css'

mapboxgl.accessToken =
  process.env.REACT_APP_MAPBOX_TOKEN;

const Map = props => {
  const mapContainerRef = useRef(null);
  const {user} = useContext(UserContext);

  const [lng, setLng] = useState(-73.4);
  const [lat, setLat] = useState(41.8);
  const [zoom, setZoom] = useState(4.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [(user?.longitude ? user.longitude: lng), (user?.latitude ? user.latitude : lat)],
      zoom: (user?.longitude ? 17 : zoom)
    });
    
    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: {
        color: 'orange'
      },
      placeholder: user?.address ? (user.address==="EARTH" ? "Address where item is: " : user.address) : "Address where item is: ",
      mapboxgl: mapboxgl
    });
    geocoder.on('result', (result) => {
      console.log(result.result.place_name)
      console.log(result.result.geometry.coordinates[0])
      console.log(result.result.geometry.coordinates[1])
      debugger
      props.updateLocation({address: result.result.place_name, lng: result.result.geometry.coordinates[0], lat: result.result.geometry.coordinates[1]})
    })
    map.addControl(geocoder);
    //geocoder.addTo('#geocoder-container')

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));

    });

    return () => { map.remove(); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
      <div id='geocoder-container'></div>
    </div>
  );
};

export default Map;
