import PrivacyPolicy from '../pages/privacyPolicy'
import PaymentTerms from '../pages/paymentTerms'
import TermsOfReturn from '../pages/termsOfReturn'
import Home from '../pages/index'

const routesConfigFooter = [
    {
        title:'На главную',
        path: '/',
        element: <Home/>
    },
    {
        title:'Политика конфиденциальности',
        path: '/privacyPolicy',
        element: <PrivacyPolicy/>
      },
      {
        title:'Условия оплаты',
        path: '/paymentTerms',
        element: <PaymentTerms/>
      },
      {
        title:'Условия возрата товара',
        path: '/termsOfReturn',
        element: <TermsOfReturn/>
      },
]
export default routesConfigFooter