import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

import LocationMarker from './LocationMarker';
import { Container } from  '../../styled/Container'

const Map: FC = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getFlights = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/allFlights`);
        setFlights(data);
        setLoading(false);
      } catch (error) {
        console.log(`error ${JSON.stringify(error)}`);
        setError('Oops! an error occured getting flights');
        setLoading(false);
      }
    };

    getFlights();
  }, []);

  return (
    <Container>
      {loading && <h3>Loading Map...</h3>}
      {error && <h3>{error}</h3>}
      {flights.length > 0 && (
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
      )}
    </Container>
  );
};

export default Map;
