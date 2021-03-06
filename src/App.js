import './App.css';
import React , { useEffect , useState } from 'react';
import CurrencyRow from './currencyRow'

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=1e55160911154aff3ef97dbb36db9687'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency , setFromCurrency] = useState()
  const [toCurrency , setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency , setAmountInFromCurrency] = useState(true)

  let toAmount , fromAmount
  if(amountInFromCurrency){
    fromAmount = amount
    toAmount = amount * exchangeRate
  }
  else{
    toAmount = amount
    fromAmount = amount / exchangeRate
  }






  useEffect(()=>{
    fetch(BASE_URL)
    .then(res =>res.json())
    .then(data =>{
      const firstCurrency = Object.keys(data.rates)[0]
      setCurrencyOptions([data.base,...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  }, [])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

   function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <h1>Convert!</h1>
      <CurrencyRow
        currencyOptions = {currencyOptions}
        selectCurrency = {fromCurrency}
        onChangeCurrency = {e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount = {handleFromAmountChange}
      />
      <div className = "equals">=</div>
      <CurrencyRow
        currencyOptions = {currencyOptions}
        selectCurrency = {toCurrency}
        onChangeCurrency = {e => setToCurrency(e.target.value)}
        amount = {toAmount}
        onChangeAmount = {handleToAmountChange}

      />
    </>
  );
}

export default App;
