import Image from 'next/image';
import styles from '../../../components/Card/divans.module.css'


export async function getStaticPaths() {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
      return {
        paths: [],
        fallback: 'blocking',
      }
    }
  
    const res = await fetch('http://localhost:5000/product/all/search')
    const divans = await res.json()
  
    const paths = divans.map((divan) => ({
      params: { id: divan.id.toString() },
    }))
  
    return { paths, fallback: false }
  }


export const getStaticProps = async (context) =>{
    const id = context.params.id

    const res = await fetch(`http://localhost:5000/product/${id}`)
    const data = await res.json()

    return {
        props: { divan: data} 
      }

}


const Ditails = ({divan, photo}) => {
    return (
        <div className={styles.singleDivan}>
            <h1>{divan.name}</h1>
            <div className={styles.imageConteiner}>
                <Image 
                src={`${'http://localhost:5000'}/${divan.photo.substr(7)}`} 
                alt={`${divan.name}`} 
                width = {250}
                height = {200}
                />
            </div>
                <div>
                    <h3>{divan.description}</h3>
                    <p>{ divan.price} ₽</p>
                </div>
        </div>
    )
}

export default Ditails