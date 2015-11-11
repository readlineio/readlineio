import React from 'react';
import {PageStore} from 'helpers/storage.jsx';
import Base from 'components/blocks/Base.jsx';
import blockRegistry from 'components/blocks/blockRegistry.jsx';

let ReadlineIOMain = React.createClass({

  getInitialState() {
    return {
      items: []
    };
  },

  componentDidMount() {
    this.store = new PageStore(this.props.pageId);
    this.store.onItems((items) => {
      console.log('Items:', items);
      this.setState({items: items});
    });
  },

  renderItemDefault(item) {
    return (
      <h2>{item}</h2>
    );
  },

  renderItemInner(item) {
    let Factory = Base.blockRegistry[item.type];
    if (!Factory) {
      console.warn("Invalid block type:", item.type);
      return this.renderItemDefault(item);
    } else {
      return (<Factory item={item} store={this.store} />);
    }
  },

  renderItem(item) {
    return (
      <section className="readline-item">
        {this.renderItemInner(item)}
      </section>
    )
  },

  render() {
    return (
      <section className="container">
        <h1>ReadlineIO Main</h1>
        { this.state.items.map((item) => { return this.renderItem(item); }) }
      </section>
    );
  }

});

ReadlineIOMain.defaultProps = {
  pageId: 'index'
};

export default ReadlineIOMain;