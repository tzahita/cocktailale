import httpService from './http';
import { apiUrl } from '../../config.json';

export function createCard(card) {
  return httpService.post(`${apiUrl}/cards`, card);
}

export function getCardsRecommend(id) {
  return httpService.post(`${apiUrl}/cards/cards/rcom`, {id});
}

export function editCard(card, id) {
  return httpService.put(`${apiUrl}/cards/${id}`, card);
}

export function deleteCard(id) {
  return httpService.delete(`${apiUrl}/cards/${id}`);
}

export function getCardById(id) {
  return httpService.get(`${apiUrl}/cards/card/${id}`);
}

export function getCardByName(name) {
  return httpService.get(`${apiUrl}/cards/search/${name}`);
}

export function getMyCards(card) {
 return httpService.get(`${apiUrl}/cards/my-cards`, card);
}

export function getAllCards() {
 return httpService.get(`${apiUrl}/cards/all`);
}

export function getFavoriteCards(filter, search) {
//  return httpService.get(`${apiUrl}/cards/favorite`);
console.log('here')
 return httpService.post(`${apiUrl}/cards/all`, {
  filter: filter,
  search: search
});
}

export default {
  createCard,
  getMyCards,
  getAllCards,
  deleteCard,
  getCardById,
  getCardByName,
  editCard,
  getFavoriteCards,  
  getCardsRecommend,

};
