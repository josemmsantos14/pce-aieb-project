import {useState} from 'react';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleLogin = async (e) => {
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
        <div>
            <h2>Login</h2>
        </div>
    );
}

export default Login;