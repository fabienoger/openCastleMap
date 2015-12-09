if (Meteor.isClient) {
  Template.header.events({
    'click #show-settings': function() {
      if ($("#settings").css("right") == "30px")
        $("#settings").animate({right: "-260px"});
      else
        $("#settings").animate({right: "30px"});
    }
  });
}
