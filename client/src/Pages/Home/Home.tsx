import { useEffect, useRef, useState } from "react";
import CarCard from "../../Components/CarCard/CarCard.tsx";
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import "./Home.css";
import { Spinner } from "flowbite-react";
import * as pkg from 'react-helmet-async';
const { Helmet } = pkg;
import { useTranslation, Trans } from 'react-i18next';

function Home() {
    const [cars, setCars] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const SERVER: string = import.meta.env.VITE_SERVER as string;
    const { t } = useTranslation(['home', 'global']);

    // Fetch cars function
    const getCars = async (skip: number = 0) => {
        try {
            setLoading(true);
            const response: AxiosResponse<{ success: boolean, cars: any[] }> = await axios.get(
                `${SERVER}/user/get-cars`,
                { params: { skip } }
            );
            if (response.data.success) {
                setCars(prev => skip === 0 ? response.data.cars : [...prev, ...response.data.cars]);
            }
        } catch (error: any) {
            const errorMessage = axios.isAxiosError(error)
                ? error.message
                : error?.message || t('global:errors.serverError');
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        getCars();
    }, []);

    // Infinite scroll
    useEffect(() => {
        const handleScroll = async () => {
            const el = containerRef.current;
            if (!el || loading) return;

            const { scrollTop, scrollHeight, clientHeight } = el;
            if (scrollTop + clientHeight >= scrollHeight - 1) {
                await getCars(cars.length);
            }
        };

        const el = containerRef.current;
        el?.addEventListener("scroll", handleScroll);
        return () => el?.removeEventListener("scroll", handleScroll);
    }, [cars.length, loading]);

    const scrollIntoCars = () => {
        document.getElementById("cars-section")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main>
            <Helmet>
                <title>Location de Voitures Ouarzazate Marrakech - Galaxy Car</title>
                <meta name="description" content="Location de voitures à l'aéroport de Marrakech et Ouarzazate – Louez une voiture pas chère en ligne. Choisissez votre véhicule et réservez facilement en quelques clics." />
                <meta name="keywords" content="location voiture Marrakech, louer voiture Marrakech, voiture pas cher Marrakech, location auto Marrakech, Marrakech car rental, location voiture Marrakech, louer voiture Ouarzazate, voiture pas cher Ouarzazate, location auto Ouarzazate, Ouarzazate car rental" />
                <link rel="canonical" href="https://galaxycars2005.com" />
                <meta property="og:locale:alternate" content="en_US" />
                <meta property="og:title" content="Marrakech et Ouarzazate Car Rental - Galaxy Car" />
                <meta property="og:description" content="Rent cars at Marrakech and Ouarzazate Airport – Affordable online car rental. Choose your vehicle and book easily in just a few clicks." />
            </Helmet>

            <section className="hero-section">
                <div className="py-22 min-h-screen container mx-auto px-4 sm:px-24 hero-section flex flex-col justify-start items-center md:justify-start md:items-start">
                    <h1 className="text-2xl md:text-4xl text-white font-semibold">
                        <Trans i18nKey="home:title" components={{ 1: <span className="name" /> }}>
                            Welcome to <span className="name">Galaxy Car</span>
                        </Trans>
                    </h1>
                    <br />
                    <p className="text-lg text-white font-medium text-center md:text-start w-full md:w-1/2">
                        {t('home:description')}
                    </p>
                    <br />
                    <button
                        type="button"
                        className="hero-section-btn"
                        onClick={scrollIntoCars}
                    >
                        {t('global:buttons.chooseCar')}
                    </button>
                </div>
            </section>

            <section id="cars-section" className="cars-section min-h-screen pb-24">
                <div className="container mx-auto px-4 sm:px-24">
                    <h2 className="text-2xl md:text-4xl text-center py-24" style={{ color: "var(--blue)" }}>
                        {t('home:ourVehicles')}
                    </h2>

                    {loading && cars.length === 0 ? (
                        <div className="w-full flex justify-center items-center min-h-[200px]">
                            <Spinner size="xl" />
                        </div>
                    ) : (
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 h-auto overflow-y-auto"
                            ref={containerRef}
                            style={{ overflowY: "scroll", maxHeight: "80vh" }}
                        >
                            {cars.length > 0 ? (
                                cars.map((car, index) => (
                                    <CarCard
                                        key={`${car._id}-${index}`}
                                        carId={car._id}
                                        carImage={car.carImages?.[0]}
                                        carName={car.carName}
                                        carFuel={car.carFuel}
                                        carMarque={car.carMarque}
                                        carPlaces={car.carPlaces}
                                        carType={car.carType}
                                        pricePerDay={car.pricePerDay}
                                    />
                                ))
                            ) : (
                                <p className="text-center w-full col-span-full">
                                    {t('home:noCars')}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <section className="min-h-screen w-full">
                <iframe
                    title={t('home:mapTitle')}
                    className="w-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d323.274280859735!2d-6.911876061350045!3d30.922004929455092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdbb10726afaa6c5%3A0x3fb6bc83523f61a4!2sGalaxy%20Cars!5e0!3m2!1sfr!2sma!4v1745264911481!5m2!1sfr!2sma"
                    width="600"
                    height="450"
                    style={{ border: "0", height: "700px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </main>
    );
}

export default Home;