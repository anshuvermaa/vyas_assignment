
import React from 'react';
import { useForm } from 'react-hook-form';

const PlayerForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl mb-4 text-center">Enter Player Names</h2>
      <div className="mb-4">
        <label className="block mb-1">Player 1 (X):</label>
        <input
          type="text"
          {...register('player1', { required: true })}
          placeholder="Enter Player 1 Name"
          className="w-full border p-2 rounded"
        />
        {errors.player1 && <span className="text-red-500">Player 1 name is required.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Player 2 (O):</label>
        <input
          type="text"
          {...register('player2', { required: true })}
          placeholder="Enter Player 2 Name"
          className="w-full border p-2 rounded"
        />
        {errors.player2 && <span className="text-red-500">Player 2 name is required.</span>}
      </div>
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
        Start Game
      </button>
    </form>
  );
};

export default PlayerForm;
