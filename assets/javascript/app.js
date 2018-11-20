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
    $("#addButton").on("click", function (event) {
        console.log("Button clicked!")
        event.preventDefault();

        // Grabs userInput and assign to variables

        var trainName = $("#trainInput").val();
        var trainDestination = $("#destinationInput").val();
        var trainTime = moment($("#firstTimeInput").val().trim(), "hh:mm a").format("HH:mm");
        var trainFrequency = $("#frequencyInput").val();


        // Creates local "temporary" object for holding train data
        // Will push this to firebase
        var trainData = {
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency,
        }
        
        console.log(trainData);

        
        // pushing trainInfo to Firebase
        trainInfo.ref().push(trainData);

        // clear text-boxes
        $("#trainInput").val("");
        $("#destinationInput").val("");
        $("#firstTimeInput").val("");
        $("#frequencyInput").val("");
    })

    //when a new item is added (child) do this function
    trainInfo.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // assign firebase variables to snapshots
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;

        //train info
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFrequency);

        // Time going back one day to ensure that it's in the past    
        var trainTimeConverted = moment(trainTime, "HH:mm").subtract(24, "hours");
        
        console.log("Train time:", trainTimeConverted.format("HH:mm"));

        // Current Time
        var currentTime = moment();
        console.log("Current time: ", moment(currentTime).format("HH:mm"));

        var diffMinutes = currentTime.diff(trainTimeConverted, "minutes");

        console.log("Diff: ", diffMinutes);

        var minutesToNextTrain = trainFrequency - diffMinutes % trainFrequency;

        var nextArrivalTime = currentTime.add(minutesToNextTrain, "minutes").format("HH:mm");

        $("#scheduleTable > tbody").append(
            "<tr><td>" 
            + trainName 
            + "</td><td>" 
            + trainDestination
            + "</td><td>"
            + trainFrequency
            + "</td><td>"
            + nextArrivalTime
            + "</td><td>"
            + minutesToNextTrain
            + "</td></tr>");

    });

    
    

    // Prevents page from refreshing 
    return false;

});




