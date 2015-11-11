import React from 'react';
import Base from 'components/blocks/Base.jsx';

let Output = Base.createBlock('output', {

  render() {
    return (
      <section className="block">
        {this.props.item.text}
      </section>
    );
  }

});

Output.defaultProps = {
  text: 'No text'
};

export default Output;