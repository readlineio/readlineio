# readlineio
Frontends without servers
===

Installing the Python code
---

```
brew install python3
cd client
virtualenv --python=python3 venv/
source venv/bin/activate
pip install -r requirements.txt
```

Adding a new block
---

Add a new block `.jsx` file to `web/client/components/blocks`

When you are done, open `web/client/components/blockRegistry.jsx` and add the new block to the imports, e.g.:

```
import Input from './Input.jsx';
import Output from './Output.jsx';
import Choice from './Choice.jsx';
import NewBlock from './NewBlock.jsx';
```
