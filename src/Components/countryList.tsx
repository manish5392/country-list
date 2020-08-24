import React, { useEffect } from 'react';
import { useSortData } from './sortCountries'
import './style.css'
import CountryDetails from './CountryDetails';

interface props {
    Countries: Array<Object>,

}
const CountryList = (props: props) => {

    const { items, requestSort } = useSortData(props.Countries)

    const [show, setShow] = React.useState<boolean>(false)
    const [clickedItem, setClickedItem]=React.useState<number>(0);
    const [modalData, setModalData]=React.useState<any>({});
    const [lang, setLang] = React.useState([]);
    const [currency, setCurrency]=React.useState([]);
    const showDetails=(id:any)=>{
        setShow(true)
        setClickedItem(id);
       
    }
    const closeModal=()=>{
        setShow(false)
    }

  

    useEffect(()=>{
         const index=clickedItem;
         let modalData;
         let languageData;
         let currencyData;
         if(items.length===0){
            modalData=[];
            languageData=[];
            currencyData=[];
         }
         else{
             modalData=items[index];
             languageData=modalData.languages;
             currencyData=modalData.currencies;
            console.log(languageData)

         }
        setLang(languageData);
        setCurrency(currencyData);
        setModalData(modalData)  
    },[clickedItem,items])
  
    return (
        <div className="modal-container">
            <div className="country-container">
                <div className="country-header">
                    <div className="name">Name</div>
                    <div className="population">
                        Population
                        <button className="btn" onClick={() => requestSort('population')} title="Sort by population">
                            (ASC/DSC)
                        </button>
                    </div>
                </div>
                <div className="scroll">
                    { (items.length===0)?(<div>
                        <h4>
                            NO Data Found...
                        </h4>
                    </div>):
                        items.map((item, id) => (
                            <div key={id} className="each-div">


                                <div className="each-name"><div>
                                    <img src={`${item.flag}`} height="20px" alt="flag" width="20px" />
                                    <span onClick={()=>showDetails(id)} title="Show details">{item.name}</span>
                                </div></div>
                                <div className="each-population">{item.population}</div>

                            </div>
                        ))
                    }
                </div>
            </div>
            {(items.length===0)?"":
                <CountryDetails handleClose={closeModal} show={show} currency={currency} languages={lang} modalData={modalData}/>
            }
        </div>
    )
}
export default CountryList;