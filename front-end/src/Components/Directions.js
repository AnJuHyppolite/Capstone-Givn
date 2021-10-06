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
            zoom: 6
        });
        // set the bounds of the map
        // const bounds = [
        //     [-74.3, 40.58],
        //     [-73.59, 40.8]
        // ];
        const bounds = [[Math.min(start[0],end[0])-.3,Math.min(start[1],end[1])-.3],[Math.max(start[0],end[0])+.3,Math.max(start[1],end[1])+.3]]
        map.setMaxBounds(bounds);

        // an arbitrary start will always be the same
        // only the end or destination will change
        //const start = [-73.878786,40.74402];

        // create a function to make a directions request
        async function getRoute(end) {/////getROUTE*************
            // make a directions request using cycling profile
            // an arbitrary start will always be the same
            // only the end or destination will change
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
            console.log(data)
            // add turn instructions here at the end

            const instructions = document.getElementById('instructions');
            const steps = data.legs[0].steps;
            
            let tripInstructions = '';
            for (const step of steps) {
              tripInstructions += `<li className="direction-step">${step.maneuver.instruction}</li>`;
            }
            instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
              data.duration / 60
            )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;


        }////////*********** getROUTE*********/

        map.on('load', () => {
            // make an initial directions request that
            // starts and ends at the same location
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
        // let directions = new MapboxDirections({
        // //    accessToken: mapboxgl.accessToken
        // });

        // map.addControl(directions, 'top-left');

        // map.on('load', function () {
        //     // directions.setOrigin([12, 23]); // can be address in form setOrigin("12, Elm Street, NY")
        //     // directions.setDestinaion([11, 22]); // can be address
        // })

        // map.on('click', ({ lngLat }) => {
        //     const coords = Object.keys(lngLat).map((key) => lngLat[key]);
        //     const end = {
        //         type: 'FeatureCollection',
        //         features: [
        //             {
        //                 type: 'Feature',
        //                 properties: {},
        //                 geometry: {
        //                     type: 'Point',
        //                     coordinates: coords
        //                 }
        //             }
        //         ]
        //     };
        //     if (map.getLayer('end')) {
        //         map.getSource('end').setData(end);
        //     } else {
        //         map.addLayer({id: 'end',  type: 'circle', 
        //         source: {type: 'geojson',
        //                 data: {type: 'FeatureCollection',
        //                     features: [
        //                         {type: 'Feature',properties: {},
        //                             geometry: {type: 'Point',   coordinates: coords    }
        //                         }
        //                     ]
        //                 }
        //             },
        //             paint: {
        //                 'circle-radius': 5,
        //                 'circle-color': '#f30'
        //             }
        //         });
        //     }
        //     console.log(coords)
        //     debugger
        //     getRoute(coords);
        // });

        

        return () => { map.remove(); }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h2>MAP</h2>
            <div className='map-container' ref={mapContainerRef} />
            <div id="instructions">INSTRUCTIONS</div>
        </div>
    );
};

export default Directions;