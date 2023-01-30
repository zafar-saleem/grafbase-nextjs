import React from 'react';
import { useRouter } from "next/router";
import { useQuery, gql, useLazyQuery } from '@apollo/client';

const GET_DRONES = gql`
  query getDronesSprayed {
    drone(by: {id: $id}) {
      edges {
        node {
          name
          sprayed(first: 100) {
            edges {
              node {
                id
                cropsType
                sprayedDate
                sprayType
                createAt
              }
            }
          }
        }
      }
    }
  }
`;

export default function Detail() {
  const router = useRouter();
  const [getSprayedList, { loading, error, data }] = useLazyQuery(GET_DRONES);

  console.log(data);

  React.useEffect(() => {
    getSprayedList({ variables: { id: router.query.id }});
  }, []);
  
  return (<>Details</>);
}