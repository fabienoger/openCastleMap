if (Meteor.isClient) {
  $(document).ready(function() {
    Template.map.rendered = function() {
      // Initialize defaults values
      var defaultZoom = 6;
      var defaultCoordinate = [47, 2.48];

      // Display defaults values
      document.getElementById('map-info-c').innerHTML = defaultCoordinate;
      document.getElementById('map-info-z').innerHTML = defaultZoom;

      // Initialize Map
      L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
      var map = L.map('map').setView(defaultCoordinate, defaultZoom);

      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      // Latitude Longitude of cursor
      zoomLev = map.getZoom();
      map.on('mousemove', function(e) {
          document.getElementById('map-info-c').innerHTML = e.latlng;
      });
      // Refresh ZoomLevel
      map.on("zoomend", function(){
        zoomLev = map.getZoom();
        document.getElementById('map-info-z').innerHTML = zoomLev;
      });

      // Get castles from Database
      var tempCastles = Castles.find().fetch();

      // Display castles count
      console.log(tempCastles.length);
      document.getElementById("nbCastles").innerHTML = tempCastles.length;

      // Initialize Groups
      var defensive = L.layerGroup([]);
      var fortress = L.layerGroup([]);
      var manor = L.layerGroup([]);
      var stately = L.layerGroup([]);
      var citadel = L.layerGroup([]);
      var fortification = L.layerGroup([]);
      var palace = L.layerGroup([]);

      // Add groups to overlay
      var overlayMaps = {
        "Defensive": defensive,
        "Fortress": fortress,
        "Manor": manor,
        "Stately": stately,
        "Citadel": citadel,
        "Fortification": fortification,
        "Palace": palace
      };

      // Browse castles
      tempCastles.forEach(function (castle) {
        // Get coordinates
        var coordinates = [];
        coordinates.push(castle.geometry.coordinates[1]);
        coordinates.push(castle.geometry.coordinates[0]);

        // Add markers to map
        var marker = L.marker(coordinates).addTo(map);
        var wiki = castle.properties.wiki;
        if (wiki != null) {
//          console.log(castles);
          wiki = wiki.split(":");
          marker.bindPopup("<i class='material-icons'>work</i><b>" + wiki[1] + "</b><br />");
        }

        // Add Layer to LayerGroup
        switch (castle.properties.type) {
          case "defensive":
            defensive.addLayer(marker);
            break;
          case "fortress":
            fortress.addLayer(marker);
            break;
          case "manor":
            manor.addLayer(marker);
            break;
          case "stately":
            stately.addLayer(marker);
            break;
          case "citadel":
            citadel.addLayer(marker);
            break;
          case "fortification":
            fortification.addLayer(marker);
            break;
          case "palace":
            palace.addLayer(marker);
            break;
        }
      });
      // Add overlay to map
      L.control.layers(overlayMaps).addTo(map);
    }

    // Map events
    Template.map.events({
      'click #close-settings': function() {
        if ($("#settings").css("right") == "30px")
          $("#settings").animate({right: "-260px"});
        else
        $("#settings").animate({right: "30px"});
      }
    });
  });
}
