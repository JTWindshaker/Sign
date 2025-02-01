import { RequestRepository } from '../repositories/requestRepository';

export const addRequest = (url, name, is_sign = false, sign_date = null) => {
    RequestRepository.addRequest(url, name, is_sign, sign_date);
};

export const deleteRequest = (id) => {
    RequestRepository.deleteRequest(id);
};

export const getRequests = (callback) => {
    RequestRepository.fetchRequests(callback);
};
