import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App';
import "./index.css"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { CartOverLayContextProvider } from "./state/CartOverlay";
import { BrowserRouter as Router } from "react-router-dom";

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URI,
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CartOverLayContextProvider>
        <Router>
          <App />
        </Router>
      </CartOverLayContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);

