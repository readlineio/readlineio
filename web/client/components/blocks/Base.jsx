import React from 'react';
import {PageStore} from 'helpers/storage.jsx';

let baseOptions = {

}

let Base = {
  createBlock(options) {
    return React.createClass(
      Object.assign({}, baseOptions, options)
    );
  }
}

export default Base;