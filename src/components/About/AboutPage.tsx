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

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">О нас</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            AnimalPedia - это цифровая энциклопедия животного мира, созданная для того, чтобы каждый мог 
            узнать больше о животных, их поведении, среде обитания и важности сохранения биоразнообразия.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Наши особенности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Наша команда</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Свяжитесь с нами</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <FaEnvelope className="text-2xl mb-2" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p>{contacts.email}</p>
            </div>
            <div className="flex flex-col items-center">
              <FaPhone className="text-2xl mb-2" />
              <h3 className="text-xl font-semibold mb-2">Телефон</h3>
              <p>{contacts.phone}</p>
            </div>
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-2xl mb-2" />
              <h3 className="text-xl font-semibold mb-2">Адрес</h3>
              <p>{contacts.address}</p>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <FaFacebookF className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <FaTiktok className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;