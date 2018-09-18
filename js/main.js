$(function(){

  $('body').append('<table id="birthdayTable"><thead><th>Name</th><th>Birthday</th><th>SFPC Birthday</th></thead><tbody id="birthdayContainer"></tbody></table>');
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
    {name:"Galen", date:new Date('8/30/2018')},
    {name:"Ed", date:new Date('9/14/2018')},
    {name:"Lynne", date:new Date('10/2/2018')},
    {name:"Meg", date:new Date('12/29/2018')},
    {name:"Taeyoon", date:new Date('8/2/2018')}
  ];

  var startDate = new Date('9/10/2018');
  var endDate = new Date('11/16/2018');

  $('#sfpcDefaultDates').append('(assumes an SFPC-year of ' + startDate.toDateString() + ' to ' + endDate.toDateString() + ')');

  var sfpcYearLength = (endDate - startDate) / 86400 / 1000;
  var calendarYearLength = 365;

  $.each(birthdays, function(index, item) {
    var sfpcDay = _map((item.date - new Date('1/1/2018')) / 86400 / 1000, 0, calendarYearLength, 0, sfpcYearLength);

    var sfpcDate = new Date(startDate.getTime() + (sfpcDay * 24 * 60 * 60 * 1000) );

    item.sfpcBirthday = sfpcDate;
    bdayContainer.append('<tr><td>' + item.name + '</td><td>' + item.date.toDateString() + '</td><td>' + item.sfpcBirthday.toDateString() + '</td></tr>');

  });

  /*var chart = d3.timeline();

  var svg = d3.select("#timeline").append("svg").attr("width", 500)
    .datum(birthdays).call(chart);*/

});

function _map (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}