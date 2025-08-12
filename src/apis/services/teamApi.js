import axiosInstance from "../axiosInstance";

const Teams = '/teams';

const teamApi = {
  createTeam: (payload) => axiosInstance.post(`${Teams}`, payload),
  listTeams: () => axiosInstance.get(`${Teams}`),
};

export default teamApi;


