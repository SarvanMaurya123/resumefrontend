const Explore = () => {
    return (
        <>
            <div className="text-center my-8 px-4">
                <h2 className="text-2xl md:text-5xl font-bold mb-4">
                    So much more than a resume builder
                </h2>
            </div>
            <div className="text-center mb-8 px-4 md:ml-14 md:mr-14">
                <p className="text-base md:text-md text-gray-700">
                    Your job starts with a resume, but what about the interview? When you build your resume, you also get access to 18 powerful career tools. It’s the complete career toolkit, all in one place. If you're here, you're already on the way up.
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 px-4">
                <div className="w-20 h-20 md:w-22 md:h-22 flex items-center justify-center bg-white p-4 rounded-2xl hover:bg-custom-light-blue shadow-lg">
                    <img src="search.svg" alt="Search" className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <div className="w-20 h-20 md:w-22 md:h-22 flex items-center justify-center bg-white p-4 rounded-2xl hover:bg-custom-light-blue shadow-lg">
                    <img src="user.svg" alt="User" className="w-10 h-10 md:w-20 md:h-20" />
                </div>
                <div className="w-20 h-20 md:w-22 md:h-22 flex items-center justify-center bg-white p-4 rounded-2xl hover:bg-custom-light-blue shadow-lg">
                    <img src="toasty.svg" alt="Toasty" className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <div className="w-20 h-20 md:w-22 md:h-22 flex items-center justify-center bg-white p-4 rounded-2xl hover:bg-custom-light-blue shadow-lg">
                    <img src="network.svg" alt="Network" className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <div className="w-20 h-20 md:w-22 md:h-22 flex items-center justify-center bg-white p-4 rounded-2xl hover:bg-custom-light-blue shadow-lg">
                    <p className=" md:text-xl font-bold text-custom-pink text-xl bg-white p-2 rounded-xl ">+12</p>
                </div>
            </div>
            <div className="mt-14 text-center text-white">
                <button className="border-2 py-3 px-10 bg-custom-pink border-custom-pink rounded-md shadow-2xl hover:bg-custom-sky hover:border-custom-sky translate-x-5">Explore Your Resume</button>
            </div>
        </>
    );
};

export default Explore;
