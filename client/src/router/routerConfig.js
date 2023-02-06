
import Divan from '../pages/divan'
import About from '../pages/about'
import Home from '../pages/index'

const routesConfig = [
    {
        title:'На главную',
        path: '/',
        element: <Home/>
    },
    {
        title:'Диваны',
        path: '/divan',
        element: <Divan />
    },
    {
        title:'О Нас',
        path: '/about',
        element: <About />
    },
]
export default routesConfig