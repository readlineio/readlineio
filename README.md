# readlineio
Frontends without servers

brew install python3
cd client
virtualenv --python=python3 venv/
source venv/bin/activate
pip install -r requirements.txt

Adding a new block
===

Add a new block `.jsx` file to `web/client/components/blocks`

When you are done, open `components/ReadlineIOMain` and add the new block to the top of the imports, e.g.:

```
import Input from 'components/blocks/Input.jsx';
import Output from 'components/blocks/Output.jsx';
import Choice from 'components/blocks/Choice.jsx';
import NewBlock from 'components/blocks/NewBlock.jsx';
```

and add the new block also to this function:

```
renderItemInner(item) {
      ...
      case 'newblock':
        return (<NewBlock item={item} store={this.store} />);
```
