const expect = require('chai').expect;
const requests = require('../requests/requests')
const constants = require('../constants/constants');
const data = require('../data/data.json');

describe('JSON Placeholder Data Driven API Tests', async() => {

  it('Verify updating a post by id in route', async() => {
    
    data.forEach( async data => {
      const response = await requests.getRequest(`${constants.POSTS_ROUTE}/${data.id}`, constants.NEW_COMMENT)

      expect(response.status).to.eql(200)
      expect(response.body.id).to.eql(data.id);
    })
  })

  it('Verify deleting a post by id in route', async() => {

    data.forEach( async data => {
      const response = await requests.deleteRequest(`${constants.POSTS_ROUTE}/${data.id}`)

      expect(response.status).to.eql(200)
      expect(response.body).to.be.empty;
    })
  })

  it('Verify updating a comment', async() => {
    
    data.forEach( async data => {
      const response = await requests.postRequest(`${constants.POSTS_ROUTE}/${data.id}${constants.COMMENTS_ROUTE}`, constants.NEW_COMMENT)

      expect(response.status).to.eql(201)
      expect(response.body.postId).to.eql(data.id)
      expect(response.body.title).to.eql(constants.NEW_COMMENT.title)
      expect(response.body.body).to.eql(constants.NEW_COMMENT.body)
      expect(response.body.userId).to.eql(constants.NEW_COMMENT.userId)
    })
  })

  it('Verify getting comment by postId', async() => {
    
    data.forEach( async data => {
      const response = await requests.getRequest(`${constants.COMMENTS_ROUTE}?postId=${data.id}`)

      expect(response.status).to.eql(200)

      response.body.forEach(post => {
        expect(post.postId === data.id)
      })
    })
   })
   
})