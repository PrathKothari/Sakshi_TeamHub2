import axiosInstance from '../axiosInstance';

const Event = '/events'

const eventsApi= {
    joinEvent:({eventId,teamId})=>axiosInstance.patch(`${Event}/${eventId}`,{teamId}),
}
export default eventsApi;