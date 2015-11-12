/**
 * Created by zhoudd on 2015/11/12.
 */
angular.module('noteRouter', ['ngRoute'])
    .config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
        //$routeProvider.hasOwnProperty('!');
        $routeProvider.when('/home', {
            templateUrl: 'view/home.html',
            controller: 'HomeController'
        });
        $routeProvider.when('/register', {
            templateUrl: 'view/register.html',
            controller: 'RegisterController'
        })
        $locationProvider.html5Mode(true);

    }])

