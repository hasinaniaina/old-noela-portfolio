import {Routes, Route} from 'react-router-dom'
import FrontOffice from './pages/frontOffice'
import HeaderContent from './components/back/partials/headerContent'
import BodyContent from './components/back/partials/bodyContent'
import Login from './pages/login'
import SignUp from './pages/signUp'

function Router() {
    return (
        <Routes>
            <Route path='/' element={<FrontOffice />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/backOffice' element={<HeaderContent />}/>
            <Route path='/backOffice/headerContent' element={<HeaderContent />}/>
            <Route path='/backOffice/bodyContent' element={<BodyContent />}/>
            <Route path='/signUp' element={<SignUp />}/>
        </Routes>
    )
}

export default Router