# readlineio
Frontends without servers

brew install python3
cd client
virtualenv --python=python3 venv/
source venv/bin/activate
pip install -r requirements.txt

Adding a new block
===

Add a new block .jsx to web/client/components/blocks

then modify components/ReadlineIOMain and add the block to

`import Input from 'components/blocks/Input.jsx';`
`import Output from 'components/blocks/Output.jsx';`
`import Choice from 'components/blocks/Choice.jsx';`

and

`renderItemInner(item)`
