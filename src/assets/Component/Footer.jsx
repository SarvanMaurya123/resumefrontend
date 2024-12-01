const Footer = () => {
    return (<>
        <footer className="bg-[#030521] text-white p-8">
            <div className="flex flex-wrap justify-between border-b border-white pb-8">
                {/* Programs Section */}
                <div className="w-full md:w-1/6 mb-6">
                    <h3 className="text-lg font-bold mb-4">Programs</h3>
                    <ul>
                        <li className="mb-2 hover:text-[#FF7E29] transition-colors cursor-pointer">Corporate</li>
                        <li className="mb-2 hover:text-[#FF7E29] transition-colors cursor-pointer">One-to-One</li>
                        <li className="mb-2 hover:text-[#FF7E29] transition-colors cursor-pointer">Consulting</li>
                    </ul>
                </div>

                {/* Service Section */}
                <div className="w-full md:w-1/6 mb-6">
                    <h3 className="text-lg font-bold mb-4">Service</h3>
                    <ul>
                        <li className="mb-2 hover:text-[#FF7E29] transition-colors cursor-pointer">Training</li>
                        <li className="mb-2 hover:text-[#FF7E29] transition-colors cursor-pointer">Coaching</li>
                        <li className="mb-2 hover:text-[#FF7E29] transition-colors cursor-pointer">Consulting</li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="w-full md:w-1/6 mb-6">
                    <h3 className="text-lg font-bold mb-4">Contact</h3>
                    <ul>
                        <li className="mb-2 hover:text-[#FF7E29] transition-colors cursor-pointer">Home</li>
                        <li className="mb-2 hover:text-[#FF7E29] transition-colors cursor-pointer">About</li>
                        <li className="mb-2 hover:text-[#FF7E29] transition-colors cursor-pointer">Contact</li>
                    </ul>
                </div>

                {/* Connect Me Section */}
                <div className="w-full md:w-1/3 mb-6">
                    <h3 className="text-lg font-bold mb-4">Connect Me</h3>
                    <form className="flex flex-col mb-4 md:w-auto w-full">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="p-2 mb-2 md:mb-0 w-full md:w-2/5 rounded-l-md border border-gray-300 focus:border-[#FF7E29] focus:ring-0"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-[#FF7E29] text-white rounded-r-md md:w-1/4"
                        >
                            Subscribe
                        </button>
                    </form>
                    <div className="flex space-x-4 mb-4">
                        <a href="#" className="hover:text-[#FF7E29]"><i className="fab fa-whatsapp text-xl"></i></a>
                        <a href="#" className="hover:text-[#FF7E29]"><i className="fab fa-youtube text-xl"></i></a>
                        <a href="#" className="hover:text-[#FF7E29]"><i className="fab fa-instagram text-xl"></i></a>
                        <a href="#" className="hover:text-[#FF7E29]"><i className="fab fa-facebook text-xl"></i></a>
                        <a href="#" className="hover:text-[#FF7E29]"><i className="fab fa-twitter text-xl"></i></a>
                        <a href="#" className="hover:text-[#FF7E29]"><i className="fab fa-linkedin text-xl"></i></a>
                    </div>
                    <div>
                        <p className="mb-1">Mobile: 8840501933</p>
                        <p>Email: maurya22it@student.mes.ac.in</p>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center mt-8">
                <p>&copy; 2024 maurya22it@student.mes.ac.in</p>
            </div>
        </footer>
    </>)
}
export default Footer;