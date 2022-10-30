import {useState} from 'react';

import {useRecoilState} from 'recoil'
import {loginModal} from '../state/atoms/loginModal'
import {registerModal} from '../state/atoms/registerModal'

import baseURL from '../static/baseURL';

function RegisterForm() {

    const [show, setShow] = useRecoilState(registerModal);
    const [showLogin, setShowLogin] = useRecoilState(loginModal);

    const toggleShow = () => {
        setShow(!show);
    }

    const [state, setState] = useState({
        email: '', password: '', isSubmit: false, confirm_password: ''
    })

    const handleChange = (event, id) => {
        setState({...state, [id] : event.target.value});
    };

    const onSubmit = () => {
        setState({...state, isSubmit: true});
        if(state.email && state.password && state.password == state.confirm_password){
            
        }
    }

    const onLogin = () => {
        setShowLogin(true)
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
                    <h2 className="h4 fw-bolder">Create Account</h2>
                    <div>Have an account? <strong className="text-danger" onClick={onLogin} style={{cursor:'pointer'}}>Login</strong></div>

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
                    <div class="mt-2">
                        <label className="form-label h6">Confirm Password</label>
                        <input type="password" className="form-control" placeholder="*****" onChange={event => handleChange(event, 'confirm_password')} />
                        {state.isSubmit && state.confirm_password != state.password && <div className="text-danger">Confirm Password not same</div>}
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

export default RegisterForm;