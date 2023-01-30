import React, { SyntheticEvent } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Link from 'next/link';
import { GET_DRONES, ADD_DRONE, DELETE_DRONE } from '@/queries';

interface INodeItems {
  id: string;
  lat?: string | null;
  long?: string | null;
  name: string;
}

interface INodeParam {
  node: INodeItems;
}

export default function Home() {
  const { loading, error, data } = useQuery(GET_DRONES);
  const [addDroneParams, {
    data: aData,
    loading: aLoading,
    error: aError,
  }] = useMutation(ADD_DRONE);
  const [deleteDroneParams, {
    data: dData,
    loading: dLoading,
    error: dError,
  }] = useMutation(DELETE_DRONE);

  const calculateLandHealth = ({ lat, long }: { lat: number, long: number}) => {
    let health: number = lat * long;
    
    if (health < 0) return 'low';
    return 'high';
  };

  const saveDrone = (event: SyntheticEvent) => {
    event.preventDefault();

    addDroneParams({
      variables: {
        name: event.target?.name.value,
        lat: event.target?.latitude.value,
        long: event.target?.longitude.value,
        landHealth: calculateLandHealth({
          lat: event.target?.latitude.value,
          long: event.target?.longitude.value,
        }),
      }
    });
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 2fr'
    }}>
      <div>
        <form onSubmit={saveDrone}>
          <div>
            <label htmlFor="">
              Name
              <input type="text" name="name" />
            </label>
          </div>
          <fieldset>
            Coordinates to Calculate Area
            <div>
              <label htmlFor="">
                Longitude
                <input type="text" name="longitude" />
              </label>
            </div>
            <div>
              <label htmlFor="">
                Latitude
                <input type="text" name="latitude" />
              </label>
            </div>
            <div>
              <label htmlFor="">
                Area
                <input type="number" name="area" />
              </label>
            </div>
          </fieldset>
          <div>
            <button>Save</button>
          </div>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              data?.droneCollection?.edges?.map(({ node }: INodeParam, index: number) => (
                <tr key={`${node?.id}-${index}`}>
                  <td><Link href={`/detail/${node?.id}`}>{node?.name}</Link></td>
                  <td>{node?.long}</td>
                  <td>{node?.lat}</td>
                  <td><button type='button' onClick={() => {
                    deleteDroneParams({ variables: { id: node?.id } });
                  }}>Delete</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
