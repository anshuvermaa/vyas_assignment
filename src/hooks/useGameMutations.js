
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export function useGameMutations() {
  const queryClient = useQueryClient();

  const saveGame = useMutation({
    mutationKey:["creategame"],
   mutationFn: (newGame) => axios.post(`${API_URL}/games`, newGame).then(res =>
   {
    return res.data
   }
  ),
    
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['games'] });
        localStorage.setItem("currentGame", JSON.stringify(data))
      },
      onError: () => {
        alert('Failed to save the game.');
      },
  });

  const updateGame = useMutation({
    mutationKey:["game"],
   mutationFn: ({ id, updatedGame }) => axios.put(`${API_URL}/games/${id}`, updatedGame).then(res => res.data),
    
      onSuccess: (data) => {
        localStorage.setItem("currentGame", JSON.stringify(data))
        queryClient.invalidateQueries({ queryKey: ['games'] });
      },
      onError: (error) => {
        console.log("error",error);
        alert('Failed to update the game.');
      },
  });

  return { saveGame, updateGame };
}
