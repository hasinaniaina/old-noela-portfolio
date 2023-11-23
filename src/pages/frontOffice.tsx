import Header from '../components/front/header';
import Services from '../components/front/services';
import Contact from '../components/front/contact';
import Loading from '../components/front/loading';


function FrontOffice() {

    return (
        <>
            <Loading/>
            <Header />
            <Services />
            <Contact />
        </>
    )
}

export default FrontOffice