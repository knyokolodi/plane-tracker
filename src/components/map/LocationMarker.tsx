import { FC } from 'react';
import { useHistory } from 'react-router';

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
      <img
        src='airplane.png'
        alt='Location marker '
        className='marker'
        onClick={(e) => airplaneDetails(flight)}
      />
    </div>
  );
};

export default LocationMarker;
