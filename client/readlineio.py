from firebase import Firebase
from channel import Channel
import json

key = None

STAGE = 'development'

fbref = Firebase('https://flubstack.firebaseio.com/').child(STAGE)
# TODO: hardcoded host parameter
channel = Channel('http://readline.io', 'index')

application_main = None

# TODO: again, global here? is this safe?
session_stack = []

# TODO: globals???
registered_callbacks = {}


def register_callback(callback):
    key = callback.__module__ + '.' + callback.__name__
    registered_callbacks[key] = callback
    return key


class SessionContext(object):

    def __init__(self, session_id):
        self.session_id = session_id
        self.fbref = fbref.child('sessions').child(self.session_id)

    def __enter__(self):
        session_stack.append(self)

    def __exit__(self, type, value, traceback):
        removed = session_stack.pop()
        if removed != self:
            raise ValueError('Stack consistency mismatch: {} vs. {}'.format(removed.session_id, self.session_id))

    def send(self, msg):
        self.fbref.child('items').append(msg)

    def clear(self):
        self.fbref.child('items').set({})


class DeferredInput(object):

    def __init__(self, session, prompt):
        self.session = session
        self.prompt = prompt

    def then(self, callback):
        callback_name = register_callback(callback)
        message = {
            'type': 'input',
            'prompt': self.prompt,
            'callback': callback_name
        }
        self.session.send(message)


def session():
    return session_stack[-1]


def main(inner_f):
    # TODO: global? are you crazy?
    global application_main
    application_main = inner_f
    return inner_f


def output(text):
    # Write something to the current session's firebase
    sess = session()
    message = {
        'type': 'output',
        'text': text
    }
    sess.send(message)


def input(text):
    # Write something to the current session's firebase
    return DeferredInput(session(), text)


def handle_message(message):
    action = message.get('action')
    print('message action:', action)

    if action == 'start':
        session_id = message.get('session', 'TODO')
        with SessionContext(session_id):
            sess = session()
            sess.clear()
            application_main()

    elif action == 'call':
        session_id = message.get('session', 'TODO')
        with SessionContext(session_id):
            # TODO: call whatever the registered function is
            fnname, args, kwargs = message['fnname'], message['args'], message['kwargs']
            fn = registered_callbacks[fnname]
            fn(*args, **kwargs)
    else:
        print("The hell is this action:", action)


def run():
    page_id = 'index'
    page_channel = Channel('http://readline.io', page_id)
    print("Access your application by going to http://readline.io/{}".format(page_id))
    while True:
        message = page_channel.dequeue()
        if message:
            print("Message received: len={}".format(len(json.dumps(message))))
            handle_message(message)
        else:
            print("No message received, continuing long poll.")


