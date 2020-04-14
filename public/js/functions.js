var map;
var marker

function initMap() {

  var start_location = {
    lat: 9.0006824,
    lng: 38.7906777
  };
  map = new google.maps.Map(document.getElementById('map'), {
    center: start_location,
    zoom: 13,
    disableDefaultUI: true
  });

  marker = new google.maps.Marker({
    position: start_location,
    map: map,
    title: 'My Location',
    animation: google.maps.Animation.DROP,
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {

    var geoErrorHandler = function (error) {
      alert(
        "አድራሻዎን ለማግኘት 'location services' ያስተካክሉት"
      );
      console.log(error);
    };

    var geoSuccessHandler = function (position) {
      console.log(position);
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      marker.setPosition(pos);
      map.setCenter(pos);

      //If accuracy is within 100m, enable submit
      if (position.coords.accuracy <= 150) {
        $('#submit-button').prop("disabled", false).removeClass("btn-warning").addClass("btn-success").html(
          "መዝግቡኝ");
        navigator.geolocation.clearWatch(watchLocation);
      }

      $('#submit-button').click(function (e) {
        if ($('input#name').val() != "" && $('input#phone').val() != "") {
          e.preventDefault;
          $('#submit-button').prop("disabled", true);
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            "name": $('input#name').val(),
            "phone": $('input#phone').val(),
            "location_description": $('input#location-description').val(),
            "coordinates": {
              "type": "Point",
              "coordinates": [pos.lng, pos.lat],
              "crs": {
                "type": "name",
                "properties": {
                  "name": "EPSG:4326"
                }
              }
            }
          });

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

          fetch("/volunteers", requestOptions).then(element => {
              $('#submit-button').prop("disabled", true).html("Thank you!");
              if (element.ok) {
                $('body').html('<div class="container"><div class="row"><div class="col"><h3>እናመሰግናለን። በጥቂት ቀናት ውስጥ እንደውላለን</h3></div></div></div>');
              } else {
                $('body').html('<div class="container"><div class="row"><div class="col"><h3>እናመሰግናለን። በጥቂት ቀናት ውስጥ እንደውላለን</h3></div></div></div>');
              }
            })
            .catch(error => {
              //alert(error.message);
            });
        } else {
          e.preventDefault;
          $('#submit-button').prop("disabled", false);
          alert("እባክዎ ስሞትንና ስልክዎን ያስገቡ");
        }

      });

    };

    var positionOptions = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 500
    };

    var watchLocation = navigator.geolocation.watchPosition(geoSuccessHandler, geoErrorHandler, positionOptions);
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  alert("Wአድራሻዎን ለማግኘት 'location services' ያስተካክሉት");
}

$("form#volunteer-signup").submit(function (e) {
  e.preventDefault();
});
