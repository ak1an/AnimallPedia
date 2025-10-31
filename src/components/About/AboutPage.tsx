import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TeamCard, FeatureCard } from './index';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaTiktok,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBook,
  FaGamepad,
  FaNewspaper,
  FaLeaf
} from 'react-icons/fa';

// Define types for our data
interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface Contacts {
  email: string;
  phone: string;
  address: string;
}

const AboutPage: React.FC = () => {
  const aboutState = useSelector((state: RootState) => state.about);
  const teamMembers: TeamMember[] = aboutState.teamMembers;
  const features: Feature[] = aboutState.features;
  const contacts: Contacts = aboutState.contacts;

  // Map feature icons to react-icons
  const getFeatureIcon = (icon: string) => {
    switch (icon) {
      case "📚":
        return <FaBook className="text-4xl mb-4 text-center" />;
      case "🎮":
        return <FaGamepad className="text-4xl mb-4 text-center" />;
      case "📰":
        return <FaNewspaper className="text-4xl mb-4 text-center" />;
      case "🌍":
        return <FaLeaf className="text-4xl mb-4 text-center" />;
      default:
        return <FaBook className="text-4xl mb-4 text-center" />;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">О нас</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            AnimalPedia - это цифровая энциклопедия животного мира, созданная для того, чтобы каждый мог 
            узнать больше о разнообразии животных на нашей планете и внести свой вклад в их сохранение.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="bg-gradient-to-r from-green-100 to-amber-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-lg p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48 flex items-center justify-center text-6xl">
                <FaLeaf className="text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Наша миссия</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Мы стремимся создать самую полную и доступную базу знаний о животных, 
                чтобы вдохновить людей заботиться о природе и защищать исчезающие виды.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Наша цель - сделать изучение животного мира увлекательным и образовательным 
                для людей всех возрастов, объединяя науку, технологии и любовь к природе.
              </p>
            </div>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Наша команда</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Профессионалы, объединённые общей страстью к животным и природе
          </p>
          
          {/* Center single team member card */}
          <div className={`grid gap-8 ${teamMembers.length === 1 ? 'grid-cols-1 justify-items-center' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
            {teamMembers.map((member: TeamMember) => (
              <div key={member.id} className={teamMembers.length === 1 ? 'max-w-md w-full' : ''}>
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Почему выбирают нас</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Уникальные преимущества нашей платформы
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature: Feature) => (
              <div 
                key={feature.id} 
                className="bg-gradient-to-br from-green-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full"
              >
                {getFeatureIcon(feature.icon)}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-green-100 to-amber-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Свяжитесь с нами</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Контактная информация</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaEnvelope className="text-green-600 dark:text-green-400 text-xl mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">{contacts.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaPhone className="text-green-600 dark:text-green-400 text-xl mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">Телефон</h4>
                    <p className="text-gray-600 dark:text-gray-300">{contacts.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-green-600 dark:text-green-400 text-xl mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">Адрес</h4>
                    <p className="text-gray-600 dark:text-gray-300">{contacts.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Социальные сети</h3>
              
              <div className="flex gap-4 mb-6">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-xl" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-pink-500 hover:text-white transition-colors duration-300 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-blue-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-black hover:text-white transition-colors duration-300 transform hover:scale-110"
                  aria-label="TikTok"
                >
                  <FaTiktok className="text-xl" />
                </a>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Обратная связь</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  У вас есть вопросы или предложения? Напишите нам, и мы обязательно ответим!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;