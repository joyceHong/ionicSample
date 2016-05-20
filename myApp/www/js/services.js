angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array


  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    },       
    sayHello: function(text){
      return "Factory says \"Hello " + text + "\"";
    } 
  }
})


.factory('GoogleMapService', function ($http, GoogleMap) {
    var GoogleMapService = {};
    return {
        getLocation: function (address,range) {
            var lat;
            var lng;
            address = encodeURI(address);    
            var url = "http://192.168.1.63/wcfVisitedClinic/Service.svc/getlocation?address='"+address+"'";
            $http.get(url).success(function (data) {
                if (!!(data) == true) {
                        GoogleMap.setInitMap(data["Lat"], data["Lng"], range);
                    }
                }).error(function () {
                    alert("error");
                });
        },                        
    }
})

.factory('GoogleMap', function ($http, GoogleNeighbor, GoogleMarket) {
    return{
        setInitMap: function (lat, lng, range) {
            try {
                var mapOptions = {
                    center: new google.maps.LatLng(lat, lng),
                    zoom: 17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map"),
                    mapOptions);

                //設置中心點
                var myLatlng = new google.maps.LatLng(lat, lng);

                //繪製地圖
                GoogleMarket.setMarket("current", "", "", "green", "目前位置", "", myLatlng, map);
                //搜尋附近鄰近的診所        
                GoogleNeighbor.getNeighbor(lat, lng, range, map);
            } catch (e) {
                alert(e.message);
            }
        }        
    };       
})

.factory("GoogleNeighbor", function ($http,   GoogleMarket) {
    return {
        getNeighbor: function (lat, lng, range, map) {
            var url = "http://192.168.1.63/wcfVisitedClinic/Service.svc/computeNextBy?lat=" + lat + "&lng=" + lng + "&range=" + range;
            $http.get(url).success(function (data) {
                if (!!(data) == true) {
                    angular.forEach(data, function (value) {
                    //$.each(data, function (index, value) {
                        myLatlng = new google.maps.LatLng(value["lanLng"]["Lat"], value["lanLng"]["Lng"]);                       
                        if (value["status"] == 0 && value["isCustomer"] == false) {
                            //非客戶_未拜訪        
                            color = "red";
                        } else if (value["status"] == 1 && value["isCustomer"] == false) {
                            //非客戶_有拜訪
                            color = "yellow";
                        } else if (value["status"] == 0 && value["isCustomer"] == true) {
                            //客戶_未拜訪
                            color = "purple";
                        }
                        else if (value["status"] == 1 && value["isCustomer"] == true) {
                            //客戶_有拜訪
                            color = "blue";
                        }
                        GoogleMarket.setMarket(value["clinicNo"], value["isCustomer"], value["status"], color, value["name"], value["address"], myLatlng, map);
                    });

                 
                }
            }).error(function () {
                alert("error");
            });
        }
    }
})

.factory("GoogleMarket", function ($http) {
    return {
        setMarket: function (clinicNo, isCustomer, isVisited, color, title, addr, myLatlng, map) {
            var strMakerLink = "";
            switch (color) {
                case "red":
                    strMakerLink = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                    break;
                case "blue":
                    strMakerLink = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                    break;
                case "yellow":
                    strMakerLink = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                    break;
                case "purple":
                    strMakerLink = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
                    break;
                case "green":
                    strMakerLink = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                    break;
                default:
                    strMakerLink = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                    break;
            }

            var marker = new google.maps.Marker({
                position: myLatlng,
                title: title,
                icon: strMakerLink,
            })

            marker.setMap(map);
        }
    };
})