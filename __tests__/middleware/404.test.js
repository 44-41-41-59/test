'user strict';
const supergoose = require('@code-fellows/supergoose');
const server = require('../../src/server.js').server;
const mockRequest = supergoose(server);

describe('500 MODULE', () => {
  it('its shold return 500 when something went wrong', () => {
    return mockRequest.post('/signin').then((resulte) => {
      expect(resulte.status).toEqual(404);
    });
  });
});
