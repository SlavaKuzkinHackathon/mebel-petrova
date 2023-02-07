
import Divan from '../pages/divan'
import About from '../pages/about'
import Home from '../pages/index'
import Reviews from '../pages/reviews'

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
    {
        title: 'Отзывы',
        path: '/reviews',
        elemetn: <Reviews />
    },
]
export default routesConfig