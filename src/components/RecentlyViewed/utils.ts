import { AppDispatch } from '../../store';
import { addRecentlyViewedAnimal } from '../../store/slices/recentlyViewedSlice';

// Animal interface matching the data structure
interface Animal {
  id: string;
  name: string;
  category: string;
  habitat: string;
  photo: string;
  short: string;
  details: string;
}

/**
 * Add an animal to the recently viewed list
 * @param animal The animal to add
 * @param dispatch Redux dispatch function
 */
export const addAnimalToRecentlyViewed = (animal: Animal, dispatch: AppDispatch) => {
  dispatch(addRecentlyViewedAnimal(animal));
};