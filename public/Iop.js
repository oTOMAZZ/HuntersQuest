
import styles from "../styles/Home.module.css"
import Image from "next/image"
export const Iop= () => {
    return(
        <div>
        <Image className={styles.Iop}
        src= "/IOP.jpg"
        width={300}
        height={250}
        />
        </div>
)}
export default Iop