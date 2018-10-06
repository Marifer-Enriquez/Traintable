


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyATtQ3NXOP9K39uGiEx4z-8d951Id3a3Xs",
    authDomain: "train-tracker-mf.firebaseapp.com",
    databaseURL: "https://train-tracker-mf.firebaseio.com",
    projectId: "train-tracker-mf",
    storageBucket: "train-tracker-mf.appspot.com",
    messagingSenderId: "825066394859"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#submitbtn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
  var ntrainName = $("#name-form-input").val().trim();
  var ndeparture = $("#departure-form-input").val().trim();
  var ndestination = $("#destination-form-input").val().trim();
  var nfirstTrain = $("#first-form-input").val().trim();
  var nfrequency = $("#frequency-form-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: ntrainName,
    departure: ndeparture,
    destination: ndestination,
    firstTrain: nfirstTrain,
    frequency: nfrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.departure);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#name-form-input").val("");
  $("#departure-form-input").val("");
  $("#destination-form-input").val("");
  $("#first-form-input").val("");
  $("#frequency-form-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
  var ntrainName = childSnapshot.val().name;
  var ndeparture = childSnapshot.val().departure;
  var ndestination = childSnapshot.val().destination;
  var nfirstTrain = childSnapshot.val().firstTrain;
  var nfrequency = childSnapshot.val().frequency;
  
  // New train Info
  console.log(ntrainName);
  console.log(ndeparture);
  console.log(ndestination);
  console.log(nfirstTrain);
  console.log(nfrequency);

// Calculate the time till next train
  
// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(nfirstTrain, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % nfrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = nfrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
var next = moment(nextTrain).format("hh:mm");



  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(ntrainName),
    $("<td>").text(ndeparture),
    $("<td>").text(ndestination),
    $("<td>").text(nfrequency),
    $("<td>").text(next),
    $("<td>").text(tMinutesTillTrain)   
  );

  // Append the new row to the table
  $("#traintable").append(newRow);
});
