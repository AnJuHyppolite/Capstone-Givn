import React, { useRef, useEffect} from 'react';
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'; 
import '../Styles/Map.css'
mapboxgl.workerClass = MapboxWorker; 
mapboxgl.accessToken =
  process.env.REACT_APP_MAPBOX_TOKEN;

const Map2 = props => {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [props.editItem.longitude, props.editItem.latitude],
      zoom: 16
    });
    
    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: {
        color: 'orange'
      },
      placeholder: props.editItem.address,
      mapboxgl: mapboxgl
    });
    geocoder.on('result', (result) => {
      props.updateLocation({address: result.result.place_name, lng: Number(result.result.geometry.coordinates[0]), lat: Number(result.result.geometry.coordinates[1])})
    })
    map.addControl(geocoder);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => { map.remove(); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
      <div id='geocoder-container'></div>
    </div>
  );
};

export default Map2;
