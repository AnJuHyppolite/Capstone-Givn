import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl'
import '../Styles/Map.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Directions = ({start, end}) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [start[0],start[1]],
            zoom: 10
        });

        async function getRoute(end) {/////getROUTE*************
            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                { method: 'GET' }
            );
            const json = await query.json();
            const data = json.routes[0];
            const route = data.geometry.coordinates;
            const geojson = { type: 'Feature', properties: {},   geometry: {   type: 'LineString', coordinates: route    }
            };
            // if the route already exists on the map, we'll reset it using setData
            if (map.getSource('route')) {
                map.getSource('route').setData(geojson);
            }
            // otherwise, we'll make a new request
            else {
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: geojson
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                        'line-opacity': 0.75
                    }
                });
            }

            const instructions = document.getElementById('map-instructions');
            const steps = data.legs[0].steps;
            
            let tripInstructions = '';
            for (const step of steps) {
              tripInstructions += `<li className="direction-step">${step.maneuver.instruction}</li>`;
            }
            instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
              data.duration / 60
            )} min 🚗 </strong></p><ol>${tripInstructions}</ol>`;


        }////////*********** getROUTE*********/

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('load', () => {
            getRoute(start);
            // Add starting point to the map
            map.addLayer({
                id: 'point',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: start
                                }
                            }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 5,
                    'circle-color': '#3887be'
                }
            });
            getRoute(end)
            map.addLayer({id: 'end',  type: 'circle', 
            source: {type: 'geojson',
                    data: {type: 'FeatureCollection',
                        features: [
                            {type: 'Feature',properties: {},
                                geometry: {type: 'Point',   coordinates: end   }
                            }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 5,
                    'circle-color': '#f30'
                }
            });
            
        });

        return () => { map.remove(); }
    }, []); 

    return (
        <div>
            <div className='directions-map map-container' ref={mapContainerRef} />
            <div id="map-instructions">INSTRUCTIONS</div>
        </div>
    );
};

export default Directions;