var app = angular.module('MyApp', []);
app.controller('MyCont', function($scope, $http){
  
    // Initialization of the scope variables. 
 
    $scope.cityName = "Your City";
    $scope.tmp = 0;
    $scope.minTemp = 0;
    $scope.maxTemp = 0;
    $scope.lon = 0;
    $scope.lat = 0;
    $scope.speed = 0;
    $scope.deg = 0;
 
    // Logic for the On-Click event.
 
    $scope.funGet = function(){
        var url = "http://assignment2-csm-kimojacky.c9users.io/api/getcityweather/" + $scope.cityName;
        $http.get(url)
        .success(function(response) {
            $scope.imgWidth = 150;
            $scope.imgHeight = 150;
            $scope.wtData = response[0].coord;
            $scope.ct = response[0].name;
            $scope.tmp = response[0].main.temp - 272.15;
            $scope.minTemp = response[0].main.temp_min - 272.15;
            $scope.maxTemp = response[0].main.temp_max - 272.15;
            $scope.lon = response[0].coord.lon;
            $scope.lat = response[0].coord.lat;
            $scope.speed = response[0].wind.speed;
            $scope.deg = response[0].wind.deg;
            $scope.sunrise = response[0].sys.sunrise * 1000;
            $scope.sunset = response[0].sys.sunset * 1000;
            $scope.hmdy = response[0].main.humidity;
            $scope.imgCode = response[0].weather[0].icon;
        });
     }
});