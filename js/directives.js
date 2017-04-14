weatherApp.directive('temperatureReport', function() {    
    return {
        templateUrl: 'directives/temperatureReport.html',
        restrict: 'E',
        scope: {
            weather: '='
        },
        link: function(scope, element, attrs) {
            
            scope.kelvinToCelcius = function(degreeKelvin) {
                return Math.round(degreeKelvin - 273.15);
            }

            scope.toDate = function(dt) {
                return new Date(dt * 1000);
            }
            
        }
    }
});