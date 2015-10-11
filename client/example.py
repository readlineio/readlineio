import readlineio as rio

@rio.main
def example_input():
    rio.output('ReadlineIO example input')
    rio.output('Follow-up output')
    rio.input('What is your name?').then(print_name)

def print_name(name):
    rio.output('Hello ' + name + '!')
    rio.input('What is up?').then(print_okay)

def print_okay(message):
    rio.output('Cool. Cool.')

if __name__ == '__main__':
    rio.run()