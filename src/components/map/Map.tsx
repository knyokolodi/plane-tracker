import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

import LocationMarker from './LocationMarker';

const Map: FC = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getFlights();
  }, []);

  const getFlights = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/allFlights`);
      setFlights(data);
      setLoading(false);
    } catch (error) {
      console.log(`error ${JSON.stringify(error)}`);
      setError('Oops! an error occured getting flights')
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <h5>Loading...</h5>}
      {flights.length > 0 && (
        <div className='map'>
          <GoogleMapReact
            bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAP_KEY}` }}
            defaultCenter={{ lat: flights[0][3], lng: flights[0][4] }}
            defaultZoom={7}
          >
            {flights.length > 0 &&
              flights.map((flight) => {
                return (
                  <LocationMarker key={flight[0]} lat={flight[3]} lng={flight[4]} flight={flight} />
                );
              })}
          </GoogleMapReact>
        </div>
      )}
    </>
  );
};

export default Map;
