import Head from 'next/head'
import styles from '../styles/Home.module.css'
import BgImg from '../public/img1'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [nome, setNome] = useState({ charName: "" })
  
  async function buttonPressed() {
    console.log(nome)
    fetch('https://sleepy-citadel-21369.herokuapp.com/createChar', {
      headers:
      {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(nome)
    })

  }

  function SalvaNome(event) {

    const letra = event.target.value
    setNome({
      ...nome,
      [event.target.name]: letra
    })
    console.log(nome)
  }
  return (
    <div>

      <Head><title>
        Hunter S Quest</title></Head>

      <BgImg />

      <div className={styles.FormMain}>
        {/*Tudo que esta visivel esta em ordem nessa div*/}
        <Link className={styles.textHeader} href={{ pathname: '/informacao', query: { keyword: nome.charName } }}>Comecar</Link>
        <p className={styles.p}>Hunter S Quest</p>

        <form className={styles.name} action="/informacao" method="post">

          <label for="Name">Character Name:</label>
          <input className={styles.input} type="text" name="charName" onChange={SalvaNome} value={nome.charName} />
          <button className={styles.button1} onClick={buttonPressed} type="reset" value='Confirmar'>Salvar</button>

        </form>
      </div>
    </div>

  )
}
