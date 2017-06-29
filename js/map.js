var mapError = function() {
    alert("Google API loaded Incorrectly. Please try again later");
};
var map;
// Create a new blank array for all the listing markers.
var markers = [];
// created and downloaded from snazzymap
var styles = [{
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "color": "#444444"
      }
  ]
},
{
  "featureType": "administrative.locality",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "visibility": "simplified"
      },
      {
          "color": "#951919"
      }
  ]
},
{
  "featureType": "administrative.neighborhood",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#531515"
      }
  ]
},
{
  "featureType": "administrative.land_parcel",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#802424"
      }
  ]
},
{
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [
      {
          "color": "#f2f2f2"
      }
  ]
},
{
  "featureType": "landscape.man_made",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#e9bac3"
      }
  ]
},
{
  "featureType": "landscape.natural.landcover",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#f26e6e"
      }
  ]
},
{
  "featureType": "landscape.natural.terrain",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#9c5f5f"
      }
  ]
},
{
  "featureType": "poi",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "poi.government",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#ad4747"
      }
  ]
},
{
  "featureType": "poi.park",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#828a8f"
      },
      {
          "visibility": "on"
      },
      {
          "saturation": "-29"
      },
      {
          "lightness": "24"
      }
  ]
},
{
  "featureType": "poi.school",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#bc344c"
      }
  ]
},
{
  "featureType": "poi.school",
  "elementType": "labels.text",
  "stylers": [
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "poi.school",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#000000"
      },
      {
          "weight": "3.42"
      }
  ]
},
{
  "featureType": "poi.school",
  "elementType": "labels.text.stroke",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "hue": "#ff0000"
      }
  ]
},
{
  "featureType": "road",
  "elementType": "all",
  "stylers": [
      {
          "saturation": -100
      },
      {
          "lightness": 45
      }
  ]
},
{
  "featureType": "road",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#000000"
      }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "simplified"
      }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "road.arterial",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#000000"
      }
  ]
},
{
  "featureType": "road.arterial",
  "elementType": "labels.icon",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "road.local",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#000000"
      }
  ]
},
{
  "featureType": "transit",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "water",
  "elementType": "all",
  "stylers": [
      {
          "color": "#144458"
      },
      {
          "visibility": "on"
      }
  ]
}
];
var largeInfowindow;
var loc = 23;

var locations = [{
        title: 'T-Town',
        location: {
          lat: 33.2089,
          lng: -87.5692
        },
        description: "My favorite historical place in Japan. I love learning about medieval Japan and this castle was just so beautiful!"
    }
];


function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 87.5692,
            lng: 33.2089
        },
        styles: styles,
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false
    });

    function makeMarkerIcon() {
        var markerImage = new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        return markerImage;
    }

    var defaultIcon = makeMarkerIcon();

    var largeInfowindow = new google.maps.InfoWindow();



    var bounds = new google.maps.LatLngBounds();
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            icon: defaultIcon,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i,
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
    var largeInfowindow = new google.maps.InfoWindow({
        maxWidth: 320
    });
    initModel(largeInfowindow);
}
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.

function populateInfoWindow(infowindow, location) {
    if (infowindow.marker != location.marker) {
        if (infowindow.marker != undefined) {
            infowindow.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        }

        infowindow.marker = location.marker;
        location.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        infowindow.setContent('<img style="border-radius: 100%; float: right" src="' + location.img + '">' + '<div><h1>' + location.marker.title + '</h1></div>' +
            '<div style="text-transform: capitalize">' + location.weather + '</div>' + '<div>' + location.temp.toFixed(2) + '&degC</div>' +
            '<div>' + location.description + '</div>');
        infowindow.open(map, location.marker);
        infowindow.addListener('click', function() {
            location.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            infowindow.setMarker(null);
        });
    } else {
        infowindow.marker = null;
        location.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        infowindow.close();
    }
}
