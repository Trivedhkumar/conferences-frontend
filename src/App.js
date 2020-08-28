import React, { useState, useEffect } from 'react';
import Conference from './components/Conference';
import './App.css';

function App() {
  const [conferences, setConferences] = useState([]);
  const [filteredConferences, setFilteredConferences] = useState([]);
  const uniqueCities  = conferences.reduce((cities,{city}) => city.trim() && !cities.includes(city) ? [...cities,city] : cities,[] );
  const uniqueMonths = conferences.reduce((months,{confStartDate}) => confStartDate && !months.includes(new Date(confStartDate).getMonth() + 1) ? [...months,new Date(confStartDate).getMonth() +1]:months,[]);
  const uniqueCountries = conferences.reduce((countries,{country}) => country.trim() && !countries.includes(country) ? [...countries,country] : countries,[]);
  useEffect(()=>{
    fetch('https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences')
    .then(res=> res.json())
    .then(data=> {
      setConferences([...data.paid,...data.free]);
    })
  },[]);
  
  useEffect(()=>{
    setFilteredConferences(conferences);
  },[conferences])

  const cityFilterHandler = (e)=>{
    setFilteredConferences(conferences.filter(({city}) => city === e.target.value));
  }
const monthFilterHandler = (e) =>{
  setFilteredConferences(conferences.filter(({confStartDate} ) => new Date(confStartDate).getMonth() + 1  == e.target.value));
}
const countryFilterHandler = (e) => {
  setFilteredConferences(conferences.filter(({country}) => country === e.target.value));
}
const entryFilterHandler  = (e) =>{
  setFilteredConferences(conferences.filter(({entryType}) => entryType === e.target.value));
}
const searchFilterHandler = (e) =>{
  if(!e.target.value){
    setFilteredConferences(conferences);
    return;
  }
  setFilteredConferences(conferences.filter(({confName,city}) => confName.toLowerCase().includes(e.target.value.toLowerCase() 
  || city.toLowerCase().includes(e.target.value.toLowerCase()))));
}
  return (
    <div className="app">
      <header className="app-header">
        <h1>Conference Manager</h1>
        <div className = "search-filter">
        <div className = "filters">
        <select className = "filter" onChange={cityFilterHandler}>
          <option>City</option>
           {uniqueCities.map(city =><option key = {city}> {city}</option>)}
        </select>
        <select className = "filter " onChange={monthFilterHandler} >
        <option>month</option>
        {uniqueMonths.map(month =><option key = {month}> {month}</option>)}
        </select>
        <select className = "filter" onChange = {countryFilterHandler}>
        <option>country</option>
            {uniqueCountries.map(country => <option key = {country}>{country}</option>)}
        </select>
        <select className = "filter" onChange = {entryFilterHandler}>
          <option>Entry</option>
        <option>Free</option>
        <option>Paid</option>
        </select>
       
        </div>
        <div className = "search">
        <input  type = "text" placeholder = "search" onChange = {searchFilterHandler} />
          
        </div>

        </div>
      </header>
      <main >
        <div className='main'>
        {filteredConferences.map((conferene,index)=> <React.Fragment key = {index}><Conference  conferenceDetails={conferene}/></React.Fragment>)}
        </div>
      </main>
    </div>
  );
}

export default App;
