
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Url } from '../../../../url';
import styles from '../Resume1/Resume.module.css';
import { useAuth } from '../../../ContaxtApi/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../../../Loder';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Update from './Update';
const Resume1_dataget = () => {
    const { token, user } = useAuth();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentResume, setCurrentResume] = useState(null);
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axios.get(`${Url}/api/v1/resume1`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const userResumes = response.data.filter(resume => resume.userId === user?._id);

                setResumes(userResumes);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
                setLoading(false);
            }
        };

        fetchResumes();
    }, [token, user?._id]);


    const handleUpdate = (resume) => {
        if (!resume) {
            toast.error("Resume data not found.");
            return;
        }
        setCurrentResume(resume); // Set the current resume for updating
        setModalOpen(true); // Open the modal
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false); // Close the modal
        setCurrentResume(null); // Clear the current resume
    };

    const deleteHandle = async (id) => {
        try {
            await axios.delete(`${Url}/api/v1/resume1/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setResumes(resumes.filter(resume => resume._id !== id));
            toast.success("Resume deleted successfully.");
        } catch (error) {
            toast.error("Failed to delete the resume.");
            console.error('Error deleting resume:', error);
        }
    }

    if (loading) {
        return <p className='text-center mt-8 mb-8 text-3xl'><Loader /></p>;
    }

    if (error) {
        return <p className='text-center mt-8 mb-8 text-3xl'>{error}</p>;
    }


    const downloadResume = async (resume) => {
        const resumeId = `resume-${resume._id}`;
        const element = document.getElementById(resumeId);

        // Check if the element exists
        if (!element) {
            console.error(`Resume element with ID "${resumeId}" not found!`);
            return;
        }

        // Prompt for download format
        const downloadFormat = window.prompt(
            "Choose download format: 'pdf' for PDF, 'image' for PNG/JPEG, 'docx' for Word document."
        ).toLowerCase();

        try {
            if (downloadFormat === 'pdf') {
                // Generate and download PDF
                const canvas = await html2canvas(element, { scale: 2, useCORS: true });
                const imgData = canvas.toDataURL("image/png");

                const pdf = new jsPDF("p", "mm", "a4");
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${resume.name || "resume"}.pdf`);

            } else if (downloadFormat === 'image') {
                // Generate and download image (PNG/JPEG)
                const canvas = await html2canvas(element, { scale: 2, useCORS: true });
                const fileFormat = window.confirm("Would you like to download as PNG? 'Cancel' for JPEG.") ? 'png' : 'jpeg';
                canvas.toBlob((blob) => {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = `${resume.name || "resume"}.${fileFormat}`;
                    link.click();
                });

            } else if (downloadFormat === 'docx') {
                // Generate and download Word document using a library like `docxtemplater`
                const doc = new Document();
                doc.addParagraph(new Paragraph("Resume").heading1());
                doc.addParagraph(`Name: ${resume.name}`);
                doc.addParagraph(`Job Title: ${resume.jobTitle}`);
                doc.addParagraph(`Contact Info: ${JSON.stringify(resume.contact, null, 2)}`);
                doc.addParagraph(`Expertise: ${resume.expertise.skills.join(', ')}`);
                doc.addParagraph(`Languages: ${resume.languages.join(', ')}`);
                doc.addParagraph(`Experience: ${resume.experience.map(exp => `${exp.duration}, ${exp.companyName}, ${exp.jobTitle}`).join('\n')}`);
                doc.addParagraph(`Education: ${resume.education.map(edu => `${edu.year}, ${edu.degree}, ${edu.university}`).join('\n')}`);
                doc.addParagraph(`Projects: ${resume.projects.map(proj => `${proj.title}: ${proj.description}`).join('\n')}`);
                doc.addParagraph(`References: ${resume.references.map(ref => `${ref.name}, ${ref.jobTitle}, ${ref.company}`).join('\n')}`);

                Packer.toBlob(doc).then((blob) => {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = `${resume.name || "resume"}.docx`;
                    link.click();
                });

            } else {
                alert('Invalid format selected. Please try again.');
            }
        } catch (error) {
            console.error("Error generating the download:", error);
            toast.error("Failed to generate download. Please try again later.");
        }
    };


    return (
        <>
            <div className={styles.downlode_header}>
                <h2>Download Your Resume Here</h2>
                <div className='mb-10'>
                    <p className='text-red-600 text-3xl'>Note</p>
                    <p className='text-black text-lg'>
                        Please save your resume and work only valid for this resume
                        <span className='text-red-600 text-xl'>30 min</span> after 30 min delete your work please carefully.
                    </p>
                    <p>After Save Your Work so that go and click profile and go for your History see your create history.</p>
                </div>
            </div>

            {/* Main Resume Container for A4 Layout */}
            <div className="a4-container w-full md:w-2/3 md:mr-52 md:ml-52 mb-10 mt-10 text-black">
                {resumes.length > 0 ? (
                    resumes.map((resume, index) => (
                        <div key={index} id={`resume-${resume._id}`} className="a4-resume-container mb-10">
                            {/* Resume Content */}
                            <div className="a4-resume-content bg-white shadow-lg p-8 border border-gray-300">
                                {/* Header Section */}
                                <div className="flex items-center gap-8">
                                    {resume.profilePic && (
                                        <div className="w-[263px] pt-5 pb-10">
                                            <div className="rounded-full items-center ml-10">
                                                <img
                                                    src={resume.profilePic}
                                                    alt="Profile"
                                                    className="w-44 h-44 object-fill object-cover rounded-full"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="leading-relaxed w-2/3 text-black">
                                        <h2 className="font-semibold text-4xl text-center tracking-widest uppercase pb-1 text-black">
                                            {resume.name}
                                        </h2>
                                        <h3 className="font-medium text-xl text-center text-gray-500 uppercase pb-3 text-black">
                                            {resume.jobTitle}
                                        </h3>
                                        <p className="font-medium text-sm text-justify text-black">{resume.yourinfo}</p>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="flex pl-0 gap-[12px] text-black">
                                    {/* Left Column */}
                                    <div className="w-[263px] pl-5">
                                        {/* Contact Section */}
                                        <div className="mt-2 pb-2">
                                            <h4 className="font-semibold text-lg border-b-2 text-black uppercase pb-2">Contact</h4>
                                            <p className="text-sm mt-3 text-black ">{resume.contact.phone}</p>
                                            <p className="text-sm mt-3 text-black ">{resume.contact.email}</p>
                                            <p className="text-sm mt-3 text-black ">{resume.contact.city}</p>
                                            <p className="text-sm mt-3 text-black ">{resume.contact.address}</p>
                                        </div>

                                        {/* Expertise Section */}
                                        <div className="mt-2 pb-5">
                                            <h4 className="font-semibold text-lg border-b-2 text-black uppercase pb-2">Expertise</h4>
                                            <ul className="list-disc pl-5">
                                                {resume.expertise.skills.map((skill, idx) => (
                                                    <li key={idx} className="text-sm mt-3">{skill}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Language Section */}
                                        <div className="mt-2">
                                            <h4 className="font-semibold text-lg border-b-2 text-black uppercase pb-3">Language</h4>
                                            <ul className="list-disc pl-5">
                                                {resume.languages.map((lang, idx) => (
                                                    <li key={idx} className="text-sm mt-3 text-black">{lang}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="ml-5 w-2/3">
                                        {/* Experience Section */}
                                        <div className="mt-2">
                                            <h4 className="font-semibold text-lg border-b-2 text-black uppercase">Experience</h4>
                                            {resume.experience.map((exp, idx) => (
                                                <div key={idx} className="mb-5">
                                                    <div className="flex gap-5 mt-2 text-sm">
                                                        <p className='text-black'>{exp.duration}</p>|<p className='text-black'>{exp.companyName}</p>|<p className='text-black'>{exp.location}</p>
                                                    </div>
                                                    <p className="text-sm mt-2 font-bold text-black">{exp.jobTitle}</p>
                                                    <p className="text-sm text-justify text-black">{exp.jobDescription}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Education Section */}
                                        <div className="mt-2">
                                            <h4 className="font-semibold text-lg border-b-2 text-black uppercase">Education</h4>
                                            {resume.education.map((edu, idx) => (
                                                <div key={idx} className="mb-5 text-black">
                                                    <div className="flex gap-5 mt-2 text-sm">
                                                        <p className='text-black'>{edu.year}</p>|<p className='text-black'>{edu.city}</p>|<p className='text-black'>{edu.state}</p>
                                                    </div>
                                                    <p className="text-sm mt-2 font-bold text-black">{edu.degree}</p>
                                                    <p className="text-sm text-black">{edu.university}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Projects Section */}
                                        <div className="mt-2">
                                            <h4 className="font-semibold text-lg border-b-2 text-black uppercase">Projects</h4>
                                            {resume.projects.map((proj, idx) => (
                                                <div key={idx} className="mb-5">
                                                    <p className="font-bold text-black ">{proj.title}</p>
                                                    <p className="text-sm text-justify text-black ">{proj.description}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* References Section */}
                                        <div className="mt-2">
                                            <h4 className="font-semibold text-lg border-b-2 text-black uppercase">References</h4>
                                            {resume.references.map((ref, idx) => (
                                                <div key={idx} className="mb-4">
                                                    <p className='text-black '><strong>Name:</strong> {ref.name}</p>
                                                    <p className='text-black '><strong>Job Title:</strong> {ref.jobTitle}</p>
                                                    <p className='text-black '><strong>Company:</strong> {ref.company}</p>
                                                    <p className='text-black '><strong>Phone:</strong> {ref.phone}</p>
                                                    <p className='text-black '><strong>Email:</strong> {ref.email}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-xl text-gray-500">
                        No resumes available. Please fill in your information and create a resume.
                    </p>
                )}
            </div>

            <div className=''>
                {resumes.map((resume, index) => (
                    <div key={index} id={`resume-${resume._id}`} className='flex justify-center gap-7 mb-6'>
                        <button
                            onClick={() => deleteHandle(resume._id)}
                            className="bg-red-500 text-white py-2 px-5 hover:bg-red-600 transition duration-300 ease-in-out "
                        >
                            Delete Resume
                        </button>
                        <button
                            className=" border-[1px] border-black py-2 px-5 text-black hover:bg-white hover:border-white duration-300 ease-in-out "
                            onClick={() => downloadResume(resume)}
                        >
                            Download Resume
                        </button>
                        <button
                            onClick={() => handleUpdate(resume)}
                            className=" py-2 px-5 bg-[#ffab00] text-center text-white hover:bg-[#c88200]"
                        >
                            Update Resume
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal for Updating Resume */}
            {modalOpen && currentResume && (
                <Update resumeId={currentResume._id} onClose={closeModal} />
            )}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        </>
    );
};

export default Resume1_dataget;

