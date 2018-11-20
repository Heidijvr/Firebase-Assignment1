// Initialize Firebase
$("document").ready(function () {
    var config = {
        apiKey: "AIzaSyDHs2Tvn_QalstrEuWfZkfUKy57akM8-XE",
        authDomain: "train-schedule-cba18.firebaseapp.com",
        databaseURL: "https://train-schedule-cba18.firebaseio.com",
        projectId: "train-schedule-cba18",
        storageBucket: "train-schedule-cba18.appspot.com",
        messagingSenderId: "727179854167"
    };
    firebase.initializeApp(config);

    var trainInfo = firebase.database();

    // Button adding employees
    $("#add-button").on("click", function (event) {
        eventprevent.Default();
    })

    // Grabs userInput and assign to variables

    var trainName = $("#trainInput").val("");
    var trainDestination = $("#destinationInput").val("");
    var trainTime = ($("#firstTimeInput").val("").trim(), "HH:mm").format("X");;
    var trainFrequency = $("#frequencyInput").val("");


    // Creates local "temporary" object for holding train data
    // Will push this to firebase
    var trainData = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
    }

    // pushing trainInfo to Firebase
    trainInfo.ref().push(trainData);

    // clear text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainInput").val("");
    $("#frequencyInput").val("");

    // Prevents page from refreshing 
    return false;

});

//current time
var dateTime = null,
    dateTime = moment().format("HH:mm A");

//how to determine frequency


var update = function () {
    date = moment(new Date())
    datetime.html(date.format("HH:mm: A"));
};



//when a new item is added (child) do this function
trainInfo.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // assign firebase variables to snapshots
    trainName = childSnapshot.val().name;
    trainDestination = childSnapshot.val().destination;
    trainTime = childSnapshot.val().time;
    trainFrequency = childSnapshot.val().frequency;

    //train info
    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTime);
    // console.log(frequency);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainConverted = moment(nextTrain).format("HH:mm A");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm A"));

    // Add each train data into the table 
    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + "</td><td>"+ destination + "</td><td>" + frequency + " mins" + "</td><td>" + time + "</td><td>" + minutes + "</td></tr>");

});

