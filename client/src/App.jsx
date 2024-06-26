import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Initialize ApolloClient
const client = new ApolloClient({
  uri: '/graphql', // Ensure this URI is correct for your GraphQL endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;