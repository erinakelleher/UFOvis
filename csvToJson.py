#Takes the scrubbed.csv file and converts it to a JSON, with some filters: 
#Only sightings in the US, and only sightings 2013-now. 
import csv
import json

dataset = []
# Column heads: datetime city state country shape duration(sec) duration(hours/min) comments dateposted lat long
#country = [3]
#lat = [9]
#long = [10]
#datetime format: 10/10/1949 21:00

#Parses the year from the datetime field
def parseYear(str):
	ret = 0;
	try:
		ret = int(str[6:10])
	except ValueError:
		ret = 0
	return ret

#Takes the csv, outputs the jsons
def getCsv():
	count = 0 #Lets you know how many items are in the new JSON
	f = open('/home/sean/GitHub/UFOvis/scrubbed.csv', 'rb')
	reader = csv.reader(f)
	for row in reader:
		if row[3] == "us":
			if parseYear(row[0])>2012:
				dataset.append({'year':parseYear(row[0]), 'latitude':float(row[9]), 'longitude':float(row[10])})
				count += 1
	js = json.dumps(dataset)
	file = open("ufodata.json","w")
	file.write(js)
	file.close()
	print count


getCsv()