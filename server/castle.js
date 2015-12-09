if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Castles.find().count() == 0) {
      // Get castle from JSON files
      var castles = {}
      castles = JSON.parse(Assets.getText("castles.json"));
      console.log(castles.features[0]);
      // Insert in collection ### DONE
      for(i = 0; i < castles.features.length; i++){
        console.log('inserting', castles.features[i]);
        Castles.insert(castles.features[i]);
      }
      console.log("BDD is empty.");
    }
    else {
      console.log("BDD is not empty.");
    }
  });
}
