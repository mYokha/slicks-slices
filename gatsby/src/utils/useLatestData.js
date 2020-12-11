import React from 'react';

const gql = String.raw;

const deets = gql`
  {
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
  }
`;

export default function useLatestData() {
  const [hotSlices, setHotSlices] = React.useState();
  const [slicemasters, setSlicemasters] = React.useState();

  React.useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // mode:
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster ${deets}
              hotSlices ${deets}
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => console.error(err));
  }, []);

  return { hotSlices, slicemasters };
}
