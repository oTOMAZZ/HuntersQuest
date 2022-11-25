import Image from "next/image"
import styles from "../styles/Home.module.css"
export const BgImg2 = () => {
    return(
        <Image className={styles.Image}
        src= "/bginformacao.jpg"
        layout="fill"
        />
)}
export default BgImg2