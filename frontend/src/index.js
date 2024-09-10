import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App';
import "./index.css"
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { CartOverLayContextProvider } from "./state/CartOverlay";

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URI,
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CartOverLayContextProvider>
        <RouterProvider router={router} />
      </CartOverLayContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
