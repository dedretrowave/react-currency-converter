import React from 'react';

const defaultCurrencies = ['RUB', 'BYN', 'USD', 'GBP', 'KZT'];

export const Block = ({id, currency, onChangeValue, onChangeCurrency}) => {
    return (
    <div className="block">
        <ul className="currencies">
            {defaultCurrencies.map(currencyArg => (
                <li
                    onClick={() => {
                        onChangeCurrency(id, currencyArg);
                    }}
                    className={currency.valute === currencyArg ? 'active' : ''}
                    key = {currencyArg}>
                    {currencyArg}
                </li>
            ))}
            <li>
                <svg height="50px" viewBox="0 0 50 50" width="50px">
                    <rect fill="none" height="50" width="50" />
                    <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
                </svg>
            </li>
        </ul>
        <input
            onChange={(e) => onChangeValue(id, e.target.value)}
            value={currency.amount}
            type="number"
            placeholder={0}
        />
    </div>
)}