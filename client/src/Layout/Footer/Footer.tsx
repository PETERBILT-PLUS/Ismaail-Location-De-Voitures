import { Footer as FooterFlowbite, FooterBrand, FooterCopyright, FooterDivider, FooterLinkGroup } from "flowbite-react";
import LOGO from "../../assets/C-removebg-preview.png";
import "./Footer.css";
import { Link } from "react-router-dom";


function Footer() {
    return (
        <FooterFlowbite>
            <div className="text-center container mx-auto px-4 sm:px-24">
                <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                    <FooterBrand
                        className="size-30"
                        src={LOGO}
                        alt="LOGO"
                        name="Galaxy Car"
                    />
                    <FooterLinkGroup>
                        <Link to="/">Accueil</Link>
                        <Link to="/service">Service</Link>
                        <Link to="/contact">Contact</Link>
                    </FooterLinkGroup>
                </div>
                <FooterDivider />
                <FooterCopyright href="#" by="Galaxy Car" year={new Date().getFullYear()} />
                <p className="text-gray-500 py-6">Tous les Droits Sont réservé</p>
            </div>
        </FooterFlowbite>
    );
}

export default Footer;