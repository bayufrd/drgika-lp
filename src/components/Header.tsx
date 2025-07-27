"use client";

import HeaderInfo from "./HeaderInfo";
import Wrapper from "./Wrapper";
import { BsTelephone, BsClock, BsHospital } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import Link from "next/link";
import ButtonLink from "./ButtonLink";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState, useRef } from "react";
import MobileMenu from "./MobileMenu";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";


const Header = () => {
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
	const menuRef = useRef<HTMLElement>(null);

	const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

	useLockBodyScroll(menuIsOpen);

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

	return (
		<>
			{/* Tambahkan style dalam tag style */}
			<style jsx global>{headerStyles}</style>

			<header 
				className="fixed top-0 left-0 w-full bg-white shadow-sm z-50"
				style={{
					// Tambahan style inline opsional
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
							text="Praktek drg. Ika Kiromin .B" 
						/>
						<HeaderInfo 
							Icon={<BsTelephone className="text-accent" />} 
							text="0878 3601 5516" 
						/>
						<HeaderInfo 
							Icon={<GoLocation className="text-accent" />} 
							text="Jl. Raya Grogol No.174, Dusun III, Grogol, Kec. Grogol, Kabupaten Sukoharjo, Jawa Tengah 57552" 
						/>
						<HeaderInfo 
							Icon={<BsClock className="text-accent" />} 
							text="Pagi: 08:00 - 11:00 WIB" 
						/>
						<HeaderInfo 
							Icon={<BsClock className="text-accent" />} 
							text="Sore: 15:30 - 20:00 WIB" 
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
							<span className="text-accent text-pink-500">Drg.</span> Ika Kiromin Baroroh
						</a>
						<div className="hidden md:flex items-center gap-6 text-sm font-medium">
						<a 
								className="transition hover:text-accent flex items-center gap-1" 
								href="#prosedur"
							>
								Prosedur
							</a>
							<a 
								className="transition hover:text-accent flex items-center gap-1" 
								href="#services"
							>
								Layanan
							</a>
							<a 
								className="transition hover:text-accent flex items-center gap-1" 
								href="#benefits"
							>
								Keuntungan
							</a>
							<a 
								className="transition hover:text-accent flex items-center gap-1" 
								href="#galeri"
							>
								Galleri
							</a>
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