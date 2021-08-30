const expect = require('chai').expect;
const requests = require('../requests/requests')
const constants = require('../constants/constants'); 

describe('JSON Placeholder API Tests', async() => {

  it('Verify getting all posts', async() => {
    const response = await requests.getRequest(constants.POSTS_ROUTE)

    expect(response.status).to.eql(200)
    expect(response.body.length).to.eql(100)
  })

  it('Verify creating a new post', async () => {
    const response = await requests.postRequest(constants.POSTS_ROUTE, constants.NEW_COMMENT);

    expect(response.status).to.eql(201)
    expect(response.body.title).to.eql(constants.NEW_COMMENT.title)
    expect(response.body.body).to.eql(constants.NEW_COMMENT.body)
    expect(response.body.userId).to.eql(constants.NEW_COMMENT.userId)
  })

  it('Verify updating a post by id in route', async() => {
    const response = await requests.getRequest(`${constants.POSTS_ROUTE}/2`, constants.NEW_COMMENT)

    expect(response.status).to.eql(200)
    expect(response.body.id).to.eql(2);
  })

  it('Verify deleting a post by id in route', async() => {
    const response = await requests.deleteRequest(`${constants.POSTS_ROUTE}/1`)

    expect(response.status).to.eql(200)
    expect(response.body).to.be.empty;
  })

  it('Verify updating a comment', async() => {
    const response = await requests.postRequest(`${constants.POSTS_ROUTE}/2${constants.COMMENTS_ROUTE}`, constants.NEW_COMMENT)

    expect(response.status).to.eql(201)
    expect(response.body.title).to.eql(constants.NEW_COMMENT.title)
    expect(response.body.body).to.eql(constants.NEW_COMMENT.body)
    expect(response.body.userId).to.eql(constants.NEW_COMMENT.userId)
    expect(response.body.postId).to.eql('2')
  })

  it('Verify getting comment by postId', async() => {
    const response = await requests.getRequest(`${constants.COMMENTS_ROUTE}?postId=2`)

    expect(response.status).to.eql(200)
    expect(response.body.length).to.eql(5)

    response.body.forEach( postId => {
      expect(postId).to.eql(postId)
    })

  })

})