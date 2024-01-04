
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { signIn } = useContext(AuthContext)

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const hendleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
                navigate(from, { replace: true });

            })
            .catch(error => console.log(error))

    }
    return (
        <div className='form-container'>
            <h2 className='from-title'>Login</h2>
            <form onSubmit={hendleLogin}>
                <div className="form-control">
                    <label htmlFor='email' >Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div className="form-control" style={{ position: 'relative' }}>
                    <label htmlFor='password' >Password</label>
                    <input type={show ? "text" : "password"} name="password" id="password" required />
                    <div style={{ position: 'absolute', right: '80px', bottom: '-5px' }}>
                        <p onClick={() => setShow(!show)}>
                            {
                                show ? 'Hide' : 'Show'
                            }
                        </p>
                    </div>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>New to Ema-John? <Link to="/signup">Create New Account </Link> </small></p>
        </div>
    );
};

export default Login;