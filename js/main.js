$(function(){

  $('body').append('<table id="birthdayTable"><thead><th>Name</th><th>SFPC Birthday Dinner</th><th>SFPC Birthday</th><th><a href="https://en.wikipedia.org/wiki/Gregorian_calendar">Gregorian Birthday</td></th></thead><tbody id="birthdayContainer"></tbody></table>');
  var bdayContainer = $('#birthdayContainer');

  var birthdays = [
    {name:"Patrick", date:new Date('1/5/2018')},
    {name:"Sonia", date:new Date('2/8/2018')},
    {name:"Eli", date:new Date('4/2/2018')},
    {name:"Thor", date:new Date('4/8/2018')},
    {name:"Elizabeth", date:new Date('4/12/2018')},
    {name:"Kate", date:new Date('4/16/2018')},
    {name:"Ilona", date:new Date('5/31/2018')},
    {name:"Marcus", date:new Date('6/20/2018')},
    {name:"Tomoya", date:new Date('6/24/2018')},
    {name:"Tim", date:new Date('6/28/2018')},
    {name:"Neta", date:new Date('7/8/2018')},
    {name:"Susie", date:new Date('7/31/2018')},
    {name:"Lauren", date:new Date('8/1/2018')},
    {name:"Taeyoon", date:new Date('8/2/2018')},
    {name:"Galen", date:new Date('8/30/2018')},
    {name:"Ed", date:new Date('9/14/2018')},
    {name:"Lynne", date:new Date('10/2/2018')},
    {name:"Meg", date:new Date('12/29/2018')}
  ];

  var startDate = new Date('9/17/2018');
  var endDate = new Date('11/16/2018');

  $('#sfpcDefaultDates').append('(assumes an SFPC-year of ' + startDate.toDateString() + ' to ' + endDate.toDateString() + ')');

  var sfpcYearLength = (endDate - startDate) / 86400 / 1000;
  var calendarYearLength = 365;

  $.each(birthdays, function(index, item) {
    var sfpcDay = _map((item.date - new Date('1/1/2018')) / 86400 / 1000, 0, calendarYearLength, 0, sfpcYearLength);

    var sfpcDate = new Date(startDate.getTime() + (sfpcDay * 24 * 60 * 60 * 1000) );

    item.sfpcBirthday = sfpcDate;

    var dateModifier = 3 - sfpcDate.getDay(); // 3 is wednesday in js date
    item.sfpcDinnerDate = new Date(sfpcDate.getTime());
    item.sfpcDinnerDate.setDate(item.sfpcDinnerDate.getDate() + dateModifier);

    bdayContainer.append('<tr><td>' + item.name + '</td><td>' + item.sfpcDinnerDate.toDateString() + '</td><td>' + item.sfpcBirthday.toDateString() + '</td><td>' + item.date.toDateString() + '</td></tr>');

  });

  //var chart = d3.timeline();

  var chartWidth = 1000;
  var chartHeight = 1000;
  var svg = d3.select("#timeline").append("svg").attr("width", chartWidth).attr("height", chartHeight);
  var g = svg.append("g");

    //var x = d3.scaleTime().rangeRound([50, chartWidth - 50]);
    var x = d3.scaleTime().rangeRound([0, 360]);
    x.domain(d3.extent(birthdays, function(d) { return d.sfpcBirthday; }));

    /*g.append("g")
      .attr("transform", "translate(0,50)")
      .call(d3.axisTop(x))
    .select(".domain")
      .remove();

    var x2 = d3.scaleTime().rangeRound([50, chartWidth - 50]);
    x2.domain(d3.extent(birthdays, function(d) { return d.date; }));

    g.append("g")
      .attr("transform", "translate(0," + (chartHeight - 50) + ")")
      .call(d3.axisBottom(x2))
    .select(".domain")
      .remove();*/

    // draw circles

      console.log(birthdays);
    var gC = svg.append("g").datum(birthdays);
		var circles = gC.selectAll("circle")
			.data(function(d) { return d; })
			.enter()
			.append("circle")
			.attr("r", 20)
			.style("fill-opacity",1e-6);


      // Linear timeline
		/*circles.transition()
		     .duration(function(d,i){
		    	 return 100 * i;
		     })
		    .attr("cx", function(d) {
				return x(new Date(d.sfpcBirthday));
			})
			.attr("cy", function(d) {
				return chartHeight / 2;
			})
      .attr("fill", "darkOrange")
			.style("fill-opacity",1);

    var labels = gC.selectAll("text")
      .data(function(d) { return d; })
      .enter()
      .append("text")
      .attr("x", function(d) {
        return x(new Date(d.sfpcBirthday)) + 15;
      })
      .attr("y", function(d) {
				return (chartHeight / 2) - 15;
			})
      .text(function(d) {
        return d.name;
      });*/


      var radius = 250;


      // Circular timeline
      circles.transition()
  		     .duration(function(d,i){
  		    	 return 100 * i;
  		     })
  		    .attr("cx", function(d) {
            var ang = x(new Date(d.sfpcBirthday)) * (Math.PI/180);
  		      return Math.cos(ang) * radius + (chartWidth / 2);
  			   })
          .attr("cy", function(d) {
            var ang = x(new Date(d.sfpcBirthday)) * (Math.PI/180);
            return Math.sin(ang) * radius + (chartHeight / 2);
          })
          .attr("fill", "darkOrange")
          .style("fill-opacity",1);

      var labels = gC.selectAll("text")
        .data(function(d) { return d; })
        .enter()
        .append("text")
        .attr("x", function(d) {
          var ang = x(new Date(d.sfpcBirthday)) * (Math.PI/180);
          return Math.cos(ang) * radius + (chartWidth / 2) + 25;
        })
        .attr("y", function(d) {
          var ang = x(new Date(d.sfpcBirthday)) * (Math.PI/180);
  				return Math.sin(ang) * radius + (chartHeight / 2);
  			})
        .text(function(d) {
          return d.name;
        });

      /*.attr('transform', function (d, i) {
        return "translate(" + ((w/2-r) * Math.cos((interval*i) * Math.PI/180)) + "," + ((w/2-r) * Math.sin((interval*i) * Math.PI/180)) + ")";
    });*/


});

function _map (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
