import React, { useState } from "react";
import Slider from "react-slick";

// Dummy data with image URLs
const dummyData = [
    { id: 1, title: "", description: "", image: "/Resume/manager.png" },
    { id: 2, title: "", description: "", image: "/Resume/smart-1.png" },
    { id: 3, title: "", description: "", image: "/Resume/smart-1.png" },
    { id: 4, title: "", description: "", image: "/Resume/manager.png" },
    { id: 5, title: "", description: "", image: "/Resume/smart-1.png" },
    { id: 6, title: "", description: "", image: "/Resume/smart-1.png" }
];
const Showresume = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        pauseOnHover: true,
        centerMode: false,
        focusOnSelect: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000,
                }
            }
        ]
    };

    return (
        <>
            <section className="bg-black pt-4 pb-4 mb-5 mt-5">
                <h3 className="text-white md:text-3xl text-2xl text-center"><span className="text-emerald-400"> New! </span>Get hired faster with a resume review.</h3>
            </section>
            <div className="text-center mt-10 md:text-4xl mb-10 text-3xl">
                <h2 className="uppercase">See Templates</h2>
            </div>
            <div className="slider-container w-full mb-10">
                <Slider {...settings}>
                    {dummyData.map(item => (
                        <div
                            key={item.id}
                            className="relative p-4 group"
                        >
                            <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden group-hover:shadow-2xl transition-shadow duration-300">
                                <img src={item.image} alt={item.title} className="w-full h-150 object-cover" loading="lazy" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                                <button className="absolute bottom-14 right-10 left-10 border-2  border-custom-pink text-custom-pink hover:bg-custom-sky px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-custom-sky hover:text-white">
                                    Used Template
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
}

export default Showresume;
