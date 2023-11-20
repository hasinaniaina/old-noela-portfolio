import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import  { ReactNode, useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

import '../backOffice.css';

interface Content {
    children: ReactNode
}

function BackOffice(props: Content) {
    const params                    = window.location.pathname.split("/");
    const menu                      = params[2] ? params[2] : params[1];
    const [buttonTop, setButtonTop] = useState<number | string>('');
    const clickedMenu               = menu;

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(clickedMenu);
            if (user) {
              const uid = user.uid;
              console.log(uid);
            } else {
                navigate('/login');
            }
          });
    }, []);

    const signUserOut = () => {
        signOut(auth).then(() => {
            navigate('/login');
        });
    }

    // Animation on scroll
    window.addEventListener('scroll', () => {
        const backOfficeHeaderHeight = document.getElementById('backOffice-header')?.clientHeight;
        const scroll = window.scrollY;

        if (backOfficeHeaderHeight) {
        if (scroll >= backOfficeHeaderHeight) {
            setButtonTop(0);
        } else {
            const position = backOfficeHeaderHeight - scroll;
            setButtonTop(position)
        }
        }
    });
    return (
        <div className="backOffice-container">
            <div className="header-backOffice-container" id='backOffice-header'>
                <div className="user-info">
                    <h1>Back Office</h1>
                </div>
                <div className="signout">
                    <button className="alert alert-warning" onClick={signUserOut}>Sign Out</button>
                </div>
            </div>
            <div className="content-container">
                <div className="left-clone-container"></div>
                <div className="left-container" style={{top:buttonTop}}>
                    <ul>
                        <li>
                            <Link 
                                className={(clickedMenu == 'headerContent' || clickedMenu == 'backOffice') ? 'clicked' : 'non-clicked'} 
                                to="/backOffice/headerContent">
                                    Header
                            </Link>
                        </li>
                        <li>
                            <Link 
                                className={(clickedMenu == 'BodyContent') ? 'clicked' : 'non-clicked'}
                                to="/backOffice/BodyContent"
                                >Content
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="right-container">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default BackOffice