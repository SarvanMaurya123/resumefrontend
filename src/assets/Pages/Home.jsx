import { useAuth } from '../ContaxtApi/useAuth';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { Link } from 'react-router-dom';
import Showresume from '../Component/Home/Showresume';
import NumberSection from '../Component/Home/NumberSection';
import Explore from '../Component/Home/Explore';
const Home = () => {
    const { user, isLoggedIn } = useAuth();
    const [animatedClass, setAnimatedClass] = useState('');

    useEffect(() => {
        if (isLoggedIn) {
            setAnimatedClass('animate-bounce');
        }
    }, [isLoggedIn]);

    useEffect(() => {
        AOS.init({ offset: 200, duration: 1500, easing: 'ease-in-out', delay: 50 });
    }, []);

    return (
        <>
            <section className='text-center overflow-hidden relative bg-custom-gradient'>
                {/* <span className='backcol'></span> */}
                {isLoggedIn && (
                    <div className="text-center md:text-left w-full mb-4 mt-4">
                        <div className='flex items-center md:text-left md:absolute left-6 justify-center md:top-32'>
                            <h1 className="text-3xl md:text-4xl font-bold capitalize typewriter-text text-white ">Hello,<span className='text-purple-400'> {user.name}</span></h1>
                            <span className={`text-4xl ml-2 ${animatedClass}`}>👋</span>
                        </div>
                    </div>
                )}
                <div className="flex flex-col md:flex-row items-center justify-between p-6 shadow-lg ">
                    <div className="md:w-1/2 text-left mr-5" data-aos="fade-right">
                        <h2 className="text-2xl md:text-5xl font-bold mb-4 leading-6 text-center md:text-left leading-normal">Build Your Professional Resume</h2>
                        <p className="text-lg mb-6 text-center text-gray-500">
                            Create a standout resume with our easy-to-use resume builder. Customize your template, add your information, and download your resume in minutes.
                        </p>
                        <div className='flex items-center gap-4'>
                            {!isLoggedIn && (
                                <>
                                    <Link to="/login"><button className="text-blue-500 py-2 px-14 md:px-20 md:ml-4 border-2 border-custom-pink hover:bg-custom-sky hover:border-custom-sky transition-colors duration-300 ease-in-out hover:text-white text-custom-pink">See Gallery</button></Link>
                                    <Link to="/login"><button className="text-blue-500 py-2 px-14 md:ml-4 border-2 border-custom-pink hover:bg-custom-sky hover:border-custom-sky transition-colors duration-300 ease-in-out hover:text-white text-custom-pink md:px-20">Start Now</button></Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-6 md:mt-0" data-aos="fade-left">
                        <img src="./Header.jpg" alt="Resume Building" className="w-full h-auto rounded-lg shadow-md" />
                    </div>
                </div>
            </section>
            <section>
                <Showresume />
            </section>
            <section className='md:mt-20 mb-4'>
                <div className=" bg-gray-100">
                    <NumberSection />
                </div>
            </section>
            <section className='md:m-24 bg-slate-300 md:p-24 rounded-xl shadow-sm md:mt-24 pt-10 pb-10 m-3'>
                <Explore />
            </section>

        </>
    );
};

export default Home;
