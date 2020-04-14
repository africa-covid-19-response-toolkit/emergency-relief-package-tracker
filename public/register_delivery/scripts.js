 // Create flag for cookie existence
 var cookiesExist = false;

 // Check if cookie exists. If yes, fill out org id and PIN, if not set it on successful save
 if (!(typeof Cookies.get('organization') === 'undefined')) {
   //document.getElementById("organization").value = parseInt(Cookies.get('organization'));
   cookiesExist = true;
   document.getElementById("org-pin").value = Cookies.get('org-pin');
 }


 // Initialize geolocation
 var geoSuccessHandler = function (position) {
   let longitude = position.coords.longitude;
   let latitude = position.coords.latitude;
   let accuracy = position.coords.accuracy;

   if (accuracy <= 150) {
     document.getElementById("submit-delivery").disabled = true;
     var myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");

     var raw = JSON.stringify({
       "organization_id": parseInt(document.getElementById("organization").value),
       "num_of_packages_delivered": parseInt(document.getElementById("num_packages_delivered").value),
       "pin_code": parseInt(document.getElementById("org-pin").value),
       "location": {
         "type": "Point",
         "coordinates": [longitude, latitude],
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

     fetch("/deliveries", requestOptions)
       .then(response => {
         if (response.ok) {
           return response.json();
         } else {
           return Promise.reject({
             status: response.status,
             statusText: response.statusText
           });
         }
       })
       .then(result => {
         alert("Succesfully submitted");
         document.getElementById("submit-delivery").disabled = false;
         // If no cookies exist, create them
         if (typeof Cookies.get('org-number') === 'undefined') {
           Cookies.set('organization', parseInt(document.getElementById("organization").value), {
             expires: 60
           });
           Cookies.set('org-pin', parseInt(document.getElementById("org-pin").value), {
             expires: 60
           });
         }
       })
       .catch(error => {
         alert("Please make sure you are using the correct PIN for your organization");
         document.getElementById("submit-delivery").disabled = false;
         console.log('Error, with message:', error.statusText)
       });

   } else {
     alert("Your device's GPS does not seem to be working properly, please try again");
   }
 };

 var geoErrorHandler = function (error) {
   alert("Your device's GPS does not seem to be working properly, please try again");
 };

 var positionOptions = {
   enableHighAccuracy: true,
   timeout: 1000,
   maximumAge: 0
 };

 // Get Organizations
 var requestOptions = {
   method: 'GET',
   redirect: 'follow'
 };

 fetch("/organizations?$sort[name]=1", requestOptions)
   .then(response => response.json())
   .then(result => {
     result.data.forEach(element => {
       var option = document.createElement("option");
       option.value = element.id;
       option.text = element.name;
       if (cookiesExist) {
         if (parseInt(Cookies.get('organization')) == option.value) {
           option.selected = true;
         }
       }
       document.getElementById("organization").add(option);
     });
   })
   .catch(error => console.log('error', error));

 function submitDelivery() {
   //Get Location
   navigator.geolocation.getCurrentPosition(geoSuccessHandler, geoErrorHandler, positionOptions);

 }

 // Set up REST POST request

 // If the request is successful, store the organization id and PIN in a cookie

 // On page load, if there is a cookie, retrieve details and put it in form
