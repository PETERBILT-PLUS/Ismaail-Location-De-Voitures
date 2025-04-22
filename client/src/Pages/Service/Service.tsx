import { useTranslation } from 'react-i18next';

function Service() {
  const { t } = useTranslation('service');

  const services = [
    {
      title: t('services.carRental.title'),
      description: t('services.carRental.description'),
      icon: "🚗"
    },
    {
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
      icon: "🛠️"
    },
    {
      title: t('services.assistance.title'),
      description: t('services.assistance.description'),
      icon: "📞"
    },
    {
      title: t('services.cleaning.title'),
      description: t('services.cleaning.description'),
      icon: "🧼"
    }
  ];

  return (
    <main className="py-12 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-gray-800">
        {t('pageTitle')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              {service.title}
            </h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Service;