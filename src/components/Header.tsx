"use client";

import HeaderInfo from "./HeaderInfo";
import Wrapper from "./Wrapper";
import { BsTelephone, BsClock, BsHospital } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import ButtonLink from "./ButtonLink";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import MobileMenu from "./MobileMenu";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import headerData from 'public/data/data.json';

interface NavLink {
    label: string;
    href: string;
}

const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
    const [isClient, setIsClient] = useState(false);
    const menuRef = useRef<HTMLElement>(null);

    // Pastikan komponen hanya di-render di client
    useEffect(() => {
        setIsClient(true);
    }, []);

    const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

    // Gunakan conditional hook
    useLockBodyScroll(menuIsOpen && isClient);

    // Inline styles untuk mengatur padding body saat header fixed
    const headerStyles = `
        .header-spacer {
            padding-top: 120px; /* Sesuaikan dengan tinggi header */
        }

        @media (max-width: 640px) {
            .header-spacer {
                padding-top: 80px; /* Tinggi header untuk mobile */
            }
        }
    `;

    // Hindari render yang berbeda antara server dan client
    if (!isClient) {
        return null;
    }

    // Filter links, exclude 'Konsultasi'
    const desktopNavLinks = headerData.footer.quickLinks.filter(
        (link: NavLink) => link.label !== 'Konsultasi'
    );

    return (
        <>
            <style jsx global>{headerStyles}</style>

            <header 
                className="fixed top-0 left-0 w-full bg-white shadow-sm z-50"
                style={{
                    transition: 'all 0.3s ease',
                    maxWidth: '100vw'
                }}
            >
                {/* Top info bar - hidden on small screens */}
                <div 
                    className="w-full py-2 border-b border-[#88888830] hidden sm:block"
                    style={{
                        backgroundColor: '#f8f9fa',
                    }}
                >
                    <Wrapper className="flex items-center gap-4 text-xs text-secondary font-medium">
                        <HeaderInfo 
                            Icon={<BsHospital className="text-accent" />} 
                            text={`Praktek ${headerData.header.name.full}`} 
                        />
                        <HeaderInfo 
                            Icon={<BsTelephone className="text-accent" />} 
                            text={headerData.header.contact.phone} 
                        />
                        <HeaderInfo 
                            Icon={<GoLocation className="text-accent" />} 
                            text={headerData.header.location.address} 
                        />
                        <HeaderInfo 
                            Icon={<BsClock className="text-accent" />} 
                            text={`${headerData.header.operatingHours.morning.label}: ${headerData.header.operatingHours.morning.start} - ${headerData.header.operatingHours.morning.end} WIB`} 
                        />
                        <HeaderInfo 
                            Icon={<BsClock className="text-accent" />} 
                            text={`${headerData.header.operatingHours.evening.label}: ${headerData.header.operatingHours.evening.start} - ${headerData.header.operatingHours.evening.end} WIB`} 
                        />
                    </Wrapper>
                </div>

                {/* Navigation bar */}
                <div 
                    className="w-full py-3"
                    style={{
                        borderBottom: '1px solid rgba(0,0,0,0.1)'
                    }}
                >
                    <Wrapper className="flex items-center justify-between">
                        <a
                            className="text-xl font-bold transition hover:opacity-80"
                            href="#pagetop"
                        >
                            <span className="text-accent text-pink-500">{headerData.header.name.prefix}</span> {headerData.header.name.short}
                        </a>
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                            {desktopNavLinks.map((link: NavLink) => (
                                <a 
                                    key={link.href}
                                    className="transition hover:text-accent flex items-center gap-1" 
                                    href={link.href}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <ButtonLink 
                                className="px-5 py-2 bg-accent text-white bg-pink-500 hover:bg-pink-600 rounded-md" 
                                href="#booking"
                            >
                                Konsultasi
                            </ButtonLink>
                        </div>
                        <button 
                            className="md:hidden block text-accent" 
                            onClick={toggleMenu}
                        >
                            <HiOutlineMenuAlt3 className="w-6 h-6" />
                        </button>
                    </Wrapper>
                </div>
                
                <MobileMenu 
                    isOpen={menuIsOpen} 
                    onCloseClick={toggleMenu} 
                    menuRef={menuRef} 
                />
            </header>
        </>
    );
};

export default Header;