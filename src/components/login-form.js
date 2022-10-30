import {useState} from 'react';

import {useRecoilState} from 'recoil'
import {loginModal} from '../state/atoms/loginModal'
import {registerModal} from '../state/atoms/registerModal'

import baseURL from '../static/baseURL';

import {currentUser} from '../state/atoms/user'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function LoginForm() {

    const [show, setShow] = useRecoilState(loginModal);
    const [user, setUser] = useRecoilState(currentUser);
    const [showRegister, setShowRegister] = useRecoilState(registerModal);

    const toggleShow = () => {
        setShow(!show);
    }

    const [state, setState] = useState({
        email: '', password: '', isSubmit: false
    })

    const handleChange = (event, id) => {
        setState({...state, [id] : event.target.value});
    };

    const onSubmit = () => {
        setState({...state, isSubmit: true});
        if(state.email && state.password){
            baseURL.post('/api/auth/login', state)
            .then(res => {
                cookies.set('token', res.data.token, { path: '/' });
                setUser(res.data.user)
            }).catch(err => {
                console.log(err)
            })
            setShow(false)
        }
    }

    const onRegister = () => {
        setShowRegister(true)
        setShow(false)
    }  

    return (
        show ? (
        <div>
            <div className="custom-modal">
                <div className='position-relative'>
                    <div>
                        <div className="custom-modal-close fw-bolder" onClick={toggleShow}>X</div>
                    </div>
                    <h2 className="h4 fw-bolder">Login</h2>
                    <div>Don't have an account? <strong className="text-danger" onClick={onRegister} style={{cursor:'pointer'}}>Create Account</strong></div>

                    <div class="mt-4">
                        <label className="form-label h6">Email address</label>
                        <input type="email" className="form-control" placeholder="name@example.com" onChange={event => handleChange(event, 'email')} />
                        {state.isSubmit && !state.email && <div className="text-danger">Email is required</div>}
                    </div>
                    <div class="mt-2">
                        <label className="form-label h6">Password</label>
                        <input type="password" className="form-control" placeholder="*****" onChange={event => handleChange(event, 'password')} />
                        {state.isSubmit && !state.password && <div className="text-danger">Password is required</div>}
                    </div>

                    <button className="btn btn-danger mt-4" onClick={onSubmit}>
                        Log In
                    </button>
                </div> 
            </div>
            <div className="custom-modal-overlay"/>
        </div>
        ) : null
    );
}

export default LoginForm;