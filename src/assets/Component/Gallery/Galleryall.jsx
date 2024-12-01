
import Aos from 'aos';

const Galleryall = () => {
    {
        Aos.init({
            duration: 1500,
            easing: 'ease-in-out',
            once: true,
        })
    }
    const galleryItems = [
        { id: 1, src: '/Resume/SarvanMaurya.jpeg', description: '', links: [`resume_data1`] },
        { id: 2, src: '/Resume/manager.png', description: '', links: ['resume_data1'] },
        { id: 3, src: '/Resume/SarvanMauryasamp.png', description: 'fresher resume', links: ['resume_data2'] },
        { id: 4, src: 'https://via.placeholder.com/150', description: 'Image 4 Description', links: ['https://example.com/1'] },
        { id: 5, src: 'https://via.placeholder.com/150', description: 'Image 5 Description', links: ['https://example.com/1'] },
        { id: 6, src: 'https://via.placeholder.com/150', description: 'Image 6 Description', links: ['https://example.com/1'] },
        { id: 7, src: 'https://via.placeholder.com/150', description: 'Image 7 Description', links: ['https://example.com/1'] },
        { id: 8, src: 'https://via.placeholder.com/150', description: 'Image 8 Description', links: ['https://example.com/1'] },
        { id: 9, src: 'https://via.placeholder.com/150', description: 'Image 9 Description', links: ['https://example.com/1'] },
        // Add more items as needed
    ];

    return (
        <div className="p-4 mb-10">
            <h3 className="text-4xl font-bold mb-4 text-center">Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:gap-3 gap-4">
                {galleryItems.map(item => (
                    <div
                        key={item.id}
                        className="relative bg-gray-200 p-2 rounded-lg shadow-2xl group overflow-hidden hover:bg-custom-pink h-[550px]"
                        data-aos="fade-up"
                    >
                        <img
                            src={item.src}
                            alt={`Gallery item ${item.id}`}
                            className="w-[800px] h-[500px] object-cover rounded-md mb-2"
                            loading='lazy' />
                        <p className="text-black text-center text-lg uppercase text-[20px]">{item.description}</p>
                        {item.links.map((link, index) => (
                            <a
                                key={index}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 bg-custom-pink text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:min-w-[300px] text-center hover:bg-custom-sky absolute md:top-[339px] text-center md:left-12 top-28 left-14"
                            >
                                Use Template
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Galleryall;
