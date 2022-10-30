
import logo from '../static/images/logo.png';
import Image from 'next/image';

import Link from 'next/link'
import {useRouter} from 'next/router';
import { useEffect } from 'react';


import {useRecoilState} from 'recoil'
import {loginModal} from '../state/atoms/loginModal'
import {currentUser} from '../state/atoms/user'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import baseURL from '../static/baseURL';

function Navbar() {

    const router = useRouter()

    const [show, setShow] = useRecoilState(loginModal);
    const [user, setUser] = useRecoilState(currentUser);

    const toggleShow = () => {
        setShow(!show);
    }

    const onLogout = () => {
        cookies.remove('token')
        setUser(null)
    }

    useEffect(() => {
        console.log(user)
        if(!user && cookies.get('token')){
            baseURL.post('/api/auth', null, {headers: {Authorization: 'Bearer '+cookies.get('token')}})
            .then(res => { 
                console.log(res.data)
                setUser(res.data)
            })
        } 
    },[])

    return (  
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow position-fixed w-100" style={{zIndex: '999999'}}>
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
                        <Link className={"nav-link fw-bold " + (router.pathname.includes('/articles')  ? 'active' : '') } href="/articles" style={{fontSize: '14px'}}>Article</Link>
                    </li>  
                    <li className="nav-item">
                        <Link className={"nav-link fw-bold " + (router.pathname == '/create' ? 'active' : '') } href="/create" style={{fontSize: '14px'}}>Create</Link>
                    </li>  
                </ul> 
                <ul className="navbar-nav mb-lg-0 ms-auto text-center">
                    <li className="nav-item justify-content-center d-flex align-items-center"> 
                        {user ? (
                            <div>
                                {user.user_fullname}
                            </div>
                        ) : (
                            <Link className="nav-link fw-bold" href="#" style={{fontSize: '14px', color:'#4285F4 !important', cursor: 'pointer'}} onClick={toggleShow}>Login</Link>
                        )}
                    </li>   
                        {user ? (
                    <li className="nav-item d-flex justify-content-center px-3"> 
                        <div className='btn btn-danger btn-sm'>
                            <div onClick={onLogout} style={{cursor:'pointer'}}>
                                Logout
                            </div>
                        </div>
                    </li>   
                        ) : null}
                </ul> 
            </div>
        </div>
    </nav>
    );
}

export default Navbar;