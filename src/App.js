import React, { useState, useEffect } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import Lottie from 'react-lottie';

import awsExports from './aws-exports';
import { updateDoge } from './graphql/mutations';
import { getDoge } from './graphql/queries';
import animationData from './lottie/dogeMoon.json';

import './App.css';

Amplify.configure(awsExports);

function App() {
  const [dogePrice, setDogePrice] = useState(0);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  async function fetchDogePrice() {
    try {
      const dogeData = await API.graphql(graphqlOperation(getDoge));
      const currentPrice = dogeData.data.getDoge.price;
      setDogePrice(currentPrice);
    } catch (err) {
      console.log("failed fetching data")
      console.log(err);
    }
  }

  async function updateDogePrice() {
    try {
      const dogeData = await API.graphql(graphqlOperation(getDoge));
      const newDogePrice = dogeData.data.getDoge.price + 0.1;

      const updatedDogePrice = await API.graphql(graphqlOperation(updateDoge, { input: newDogePrice }));

      setDogePrice(updatedDogePrice.data.updateDoge.price);
    } catch (err) {
      console.log("failed to update the price! ");
      console.log(err);
    }
  }

  useEffect(() => { //initial fetch
    fetchDogePrice()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dogecoin Price Predictor</h1>
        <p> One click = 10 cents</p>
        <h2>$ {dogePrice.toFixed(2)}</h2>
        <button onClick={updateDogePrice}>Doge go to the 🌜!</button>

        <Lottie
          options={defaultOptions}
          height="30%"
          width="30%"
        />
      </header>
    </div>
  );
}

export default App;
