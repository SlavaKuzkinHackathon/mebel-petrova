import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import Footer from '../../components/Header/Header'
import Header from '../../components/Footer/Footer'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div>
        <Header />
        <h1>Hello Slava!</h1>
        <Footer />
      </div>
    </>
  )
}
