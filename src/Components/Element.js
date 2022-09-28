import React, {useContext} from 'react';
import {Context} from './../App';

function Element({name, number, symbol, element , phase, category}){

    const { elementChange } = useContext(Context);

    return (
        <div className= {phase.toLowerCase()+ " " + category.split(",")[0] + ` e${number}`} onClick= {()=>{elementChange(element)}}>
            
            <div className="header">
                <p className="number">{number}</p>
                {/* <p className="atomic-mass">{atomic_mass.toFixed(4)}</p> */}
            </div>

            <h4 className="symbol">{symbol}</h4>

            <div className="footer">
                <h6 className="name">{name}</h6>
            </div>
        </div>
    )
}

export default Element;