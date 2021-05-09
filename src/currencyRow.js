import React from 'react'

export default function CurrencyRow(props) {
  console.log(props)
  const {
    currencyOptions
  } = props
  return (
  <div>
    <input type = "number" className = "input" />
      <select>
        {currencyOptions.map((option,index) =>(
          <option value = {option} key ={index}>{option}</option>
        ))}
        <option value = "hi">Hi</option>
      </select>
  </div>
  )
}
