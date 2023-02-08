import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../components/Card/divans.module.css'

export const getStaticProps = async ()  => {
    const res = await fetch('http://localhost:5000/product/all/search')
    const data = await res.json()

    return{
        props: { divan: data }
    } 
}

  
const Divan = ({divan}) => {

    return (
        <div>
            <h1>Наши Диваны</h1>
            {divan.map(divans => (
        <Link href={`/divan/${divans.id}`} key={divans.id}>
          <div className={styles.divanCard}>
            <div className={styles.imageContainer}>
              <Image 
              src={`/${divans.photo}`}
              layout="fill"
               className={styles.image}
               alt={`${divans.name}`}
              /> 

             {/*  <Image 
                src={`/${divans.photo}`} 
                alt={`${divans.name}`} 
                width='100%'
                height='100%'
                layout="responsive"
                objectFit="contain"
              /> */} 
            </div>
            <div>
              <h3>{ divans.name }</h3>
              <p>{ divans.descrption }</p>
              <p>{ divans.price}</p>
            </div>
          </div>
        </Link>
      ))}
        </div>
    )
}

export default Divan