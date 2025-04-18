import { useEffect, useRef, useState } from "react";
import CarCard from "../../Components/CarCard/CarCard.tsx";
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import "./Home.css";
import { Spinner } from "flowbite-react";
import { Helmet } from "react-helmet-async";

function Home() {
    const [cars, setCars] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const SERVER: string = import.meta.env.VITE_SERVER as string;

    useEffect(() => {
        const getCars = async () => {
            try {
                setLoading(true);
                const response: AxiosResponse<{ success: boolean, cars: any[] }> = await axios.get(
                    `${SERVER}/user/get-cars`,
                    { params: { skip: cars.length } }
                );

                if (response.data.success) {
                    setCars((prev) => [...prev, ...response.data.cars]);
                }
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    toast.warning(error.message);
                } else {
                    console.error(error);
                    toast.error(error?.message || "Oops! Erreur Interne du Serveur");
                }
            } finally {
                setLoading(false);
            }
        };

        getCars();
    }, []);

    useEffect(() => {
        const handleScroll = async () => {
            const el = containerRef.current;
            if (!el) return;

            const { scrollTop, scrollHeight, clientHeight } = el;
            if (scrollTop + clientHeight >= scrollHeight - 1) {
                // You can trigger pagination logic here instead of alert
                try {
                    const response: AxiosResponse<{ success: boolean, cars: any[] }> = await axios.get(`${SERVER}/user/get-cars`, { params: { skip: cars.length } })
                    if (response.data.success) {
                        setCars((prev) => [...prev, ...response.data.cars]);
                    }
                } catch (error: any) {
                    if (axios.isAxiosError(error)) {
                        toast.warning(error.message);
                        console.error(error);
                    } else {
                        toast.error(error?.message || "Ops Server Error");
                        console.error(error);
                    }
                }
            }
        };

        const el = containerRef.current;
        el?.addEventListener("scroll", handleScroll);

        return () => {
            el?.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollIntoCars = () => {
        const element = document.getElementById("cars-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <main>
            <Helmet>
                <title>Location De Voitures Marrakech - Meil</title>
                <meta name="description" content="Location de voitures à l'aéroport de Marrakech – Louez une voiture pas chère en ligne. Choisissez votre véhicule et réservez facilement en quelques clics." />
                <meta name="keywords" content="location voiture Marrakech, louer voiture Marrakech, voiture pas cher Marrakech, location auto Marrakech, Marrakech car rental" />
                <link rel="canonical" href="https://www.votre-site.com" />
            </Helmet>
            <section className="hero-section">
                <div className="py-22 min-h-screen container mx-auto px-4 sm:px-24 hero-section flex flex-col justify-start items-center md:justify-start md:items-start">
                    <h1 className="text-2xl md:text-4xl text-white font-semibold">
                        Bienvenue Chez <span className="name">Ismaail Rent Car</span>
                    </h1>
                    <br />
                    <p className="text-lg text-white font-medium text-center md:text-start w-full md:w-1/2">
                        Ismaail Rent Car – Louez la voiture de vos rêves, où que vous soyez. Avec Ismaail Rent Car,
                        profitez d’options de location flexibles, des véhicules fiables et un service rapide. Partez
                        l’esprit tranquille, dès aujourd’hui.
                    </p>
                    <br />
                    <button type="button" className="hero-section-btn" onClick={scrollIntoCars}>Choisir votre Véhicule</button>
                </div>
            </section>

            <section id="cars-section" className="cars-section min-h-screen pb-24">
                <div className="container mx-auto px-4 sm:px-24">
                    <h2 className="text-2xl md:text-4xl text-center py-24" style={{ color: "var(--blue)" }}>Nos Véhicules</h2>

                    {loading ? (
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
                                        carId={car._id}
                                        key={index}
                                        carImage={car.carImages?.[0]}
                                        carName={car.carName}
                                        carFuel={car.carFuel}
                                        carKm={car.carKm}
                                        carMarque={car.carMarque}
                                        carPlaces={car.carPlaces}
                                        carType={car.carType}
                                        pricePerDay={car.pricePerDay}
                                    />
                                ))
                            ) : (
                                <p className="text-center w-full col-span-full">Aucune voiture Disponible.</p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <section className="min-h-screen w-full">
                <iframe className="w-full" src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3398.4511010090087!2d-8.028985324385499!3d31.594096874180334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDM1JzM4LjgiTiA4wrAwMSczNS4xIlc!5e0!3m2!1sen!2sma!4v1744548333658!5m2!1sen!2sma" width="600" height="450" style={{ border: "0", height: "700px" }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </main>
    );
}

export default Home;
