export const claimRewardToBackpack = async (axiosInstance, data) => {
  const response = await axiosInstance.post('/arena/claim-reward', data);
  return response.data;
};

export const updateLoginReward = async axiosInstance => {
  const response = await axiosInstance.put('/arena/update-login-reward');
  return response.data;
};
