// responses
import axios from 'axios';
import listsResponse from '../fixtures/createList200.json';

const routes = {
  lists: /\/lists$/,
  listCards: /\/lists\/.+\/cards/
};

function get(url) {
}

function post(url, reqBody) {
  if (url.match(routes.lists)) {
    const dummyResponse = Object.assign({}, reqBody, { _id: "atozinc" });
    return new Promise((resolve, reject) => resolve({ data: dummyResponse }));
  }

  if (url.match(routes.listCards)) {
    const dummyResponse = Object.assign({}, reqBody.card, { _id: "cardid" });
    return new Promise((resolve, reject) => resolve({ data: dummyResponse }));
  }

  // eslint-disable-next-line no-console
  console.log('404: NotFound');
}

class Switchboard {
  static init() {
    spyOn(axios, 'post').and.callFake((url, reqBody) => {
      return post(url, reqBody);
    });
  }
}

export default Switchboard;
