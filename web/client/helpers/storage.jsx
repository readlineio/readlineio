import Firebase from 'firebase';
import {EventEmitter} from 'events';

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
    this.pageEvents = new EventEmitter();

    storageReady().then((storage) => {
      let ref = storage.child('pages').child(this.pageId).child('items');
      ref.on('value', ((store) => {
        var itemObject = store.val();
        // TODO: do we need to make this into an array?
        if (!itemObject) {
          itemObject = [];
        }
        this.pageEvents.emit('items', itemObject);
      }));
    });
  }

  makeCall(fnname, args, kwargs) {
    args = args || [];
    kwargs = kwargs || {};

    let url = 'http://localhost:8888/channel/' + this.pageId;
    let message = {fnname, args, kwargs};
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