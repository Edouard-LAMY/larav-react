import api from './api';
import { QueryKey, useQuery } from '@tanstack/react-query';

// Query Keys centralisés
export const queryKeys = {
  users: ['users'] as QueryKey,
  user: (id: number) => ['user', id] as QueryKey,
  posts: ['posts'] as QueryKey,
};

// Fonctions de fetch
export const fetchUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const fetchUserById = async (id: number) => {
  const { data } = await api.get(`/users/${id}`);
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
