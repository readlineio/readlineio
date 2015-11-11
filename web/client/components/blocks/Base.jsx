import React from 'react';
import {PageStore} from 'helpers/storage.jsx';

let baseOptions = {

}

let Base = {
  createBlock(name, options) {
    let factory = React.createClass(
      Object.assign({}, baseOptions, options)
    );
    Base.blockRegistry[name] = factory;
    return factory;
  }
}

Base.blockRegistry = {};

export default Base;