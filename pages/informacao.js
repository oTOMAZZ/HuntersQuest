
import { NormalizeError } from 'next/dist/shared/lib/utils'
import { useState } from 'react'
import BgImg2 from '../public/img2'
import Iop from '../public/Iop'
import MobImage from '../public/wolf'
import styles from '../styles/Home.module.css'

export async function getServerSideProps({ query }) {
    const mobApiUrl = `https://sleepy-citadel-21369.herokuapp.com/fightPage${generateRandomMob(9)}`
    const spellsAvailableUrl = `https://sleepy-citadel-21369.herokuapp.com/spellsFor${query.keyword}`
    const ApiUrl = `https://sleepy-citadel-21369.herokuapp.com/getCharData${query.keyword}`
    console.log(query)
    console.log('----------------------------------------------------------')

    const mobApi = await fetch(mobApiUrl)
    const mobDaVez= await mobApi.json()
    const spellsApi = await fetch(spellsAvailableUrl)
    const spellsData = await spellsApi.json()
    const charApi = await fetch(ApiUrl)
    const charData = await charApi.json()
    console.log(charData)
    console.log(mobDaVez)
    return {
        props: {
            charData,
            spellsData,
            mobDaVez
        }
    }
}


function generateRandomMob(listLenght) {
    console.log(listLenght)
    const selectedPos = Math.floor(Math.random() * listLenght) + 0
    return selectedPos
}



const Informacao = ({ charData, spellsData , mobDaVez }) => {

    const [damage, setDamage] = useState(0)

    function setDamageFromSelect(event) {
        const damageOfSpell = event.target.value
        setDamage(Number(damageOfSpell))
    }

    //-------------------------states--------------------------------
    const [mob, setMob] = useState({
        actualMob: mobDaVez.mob_Name,
        actualLife: mobDaVez.mob_Life,
        damageDealing: mobDaVez.mob_Damage
    })

    const [player, setPlayer] = useState({
        playerName: charData.char_Name,
        actualPlayerLife: charData.char_Life,
        playerXp: charData.char_Exp,
        playerLevel: charData.char_Level
    })

    
    const [turno, setTurno] = useState({
        turnoAtual: 1
    })

    // ----------------------------------------------------------------------

    function handleDisplayByTurn(event) {

        event.preventDefault()
        if (mob.actualLife <= 0) {
            console.log('parabens, voce matou o mob')
            //fazer o patch de xp e mandar pra pagina de lutar denovo
            fetch(`https://sleepy-citadel-21369.herokuapp.com/char${charData.char_Id};exp${mobDaVez.mob_Exp}`, {
                headers:
                {
                    'Content-Type': 'application/json'
                },
                method: "PATCH",
            })
            window.location.reload();
        }

        if (player.actualPlayerLife <= 0) {
            console.log('F, voce morreu')
            window.location.reload();

        }
        //------------------caso a vida nao seja 0--------------------------------------------
        console.log(turno.turnoAtual)


        if (turno.turnoAtual % 2 != 0) {
            console.log('turno do player')
            { }

            setMob({
                ...mob,
                actualLife: mob.actualLife - damage
            })
        }

        if (turno.turnoAtual % 2 == 0) {
            const damageSuffered = mob.damageDealing
            console.log('turno do mob')
            console.log(damageSuffered)

            setPlayer({
                ...player,
                actualPlayerLife: player.actualPlayerLife - damageSuffered
            })
        }

        setTurno({
            turnoAtual: turno.turnoAtual + 1

        })

    }
    console.log(mobDaVez.mob_Name)
    return (
        <div>
            <p className={styles.introducao}>Nesse mundo o aventureiro tera que passar por varios monstros,fazendo jogadas em turnos para chegar ao seu objetivo</p>
            <BgImg2 />
            <Iop />
            <ul>
                <li className={styles.statsPatternPlayer}>
                    <h2> {player.playerName}</h2>
                    <h2>Vida: {player.actualPlayerLife}</h2>
                    <h2>XP: {player.playerXp}</h2>
                    <h2>LV: {player.playerLevel}</h2>
                    <select className={styles.select} onChange={setDamageFromSelect}>
                        {spellsData.map((spell) => (
                            <option className={styles.select} id='spellLocation' value={spell.spell_Damage} >{spell.spell_Name}</option>
                        ))}

                    </select>
                </li>
            </ul>
            <MobImage setImage = {mobDaVez.mob_Name}  />
            <ul>
                <li className={styles.statsPatternMob}>
                    <h2>Mob: {mob.actualMob}</h2>
                    <h2>Vida: {mob.actualLife}</h2>
                    <h2>Dano: {mob.damageDealing}</h2>
                </li>
            </ul>
            <button className={styles.button2} type='button' onClick={handleDisplayByTurn} value='Batalhar'>Turno</button>
        </div>
    )
}

export default Informacao