import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <button
        //  i adjust the button position to the top left corner
        // i also change the button color to blue and text color to white
        // i also change the button size to 2xl
            onClick={handleBackClick}
            className="m-10 fixed top-35 left-10 p-3 bg-stdBlue text-white rounded-full shadow-lg hover:bg-stdYellow transition-all duration-300 ease-in-out"
            title="Go back"
        >
            <FaArrowLeft className="text-2xl" />
        </button>
    );
};

export default BackButton;
