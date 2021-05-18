import { FC } from 'react';
import { useHistory } from 'react-router';
import { Marker } from '../../styled/Marker';

interface ILocationProps {
  lat: number;
  lng: number;
  flight: [];
}

const LocationMarker: FC<ILocationProps> = ({ flight }: ILocationProps) => {
  const history = useHistory();

  const airplaneDetails = (flight: []) => {
    history.push({
      pathname: '/airplaneDetail',
      state: {
        flight,
      },
    });
    console.log(`Fligt detail ${flight}`);
  };

  return (
    <div>
      <Marker
        src='airplane.png'
        alt='Location marker '
        onClick={() => airplaneDetails(flight)}
      />
    </div>
  );
};

export default LocationMarker;
