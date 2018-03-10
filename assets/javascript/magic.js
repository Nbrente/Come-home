  // Initialize Firebase

  var config = {
      apiKey: "AIzaSyAWGMdRh9ilJ6IqAM2fp4pU6pA9JoYKibE",
      authDomain: "comehome-22679.firebaseapp.com",
      databaseURL: "https://comehome-22679.firebaseio.com",
      projectId: "comehome-22679",
      storageBucket: "",
      messagingSenderId: "458156685398"
  };

  firebase.initializeApp(config);

var CLOUDINARY_URL =  "https://api.cloudinary.com/v1_1/dnp117saf/upload";
var CLOUDINARY_UPLOAD_PRESET = 'btj61uny';


  var fileUpLoad = $("#fileInput");
  var imgURL 

  fileUpLoad.on('change' , function(event){
    var file = event.target.files[0];
    console.log(file);
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
      url: CLOUDINARY_URL, 
      method: "POST",
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    }).then(function(response){
      imgURL = response.data.url;
      console.log(response);
    }).catch(function(error){
      console.error(error);
    });

  });


  var dataRef = firebase.database();

  var petName = "";
  var petAge = 0;
  var petDateLost = 0;
  var firstName = "";
  var lastName = "";
  var phoneNumber = 0;
  var email = "";
  var breed = "";
  var comment = "";
  var houseNum = 0;
  var streetName = "";
  var city = "";
  var state = "";
  var zipcode = 0;



  $("#submit").on("click", function(event) {
      event.preventDefault();


      breed = $("#petBreedInput").val();
      petName = $("#petNameInput").val().trim();
      petAge = $("#petAgeInput").val();
      petDateLost = $("#petDateLostInput").val().trim();
      firstName = $("#first_name").val().trim();
      lastName = $("#last_name").val().trim();
      phoneNumber = $("#icon_telephone").val().trim();
      email = $("#ownerEmailInput").val().trim();
      comment = $("#comment").val();
      houseNum = $("#lostNumAddInput").val().trim();
      streetName = $("#lostNameAddInput").val().trim();
      city = $("#lostCityAddInput").val().trim();
      state = $("#lostStateAddInput").val().trim();
      zipcode = $("#lostZipAddInput").val().trim();

      // Code for the push
      dataRef.ref().push({

          imgURL: imgURL,
          breed: breed,
          petName: petName,
          petAge: petAge,
          petDateLost: petDateLost,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          comment: comment,
          houseNum: houseNum,
          streetName: streetName,
          city: city,
          state: state,
          zipcode: zipcode,

          dateAdded: firebase.database.ServerValue.TIMESTAMP

      });

  });



  dataRef.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val().petName);
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().imgURL);
      console.log(childSnapshot.val().breed);
      console.log(childSnapshot.val().petName);
      console.log(childSnapshot.val().petAge);
      console.log(childSnapshot.val().petDateLost);
      console.log(childSnapshot.val().firstName);
      console.log(childSnapshot.val().lastName);
      console.log(childSnapshot.val().phoneNumber);
      console.log(childSnapshot.val().email);
      console.log(childSnapshot.val().comment);
      console.log(childSnapshot.val().houseNum);
      console.log(childSnapshot.val().streetName);
      console.log(childSnapshot.val().city);
      console.log(childSnapshot.val().state);
      console.log(childSnapshot.val().zipcode);

var petDisplay = 
    `<li>
      <div class="collapsible-header petRecord">
        <table>
        <tbody>
          <td><img class="responsive-img z-depth-3 circle lostDogImage" src="${childSnapshot.val().imgURL}"/></td>
          <td id="petName-ld">${childSnapshot.val().petName}</td>
          <td id="breed-ld">${childSnapshot.val().breed}</td>
          <td id="petAge-ld">${childSnapshot.val().petAge}</td>
          <td id="petDateLost-ld>${childSnapshot.val().petDateLost}</td>
          <td id="comment-ld">${childSnapshot.val().comment}</td>
          <td><button class=".pet_owner light-green darken-3 white-text" >Location Last Seen</button></td>

      </div>
      <div class="collapsible-body ownerRecord">
        <table>
        <td id="contactFirstName-ld">${childSnapshot.val().firstName}</td>
        <td id="contactLastName-ld">${childSnapshot.val().lastName}</td>
        <td id="phoneNumber-ld">${childSnapshot.val().phoneNumber}</td>
        <td id="email-ld">${childSnapshot.val().email}</td>
      </div>
    </li>`;


      // full list of items to the well
      $("#petList").append(petDisplay) 
  
      // Handle the errors
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });

  dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

      // Change the HTML to reflect
      $(".lostDogImage").text(snapshot.val().imgURL);
      $(".breed-ld").text(snapshot.val().breed);
      $(".petName-ld").text(snapshot.val().petName);
      $(".petAge-ld").text(snapshot.val().petAge);
      $(".petDateLost-ld").text(snapshot.val().petDateLost);
      $(".contactName-ld").text(snapshot.val().contactName);
      $(".phoneNumber-ld").text(snapshot.val().phoneNumber);
      $(".email-ld").text(snapshot.val().email);
      $(".comment-ld").text(snapshot.val().comment);


  });


