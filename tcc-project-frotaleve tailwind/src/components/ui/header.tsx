import React from 'react';

interface HeaderProps {
    image: string;
}

const Header: React.FC<HeaderProps> = ({ image }) => {
    return (
        <header className='h-[5em] bg-[rgba(233,226,226,0.75)]'>
            <img
                className='w-[15em]'
                src={image}
                alt="Header"
            />
        </header>
    );
};

export default Header;