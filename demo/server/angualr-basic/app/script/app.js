var app = angular.module('app', ['ngRoute', 'app.services'])
app.controller('HomeController', function ($scope, HitService) {
    HitService.count().then(function (data) {
        $scope.hits = data
    })

    $scope.registerHit = function () {
        HitService.registerHit().then(function (data) {
            console.log(data);
            $scope.hits = data;
        })
    }
})
