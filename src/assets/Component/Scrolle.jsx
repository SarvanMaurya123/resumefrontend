import React, { useState, useEffect } from 'react';
import { BiArrowToTop } from 'react-icons/bi';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <div className="scrollToTopButton hover:bg-green-500" onClick={scrollToTop}>
                    <BiArrowToTop className="arrow-up" />
                </div>
            )}
        </div>
    );
};

export default ScrollToTopButton;
