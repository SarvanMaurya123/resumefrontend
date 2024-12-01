import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../ContaxtApi/useAuth'; // Corrected path
import { NavLink } from "react-router-dom";
import { Url } from "../../url";
import '../../App.css';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../Loder'; // Corrected path

const Register = () => {
    const { isLoggedIn } = useAuth(); // Removed unnecessary user data
    const [loading, setLoading] = useState(false); // Set initial loading state to false
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        tel: '',
        isActive: '',
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
            const response = await fetch(`${Url}/api/v1/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response);

            if (response.ok) {
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    tel: '',
                    isActive: '',
                    agree: false
                });
                toast.success("Registration successful!");
                navigate("/login");
            } else if (response.status === 400) {
                toast.error('Name & Email already exist. Please log in!');
                setError('Name & Email already exist. Please log in!');
                setTimeout(() => setError(null), 5000); // Increased timeout for visibility
            } else {
                const responseData = await response.json();
                console.error('Sign up failed:', responseData.message || 'Unknown error');
                toast.error(responseData.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            toast.error("An error occurred. Please try again.");
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
                {isLoggedIn && (
                    <div style={{ color: "red" }} className='text-center'>
                        <p>Account already exists. Please log in.</p>
                    </div>
                )}
                {!isLoggedIn && (
                    <form onSubmit={handleSubmit}>
                        <h2>Sign Up</h2>
                        {error && (
                            <div style={{ color: "red" }} className='text-center mt-0 mb-2'>
                                <p>{error}</p>
                            </div>
                        )}
                        <div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Name'
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Email'
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                id="tel"
                                name="tel"
                                value={formData.tel}
                                onChange={handleChange}
                                placeholder='Phone Number'
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
                                placeholder='Password'
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
                        <div>
                            <button type="submit">Sign Up</button>
                        </div>
                        <div className='signupnow'>
                            <p>Already have an account? <NavLink to="/login">Log in</NavLink></p>
                        </div>
                    </form>
                )}
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </section>
    );
}

export default Register;