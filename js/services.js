weatherApp.service('sharedService', function() {
   
    this.city = 'Campo Grande, MS';
    
});

weatherApp.service('weatherService', ['$resource', function($resource) {
    
    this.getWeather = function(city, days) {        
        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=4d1bf31b2c3650979370d7a8bb0c9a59", 
                                  { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
         
         return weatherAPI.get({ q: city, cnt: days });    
     }
    
}]);