
import logo from '../static/images/logo.png';
import Image from 'next/image';

import Link from 'next/link'
import {useRouter} from 'next/router';


import {useRecoilState} from 'recoil'
import {loginModal} from '../state/atoms/loginModal'

function Navbar() {

    const router = useRouter()

    const [show, setShow] = useRecoilState(loginModal);

    const toggleShow = () => {
        setShow(!show);
    }

    return (  
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow position-fixed w-100">
        <div className="container">
            <a className="navbar-brand" href="#">
                <Image  src={logo} className="w-100 mb-1" style={{maxWidth: '200px', objectFit:'contain'}} alt={'logo'}  />
            </a>
            <button className="navbar-toggler" style={{border:'unset !important'}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" style={{fontSize:'16px'}}></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-lg-0">
                    <li className="nav-item"> 
                        <Link className={"nav-link fw-bold " + (router.pathname == '/' ? 'active' : '') } href="/" style={{fontSize: '14px'}}>Home</Link>
                    </li>  
                    <li className="nav-item">
                        <Link className={"nav-link fw-bold " + (router.pathname == '/articles' ? 'active' : '') } href="/articles" style={{fontSize: '14px'}}>Article</Link>
                    </li>  
                    <li className="nav-item">
                        <Link className={"nav-link fw-bold " + (router.pathname == '/' ? 'create' : '') } href="#" style={{fontSize: '14px'}}>Create</Link>
                    </li>  
                </ul> 
                <ul className="navbar-nav mb-lg-0 ms-auto">
                    <li className="nav-item"> 
                        <Link className="nav-link fw-bold" href="#" style={{fontSize: '14px', color:'#4285F4 !important', cursor: 'pointer'}} onClick={toggleShow}>Login</Link>
                    </li>   
                </ul> 
            </div>
        </div>
    </nav>
    );
}

export default Navbar;