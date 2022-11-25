import styles from "../styles/Home.module.css"
import Image from "next/image"
export const MobImage= (setImage) => {
    console.log(setImage)
    return(
        <div>
        <Image className={styles.Wolf}
        src= {`/${setImage.setImage}.jpg`}
        width={300}
        height={250}
        />
        </div>
)}
export default MobImage