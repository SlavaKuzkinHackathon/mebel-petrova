import Link from "next/link"
import Image from 'next/image'
import logo from '../../public/front_image/logo-write_2.png'

const header = () => {
    return(
        <header>
                <nav>
                    <Link href='/'><Image src={logo} alt='logo' width='39' height='32'/></Link>
                    <Link href='/divan'> Диваны </Link>
                    <Link href='/review'> Отзывы </Link>
                    <Link href='/about'> О Нас </Link>
                </nav>
        </header>
    )
}

export default header