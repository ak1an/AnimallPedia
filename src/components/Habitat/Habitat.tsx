import React, { useState, useEffect } from 'react';

// Define types
interface Animal {
  id: string;
  name: string;
  habitat: string;
  imageUrl: string;
}

const Habitat: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [selectedHabitat, setSelectedHabitat] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Habitat data with colors and icons
  const habitats = [
    { 
      name: "Лес", 
      color: "from-green-500 to-emerald-600",
      darkColor: "from-green-600 to-emerald-700",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    { 
      name: "Пустыня", 
      color: "from-amber-500 to-orange-600",
      darkColor: "from-amber-600 to-orange-700",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      name: "Саванна", 
      color: "from-yellow-500 to-amber-600",
      darkColor: "from-yellow-600 to-amber-700",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    { 
      name: "Океан", 
      color: "from-blue-500 to-cyan-600",
      darkColor: "from-blue-600 to-cyan-700",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
        </svg>
      )
    },
    { 
      name: "Полярные регионы", 
      color: "from-blue-300 to-blue-500",
      darkColor: "from-blue-400 to-blue-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
        </svg>
      )
    }
  ];

  // Mock animals data
  const mockAnimalsData: Animal[] = [
    {
      id: "1",
      name: "Амазонский попугай",
      habitat: "Лес",
      imageUrl: "https://images.unsplash.com/photo-1544778169-347f7d20aa3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "2",
      name: "Капибара",
      habitat: "Лес",
      imageUrl: "https://images.unsplash.com/photo-1551641932-78a3df9434d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "3",
      name: "Фенек",
      habitat: "Пустыня",
      imageUrl: "https://images.unsplash.com/photo-1548439752-228c4f04c050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "4",
      name: "Верблюд",
      habitat: "Пустыня",
      imageUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "5",
      name: "Лев",
      habitat: "Саванна",
      imageUrl: "https://images.unsplash.com/photo-1545388286-761095c9f8f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "6",
      name: "Слон",
      habitat: "Саванна",
      imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "7",
      name: "Дельфин",
      habitat: "Океан",
      imageUrl: "https://images.unsplash.com/photo-1544778169-347f7d20aa3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "8",
      name: "Акула",
      habitat: "Океан",
      imageUrl: "https://images.unsplash.com/photo-1548439752-228c4f04c050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "9",
      name: "Пингвин",
      habitat: "Полярные регионы",
      imageUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "10",
      name: "Белый медведь",
      habitat: "Полярные регионы",
      imageUrl: "https://images.unsplash.com/photo-1545388286-761095c9f8f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Fetch animals (using mock data for now)
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setAnimals(mockAnimalsData);
      } catch (error) {
        console.error("Error fetching animals:", error);
        // Fallback to mock data
        setAnimals(mockAnimalsData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnimals();
  }, []);

  // Filter animals by selected habitat
  useEffect(() => {
    if (selectedHabitat) {
      const filtered = animals.filter(animal => animal.habitat === selectedHabitat);
      setFilteredAnimals(filtered);
    } else {
      setFilteredAnimals([]);
    }
  }, [selectedHabitat, animals]);

  // Handle habitat selection
  const handleHabitatSelect = (habitatName: string) => {
    setSelectedHabitat(habitatName === selectedHabitat ? null : habitatName);
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Среда обитания</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Исследуйте животных в их естественной среде обитания
          </p>
        </div>
        
        {/* Habitat Selection Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {habitats.map((habitat) => (
            <button
              key={habitat.name}
              onClick={() => handleHabitatSelect(habitat.name)}
              className={`relative overflow-hidden rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 ${
                selectedHabitat === habitat.name 
                  ? `bg-gradient-to-br ${habitat.color} dark:${habitat.darkColor} text-white` 
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-white'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className={`p-3 rounded-full mb-3 ${
                  selectedHabitat === habitat.name 
                    ? 'bg-white bg-opacity-20' 
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}>
                  {habitat.icon}
                </div>
                <h3 className="text-lg font-bold">{habitat.name}</h3>
              </div>
            </button>
          ))}
        </div>
        
        {/* Animals Display */}
        {selectedHabitat && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Животные в среде обитания: {selectedHabitat}
              </h3>
              <button 
                onClick={() => setSelectedHabitat(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Скрыть
              </button>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div 
                    key={item} 
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse"
                  >
                    <div className="bg-gray-300 dark:bg-gray-700 h-40 w-full"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
                      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredAnimals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredAnimals.slice(0, 5).map((animal) => (
                  <div 
                    key={animal.id}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
                  >
                    <div className="relative">
                      <img 
                        src={animal.imageUrl} 
                        alt={animal.name} 
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    
                    <div className="p-4 flex-grow flex flex-col">
                      <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{animal.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">{animal.habitat}</p>
                      
                      <button 
                        className="mt-auto w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Посмотреть все
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Животные не найдены</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  В данной среде обитания пока нет животных в нашей базе данных.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Habitat;