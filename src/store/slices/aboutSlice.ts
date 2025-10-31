import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface Contact {
  email: string;
  phone: string;
  address: string;
}

interface AboutState {
  teamMembers: TeamMember[];
  features: Feature[];
  contacts: Contact;
}

const initialState: AboutState = {
  teamMembers: [
    {
      id: 1,
      name: "Момунтаев.А",
      role: "Создатель.",
      photo: "https://yeltsin.ru/imageurl/c1600x900/archive/image/DISFZyyEGzMnE0D1DIOdn1cEpQDX/uploads/upload/2023/01/26/1.jpg"
    },
  ],
  features: [
    {
      id: 1,
      title: "Богатая база данных",
      description: "Более 1000 видов животных со всего мира с подробной информацией",
      icon: "📚"
    },
    {
      id: 2,
      title: "Интерактивное обучение",
      description: "Увлекательные игры и викторины для изучения животного мира",
      icon: "🎮"
    },
    {
      id: 3,
      title: "Актуальная информация",
      description: "Регулярные обновления и новости из мира животных",
      icon: "📰"
    },
    {
      id: 4,
      title: "Экологическая осведомлённость",
      description: "Помогаем заботиться о природе и защищать исчезающие виды",
      icon: "🌍"
    }
  ],
  contacts: {
    email: "info@animalpedia.com",
    phone: "+996 555 71 74 38",
    address: "Турусбекова 109"
  }
};

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setTeamMembers: (state, action: PayloadAction<TeamMember[]>) => {
      state.teamMembers = action.payload;
    },
    setFeatures: (state, action: PayloadAction<Feature[]>) => {
      state.features = action.payload;
    },
    setContacts: (state, action: PayloadAction<Contact>) => {
      state.contacts = action.payload;
    }
  },
});

export const { setTeamMembers, setFeatures, setContacts } = aboutSlice.actions;

export default aboutSlice.reducer;