import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { RouteComponentProps, useHistory } from 'react-router';

import { JetPhotos } from '../../api-interfaces'
import { Button } from '../../styled/Button';
import { PlaneDetails, PlaneDetailsImage } from '../../styled/PlaneDetails';
import { Container } from '../../styled/Container';

interface IAirPlaneDetails extends RouteComponentProps<any> {
  flight: [];
}

const AirPlaneDetails: FC = () => {
  const history = useHistory<IAirPlaneDetails>();
  const [jetPhoto, setJetPhoto] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const {
    location: {
      state: { flight },
    },
  } = history;

  useEffect(() => {

    const getAirPlanePhotos = async () => {
        try {
          const { data: jetPhotos } = await axios.get<JetPhotos[]>(`${process.env.REACT_APP_API_URL}/jetPhotos`);
          //@ts-ignore
          const airPlanePhoto = jetPhotos.filter((plane: JetPhotos) => plane.airplane_icao === flight[0]);
          if(airPlanePhoto.length <= 0) {
            //@ts-ignore
            const { data: airplaneImages } = await axios.get(`${process.env.REACT_APP_API_URL}/airplaneImages/${flight[0]}`);

            if(airplaneImages.length > 0) {
              const data = {
                username: 'Kagiso Nyokolodi',
                //@ts-ignore
                airplane_icao: flight[0],
                airplane_image: airplaneImages[0][0],
              };

              await axios.post(`${process.env.REACT_APP_API_URL}/jetPhotos`, data);
            }

            setJetPhoto(airplaneImages[0][0]);
          } else {
            setJetPhoto(airPlanePhoto[0].airplane_image);
          }
          setLoading(false);

        } catch (err) {
          console.log(`Error ${JSON.stringify(err)}`);
          setError('Oop! an error has occured.')
          setLoading(false);
        }
      };

    getAirPlanePhotos();
  }, [flight]);

  return (
    <Container>
      <PlaneDetails>
        {error && <h3>{error}</h3>}
        {loading ? (
          <h3>Loading Airplane Details</h3>
        ) : (
          <>
            <h3>Airplane Details</h3>
            {jetPhoto && (
              <>
                <PlaneDetailsImage src={jetPhoto} alt='Airplane details' /> <br />
              </>
            )}
            {JSON.stringify(flight)} <br />
            <br />
            <Button to='/'>Go Back</Button>
          </>
        )}
      </PlaneDetails>
    </Container>
  );
};

export default AirPlaneDetails;
