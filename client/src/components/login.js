import {useState} from 'react';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password);

        try {
            const response = await axios.post('http://localhost:3000/login', 
                JSON.stringify({email, password}),
                {
                headers: {'Content-Type': 'application/json'}
                }
            )

            console.log(response.data);
            
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();

        setEmail('');
        setPassword('');
        setMsg('');
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default Login;