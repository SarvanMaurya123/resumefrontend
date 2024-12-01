
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
const Resume2_dataget = () => {
    const { token, user } = useAuth();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentResume, setCurrentResume] = useState(null);
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axios.get(`${Url}/api/v1/resume2/data`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const userResumes = response.data.filter(resume => resume.userId === user?._id);
                // console.log("Filtered Resumes:", userResumes);
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



    const deleteHandle = async (id) => {
        try {
            await axios.delete(`${Url}/api/v1/resume2/${id}`, {
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


    const downloadResume = async (resume) => {
        const resumeId = `resume-${resume._id}`;
        const element = document.getElementById(resumeId);

        // Check if the element exists
        if (!element) {
            console.error(`Resume element with ID "${resumeId}" not found!`);
            return;
        }

        // Prompt for download format
        const downloadFormat = window
            .prompt("Choose download format: 'pdf' for PDF, 'image' for PNG/JPEG, 'docx' for Word document.")
            ?.toLowerCase();

        if (!downloadFormat) return; // If the user cancels

        try {
            if (downloadFormat === 'pdf') {
                // Generate and download PDF with A4 dimensions
                const canvas = await html2canvas(element, { scale: 2, useCORS: true });

                const imgData = canvas.toDataURL("image/png");

                const pdf = new jsPDF("p", "mm", "a4");
                const pdfWidth = pdf.internal.pageSize.getWidth(); // A4 width
                const pdfHeight = pdf.internal.pageSize.getHeight(); // A4 height

                // Scale canvas content to fit A4 dimensions
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

                const scaledWidth = imgWidth * ratio;
                const scaledHeight = imgHeight * ratio;

                pdf.addImage(imgData, "PNG", 0, 0, scaledWidth, scaledHeight);
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
                // Generate and download Word document
                const doc = new Document();
                doc.addParagraph(new Paragraph("Resume").heading1());
                doc.addParagraph(`Name: ${resume.name}`);
                doc.addParagraph(`Job Title: ${resume.jobTitle}`);
                doc.addParagraph(`Contact Info: ${JSON.stringify(resume.contact, null, 2)}`);
                doc.addParagraph(`Expertise: ${resume.expertise.skills.join(', ')}`);
                doc.addParagraph(`Languages: ${resume.languages.join(', ')}`);
                doc.addParagraph(
                    `Experience: ${resume.experience
                        .map((exp) => `${exp.duration}, ${exp.companyName}, ${exp.jobTitle}`)
                        .join('\n')}`
                );
                doc.addParagraph(
                    `Education: ${resume.education
                        .map((edu) => `${edu.year}, ${edu.degree}, ${edu.university}`)
                        .join('\n')}`
                );
                doc.addParagraph(
                    `Projects: ${resume.projects
                        .map((proj) => `${proj.title}: ${proj.description}`)
                        .join('\n')}`
                );
                doc.addParagraph(
                    `References: ${resume.references
                        .map((ref) => `${ref.name}, ${ref.jobTitle}, ${ref.company}`)
                        .join('\n')}`
                );

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


    if (loading) {
        return <p className='text-center mt-8 mb-8 text-3xl'><Loader /></p>;
    }

    if (error) {
        return <p className='text-center mt-8 mb-8 text-3xl'>{error}</p>;
    }

    return (
        <>
            <div className={styles.downlode_header}>
                <h2>Download Your Resume Here</h2>

            </div>

            <div className="mt-3">
                {resumes.length > 0 ? (
                    resumes.map((resume, index) => (
                        <div key={index} className="w-[210mm] h-auto bg-white mx-auto shadow-lg border border-gray-300 p-10 border-b-0" id={`resume-${resume._id}`}>
                            <header className="text-center border-b border-gray-400 pb-6 mb-8">
                                <h1 className="text-4xl font-bold uppercase text-black">{resume.name}</h1>
                                <h2 className="text-xl font-medium uppercase text-gray-700  text-black">{resume.jobTitle}</h2>
                            </header>

                            <div className='mb-5'>
                                <p className='text-justify text-black'>{resume.yourinfo}</p>
                            </div>
                            <div className="flex gap-8 ">
                                <aside className="w-[35%] text-sm  text-black">
                                    {/* Contact Section */}
                                    <section className="mb-6  text-black">
                                        <h3 className="text-lg  text-black font-semibold uppercase border-b border-gray-400 pb-2 mb-4">Contact</h3>
                                        <p className='text-black'>{resume.contact.phone}</p>
                                        <p className='text-black'> {resume.contact.email}</p>
                                        <p className='text-black'> {resume.contact.city}</p>
                                        <p className='text-black'> {resume.contact.state}</p>
                                        <p className='text-black'> {resume.contact.address}</p>
                                    </section>

                                    {/* Skills Section */}
                                    <section className="mb-6">
                                        <h3 className="text-lg font-semibold uppercase border-b border-gray-400 pb-2 mb-4  text-black">Skills</h3>
                                        <ul className="list-disc pl-5  text-black">
                                            {resume.expertise.skills.map((skill, idx) => (
                                                <li key={idx} className="mb-2 text-black">{skill}</li>
                                            ))}
                                        </ul>
                                    </section>

                                    {/* Education Section */}
                                    <section>
                                        <h3 className="text-lg font-semibold uppercase border-b border-gray-400 pb-2 mb-4  text-black">Education</h3>
                                        {resume.education.map((edu, idx) => (
                                            <div key={idx} className="mb-4  text-black">
                                                <p className='text-black'><strong>{edu.degree}</strong></p>
                                                <p className='text-black'>{edu.university}</p>
                                                <p className='text-black'>{edu.year} | {edu.city}, {edu.state}</p>
                                            </div>
                                        ))}
                                    </section>
                                </aside>

                                {/* Right Column */}
                                <main className="w-[65%] text-sm  text-black">
                                    {/* Experience Section */}
                                    <section className="mb-6">
                                        <h3 className="text-lg font-semibold uppercase border-b border-gray-400 pb-2 mb-4  text-black">Experience</h3>
                                        {resume.experience.map((exp, idx) => (
                                            <div key={idx} className="mb-6">
                                                <p className='text-black'><strong>{exp.jobTitle}</strong> at {exp.companyName}</p>
                                                <p className='text-black'>{exp.duration} | {exp.location}</p>
                                                <p className="text-justify  text-black">{exp.jobDescription}</p>
                                            </div>
                                        ))}
                                    </section>

                                    {/* Projects Section */}
                                    <section>
                                        <h3 className="text-lg font-semibold uppercase border-b border-gray-400 pb-2 mb-4  text-black">Projects</h3>
                                        {resume.projects.map((proj, idx) => (
                                            <div key={idx} className="mb-6">
                                                <p className='text-black'><strong>{proj.title}</strong></p>
                                                <p className="text-justify  text-black">{proj.description}</p>
                                            </div>
                                        ))}
                                    </section>
                                </main>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-xl">No resumes available. Please create one.</p>
                )}
            </div>
            {/* Buttons for Downloading and Deleting Resumes */}
            <div className='mt-3 mb-5'>
                {resumes.map((resume, index) => (
                    <div key={index} id={`resume-${resume._id}`} className='flex justify-center gap-4 mt-4'>
                        <button
                            onClick={() => deleteHandle(resume._id)}
                            className="bg-red-500 text-white py-2 px-4 hover:bg-red-600 transition duration-300 ease-in-out "
                        >
                            Delete Resume
                        </button>
                        <button
                            className=" border-[1px] border-black py-2 px-4 text-black hover:bg-white hover:border-white"
                            onClick={() => downloadResume(resume)}
                        >
                            Download Resume
                        </button>

                        <button
                            className=" py-2 px-5 bg-[#ffab00] text-center text-white hover:bg-[#c88200]"
                            onClick={() => handleUpdate(resume)}
                        >
                            Update Resume
                        </button>
                    </div>
                ))}
                {/* Modal for Updating Resume */}
                {modalOpen && currentResume && (
                    <Update resumeId={currentResume._id} onClose={closeModal} />
                )}
            </div>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
};

export default Resume2_dataget;

