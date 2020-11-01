import Head from "next/head"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import UILink from "@material-ui/core/Link"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Portal</h1>
        <ul>
          <li>
            <Link href={"/context"}>
              <UILink href={"#"}>react context</UILink>
            </Link>
          </li>
          <li>
            <Link href={"/zustand"}>
              <UILink href={"#"}>zustand</UILink>
            </Link>
          </li>
          <li>
            <Link href={"/recoil"}>
              <UILink href={"#"}>recoil</UILink>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  )
}
