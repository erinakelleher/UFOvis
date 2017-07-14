/*THE PLAN:
	visualize:
	sightings in comparison to;
	-population area
	-over time

	line graph:

	x=time
	y=sightings
	select different states

		
*/


var dataset = [];

d3.csv("scrubbed.csv", function(error, data) {
	for(var i = 0; i < data.length; i++)
	{
		if(data[i].country=="us")
		{
			var d = {datetime:data[i].datetime, state:data[i].state,city:data[i].city, latitude:parseFloat(data[i].latitude), longitude:parseFloat(data[i].longitude)};
			dataset.push(d);
		}
	}
	console.log(dataset[0]);
});
