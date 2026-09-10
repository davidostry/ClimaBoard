import { create } from "zustand";
import type { City } from "../types/city";

type FavoritesStore = {
    favorites: City[];

    addFavorite: (city: City) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
    favorites: [],

    addFavorite: (city) =>
        set((state) => {
            const exists = state.favorites.some(
                (favorite) => favorite.id === city.id
            );

            if (exists) {
                return state;
            }

            return {
                favorites: [...state.favorites, city],
            };
        }),

    removeFavorite: (id) =>
        set((state) => ({
            favorites: state.favorites.filter(
                (city) => city.id !== id
            ),
        })),

    isFavorite: (id) =>
        get().favorites.some(
            (city) => city.id === id
        ),
}));