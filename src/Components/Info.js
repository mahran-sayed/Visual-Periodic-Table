import React, {useState, useContext} from 'react';
import {Context} from './../App';
import Atom from "./Atom";

function Info({ elementObj, summary }) {
  const {toggleSummary} = useContext(Context);
  const { title, url, attribution } = elementObj.image;
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const handleAttributon = (attr) => {
    // Regex from https://ihateregex.io/expr/url/
    const matches = attr.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi);
    if(matches){
      matches.forEach((match) => {
        if (match.includes("images-of-elements")) {
          attr = attr.replace(
            match,
            ` <a href= ${match} >Chemical Elements: A Virtual Museum</a>`
          );
        } else if (match.includes("creativecommons")) {
          const license = attr.match(/CC.*(?= <)/g)[0];
          attr = attr.replace(/CC.*>/, `<a href= ${match} >${license}</a>`);
        }
      });
    }
    return attr;
  };
  const ionisationEnergies = (energy, index)=>{
    switch(index){
      case 0:
        return `1st`
      case 1:
        return `2nd`
      case 2:
        return `3rd`;
      default:
        return `${index + 1}th `
    }
  }
  const formatShells  = (shellsArr) => {
    const shellLabels = {
      0: "K",
      1: "L",
      2: "M",
      3: "N",
      4: "O",
      5: "P", 
      6: "Q"
    }
    return shellsArr.map((num, index) => shellLabels[index] + num ).join(" ")
  }

  return (
    <article className="info">
      {/* Header */}
      <div className="header">
        {/* Atomic Number */}
        <div className="atomic-number">
          <p>Atomic Number</p>
          <p>{elementObj.number}</p>
        </div>
        {/* End Atomic Number */}

        {/* Symbol + Number */}
        <div className="symbol-number">
          {elementObj.symbol}
        </div>
        {/* End Symbol + Number */}

        {/* Atomic Mass */}
        <div className="atomic-mass">
          <p>Atomic Mass</p>
          <p>{elementObj["atomic_mass"].toFixed(4)}</p>
        </div>
        {/* End Atomic Mass */}

      </div>
      {/* End of Header */}

      {/* Image Container */}
      <div className="property-container custom image">
        {/* Image Container DIV */}
        <div className="img-container" style={{ background: "url(" + url + ")" }}>
          {/* Element Name Banner */}
          <div className={"name " + elementObj.phase.toLowerCase() + " " + elementObj.category.split(",")[0]}>
            {elementObj.name}
          </div>
          {/* End Element Name Banner */}

          {/* Element Catagory and Phase */}
          <div className="catagory-phase">
              {elementObj.phase.toLowerCase() + " " + elementObj.category.split(",")[0]}
          </div>
          {/* End Element Catagory and Phase */}

          {/* Modal Button */}
          <div className="show-img-data" onClick={toggleModal}>i</div>
          {/* End Modal Button */}

        </div>

        {/* End of Image Container DIV */}

        {/* Modal Containing Image Data */}
        {modal && (
          <div className="img-modal">
            <div className="img-data">
              <h4>Title</h4>
              <div className="underline"></div>
              <p>{title}</p>
              <h4>Attribution</h4>
              <div className="underline"></div>
              <p
                dangerouslySetInnerHTML={{
                  __html: handleAttributon(attribution),
                }}
              ></p>

              <div
                className={modal ? "close hide" : "close"}
                onClick={toggleModal}
              >
                Close
              </div>
            </div>
          </div>
        )}
        {/* End Modal Containing Image Data */}

      </div>
      {/* End of Image Container */}

      {/* Appearance */}
      <div className="property-container">
        <span className="property">Appearance: </span>
        <span className="value">{elementObj.appearance}</span>
      </div>
      {/* End Appearance */}

      {/* Boiling Temperature */}
      <div className="property-container">
        <span className="property">Boiling Temperature: </span>
        <span className="value">{elementObj.boil} <span className="unit">K</span></span>
      </div>
      {/* End Boiling Temperature */}

      {/* Density */}
      <div className="property-container">
        <span className="property">Density: </span>
        <span className="value">{elementObj.density} <span className="unit">g/cm<sup>3</sup></span></span>
      </div>
      {/* End Density */}    


      {/* Melting Point */}
      <div className="property-container">
        <span className="property">Melting Point: </span>
        <span className="value">{elementObj.melt} <span className="unit">K</span></span>
      </div>
      {/* End Melting Point */}  


      {/* Molar Heat */}
      <div className="property-container">
        <span className="property">Molar Heat: </span>
        <span className="value">{elementObj["molar_heat"]} <span className="unit">J/(mol·K)</span></span>
      </div>
      {/* End Molar Heat */}  

      {/* Electron Affinity */}
      <div className="property-container">
        <span className="property">Electron Affinity: </span>
        <span className="value">{elementObj.electron_affinity} <span className="unit">kJ/mol</span></span>
      </div>
      {/* End Electron Affinity */}

      {/* Electronegativity Pauling */}
      <div className="property-container">
        <span className="property">Electronegativity Pauling: </span>
        <span className="value">{elementObj.electronegativity_pauling}</span>
      </div>
      {/* End Electronegativity Pauling */}

      {/* Ionization Energies */}
      <div className="property-container custom ionization-energies">
        <span className="property">Ionization Energies</span>
        <div className="value">{elementObj.ionization_energies.map((e, i)=>{
          return <div key={i}>
            <p>{ionisationEnergies(e, i)}</p> 
            <p>&#8594;</p>
            <p>{e} <span className="unit"> kJ/mol </span></p>
            </div>
        })} </div>
      </div>
      {/* End Ionization Energies */}

      {/* Summary */}
      <div className={`property-container custom summary ${summary?"show":"hide"}`}>
        <div className="property">Summary <span className="chevron" onClick={() => {toggleSummary()}}>&#171;</span></div>
        <br></br>
        <span className="value">{elementObj.summary}</span>
      </div>
      {/* End Summary */}

      {/* Electron Shell */}
      <div className="property-container custom electron-shell">
        <p className="property">Electron Shell</p>
        <Atom shells={elementObj.shells}/>
        <div className="data">
          <p>{formatShells(elementObj.shells)}</p>
          <br />
          <h4>Electron Configuration</h4>
          <p>{elementObj.electron_configuration}</p>
          <h4>Electron Configuration Semantic</h4>
          <p>{elementObj.electron_configuration_semantic}</p>

        </div>
      </div>
      {/* End Electron Shell */}

    </article>
  );
}

/* {Object.keys(elmentObj).map((property, index) => {
                return <Info key = {index} property = {property} value = {elmentObj[property]}/>
            })}*/
export default Info;
