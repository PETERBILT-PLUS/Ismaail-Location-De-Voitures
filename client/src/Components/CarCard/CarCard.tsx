import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import "./CarCard.css";


function CarCard({
  carId,
  carImage,
  carName,
  carFuel,
  carMarque,
  carPlaces,
  carType,
  pricePerDay
}: {
  carId: string,
  carImage: string;
  carName: string;
  carFuel: string;
  carMarque: string;
  carPlaces: number;
  carType: string;
  pricePerDay: number
}) {

  const navigate = useNavigate();
  return (
    <Card className="w-full shadow-2xl px-0 card">
      {/* Image at the top */}
      <div className="w-full h-52 overflow-hidden rounded-t-lg px-0">
        <img
          src={carImage}
          alt={carName}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Card content */}
      <div className="px-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
            {carName}
          </h5>
        </a>

        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <p className="py-1 text-md">Marque: {carMarque}</p>
          <p className="py-1 text-md">Type: {carType}</p>
          <p className="py-1 text-md">Carburant: {carFuel}</p>
          <p className="py-1 text-md">Places: {carPlaces}</p>
        </div>

        <div className="grid grid-cols-2">
          <div className="flex flex-row justify-start items-center">
            <span className="text-green-500 text-lg">{pricePerDay}  €/jour</span>
          </div>

          <div className="flex flex-row items-center justify-end">
            <button type="button" className="order-btn" onClick={() => navigate(`/car/${carId}`)}>Réserver/Voir</button>
          </div>

        </div>
      </div>
    </Card>
  );
}

export default CarCard;
