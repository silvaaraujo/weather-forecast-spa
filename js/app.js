var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


weatherApp.config(function($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
})

weatherApp.service('sharedService', function() {
   
    this.city = 'Campo Grande, MS';
    
});

weatherApp.controller('mainController', ['$scope', 'sharedService', function($scope, sharedService) {
    
    $scope.city = sharedService.city;
    
    $scope.$watch('city', function() {
        sharedService.city = $scope.city;
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'sharedService', function($scope, $resource, $routeParams, sharedService) {
    
    $scope.city = sharedService.city;
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=4d1bf31b2c3650979370d7a8bb0c9a59", 
                                  { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    
    console.info($scope.weatherResult);
    
    $scope.convertKelvinToCelcius = function(degreeKelvin) {
        return Math.round(degreeKelvin - 273.15);
    }
    
    $scope.toDate = function(dt) {
        return new Date(dt * 1000);
    }
}]);