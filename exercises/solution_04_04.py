from AMGeO.api import AMGeOApi
from datetime import date

api = AMGeOApi()

controller = api.get_controller()

d = date(2016, 1, 2)

h = 'S'

controller.load(d, h)