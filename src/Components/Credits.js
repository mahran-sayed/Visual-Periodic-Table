import styles from '../credits.module.css'
function Credits({toggleHomeCredit}){
    return(
        <div className={styles.credits}>
            {/* Periodic Table Design Credit */}
            <div className="credit">
                <p>Periodic Table Design Inspired by: Image by <a href="https://www.freepik.com/free-vector/periodic-table-design-template_29760123.htm#query=periodic%20table&position=12&from_view=search">Freepik</a></p> 
            </div>
            {/* End Periodic Table Design Credit */}

            <div className="credit">
                <p>Table and Data in general are based on this JSON file: <a href="https://github.com/Bowserinator/Periodic-Table-JSON">Periodic-Table-JSON</a></p>
            </div>

            {/* Element Images Credit */}
            <div className="credit">
                <p>Most elements images came from <a href="https://images-of-elements.com/"> Chemical Elements A Virtual Museum</a>, and  by pressing <span className={styles.showButton}>i</span> button you can find the source of each image separately.</p>
            </div>
            {/* End Element Images Credit */}


            <div className="credit">
                <p>Inspired By:</p>
                <ul>
                    <li><a href="https://ptable.com/">Ptable:</a> It's such a great site! It includes tons of information.</li>
                    <li><a href="https://play.google.com/store/apps/details?id=mendeleev.redlime&hl=en_US&gl=US">Periodic Table App by chernykh.tech:</a> It's really beautiful app and very organized one</li>
                    <li></li>
                </ul>
            </div>
            <p>I hope I haven't forgotten anything:)</p>

            <div className={styles.goBack} onClick = {toggleHomeCredit}>Go Home:)</div>
        </div>

  
    )
}
export default Credits;