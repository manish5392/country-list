import React from 'react';
import './style.css';
interface props {
    modalData: any,
    languages:any,
    currency:any,
    show: boolean,
    handleClose: VoidFunction,
    
    
}

const CountryDetails = (props: props) => {

    return (<div>
        {
            props.show &&
            <div className="country-details">
                <div className="close-btn" onClick={props.handleClose} title="close me">X</div>
                <div style={{ alignItems: "center" }}>
                    <img src={`${props.modalData.flag}`} alt="flag" height="100px" width="100px" />
                    <h4> Country :- {props.modalData.name}</h4>
                    <h4>Capital :- {props.modalData.capital}</h4>

                    <div>
                        <h4>Language Used</h4>
                        <ul>
                            {
                                props.languages.map((p:any,id:number)=>
                                    (<li key={id}>{p.name} <span>{"("+p.nativeName+")"}</span></li>)
                                )
                            }
                        </ul>
                    </div>
                    <div>
                        <h4>Currency</h4>
                        {
                            props.currency.map((c:any,key:number)=>(
                                <p key={key}>{c.name} , ({c.symbol})</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        }
    </div>)
}
export default CountryDetails;