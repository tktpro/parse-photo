var app = angular.module('VKPhotoApp',[]);


app.controller("mainController", function($scope, $http) {

    $scope.selectedCountry = 0;
    $scope.country = [];

    $scope.selectedCity = 0;
    $scope.city = [];

    $scope.selectedSchool = 0;
    $scope.school = [];

    $scope.selectedUniversities = 0;
    $scope.universities = [];

    $scope.selectedFaculties = 0;
    $scope.faculties = [];

    $scope.selectedUniversity_year = 0;
    $scope.university_year = [];

    $scope.selectedAge_from = 0;
    $scope.selectedAge_to = 0;

    $scope.age_from = [];
    $scope.age_to = [];

    $scope.selectedStatus = 0;

    $scope.selectedSex = 0;


    $scope.users = [];
    $scope.owner_id = [];

    $scope.selectedCount = 10;

    $scope.access_token = '4bd1ec20473e228804b92cf18c91a94f824b1e6bc30c48106a403dc84bf54c92e94d6ae995d99b138d0e3';

    
    



    $scope.init = function() {

        $http.jsonp('https://api.vk.com/method/database.getCountries?v=5.5&lang=ru&callback=JSON_CALLBACK').success(function(data) {
                //&need_all=1&offset=0&count=1000
                var items = data.response.items;
                angular.forEach(items, function(value, index){
                    $scope.country.push(value);
                });
                console.log($scope.country);

        }).error(function(error) {});

        for (var i = 14; i < 80; i++) {
            $scope.age_from.push(i);
            $scope.age_to.push(i);
        }
        console.log($scope.age_from);

        
    };

    $scope.setCity = function() {

        $scope.city = [];
        var country_id = $scope.selectedCountry;

        $http.jsonp('https://api.vk.com/method/database.getCities?v=5.5&lang=ru&country_id=' + country_id + '&callback=JSON_CALLBACK').success(function(data) {

                var items = data.response.items;
                angular.forEach(items, function(value, index){
                    $scope.city.push(value);
                });
                console.log($scope.selectedCountry);

        }).error(function(error) {});
    };

    $scope.setEducation = function() {

        $scope.school = [];
        $scope.universities = [];
        var country_id = $scope.selectedCountry;
        var city_id = $scope.selectedCity

        $http.jsonp('https://api.vk.com/method/database.getSchools?v=5.5&lang=ru&country_id=' + country_id + '&city_id=' + city_id +'&callback=JSON_CALLBACK').success(function(data) {

                var items = data.response.items;
                angular.forEach(items, function(value, index){
                    $scope.school.push(value);
                });
                console.log($scope.school);

        }).error(function(error) {});

        $http.jsonp('https://api.vk.com/method/database.getUniversities?v=5.5&lang=ru&country_id=' + country_id + '&city_id=' + city_id + '&callback=JSON_CALLBACK').success(function(data) {

                var items = data.response.items;
                angular.forEach(items, function(value, index){
                    $scope.universities.push(value);
                });
                console.log($scope.universities);

        }).error(function(error) {});
    };

    $scope.setFaculties = function() {

        $scope.faculties = [];
        var university_id = $scope.selectedUniversities;

        $http.jsonp('https://api.vk.com/method/database.getFaculties?v=5.5&lang=ru&university_id=' + university_id + '&callback=JSON_CALLBACK').success(function(data) {

                var items = data.response.items;
                angular.forEach(items, function(value, index){
                    $scope.faculties.push(value);
                });
                console.log($scope.selectedUniversities);

        }).error(function(error) {});

        for(var i = 2020; i > 1946; i--) {
            $scope.university_year.push(i);
        }
        console.log($scope.university_year);
    };

    $scope.search = function() {



        $scope.users = [];
        $http.jsonp('https://api.vk.com/method/users.search?v=5.5&access_token=' + $scope.access_token  + '&country=' + $scope.selectedCountry + '&city=' + $scope.selectedCity + '&university=' + $scope.selectedUniversities + '&faculty=' + $scope.selectedFaculties  + '&school=' + $scope.selectedSchool + '&university_year=' + $scope.selectedUniversity_year + '&age_from=' + $scope.selectedAge_from + '&age_to=' + $scope.selectedAge_to + '&status=' + $scope.selectedStatus + '&sex=' + $scope.selectedSex +'&count=' + $scope.selectedCount + '&callback=JSON_CALLBACK').success(function(data) {

                console.log(data);

                var items = data.response.items;
                $scope.users_count = data.response.count;

                angular.forEach(items, function(value, index){

                    console.log(value.id);
                    $http.jsonp('https://api.vk.com/method/photos.get?v=5.5&owner_id=' + value.id  +'&album_id=profile&rev=1&callback=JSON_CALLBACK').success(function(data) {

                        var photos = data.response.items;
                        photos.name = value.first_name + ' ' + value.last_name;

                        $scope.users.push(photos);

                        console.log($scope.users);
                        

                    }).error(function(error) {});



                });
        }).error(function(error) {});

    };

});
