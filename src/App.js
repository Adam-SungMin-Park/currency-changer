import './App.css';
import React , { useEffect , useState } from 'react';
import CurrencyRow from './currencyRow'

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=1e55160911154aff3ef97dbb36db9687'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency , setFromCurrency] = useState()
  const [toCurrency , setToCurrency] = useState()
  useEffect(()=>{
    fetch(BASE_URL)
    .then(res =>res.json())
    .then(data =>
      setCurrencyOptions([data.base,...Object.keys(data.rates)])
      )
  }, [])
  return (
    <>
      <h1>Convert!</h1>
      <CurrencyRow
        currencyOptions = {currencyOptions}
      />
      <div className = "equals">=</div>
      <CurrencyRow
        currencyOptions = {currencyOptions}
      />
    </>
  );
}

export default App;
