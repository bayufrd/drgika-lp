import { MouseEventHandler } from "react";
import FocusLock from "react-focus-lock";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Ref } from "react";
import twclsx from "@/utils/twclsx";
import Data from "public/data/data.json";

interface IProps {
    isOpen: boolean;
    onCloseClick: MouseEventHandler<HTMLElement>;
    menuRef: Ref<HTMLElement>;
}

interface NavLink {
    label: string;
    href: string;
}

const MobileMenu = ({ isOpen = false, onCloseClick, menuRef }: IProps) => {
    const { footer } = Data;

    return (
        <div
            className={twclsx(
                "fixed top-0 left-0 w-screen h-screen flex z-50 bg-[#00000050]",
                isOpen ? "visible" : "invisible"
            )}
        >
            <FocusLock
                className={twclsx(
                    "relative h-full w-full max-w-xs flex pt-10 bg-white transition duration-300",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
                disabled={!isOpen}
                autoFocus
                returnFocus
                ref={menuRef}
            >
                <button
                    className="absolute top-4 left-4 flex justify-center items-center rounded-full transition hover:opacity-80"
                    onClick={onCloseClick}
                >
                    <AiOutlineCloseCircle className="w-8 h-8" />
                </button>
                <nav className="m-auto flex flex-col items-start text-lg font-medium gap-5">
                    {footer.quickLinks.map((link: NavLink) => (
                        <a
                            key={link.href}
                            className="transition hover:text-accent"
                            href={link.href}
                            onClick={onCloseClick}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </FocusLock>
        </div>
    );
};

export default MobileMenu;