from firebase import Firebase
from channel import Channel

key = None

STAGE = 'development'

fbref = Firebase('https://flubstack.firebaseio.com/').child(STAGE)
# TODO: hardcoded host parameter
channel = Channel('http://localhost:8888', 'index')


class ReadlineIOPage(object):

    def __init__(self, page_id):
        self.page_id = page_id
        self.fbref = fbref.child(STAGE).child('page').child(self.page_id)

    def send(self, msg):
        self.fbref.child('items').append(json.dumps(msg))


def _context():
    # TODO: remove hardcoded channel
    return ReadlinePage('index')


def page(title):
    def make_inner(inner_f):
        # register inner function somewhere
        pass
    pass


def output():
    pass


def input():
    pass


def run():
    # read from channel with timeout
    pass