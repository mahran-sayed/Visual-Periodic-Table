
function Footer({toggleHomeCredit}){
    
    return (
        <footer>
            <p>Made with all <span className="love">&#10084;</span> by: <a href="https://github.com/mahran-sayed"> Mahran</a> </p>
            <div className="credits">
                <a href="#" onClick ={toggleHomeCredit}>Credits</a>
            </div>
        </footer>
    )
}

export default Footer;