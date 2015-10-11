import Firebase from 'firebase';
import {EventEmitter} from 'events';
import lodash from 'lodash';

let _ = lodash;

// TODO: make this dynamic based on config
let STAGE = 'development';


function storageReady() {
  return new Promise((resolve, reject) => {
    let firebaseRef = new Firebase("https://flubstack.firebaseio.com/").child(STAGE);
    // TODO: authentication and all that?
    // TODO: eventually move this off of firebase and own the storage completely
    resolve(firebaseRef);
  });
}


class PageStore {

  constructor(pageId) {
    this.pageId = pageId;
    this.sessionId = 'sessssssionTODO';
    this.pageEvents = new EventEmitter();

    this.makeStart();

    storageReady().then((storage) => {
      let ref = storage.child('sessions').child(this.sessionId).child('items');
      ref.on('value', ((store) => {
        var itemObject = store.val();
        // TODO: do we need to make this into an array?
        if (!itemObject) {
          itemObject = {};
        }
        let itemList = _.values(itemObject);
        this.pageEvents.emit('items', itemList);
      }));
    });
  }

  makeStart() {
    let url = 'http://readline.io/channel/' + this.pageId;
    let message = {action: 'start', session: this.sessionId};
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(message)
    });
  }

  makeCall(fnname, args, kwargs) {
    args = args || [];
    kwargs = kwargs || {};

    let url = 'http://readline.io/channel/' + this.pageId;
    let message = {
      action: 'call',
      session: this.sessionId,
      fnname, args, kwargs};
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(message)
    });
  }

  onItems(callback) {
    this.pageEvents.on('items', callback);
  }

}

export default {PageStore};