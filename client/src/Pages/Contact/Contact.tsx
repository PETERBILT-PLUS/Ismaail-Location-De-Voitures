import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation(['contact']);

  return (
    <main className="min-h-screen py-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {t('contact:title')}
      </h1>

      <p className="text-center text-lg text-gray-600 mb-6">
        {t('contact:intro')}
      </p>

      <section className="text-center text-lg text-gray-700 mb-6">
        <h2 className="font-semibold text-xl mb-4">{t('contact:address.title')}</h2>
        <p>{t('contact:address.line1')}</p>
        <p>{t('contact:address.line2')}</p>
      </section>

      <section className="text-center text-lg text-gray-700 mb-6">
        <h2 className="font-semibold text-xl mb-4">{t('contact:phone')}</h2>
        <p className="text-lg text-gray-500 mt-2">{t('contact:phone.note')}</p>
      </section>

      <section className="text-center text-lg text-gray-700 mb-6">
        <h2 className="font-semibold text-xl mb-4">{t('contact:email')}</h2>
        <p className="text-lg text-gray-500 mt-2">{t('contact:email.note')}</p>
      </section>

      <section className="text-center text-lg text-gray-700">
        <h2 className="font-semibold text-xl mb-4">{t('contact:hours.title')}</h2>
        <p className="text-green-600 font-medium">{t('contact:hours.alwaysOpen')}</p>
        <p className="text-sm text-gray-500 mt-2">{t('contact:hours.note')}</p>
      </section>

      <div className="mt-12 text-center text-sm text-gray-500">
        {t('contact:closing')}
      </div>
    </main>
  );
}

export default Contact;