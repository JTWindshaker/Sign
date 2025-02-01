import { insertRequest, getRequests, deleteRequest } from '../../data/datasources/dbServices';

export const RequestRepository = {
    addRequest: (url, name, isSign = false, signDate = null) => {
        insertRequest(url, name, isSign, signDate);
    },

    deleteRequest: (id) => {
        deleteRequest(id);
    },

    fetchRequests: (callback) => {
        getRequests(callback);
    },
};
