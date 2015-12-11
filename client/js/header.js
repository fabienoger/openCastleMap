if (Meteor.isClient) {
  $(document).ready(function() {
    Template.header.helpers({
      'isMap': function() {
        currentPath = Router.current().route.getName();
        if (currentPath == "map")
          return true
        else
          return false
      }
    });
    Template.header.rendered = function () {
      $(".button-collapse").sideNav();
      $("#mobile-menu li").click(function() {
        $('.button-collapse').sideNav('hide');
      });
    }
    Template.header.events({
      'click #show-settings': function() {
        if ($("#settings").css("right") == "30px")
          $("#settings").animate({right: "-260px"});
        else
          $("#settings").animate({right: "30px"});
      }
    });
  });
}
