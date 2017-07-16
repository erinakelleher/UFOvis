
var map = new google.maps.Map(d3.select('#map').node(),{
		zoom: 4,
		center: {lat: 38.753709, lng: -100.304914},
		mapTypeId: 'roadmap'
	});

var bounds = new google.maps.LatLngBounds(
	  new google.maps.LatLng(14.281955, -129.709511),
      new google.maps.LatLng(47.646804, -64.253767));

d3.json('ufodata.json',function(error, data){
	if(error)
		throw error;	
	
	UFOoverlay.prototype = new google.maps.OverlayView();
	function UFOoverlay(bounds, map){
		this.bounds_ = bounds;
		this.map_ = map;
		this.setMap(map)
	}
	UFOoverlay.prototype.onAdd = function(){
		var layer = d3.select(this.getPanes().overlayLayer)
			.append("div")
			.attr("id","sightings");
	
		UFOoverlay.prototype.draw = function(){
			var overlayProjection = this.getProjection();
	        var points = [];
			data.forEach(function(element){
				points.push(transform(element));
			});

			function transform(d){
				var point = new google.maps.LatLng(d.latitude, d.longitude);
				point = overlayProjection.fromLatLngToContainerPixel(point);
				return point;
			};

			var dots = d3.selectAll('div').append("canvas").attr('width', 1000).attr("height", 600);
			var ctx = d3.selectAll('canvas').node().getContext("2d");
			ctx.fillStyle = "#e61112";
			ctx.strokeStyle = "none";
			points.forEach(function(elem){
				ctx.globalAlpha= 0.2;
				ctx.beginPath();
				ctx.arc(elem.x,elem.y,2,0,2*Math.PI);
				ctx.stroke();
				ctx.fill();

			})
			/*
			var circle = dots.selectAll("circle")
				.data(points)
				.enter()
				.append("circle")
				.attr("r",2)
				.attr("cx", function(d){return d.x;})
				.attr("cy", function(d){return d.y;})
				.attr("class","dot");
				*/
		};

	};
	var overlay = new UFOoverlay(bounds,map);
	overlay.setMap(map);
});
