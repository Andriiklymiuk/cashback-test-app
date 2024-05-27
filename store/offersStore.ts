import { getOffersFromApi } from '@/api/offerApi';
import { Offer } from '@/types/offer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface OffersState {
  offers: Offer[];
  getOffers: () => Promise<Offer[] | null>;
}

export const useOffersStore = create<OffersState>()(
  devtools(
    persist(
      (set) => ({
        offers: [],
        getOffers: async () => {
          const data = await getOffersFromApi();
          if (!data?.offers) return null;
          set({ offers: data.offers });

          return data.offers;
        },
      }),
      {
        name: 'offersStore',
        version: 1,
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);