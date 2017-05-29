
var mapError = function(){
  alert("Google API loaded Incorrectly. Please try again later");
}
var map;
// Create a new blank array for all the listing markers.
var markers = [];
// created and downloaded from snazzymap
var styles = [
  {
    "featureType": "all",
    "elementType": "geometry",
    "stylers":
     [{
        "color": "#63b5e5"
      }]
  },
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#394648"
      }
      ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "gamma": 0.01
      },
      {
        "lightness": 20
      }
      ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "saturation": -31
      },
      {
        "lightness": -33
      },
      {
        "weight": 2
      },
      {
        "gamma": 0.8
      }
      ]
  },
  {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
      ]
  },
  {
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
      ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "labels.icon",
    "stylers": [
      {
        "color": "#644747"
      }
      ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "all",
    "stylers": [
      {
        "color": "#0d0202"
      },
      {
        "visibility": "off"
      }
      ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#b04a49"
      }
      ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "lightness": 30
      },
      {
        "saturation": 30
      }
      ]
  },
  {
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
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
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
      "saturation": 20
      }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
        ]
    },
    {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
        ]
    },
    {
      "featureType": "poi.government",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
        ]
    },
    {
      "featureType": "poi.medical",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
        ]
    },
    {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "on"
        }
        ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "lightness": 20
        },
        {
        "saturation": -20
        },
        {
          "color": "#b04a49"
        }
        ]
     },
     {
      "featureType": "poi.park",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "weight": "0.14"
        }
        ]
     },
     {
      "featureType": "poi.place_of_worship",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
        ]
      },
      {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
          ]
      },
      {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
          ]
       },
       {
         "featureType": "road",
         "elementType": "all",
         "stylers": [
           {
             "visibility": "off"
            }
            ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "lightness": 10
            },
            {
              "color": "#ffffff"
            },
            {
              "saturation": -30
            }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "saturation": 25
              },
              {
                "lightness": 25
              }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#394648"
                }
                ]
            },
            {
              "featureType": "transit",
              "elementType": "labels",
              "stylers": [
                {
                  "color": "#ffffff"
                },
                {
                  "weight": "1.23"
                },
                {
                  "gamma": "0.69"
                }
                ]
            },
            {
              "featureType": "transit.station.airport",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "on"
                }
                ]
            },
            {
              "featureType": "transit.station.bus",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "on"
                }
                ]
            },
            {
              "featureType": "transit.station.rail",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "on"
                }
                ]
            },
            {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                {
                  "lightness": -20
                },
                {
                  "color": "#ffffff"
                }
                ]
            }
];
var largeInfowindow;
var loc = 23;

var locations = [
  {title: 'Himeji Castle', location: {lat: 34.8394, lng: 134.6939}, description: "My favorite historical place in Japan. I love learning about medieval Japan and this castle was just so beautiful!"},
  {title: 'Osaka Castle', location: {lat: 34.6873, lng: 135.5262}, description: "My favorite leader of Japan, Toyotomi Hideyoshi's castle, this castle was near my home while in Japan so I vistited it frequently."},
  {title: 'Kobe Steakland', location: {lat: 34.6930, lng: 135.1921}, description: "I ate this on my last day in Japan. Kobe steak is so expensive, but so absolutely delicious."},
  {title: 'Kwansei Gakuin University', location: {lat: 34.7679, lng: 135.3466}, description: "My university in Japan. I love this University. I spent 1 year studying here."},
  {title: 'Kansai International Airport', location: {lat: 34.4320, lng: 135.2304}, description: "The airport where many adventures started and ended. I can't wait to come back to this airport."},
  {title: 'Nagasaki', location: {lat: 32.7503, lng: 129.8777}, description: "My brother studied abroad here, It was quite hot when I visited but beautiful and sobering!"},
  {title: 'Shibuya, Tokyo', location:{lat: 35.6618, lng:139.7041}, description: "I only visited here for 2 days but I had an airbnb about 5 mins walk from the famous shibuya crossing. It was beautiful!"},
  {title: 'Mount Koya', location: {lat: 34.2167, lng: 135.5833}, description: "I hiked the Choishimichi trail while I was here. It took 9 hours and was so amazing. I was so tired by the time I reached Koyasan."},
  {title: 'Wakayama', location: {lat: 33.6782, lng: 135.3481}, description: "After my school got canceled for a week due to a bomb threat a couple friends and I spent a week at this beach town!"},
  {title: 'Seoul', location: {lat: 37.5665, lng: 126.9780}, description: "I visited here for 4 days visited a friend who lived there. I disliked the haze but found the city to be beautiful!"}];


function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 36.34829, lng: 138.596955},
		        styles: styles,
            zoom: 6,
		        mapTypeControl: false,
		        streetViewControl: false,
		        rotateControl: false
        });

		    function makeMarkerIcon(){
			       var markerImage = new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
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
        var largeInfowindow = new google.maps.InfoWindow({maxWidth: 320});
        initModel(largeInfowindow);
}
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.

function populateInfoWindow(infowindow, location){
        if (infowindow.marker != location.marker){
            if(infowindow.marker != undefined){
                infowindow.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
              }

            infowindow.marker = location.marker;
            location.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            infowindow.setContent('<img style="border-radius: 100%; float: right" src="'+ location.img +'">' + '<div><h1>' + location.marker.title + '</h1></div>'+
            '<div style="text-transform: capitalize">' + location.weather + '</div>' + '<div>' + location.temp.toFixed(2) + '&degC</div>'
            + '<div>' + location.description + '</div>');
            infowindow.open(map,location.marker);
            infowindow.addListener('click',function(){
                location.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
                infowindow.setMarker(null);
            });
        }
        else{
            infowindow.marker = null;
            location.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            infowindow.close();
        }
}
