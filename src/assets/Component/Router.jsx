import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Ragister';
import Header from '../Component/Header';
import Home from "../Pages/Home";
import ProtectedRoute from '../Component/ProtectedRoute';
import Footer from './Footer';
import DashbordAdmin from '../Pages/Dashbord/DashbordAdmin';
import About from '../Pages/About';
import Resumeone from '../Pages/AllResume/Resumeone';
import Gallery from '../Pages/Gallerydata/Gallery';
import Resume1_dataget from './Resumes/Resume1/Resume1_dataget';
import Resume2_dataget from './Resumes/resume2/Resume2.dataget';
import NotFoundPage from './Notfoundpage';

import ForgotPassword from '../Pages/ForgotPassword';
import ResetPassword from '../Pages/ResetPassword';

import Resumetwo from '../Pages/AllResume/Resumetwo';
import Update from './Resumes/Resume1/Update';

function RoutersPage() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="*" element={< NotFoundPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route path="/reset-password" element={<ResetPassword />} />


                <Route path="/DashbordAdmin" element={
                    <ProtectedRoute element={<DashbordAdmin />} />
                } />


                <Route path="/About" element={
                    <ProtectedRoute element={<About />} />
                } />

                <Route path="/resume_data1" element={
                    <ProtectedRoute element={<Resumeone />} />
                } />

                <Route path="/resume_data2" element={
                    <ProtectedRoute element={<Resumetwo />} />
                } />

                <Route path="/getresume1" element={
                    <ProtectedRoute element={<Resume1_dataget />} />
                } />

                <Route path="/getresume2" element={
                    <ProtectedRoute element={<Resume2_dataget />} />
                } />
                <Route path="/gallery" element={
                    <ProtectedRoute element={<Gallery />} />
                } />
                {/* <Route path="/History" element={
                    <ProtectedRoute element={<Historyres />} />
                } />
                <Route path="/History2" element={
                    <ProtectedRoute element={<Historyres2 />} />
                } />
                 */}

                <Route path={`/update/:id`} element={
                    <ProtectedRoute element={<Update />} />
                } />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default RoutersPage;
