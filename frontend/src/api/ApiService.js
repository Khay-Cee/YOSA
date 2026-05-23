import axios from './axios';

//POST requests
const createVolunteer = (data) => axios.post('volunteers/', data);
const createContactUsMesasge = (data) => axios.post('contactus/', data);
const createDonation = (data) => axios.post('donations/', data);
const subscribeNewsletter = (data) => axios.post('newsletter/', data);

//GET requests
const fetchNews = () => axios.get('/news/');
const fetchgallery = () => axios.get('/gallery/');
const fetchCauses = () => axios.get('causes/');
const fetchCause = (id) => axios.get(`causes/${id}/`);

export {
  createVolunteer,
  createContactUsMesasge,
  fetchNews,
  fetchgallery,
  createDonation,
  subscribeNewsletter,
  fetchCauses,
  fetchCause,
}