import { useEffect } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import LineChart from '../../Component/Dashbord/LineChart';
import DashboardApis from './DashboardApis';
// import { useAuth } from '../../ContaxtApi/Context';
import ActiveUser from '../../Component/Dashbord/Activeuser'
import Inactive from './Inactive';
// import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    // const navigate = useNavigate();
    //const { user } = useAuth();

    useEffect(() => {
        AOS.init({ offset: 200, duration: 1000, easing: 'ease-in-out', delay: 50 });
    }, []);



    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="flex flex-col md:flex-row flex-1">
                <aside className="w-full md:w-1/4 bg-slate-900 text-white p-5 shadow-md">
                    <h2 className="font-bold pb-5 text-center">Admin Dashboard</h2>
                    <nav className="text-center">
                        <ul>
                            <li className="mb-4 pt-2 pb-2 rounded-md font-bold border-y-2 border-gray-300 transition duration-300 ease-in-out hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:shadow-purple-500/50 hover:shadow-md hover:shadow-pink-500/30 hover:border-transparent">
                                <Link to="#" className="text-gray-400 hover:text-white transition duration-300 ease-in-out">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="mb-6 pt-2 pb-2 rounded-md font-bold border-y-2 border-gray-300 transition duration-300 ease-in-out hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:shadow-purple-500/50 hover:shadow-md hover:shadow-pink-500/30 hover:border-transparent">
                                <Link to="#" className="text-gray-400 hover:text-white">Users</Link>
                            </li>
                            <li className="mb-4 pt-2 pb-2 rounded-md font-bold border-y-2 border-gray-300 transition duration-300 ease-in-out hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:shadow-purple-500/50 hover:shadow-md hover:shadow-pink-500/30 hover:border-transparent">
                                <Link to="#" className="text-gray-400 hover:text-white">Payments</Link>
                            </li>
                            <li className="mb-4 pt-2 pb-2 rounded-md font-bold border-y-2 border-gray-300 transition duration-300 ease-in-out hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:shadow-purple-500/50 hover:shadow-md hover:shadow-pink-500/30 hover:border-transparent">
                                <Link to="#" className="text-gray-400 hover:text-white">Settings</Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-5 bg-slate-950 text-white">
                    <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="bg-white p-5 shadow-md rounded-lg bg-gradient-to-r from-blue-200 to-green-200 transition-transform transform hover:scale-105 hover:shadow-xl" data-aos="fade-right">
                            <h2 className="text-xl font-semibold text-green-600">Total Users:</h2>
                            <div className="text-gray-700"> <DashboardApis /> </div>
                        </div>
                        <div className="bg-white p-5 shadow-md rounded-lg bg-gradient-to-r from-pink-200 to-yellow-200 transition-transform transform hover:scale-105 hover:shadow-xl" data-aos="zoom-in">
                            <h2 className="text-xl font-semibold text-yellow-600">Total Active Users:</h2>
                            <div className="text-gray-700"><ActiveUser /></div>
                        </div>
                        <div className="bg-white p-5 shadow-md rounded-lg bg-gradient-to-r from-purple-200 to-blue-200 transition-transform transform hover:scale-105 hover:shadow-xl" data-aos="fade-left">
                            <h2 className="text-xl font-semibold text-blue-600">Inactive Users:</h2>
                            <div className="text-gray-700"><Inactive /></div>
                        </div>
                        <div className="bg-white p-5 shadow-md rounded-lg bg-gradient-to-r from-blue-200 to-green-200 col-span-1 lg:col-span-3 transition-transform transform hover:scale-105 hover:shadow-xl" data-aos="fade-up">
                            <LineChart />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;




