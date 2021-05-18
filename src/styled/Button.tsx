import { Link } from 'react-router-dom';
import styled from 'styled-components'

export const Button = styled(Link)`
  width: auto;
  padding: 10px 20px;
  color: #fff;
  background-color: #2d2c2c;
  border: solid 1px #2d2c2c;
  text-decoration: none;

  &:hover {
    color: #2d2c2c;
    background-color: #fff;
    border: solid 1px #2d2c2c;
  }
`;