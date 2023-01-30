import { gql } from '@apollo/client';

export const GET_DRONES = gql`
  query getDrones {
    droneCollection(first: 10) {
      edges {
        node {
          id
          name
          lat
          long
        }
      }
    }
  }
`;

export const ADD_DRONE = gql`
  mutation AddDrone($name: String!, $long: String, $lat: String) {
    droneCreate(input: { name: $name, lat: $lat, long: $long }) {
      drone {
        name
        long
        lat
      }
    }
  }
`;

export const DELETE_DRONE = gql`
  mutation DeleteDroneById($id: ID!) {
    droneDelete(by: { id: $id }) {
      deletedId
    }
  }
`;
