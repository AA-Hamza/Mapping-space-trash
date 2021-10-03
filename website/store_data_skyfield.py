from init_database import engine,Object
from sqlalchemy.orm import Session
from datetime import datetime
import requests,json
from skyfield.api import load, wgs84

urls=['http://celestrak.com/NORAD/elements/1999-025.txt','http://celestrak.com/NORAD/elements/cosmos-2251-debris.txt'
'http://celestrak.com/NORAD/elements/iridium-33-debris.txt']


with Session(engine) as session:
	for url in urls:
		satellites = load.tle_file(url)

		ts = load.timescale()
		for sat in satellites:
			print(sat.model.sgp4)
			t = ts.now()
			geocentric = sat.at(t)
			subpoint = wgs84.subpoint(geocentric)
			position =geocentric.position.km
			velocity = geocentric.velocity.km_per_s
			x,y,z = position[0],position[1],position[2]
			rec = {
				'name':sat.name,
				'x':x,
				'y':y,
				'z':z,
				'vx':velocity[0],
				'vy':velocity[1],
				'vz':velocity[2],
				'latitude':subpoint.latitude._hours,
				'longitude':subpoint.longitude._hours,
				'altitude':subpoint.elevation.km
			}
			object = Object(**rec)
			session.add(object)
		session.commit()
