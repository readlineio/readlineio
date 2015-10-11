import requests
import os.path
import json

class Firebase(object):

    def __init__(self, url):
        self.url = url
        self.json_url = url.rstrip('/') + '.json'

    def child(self, child_path):
        return Firebase(os.path.join(self.url, child_path))

    def get(self):
        resp = requests.get(self.json_url)
        if resp.status_code == 200:
            return json.loads(resp.text)
        else:
            raise ValueError("Invalid response from Firebase server.")

    def set(self, obj):
        return requests.put(self.json_url, data=json.dumps(obj))

    def update(self, obj):
        return requests.patch(self.json_url, data=json.dumps(obj))

    def append(self, obj):
        return requests.post(self.json_url, data=json.dumps(obj))