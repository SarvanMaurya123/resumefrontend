import { useRef, useEffect } from 'react';
import { CountUp } from 'countup.js'; // Correct import
import PropTypes from 'prop-types';

const AnimatedNumber = ({ start, end, className }) => {
    const numberRef = useRef(null);

    useEffect(() => {
        const element = numberRef.current; // Store the ref value in a variable

        const handleScroll = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const countUp = new CountUp(element, start, end, 0, 2.5);
                    if (!countUp.error) {
                        countUp.start();
                    } else {
                        console.error(countUp.error);
                    }
                    // Stop observing after animation starts
                    observer.unobserve(element);
                }
            });
        };

        const observer = new IntersectionObserver(handleScroll, {
            threshold: 0.5
        });

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [start, end]);

    return (
        <div className={`text-2xl font-bold ${className}`} ref={numberRef}>
            <span></span>
        </div>
    );
};

AnimatedNumber.propTypes = {
    start: PropTypes.number.isRequired, // Changed to 'number' for start/end
    end: PropTypes.number.isRequired,
    className: PropTypes.string, // Class name should be a string
};

export default AnimatedNumber;
