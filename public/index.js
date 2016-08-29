// public/index.js
var Weather = angular.module('Weather', []);


function main($scope, $http) 
{
    $scope.formData = {};

    //When loading one the first page, it will get the records from mongoDB
    $http.get('/api/get')
        .success(function(data) 
        {
        
            $scope.weathers = data;
            
            console.log(data);
            
        })
        .error(function(data) 
        {
            
            console.log('Error: ' + data);
            
        });
        
    //Define ng-model display data
    $scope.cityName = "Enter Your City";
 
    //After input the city name and click the add button
    $scope.getWeatherDetails = function(){
        
        //Define the get city weather api and passing parameter
        var url = "/api/getcityweather/" + $scope.cityName;
        
        $http.get(url)
        .success(function(response) 
        {
            //Get city name from the json
            $scope.cn = response[0].name;
            
            //Get the temperature from the json and convert to degree celsius
            $scope.tmp = response[0].main.temp - 272.15;
            
            //Get the weather from the json
            $scope.cw = response[0].weather[0].main;
            
            //Put the city name into form data for adding record
            $scope.formData.city=$scope.cn
            
            //Put the city name into form data for adding record
            $scope.formData.weather=$scope.cw
            
            //Put the city name into form data for adding record
            $scope.formData.temperature=Math.round($scope.tmp)
            
            //Display the city name in the text box
            document.getElementById("city").value = $scope.cn;
            
            //Display the weather in the text box
            document.getElementById("weather").value = $scope.cw;
            
            //Display the temperature in the text box
            document.getElementById("temperature").value = Math.round($scope.tmp);
        })
        .error(function(data) 
        {
            
            console.log('Error: ' + data);
            
        });
     }    

    //Add weather details to mongoDB
    $scope.addWeatherDetails = function() 
    {
        //Call the add weather api and using post method and pass the form data
        $http.post('/api/get', $scope.formData)
            .success(function(data) 
            {
                //Clear the form data for next time
                $scope.formData = {};
                
                $scope.weathers = data;
                
                console.log(data);
                
                document.getElementById("city").value = "Enter Your City";
                
                document.getElementById("weather").value = null;
                
                document.getElementById("temperature").value = null;
            })
            .error(function(data) 
            {
                
                console.log('Error: ' + data);
                
            });
    };

    //Delete a weather after selected
    $scope.deleteWeatherDetails = function(id) 
    {
        //Call the delete api with record ID
        $http.delete('/api/delete/' + id)
            .success(function(data) 
            {
                
                $scope.weathers = data;
                
                console.log(data);
                
            })
            .error(function(data) 
            {
                
                console.log('Error: ' + data);
                
            });
    };

}