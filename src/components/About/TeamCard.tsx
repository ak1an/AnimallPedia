import React from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string;
}

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full">
      <div className="relative">
        <img 
          src={member.photo} 
          alt={member.name} 
          className="w-full h-64 object-cover"
        />
      </div>
      
      <div className="p-6 flex-grow flex flex-col items-center text-center">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{member.name}</h3>
        <p className="text-green-600 dark:text-green-400 font-medium">{member.role}</p>
      </div>
    </div>
  );
};

export default TeamCard;