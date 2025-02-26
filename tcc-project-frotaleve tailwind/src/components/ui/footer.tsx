import React from 'react';
import { Link } from 'react-router';

interface LinkItem {
    name: string;
    url: string;
}


interface FooterProps {
    socialLinks: LinkItem[];
    policyLinks: LinkItem[];
}

const Footer: React.FC<FooterProps> = ({ socialLinks, policyLinks }) => {
    return (
        <footer className='flex justify-between items-center h-[3.5em] p-4 md:p-6 bg-[rgba(233,226,226,0.75)]'>
            <div className='flex gap-6'>
                {socialLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-black text-[0.9em] no-underline hover:underline'
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            <div className="flex gap-6">
                {policyLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.url}
                        className='text-black text-[0.9em] no-underline hover:underline'
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </footer>
    );
};

export default Footer;