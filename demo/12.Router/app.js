/** * Created by ID on 15/11/10. * Author:zhoudd * email:zhoudd@stark.tm */angular.module('app', ['ngRoute'])    .config(['$routeProvider', function ($routeProvider) {        $routeProvider            .when('/home', {                templateUrl: 'view/home.html',                controller: 'HomeController'            })    }])    .controller('HomeController', function ($scope) {        $scope.name = 'stark';    })    .controller('LoginController', function ($scope) {        $scope.name = 'stark';    });