/**
 * Created by ID on 15/11/10.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */

var app = angular.module('app', ['ngRoute'])
app.config(function ($routeProvider, ACCESS_LEVELS) {
    $routeProvider.when('/', {
        controller: 'home_ctrl',
        templateUrl: 'views/home.html',
        controllerAs: 'home',
        access_levels: ACCESS_LEVELS.admin
    }).when('/view1', {
        controller: 'home_ctrl',
        templateUrl: 'views/view1.html',
        access_levels: ACCESS_LEVELS.user
    })
        .otherwise({
            redirectTo: '/'
        })
})
app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function (evt, next, curr) {
        console.log(arguments);
    })
})
app.constant('ACCESS_LEVELS', {
    admin: 1,
    user: 2
})
app.controller('home_ctrl', function ($scope,$http) {
    $scope.btnClick = function () {
        console.log('ddd');
    }
    // $http.jsonp("https://api.github.com?callback=JSON_CALLBACK").success(function (data) {
    //     // console.log('object', data);􏲪􏺒
    //     console.log(data);
    // });
});

