import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../ContaxtApi/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { Url } from '../../../../url';
import { FiUpload } from 'react-icons/fi';
import Loader from '../../../../Loder';
const Resume1_data = () => {
    const { token } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        yourinfo: '',
        contact: {
            phone: '',
            email: '',
            address: '',
            city: '',
            state: ''
        },
        education: [{ year: '', degree: '', university: '', city: '', state: '' }],
        experience: [{ duration: '', companyName: '', location: '', jobTitle: '', jobDescription: '' }],
        expertise: { skills: [''] },
        projects: [{ title: '', description: '' }],
        languages: [''],
        references: [{ name: '', jobTitle: '', company: '', phone: '', email: '' }],
        profilePic: null // Changed to null to handle file
    });
    const [file, setFile] = useState(null); // State for file upload

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            contact: {
                ...formData.contact,
                [name]: value
            }
        });
    };

    const handleArrayChange = (e, index, arrayName) => {
        const { name, value } = e.target;
        const updatedArray = [...formData[arrayName]];
        updatedArray[index] = {
            ...updatedArray[index],
            [name]: value
        };
        setFormData({
            ...formData,
            [arrayName]: updatedArray
        });
    };

    const handleArrayAdd = (arrayName) => {
        setFormData({
            ...formData,
            [arrayName]: [...formData[arrayName], {}]
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Set the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handelClear
        setLoading(true);
        const form = new FormData();
        form.append('name', formData.name);
        form.append('jobTitle', formData.jobTitle);
        form.append('yourinfo', formData.yourinfo);
        form.append('contact[phone]', formData.contact.phone);
        form.append('contact[email]', formData.contact.email);
        form.append('contact[address]', formData.contact.address);
        form.append('contact[city]', formData.contact.city);
        form.append('contact[state]', formData.contact.state);

        formData.education.forEach((edu, index) => {
            form.append(`education[${index}][year]`, edu.year);
            form.append(`education[${index}][degree]`, edu.degree);
            form.append(`education[${index}][university]`, edu.university);
            form.append(`education[${index}][city]`, edu.city);
            form.append(`education[${index}][state]`, edu.state);
        });

        formData.experience.forEach((exp, index) => {
            form.append(`experience[${index}][duration]`, exp.duration);
            form.append(`experience[${index}][companyName]`, exp.companyName);
            form.append(`experience[${index}][location]`, exp.location);
            form.append(`experience[${index}][jobTitle]`, exp.jobTitle);
            form.append(`experience[${index}][jobDescription]`, exp.jobDescription);
        });

        formData.expertise.skills.forEach((skill, index) => {
            form.append(`expertise[skills][${index}]`, skill);
        });

        formData.projects.forEach((proj, index) => {
            form.append(`projects[${index}][title]`, proj.title);
            form.append(`projects[${index}][description]`, proj.description);
        });

        formData.languages.forEach((lang, index) => {
            form.append(`languages[${index}]`, lang);
        });

        formData.references.forEach((ref, index) => {
            form.append(`references[${index}][name]`, ref.name);
            form.append(`references[${index}][jobTitle]`, ref.jobTitle);
            form.append(`references[${index}][company]`, ref.company);
            form.append(`references[${index}][phone]`, ref.phone);
            form.append(`references[${index}][email]`, ref.email);
        });

        if (file) {
            form.append('profilePic', file); // Append the file
        }

        try {
            const response = await axios.post(`${Url}/api/v1/resume1`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Resume submitted successfully!');
            handelClear();
            navigate('/getresume1');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handelClear = () => {
        setFormData({
            name: '',
            jobTitle: '',
            yourinfo: '',
            contact: {
                phone: '',
                email: '',
                address: '',
                city: '',
                state: ''
            },
            education: [{ year: '', degree: '', university: '', city: '', state: '' }],
            experience: [{ duration: '', companyName: '', location: '', jobTitle: '', jobDescription: '' }],
            expertise: { skills: [''] },
            projects: [{ title: '', description: '' }],
            languages: [''],
            references: [{ name: '', jobTitle: '', company: '', phone: '', email: '' }],
            profilePic: null // Changed to null to handle file
        })
    }

    if (loading) {
        return <Loader />
    }
    return (<>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-none shadow-none rounded-none shadow-inherit-none">
            <h1 className="text-4xl font-bold mb-10  text-center">Create Resume</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="transition duration-300 ease-in-out  mt-1 block w-full p-2 " />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Job Title:
                        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="transition duration-300 ease-in-out    mt-1 block w-full p-2 border bg-white " />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Job Title:
                        <textarea type="text" name="yourinfo" value={formData.yourinfo} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </label>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Phone:
                        <input type="text" name="phone" value={formData.contact.phone} onChange={handleContactChange} className="transition duration-300 ease-in-out   mt-1 block w-full p-2 " />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Email:
                        <input type="email" name="email" value={formData.contact.email} onChange={handleContactChange} className="transition duration-300 ease-in-out   mt-1 block w-full p-2 " />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Address:
                        <input type="text" name="address" value={formData.contact.address} onChange={handleContactChange} className="transition duration-300 ease-in-out  mt-1 block w-full p-2" />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">
                        City:
                        <input type="text" name="city" value={formData.contact.city} onChange={handleContactChange} className="transition duration-300 ease-in-out   mt-1 block w-full p-2 " />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">
                        State:
                        <input type="text" name="state" value={formData.contact.state} onChange={handleContactChange} className="transition duration-300 ease-in-out  mt-1 block w-full p-2 " />
                    </label>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Education</h2>
            {formData.education.map((edu, index) => (
                <div key={index} className=" p-4 mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Year:
                        <input type="number" name="year" value={edu.year} onChange={(e) => handleArrayChange(e, index, 'education')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        Degree:
                        <input type="text" name="degree" value={edu.degree} onChange={(e) => handleArrayChange(e, index, 'education')} className="transition duration-300 ease-in-out  focus:ring-2  mt-1 block w-full p-2 " />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        University:
                        <input type="text" name="university" value={edu.university} onChange={(e) => handleArrayChange(e, index, 'education')} className="transition duration-300 ease-in-out   mt-1 block w-full p-2 " />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        City:
                        <input type="text" name="city" value={edu.city} onChange={(e) => handleArrayChange(e, index, 'education')} className="transition duration-300 ease-in-out  mt-1 block w-full p-2 " />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        State:
                        <input type="text" name="state" value={edu.state} onChange={(e) => handleArrayChange(e, index, 'education')} className="transition duration-300 ease-in-out  mt-1 block w-full p-2 " />
                    </label>
                </div>
            ))}
            <button type="button" onClick={() => handleArrayAdd('education')} className="bg-blue-500 text-white py-2 px-4">Add Education</button>

            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            {formData.experience.map((exp, index) => (
                <div key={index} className="p-4 mb-4 ">
                    <label className="block text-sm font-medium mb-2">
                        Duration:
                        <input type="text" name="duration" value={exp.duration} onChange={(e) => handleArrayChange(e, index, 'experience')} className="transition duration-300 ease-in-out  mt-1 block w-full p-2 " />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        Company Name:
                        <input type="text" name="companyName" value={exp.companyName} onChange={(e) => handleArrayChange(e, index, 'experience')} className="transition duration-300 ease-in-out  mt-1 block w-full p-2 " />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        Location:
                        <input type="text" name="location" value={exp.location} onChange={(e) => handleArrayChange(e, index, 'experience')} className="transition duration-300 ease-in-out  mt-1 block w-full p-2 " />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        Job Title:
                        <input type="text" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleArrayChange(e, index, 'experience')} className="transition duration-300 ease-in-out  mt-1 block w-full p-2 " />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        Job Description:
                        <textarea name="jobDescription" value={exp.jobDescription} onChange={(e) => handleArrayChange(e, index, 'experience')} className="transition duration-300 ease-in-out  mt-1 block w-full p-2 border border-gray-300 " />
                    </label>
                </div>
            ))}
            <button type="button" onClick={() => handleArrayAdd('experience')} className="bg-blue-500 text-white py-2 px-4">Add Experience</button>

            <h2 className="text-xl font-semibold mb-4">Expertise</h2>
            <div className=" p-4 mb-4">
                <label className="block text-sm font-medium mb-2">
                    Skills:
                    {formData.expertise.skills.map((skill, index) => (
                        <div key={index} className="mb-2">
                            <input type="text" value={skill} onChange={(e) => {
                                const updatedSkills = [...formData.expertise.skills];
                                updatedSkills[index] = e.target.value;
                                setFormData({
                                    ...formData,
                                    expertise: {
                                        ...formData.expertise,
                                        skills: updatedSkills
                                    }
                                });
                            }} className="transition duration-300 ease-in-out  mt-1 block w-full p-2 " />
                        </div>
                    ))}
                </label>
                <button type="button" onClick={() => setFormData({
                    ...formData,
                    expertise: {
                        ...formData.expertise,
                        skills: [...formData.expertise.skills, '']
                    }
                })} className="bg-blue-500 text-white py-2 px-4">Add Skill</button>
            </div>

            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            {formData.projects.map((proj, index) => (
                <div key={index} className=" p-4 mb-4 ">
                    <label className="block text-sm font-medium mb-2">
                        Title:
                        <input type="text" name="title" value={proj.title} onChange={(e) => handleArrayChange(e, index, 'projects')} className="transition duration-300 ease-in-out  mt-1 block w-full p-2" />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        Description:
                        <textarea name="description" value={proj.description} onChange={(e) => handleArrayChange(e, index, 'projects')} className="transition duration-300 ease-in-out  mt-1 block w-full p-1 border border-gray-300" />
                    </label>
                </div>
            ))}
            <button type="button" onClick={() => handleArrayAdd('projects')} className="bg-blue-500 text-white py-2 px-4">Add Project</button>

            <h2 className="text-xl font-semibold mb-4">Languages</h2>
            <div className=" p-4 mb-4 ">
                {formData.languages.map((lang, index) => (
                    <div key={index} className="mb-2">
                        <input type="text" value={lang} onChange={(e) => {
                            const updatedLanguages = [...formData.languages];
                            updatedLanguages[index] = e.target.value;
                            setFormData({
                                ...formData,
                                languages: updatedLanguages
                            });
                        }} className="transition duration-300 ease-in-out  mt-1 block w-full p-2" />
                    </div>
                ))}
                <button type="button" onClick={() => setFormData({
                    ...formData,
                    languages: [...formData.languages, '']
                })} className="bg-blue-500 text-white py-2 px-4 ">Add Language</button>
            </div>

            <h2 className="text-xl font-semibold mb-4">References</h2>
            {formData.references.map((ref, index) => (
                <div key={index} className="p-4 mb-4 ">
                    <label className="block text-sm font-medium mb-2">
                        Name:
                        <input type="text" name="name" value={ref.name} onChange={(e) => handleArrayChange(e, index, 'references')} className="transition duration-300 ease-in-out  mt-1 block w-full p-2 " />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        Job Title:
                        <input type="text" name="jobTitle" value={ref.jobTitle} onChange={(e) => handleArrayChange(e, index, 'references')} className="transition duration-300 ease-in-out  mt-1 block w-full p-2" />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        Company:
                        <input type="text" name="company" value={ref.company} onChange={(e) => handleArrayChange(e, index, 'references')} className="transition duration-300 ease-in-out  mt-1 block w-full p-2" />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        Phone:
                        <input type="text" name="phone" value={ref.phone} onChange={(e) => handleArrayChange(e, index, 'references')} className="transition duration-300 ease-in-out  mt-1 block w-full p-2 " />
                    </label>
                    <label className="block text-sm font-medium mb-2">
                        Email:
                        <input type="email" name="email" value={ref.email} onChange={(e) => handleArrayChange(e, index, 'references')} className="transition duration-300 ease-in-out mt-1 block w-full p-2 " />
                    </label>
                </div>
            ))}
            <button type="button" onClick={() => handleArrayAdd('references')} className="bg-blue-500 text-white py-2 px-4">Add Reference</button>

            <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
            <div className="relative mb-10 mt-10">
                <input
                    type="file"
                    onChange={handleFileChange}
                    id="file-upload"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    required
                />
                <label htmlFor="file-upload" className="flex items-center justify-center bg-white text-blue-500 text-center py-3 px-6  transition duration-300 ease-in-out cursor-pointer border border-gray-300 ">
                    <FiUpload className="mr-2 text-lg" />
                    Choose File
                </label>
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
        </form>


        <div className='m-auto mt-6 w-56 text-center text-xl'>
            <NavLink to="/getresume1" className=" text-black border-2 border-blue-500  p-2 rounded">See Resume</NavLink>
        </div>


    </>);
};

export default Resume1_data;
