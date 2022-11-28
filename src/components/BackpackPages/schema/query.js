import {publicRequest} from '../../../utils/axiosInstance';

export const getBackpackPokemon = async axiosInstance => {
  const response = await axiosInstance.get('/backpack/pokemon');
  return response.data;
};
export const getPokemonEvolution = async name => {
  const response = await publicRequest.get(`/pokemon/evolution/${name}`);
  return response.data;
};
