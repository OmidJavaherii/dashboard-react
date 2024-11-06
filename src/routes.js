import Products from './Components/Products/Products'
import Comments from './Components/Comments/Comments'
import Users from './Components/Users/Users'
import Orders from './Components/Orders/Orders'
import Offs from './Components/Offs/Offs'
import Home from './Components/Home/Home'
import PageNotFound from './Components/PageNotFound/PageNotFound'

const routes = [
    {path: '/home', element: <Home />},
    {path: '/products', element: <Products />},
    {path: '/comments', element: <Comments />},
    {path: '/users', element: <Users />},
    {path: '/orders', element: <Orders />},
    {path: '/offs', element: <Offs />},
    {path: '*', element: <PageNotFound />},
]

export default routes;