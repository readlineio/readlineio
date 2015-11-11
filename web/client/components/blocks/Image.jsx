import React from 'react';
import Base from 'components/blocks/Base.jsx';

let Image = Base.createBlock('image', {

  render() {
    return (
      <section className="block">
        <img src={this.props.item.url}></img>
      </section>
    );
  }

});

export default Image;