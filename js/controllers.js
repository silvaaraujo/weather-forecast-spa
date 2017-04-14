weatherApp.controller('mainController', ['$scope', '$location', 'sharedService', function($scope, $location, sharedService) {
    
    $scope.city = sharedService.city;
    
    $scope.$watch('city', function() {
        sharedService.city = $scope.city;
    });
    
    $scope.submit = function() {
        $location.path('/forecast');
    }
    
}]);

weatherApp.controller('forecastController', ['$scope', '$routeParams', 'sharedService', 'weatherService', function($scope, $routeParams, sharedService, weatherService) {
    
    $scope.city = sharedService.city;
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);
}]);
