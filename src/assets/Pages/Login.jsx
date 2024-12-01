import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../ContaxtApi/useAuth'; // Corrected path
import axios from 'axios';
import { Url } from '../../url';
import '../../App.css';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../Loder'; // Corrected path

const Login = () => {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        agree: false
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true on form submit
        try {
            const url = `${Url}/api/v1/login`;
            const response = await axios.post(url, formData);

            if (!response.data?.status?.success) {
                throw new Error(response.data?.message || 'Login failed');
            }

            const { accessToken, loggedInUser } = response.data.status;

            if (!accessToken || !loggedInUser) {
                throw new Error('Access token or user data missing in response');
            }

            login({ accessToken, user: loggedInUser });
            setFormData({ email: "", password: "", agree: false });
            navigate("/");

            toast.success("Login Successfully!");
        } catch (error) {
            setError("Please enter a valid email and password.");
            toast.error("Login failed! Please check your credentials.");
        } finally {
            setLoading(false); // Ensure loading is set to false after operation completes
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <section className='sectionblock bg-custom-gradient'>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <div style={{ color: 'red' }} className='text-center'>{error}</div>}
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter Email'
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter Password'
                            required
                        />
                    </div>
                    <div className='check'>
                        <input
                            type="checkbox"
                            id="agree"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            className='inp'
                            required
                        />
                        <label htmlFor="agree">I agree to the terms and conditions</label>
                    </div>
                    <div className='text-right'>
                        <NavLink to="/forgot-password">Forgot Password?</NavLink>
                    </div>
                    <div>
                        <button type="submit" className='cursor-pointer'>Login now</button>
                    </div>
                    <div className='signupnow'>
                        <p>Don&apos;t have an account? <NavLink to="/register">Sign up</NavLink></p>
                    </div>
                </form>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </section>
    );
}

export default Login;
