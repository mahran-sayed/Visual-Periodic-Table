import React, {memo} from "react";
import Element from "./Element"

function Table({data}){
    const elements = Object.keys(data).splice(1);
    // console.log(elements);
    console.log("TABLE RENDERED");
    return (
        <main className="table">
            {elements.map(element => <Element key={data[element].number} {...data[element]} element = {element}/>)}
        </main>
    )
}

export default memo(Table);