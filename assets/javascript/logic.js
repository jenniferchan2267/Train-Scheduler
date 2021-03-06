  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAW4f_9Cuqj7bV-zOLV_-7Rpd0r3OApSW4",
    authDomain: "trainscheduler-df105.firebaseapp.com",
    databaseURL: "https://trainscheduler-df105.firebaseio.com",
    projectId: "trainscheduler-df105",
    storageBucket: "trainscheduler-df105.appspot.com",
    messagingSenderId: "713226682232",
    appId: "1:713226682232:web:bdf76b450fbd169e3d128d",
    measurementId: "G-JGTXRNVGJX"
  };
  
  firebase.initializeApp(config);

  var trainData = firebase.database();

  $("#addTrainBtn").on("click",function(){
    
    

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();

   
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    }

    trainData.ref().push(newTrain);

    alert("Train Added!");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    
    return false;

  });

  trainData.ref().on("child_added", function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
  });