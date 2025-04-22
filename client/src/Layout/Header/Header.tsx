import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import LOGO from "../../assets/C-removebg-preview.png";
import { CiSettings } from "react-icons/ci";
import "./Header.css";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';

function Header() {
    const [visibility, setVisibility] = useState<boolean>(false);
    const [languageOpen, setLanguageOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLanguageOpen(false);
    };

    return (
        <header className="header">
            <Navbar rounded className="container mx-auto px-4 sm:px-24">
                <NavbarBrand as={NavLink} onClick={() => redirect("/")}>
                    <img src={LOGO} className="h-24" alt="LOGO" />
                </NavbarBrand>
                <div className="flex flex-row justify-between items-center md:order-2 gap-4">
                    {/* Language Switcher */}
                    <div className="relative">
                        <button
                            onClick={() => setLanguageOpen(!languageOpen)}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FiGlobe size={18} />
                            <span className="uppercase text-sm font-medium">
                                {i18n.language === 'fr' ? 'FR' : 'EN'}
                            </span>
                        </button>

                        {languageOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
                                <button
                                    onClick={() => changeLanguage('fr')}
                                    className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === 'fr' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                                >
                                    Français
                                </button>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === 'en' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                                >
                                    English
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Admin Settings */}
                    <div className="flex flex-col justify-center items-center relative">
                        <CiSettings
                            size={28}
                            className="cursor-pointer"
                            onClick={() => setVisibility(!visibility)}
                        />
                        <div className={visibility ? "drop-down flex flex-col justify-start items-center shadow" : "drop-down flex-col justify-start items-center shadow hidden"}>
                            <div className="part" onClick={() => navigate("/login")}>Admin Log-In</div>
                        </div>
                    </div>
                    <NavbarToggle />
                </div>
                <NavbarCollapse>
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Accueil</NavLink>
                    <NavLink to="/service" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Service</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Contact</NavLink>
                </NavbarCollapse>
            </Navbar>
        </header>
    );
}

export default Header;