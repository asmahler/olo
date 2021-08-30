const request = require('supertest');
const constants = require('../constants/constants');

// Wrapping supertest around different HTTP methods

async function getRequest(route) {
  return await request(constants.BASE_URL)
    .get(route);
}

async function postRequest(route, body) {
  return await request(constants.BASE_URL)
    .post(route)
    .send(body)
}

async function putRequest(route, body) {
  return await request(constants.BASE_URL)
    .post(route)
    .send(body)
}

async function deleteRequest(route, body) {
  return await request(constants.BASE_URL)
    .delete(route)
}

module.exports = { getRequest, postRequest, putRequest, deleteRequest };