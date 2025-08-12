import axiosInstance from "../axiosInstance";

const Teams = '/teams';
const JoinRequests = '/join-requests';

const teamApi = {
  createTeam: (payload) => axiosInstance.post(`${Teams}`, payload),
  listTeams: () => axiosInstance.get(`${Teams}`),
  getTeamDetails: (teamId) => axiosInstance.get(`${Teams}/${teamId}`),
  createJoinRequest: (payload) => axiosInstance.post(`${JoinRequests}`, payload),
  getTeamJoinRequests: (teamId) => axiosInstance.get(`${JoinRequests}/team/${teamId}`),
  respondToJoinRequest: (requestId, action) => axiosInstance.patch(`${JoinRequests}/${requestId}/respond`, { action }),
  getUserJoinRequests: () => axiosInstance.get(`${JoinRequests}/user`),
};

export default teamApi;


