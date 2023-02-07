import Link from 'next/link';
import styles from './footer.module.css';
import logo from '../../public/front_image/logo-write_2.png'
import Image from 'next/image';
import routesConfigFooter from '../../src/router/routerConfigFooter';
import cn from 'classnames';
import { useRouter } from 'next/router';

const Footer = () => {
  const {pathname} = useRouter();
  return (
    <>
        <div className={styles.footer}>
          <div className={styles.links}>
            {routesConfigFooter.map(({title,path,element})=>(
                <Link
                    className={cn(styles.link, pathname === path ? styles.active : null)}
                    key={title}
                    href={path}>
                      
                  {title} 
                </Link>
            ))}
          </div>
          <div className={styles.img}>
            <Image
              className={styles.logo__img}
              src={logo}
              alt="logo"
            />
            <div className={styles.copyright}> 
            &copy; 1999 - {new Date().getFullYear()}
            </div>
          </div>
        </div>    
    </>
  );
}
export default Footer