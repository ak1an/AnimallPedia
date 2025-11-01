import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Define the news item type
interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
}

const News: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock news data - in a real app, this would come from an API
  const mockNewsData: NewsItem[] = [
    {
      id: 1,
      title: "Новые исследования о миграции птиц",
      excerpt: "Ученые обнаружили удивительные закономерности в миграционных путях птиц через Тихий океан.",
      date: "2025-10-31",
      imageUrl: "https://cdnuploads.aa.com.tr/uploads/Contents/2023/05/12/thumbs_b_c_6052643e78d979d1b53715e7083ac51a.jpg?v=131410"
    },
    {
      id: 2,
      title: "Открытие нового вида амфибий",
      excerpt: "Биологи описали новый вид лягушки в тропических лесах Амазонии.",
      date: "2025-10-30",
      imageUrl: "https://focus.ua/static/storage/thumbs/920x465/1/35/4dmotu-cad8e5519e8cf4aac0fc201144526351.jpg?v=0576_1"
    },
    {
      id: 3,
      title: "Восстановление популяции тигров",
      excerpt: "Программа сохранения тигров показывает положительные результаты в Индии.",
      date: "2025-10-29",
      imageUrl: "https://total.kz/storage/f8/f846bfac4e34985667ffdd25aea451eb_resize_w_830_h_465.jpg"
    },
    {
      id: 4,
      title: "Изменения климата и морские млекопитающие",
      excerpt: "Наблюдается смещение ареалов обитания морских котиков из-за потепления океана.",
      date: "2025-10-28",
      imageUrl: "https://news.store.rambler.ru/img/3d022d8634d962b0001d1504ee71973e?img-format=auto&img-1-resize=height:400,fit:max&img-2-filter=sharpen"
    },
    {
      id: 5,
      title: "Успехи в реинтродукции белых медведей",
      excerpt: "Проект по возвращению белых медведей в природу показывает впечатляющие результаты.",
      date: "2025-10-27",
      imageUrl: "https://rg.ru/uploads/images/2022/11/02/1-599_6c8.jpg"
    },
    {
      id: 6,
      title: "Новые открытия в мире коралловых рифов",
      excerpt: "Морские биологи обнаружили ранее неизвестные виды кораллов в глубинах Тихого океана.",
      date: "2025-10-26",
      imageUrl: "https://cdnn21.img.ria.ru/images/149046/85/1490468556_0:243:2498:1660_1920x0_80_0_0_75f03260bf5fc63bd93efc814b8f8112.jpg"
    },
    {
      id: 7,
      title: "Секреты выживания пустынных животных",
      excerpt: "Ученые раскрыли уникальные адаптации животных к экстремальным условиям пустыни.",
      date: "2025-10-25",
      imageUrl: "https://ya-uznayu.ru/images/skorpion-v-pustine.jpg"
    },
    {
      id: 8,
      title: "Исследование поведения дельфинов",
      excerpt: "Новые наблюдения за социальным поведением дельфинов в дикой природе.",
      date: "2025-10-24",
      imageUrl: "https://plus-one.ru/files/news/2022/07/14899-rss.jpg"
    }
  ];

  // Function to fetch news - in a real app, this would be an API call
  const fetchNews = async (): Promise<NewsItem[]> => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Sort by date, newest first
        const sorted = [...mockNewsData].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        resolve(sorted);
      }, 500);
    });
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  // Effect to load news on component mount
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await fetchNews();
        setNewsList(data);
      } catch (error) {
        console.error("Failed to load news:", error);
        // Fallback to mock data if API fails
        const sorted = [...mockNewsData].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setNewsList(sorted);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-blue-50 dark:from-gray-900 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Новости о животных
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ежедневные обновления из мира животных
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className="rounded-2xl shadow-xl bg-white animate-pulse"
              >
                <div className="bg-gray-300 dark:bg-gray-700 h-40 w-full rounded-t-2xl"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-blue-50 dark:from-gray-900 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Новости о животных
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ежедневные обновления из мира животных
          </p>
        </motion.div>

        {/* News Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {newsList.map((news, index) => (
            <motion.div
              key={news.id}
              className="rounded-2xl shadow-xl bg-white hover:scale-105 transition-all duration-300 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              layout
            >
              {news.imageUrl ? (
                <div className="relative">
                  <img 
                    src={news.imageUrl} 
                    alt={news.title} 
                    className="h-40 w-full object-cover rounded-t-2xl"
                  />
                </div>
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-t-2xl w-full h-40 flex items-center justify-center">
                  <span className="text-gray-500">Нет изображения</span>
                </div>
              )}
              
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{news.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex-grow">{news.excerpt}</p>
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(news.date)}
                  </span>
                  <Link 
                    to={`/news/${news.id}`}
                    className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium"
                  >
                    Читать больше →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default News;