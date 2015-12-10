if (Meteor.isClient) {
  $(document).ready(function() {
    Template.map.rendered = function() {
      // Initialize defaults values
      var defaultZoom = 6;
      var defaultCoordinate = [47, 2.48];

      // Initialize marker icon
      var castleIcon = L.icon({
        iconUrl: 'castle.png',

        iconSize:     [38, 40], // size of the icon
        iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location 22, 94
        popupAnchor:  [15, 3] // -76 point from which the popup should open relative to the iconAnchor
      });

      // Display defaults values
      document.getElementById('map-info-c').innerHTML = defaultCoordinate;
      document.getElementById('map-info-z').innerHTML = defaultZoom;

      // Initialize Map
      L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
      var map = L.map('map').setView(defaultCoordinate, defaultZoom);

      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          minZoom: 2,
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      // Geolocation
      map.locate({maxZoom: 16});
      function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
      }

      map.on('locationfound', onLocationFound);

      // Errors Geolocation
      function onLocationError(e) {
        alert(e.message);
      }

      map.on('locationerror', onLocationError);

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

      // Initialize markerCluster
      var markerCluster = new L.markerClusterGroup({ chunkedLoading: true });

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

        // Initialize Popup content
        var popupContent = "";

        // Initialize marker
        var marker = L.marker(coordinates, {icon: castleIcon});

        // Castle Name
        if (castle.properties.nom != null)
          popupContent += "<h5 class='center-align'>" + castle.properties.nom + "</h5>";
        // Add wiki to popup
        var wiki = castle.properties.wiki;
        var wikiLink = "";
        var wikiName = null;
        if (wiki != null) {
          wiki = wiki.split(":");
          wikiName = wiki[1].replace(/ /g, "_");
          wikiLink = "https://" + wiki[0] + ".wikipedia.org/wiki/" + wikiName;
          wikiName = wiki[1];
        }
        popupContent += "<div class='valign-wrapper'><i class='material-icons'>language</i><a class='valign right-align' target='_blank' href=" + wikiLink + ">" + wikiName + "</a></div>";

        // Add type to popup
        popupContent += "<div class='valign-wrapper'><i class='material-icons'>class</i><p class='valign'>" + castle.properties.type + "</p></div>";

        // Add adress to popup
        popupContent += "<div class='valign-wrapper'><i class='material-icons'>room</i><p class='valign'>" + castle.properties.adresse + "</p></div>";

        // Add web site to popup
        popupContent += "<div class='valign-wrapper'><i class='material-icons'>web</i><p class='valign'>" + castle.properties.web_site + "</p></div>";

        // If popupContent isn't empty add popup to marker
        if (popupContent != "")
          marker.bindPopup(popupContent);

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

        // Add marker to markerCluster
        markerCluster.addLayer(marker);
      });
       map.addLayer(markerCluster);

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
