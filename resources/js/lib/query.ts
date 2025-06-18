import { Image, Slider, User } from '@/types';
import api from './api';
import { QueryKey, useQuery } from '@tanstack/react-query';

// ------------------- USERS ------------------ //
// Query Keys centralisés
export const queryKeys = {
  users: ['users'] as QueryKey,
  user: (id: number) => ['user', id] as QueryKey,
  posts: ['posts'] as QueryKey,
};

// Fonctions de fetch
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>('/users');
  return data;
};

export const fetchUserById = async (id: number) => {
  const { data } = await api.get(`/user/${id}`);
  return data;
};

export const fetchPosts = async () => {
  const { data } = await api.get('/posts');
  return data;
};

export const useUsers = () =>
  useQuery({
    queryKey: queryKeys.users,
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });

export const useUser = (id: number) =>
  useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => fetchUserById(id),
    enabled: !!id, // évite les requêtes inutiles
  });


// ------------------- SLIDERS ------------------ //
export const fetchSliders = async (): Promise<Slider[]> => {
  const { data } = await api.post<Slider[]>('/settings/create-slider');
  return data;
}

// ------------------- IMAGE ------------------ //
export const fetchImage = async (formData: FormData): Promise<Image> => {
  const { data } = await api.post<Image>('settings/create-image', formData);
  return data;
}