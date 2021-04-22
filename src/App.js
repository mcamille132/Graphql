import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { render } from 'react-dom';
import { useQuery, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

const EXCHANGE_RATES = gql`
{
  launches(limit: 5) {
    launch_date_utc
    launch_success
    rocket {
      rocket_name
    }
    links {
      video_link
    }
    details
    id
      }
    }
`;


function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    console.log(data.launches)
  

  return data.launches.map(({ launch_date_utc, launch_succes, rocket, links, id , details}) => (
    <div key={id}>
      <p>
        {launch_date_utc}
      </p>
      <p>
        {launch_succes ? 'true' : 'false'}
      </p>
      <p>
        {rocket.rocket_name}
      </p>
      <p>
        {links.video_link}
      </p>
      <p>
        {details}
      </p>
    </div>
  ));
}

function App() {
  
  return (
    <div>
      
      <h2>My first Apollo app 🚀</h2>
      
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
    <ExchangeRates />
  </ApolloProvider>,
  document.getElementById('root'),
);

export default App;
