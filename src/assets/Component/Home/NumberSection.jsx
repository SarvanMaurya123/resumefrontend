import React from 'react';
import AnimatedNumber from '../../Component/Home/AnimatedNumber';

const NumberSection = () => {
    return (
        <div className="flex flex-wrap justify-around gap-4 p-8 text-center">
            <div className="flex items-center text-4xl font-extrabold">
                <AnimatedNumber start={10000} end={1000} className="text-blue-500 md:text-4xl text-2xl" /> <span className='text-blue-500'>+</span>
            </div>
            <div className="flex items-center text-4xl font-extrabold">
                <AnimatedNumber start={20000} end={2000} className="text-green-500 md:text-4xl text-2xl" /><span className='text-green-500'>+</span>
            </div>
            <div className="flex items-center text-4xl font-extrabold">
                <AnimatedNumber start={30000} end={3000} className="text-red-500 md:text-4xl text-2xl" /><span className='text-red-500'>+</span>
            </div>
        </div>
    );
};

export default NumberSection;
