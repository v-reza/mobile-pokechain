export const getArenaTier = async axiosInstance => {
  const response = await axiosInstance.get('/arena/tier');
  return response.data;
};
