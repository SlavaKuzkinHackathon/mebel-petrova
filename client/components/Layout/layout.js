import Header from '../Header/header'
import Footer from '../Footer/footer'

const Layout = ({children}) => {
return(
    <div classname='content'>
        <Header />
        {children}
        <Footer />
    </div>
)
}

export default Layout