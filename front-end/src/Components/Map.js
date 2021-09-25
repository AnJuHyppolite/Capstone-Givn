import React, { useRef, useContext, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import { UserContext } from "../Providers/UserProvider";
import '../Styles/Map.css'

mapboxgl.accessToken =
  process.env.REACT_APP_MAPBOX_TOKEN;

const Map = props => {
  const mapContainerRef = useRef(null);
  const user = useContext(UserContext);

  const [lng, setLng] = useState(-73.4);
  const [lat, setLat] = useState(41.8);
  const [zoom, setZoom] = useState(4.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [(user.longitude || lng), (user.latitude || lat)],
      zoom: (user.longitude ? 17 : zoom)
    });
    // const geocoder = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   mapboxgl: mapboxgl
    //   });
    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: {
        color: 'orange'
      },
      placeholder: user.address || "Address where item is: ",
      mapboxgl: mapboxgl
    });
    geocoder.on('result', (result) => {
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

      // if(geocoder && geocoder.lastSelected){
      //   let locationString = geocoder.lastSelected;
      //   let locationObject = JSON.parse(locationString.replace(/'/g, "\""));
      //   props.updateLocation(locationObject['place_name'])
      // }
    });

    // Clean up on unmount
    return () => {
      map.remove();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>
      {/* <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div> */}

      <div className='map-container' ref={mapContainerRef} />
      <div id='geocoder-container'></div>
    </div>
  );
};

export default Map;
