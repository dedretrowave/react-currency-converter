import './App.css';
import {Block} from "./Block";
import React from "react";
import './index.scss';

function App() {
  const [currencies, setCurrencies] = React.useState([
    {id: 0, valute: 'RUB', amount: 0},
    {id: 1, valute: 'USD', amount: 0},
    {id: 2, valute: 'KZT', amount: 0},
  ]);
  const [rates, setRates] = React.useState({});
  const [baseValute, setBaseValute] = React.useState('RUB');

  const changeCurrency = (id, currency) => {
    let newCurrencies = currencies.filter((currency) => currency.id !== id);
    newCurrencies = [...newCurrencies, {id: id, valute: currency, amount: 0}];
    newCurrencies.sort((prev, next) => prev.id - next.id);
    setCurrencies([...newCurrencies]);
  }

  const addCurrency = () => {
    const newCurrencies = [...currencies,
        {id: currencies.length, valute: baseValute, amount: 0}];

    setCurrencies([...newCurrencies]);
  }

  const calculatePrice = (id, amount) => {
    let newCurrencies = [];

    const inputCurrency = currencies.find(currency => currency.id === id);
    setBaseValute(inputCurrency.valute);
    inputCurrency.amount = +amount;

    currencies.forEach((currency) => {
      let price = 0;

      if (currency.id === id) {
        price = inputCurrency.amount;
      } else {
        price = (+amount / rates[baseValute]) * rates[currency.valute];
      }

      newCurrencies.push({id: currency.id, valute: currency.valute, amount: price});
    });

    newCurrencies.sort((prev, next) => prev.id - next.id);
    setCurrencies([...newCurrencies]);
  }

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
        .then((res) => res.json())
        .then((json) => {
          json.rates = {
            ...json.rates,
            "RUB": 1,
          }
          setBaseValute(json.base);
          setRates(json.rates);
        })
        .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
        <div className="currencies-container">
            {currencies.map(currency => (
                <Block
                    id={currency.id}
                    currency={currency}
                    onChangeCurrency={changeCurrency}
                    onChangeValue={calculatePrice}
                    key={currency.id}></Block>
            ))}
        </div>
        <button
            className="button"
            onClick={addCurrency}
        >Add new currency</button>
    </div>
  );
}

export default App;
