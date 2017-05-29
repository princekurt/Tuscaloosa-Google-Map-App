"use strict";
var Location = function(data){
  this.title = data.title;
  this.latLng = {lat: data.lat, lng: data.lng};
  this.markerImage = data.img;
  this.marker = data.marker;
  this.temp = data.temp;
  this.weather = data.weather;
  this.description = data.description;
  this.img = data.img;
};
var Locations = [];

var initModel = function(largeInfowindow){
  var counter = 0;
  locations.forEach(function(location){
    var weather;
    var temperature;
    var count = counter;
    var img = "https://maps.googleapis.com/maps/api/streetview?size=100x100&location=" + location.location.lat +"," + location.location.lng + "&heading=151.78&pitch=-0.76&key=AIzaSyDqAj0V0aqWvqxZzk9krzY3NGDbARplz6U";
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + location.location.lat + "&lon=" + location.location.lng + "&APPID=73c3ee276280b40f8967433d6ee34cf5";
    // makes call to weather api
    $.ajax({
      url: url,
      dataType: "jsonp",
      success: function(response){
        temperature = response.main.temp - 273.15 ;
        weather = response.weather["0"].description;
        Locations[count].weather = weather;
        Locations[count].temp = temperature;
        Locations[count].marker.addListener("click",function(){
          populateInfoWindow(largeInfowindow, Locations[count]);
        });
      },
      error: function(response){
        Locations[count].weather = "Weather Not available right now";
        Locations[count].temp = 0;
      }
    });
    // pushes to my locations array holding Location objects
    Locations.push(new Location({
      title: ko.observable(location.title),
      lat: location.location.lat,
      lng: location.location.lng,
      temp: temperature,
      weather: weather,
      description: location.description,
      img: img,
      marker: markers[counter],
      onMap : ko.observable(1)
    }));
    counter += 1;
  });
ko.applyBindings(new ViewModel(largeInfowindow));
};

// a function found on stackoverflow that replicates the knockoutjs utility funciton
// of the same name.
var stringStartsWith = function (string, startsWith) {
  string = string || "";
  if (startsWith.length > string.length)
    return false;
  return string.substring(0, startsWith.length) === startsWith;
};


var ViewModel = function(largeInfowindow){
  this.largeInfoWindow = largeInfowindow;
  var self = this;
  this.locations = ko.observableArray(Locations);
  this.currentFilter= ko.observable();
  // creates the filter at the top of the page.
  this.filteredItems = ko.computed(function(){
    if(!self.currentFilter()){
      this.locations().forEach(function(location){
        location.marker.setMap(map);
      });
      return self.locations();
    }
    else{
      return ko.utils.arrayFilter(self.locations(), function(location){
        if (stringStartsWith(location.title().toLowerCase(), self.currentFilter())){
          location.marker.setMap(map);
        }
        else{
          location.marker.setMap(null);
        }
        return stringStartsWith(location.title().toLowerCase(), self.currentFilter());
      });
    };
  }, this);
  this.toggleMap = function(){
      populateInfoWindow(self.largeInfoWindow, this);

  };
};
