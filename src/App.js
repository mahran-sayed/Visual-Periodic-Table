import React, {useState, createContext} from 'react';
import Header from './Components/Header';
import Info from './Components/Info';
import Table from './Components/Table';
import Appendix from './Components/Appendix';
import Footer from './Components/Footer'
import Credits from './Components/Credits';
import data from './data';

const Context = createContext();

function App(){
    const [element, setElement] = useState("titanium");
    const [isCredit, setIsCredit] = useState(false);
    const [summary, setSummary] = useState(false);
    const elementChange = (current) => {
        setElement(current)        
    }
    const toggleHomeCredit = () => {
        setIsCredit(!isCredit);
    }
    const toggleSummary = () => {
        setSummary(!summary)
    }
    
    if(!isCredit){
        return (
            <>
            <Header />
            <div className='content'>
            <Context.Provider value = {{elementChange: elementChange, toggleSummary: toggleSummary}}>
                <Info elementObj = {data[element]} summary = {summary}/>
                <div className="side">
                      <Table data = {data}/>
                    <Appendix />
                </div>
            </Context.Provider>
            </div>
            <Footer toggleHomeCredit = {toggleHomeCredit}/>
            </>
            
        )
    }else{
        return (
            <>
            <Header />
            <Credits toggleHomeCredit = {toggleHomeCredit}/>
            <Footer />
            </>
            
        )
    }
    
}
export {Context};
export default App;