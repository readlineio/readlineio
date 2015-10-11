import React from 'react';
import {PageStore} from 'helpers/storage.jsx';

// TODO: auto-discovery here? this seems really messy
import Input from 'components/blocks/Input.jsx';
import Output from 'components/blocks/Output.jsx';
import Choice from 'components/blocks/Choice.jsx';

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
    switch (item.type) {
      case 'output':
        return (<Output item={item} store={this.store} />);
      case 'input':
        return (<Input item={item} store={this.store} />);
      case 'choice':
        return (<Choice item={item} store={this.store} />);
      default:
        return this.renderItemDefault(item);
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