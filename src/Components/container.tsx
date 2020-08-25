import React, { useState, useEffect } from 'react';
import CountryList from './countryList';

import './style.css';

function Container() {

    const [result, setResult] = useState<Array<object>>([]);
    const [loading ,setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Array<object>>(result);
    const [searchText, setSearchText] = useState<string>("");


    useEffect(() => {
        setLoading(true)
        fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
            .then(res => {
                setResult(res)
                setLoading(false)
            })
            .catch(err=>console.log(err))
    }, []);

    useEffect(()=>{
        const value=searchText;
        const filterProperty=["name","region","alpha2Code","alpha3Code"]
        const lowerCaseValue=value.toLowerCase().trim();
        if (lowerCaseValue===''){
            setData(result)
        }
        else{
            const filteredData=result.filter((item:any)=> {

                return Object.keys(item).some((key:any)=>
                    filterProperty.includes(key)? item[key].toString().toLowerCase().includes(lowerCaseValue) :false)
            })

            setData(filteredData);

        }
    },[searchText, result])


    if(loading){
        return <h1>Loading Countries Data...</h1>
    }

    return (
        <div>
            <h1 className="header">
                List of Countries
            </h1>
            <div className="filter-div">
                <input  className="input" type="text" value={searchText} placeholder="Search" onChange={(e)=>setSearchText(e.target.value)} name="search-filter" />
            </div>
            <CountryList Countries={data} />

        </div>
    );
}

export default Container;
