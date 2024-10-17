

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export function useGames() {
  return useQuery({
   queryKey: ['games'],
   queryFn: () => axios.get(`${API_URL}/games`).then(res => res.data),
    
    
  });
}
