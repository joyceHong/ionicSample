angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function ($scope, $ionicModal, $ionicLoading, $compile, GoogleMapService,$http) {
    var range = localStorage.getItem("range");
    var addr = localStorage.getItem("addr");
    GoogleMapService.getLocation(addr,range);


    //if (addr == undefined || addr == "") {
    //    /*自動偵測 */
    //    if (google.loader.ClientLocation) {
    //        range = (sessionStorage.range == undefined) ? 300 : sessionStorage.range; //自動測試範圍設為300公尺
    //        setInitMap(google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude, range);
    //    }
    //    else if (navigator.geolocation) {
    //        /* 自動偵測2 取得目前的位置  */
    //        navigator.geolocation.getCurrentPosition(function (position) {
    //            lat = position.coords.latitude;
    //            lng = position.coords.longitude;
    //            range = (sessionStorage.range == undefined) ? 300 : sessionStorage.range; //自動測試範圍設為300公尺
    //            setInitMap(lat, lng, range);
    //        },
    //        geo_error,
    //       { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
    //    } else {
    //        alert("I'm sorry, but geolocation services are not supported by your browser.");
    //    }
    //}
   
    var myLatlng = new google.maps.LatLng(43.07493, -89.381388);
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
        content: compiled[0]
    });

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Uluru (Ayers Rock)'
    });

    google.maps.event.addListener(marker, 'click', function () {
        //infowindow.open(map, marker);
        $scope.modal.show();
    });

    $scope.map = map;  // html的id為map   


    $ionicModal.fromTemplateUrl('modal.html', function (modal) {
        $scope.modal = modal;
    }, {
        animation: 'slide-in-up',
        focusFirstInput: true,
        scope: $scope
    })
})




.controller('modalCtrl', function ($scope) {
     $scope.newUser = {};  
     $scope.createContact = function() {
         console.log('Create Contact', $scope.newUser);
         $scope.modal.hide();
     };
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function ($scope) {
    //設定Ionic 參數
    $scope.settingParameter = function () {
        localStorage.setItem("addr", $scope.address);
        localStorage.setItem("range", $scope.range);
        alert("complete!   " + localStorage.getItem("addr"));
    }
});


