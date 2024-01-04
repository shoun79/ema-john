
import { Link } from 'react-router-dom';
import './SignUp.css'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const SignUp = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const { createUser } = useContext(AuthContext);
    const hendleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPass = form.confirmPass.value;
        setError('')
        if (password !== confirmPass) {
            setError('Your Password did not match')
            return
        }
        else if (password.length < 6) {
            setError('Password must be 6 characters')

        }
        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
            })
            .catch(error => setError(error.message))

    }
    return (
        <div className='form-container'>
            <h2 className='from-title'>Sign Up</h2>
            <form onSubmit={hendleSignUp}>
                <div className="form-control">
                    <label htmlFor='email' >Email</label>
                    <input type="email" name="email" id="" required />
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
                <div className="form-control">
                    <label htmlFor='ComfirmPass' >Confirm Password</label>
                    <input type={show ? "text" : "password"} name="confirmPass" id="confirm" required />

                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>Already have an account? <Link to='/login'>Login</Link> </small></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default SignUp;