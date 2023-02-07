import Link from "next/link"
import styles from './header.module.css'
import Image from 'next/image'
import logo from '../../public/front_image/logo-write_2.png'
import routesConfig from '../../src/router/routerConfig'
import {useRouter} from 'next/router';
import cn from 'classnames'

const header = () => {
  const {pathname} = useRouter()

    return(
        <header>
                <nav className={styles.nav}>
        <Link href='/'>
        <div className={styles.logo}>
                <Image
                  
                  className={styles.logo__img}
                  src={logo}
                  alt="logo"
                />
        </div>
        </Link>
        <div className={styles.header__content}>
          <div className={styles.links}>
              {routesConfig.map(({title,path,element})=>(
                  <Link
                      className={cn(styles.link, pathname === path ? styles.active : null)}
                      key={title}
                      href={path}
                  >
                    {title} 
                    </Link>
              ))}
          </div>
          <div className={styles.links__social}>
              <Link href="tel:+7 913 913 55 47" className={styles.phone}>+7 913 913 55 47</Link>
          </div>
        </div>
    </nav>
 </header>
    )
}

export default header