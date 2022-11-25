import styles from "../styles/Home.module.css"
import Image from "next/image"
export const BgImg = () => {
    return(
        <Image className={styles.Image}
        src= "/HqBG.jpg"
        layout="fill"
        />
)}
export default BgImg