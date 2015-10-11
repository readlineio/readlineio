import readlineio as rio
rio.key = '12345' # TODO

@rio.page('Example Page')
def example_input():
    g.output('ReadlineIO example input')
    g.input('What is your name?').then(print_name)

def print_name(name):
    g.output('Hello ' + name + '!')