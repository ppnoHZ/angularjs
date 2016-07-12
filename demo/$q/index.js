var app = angular.module('app', [])
app.controller('appController', function($scope, $q) {
    $scope.name = 'zdd'

    var defer1 = $q.defer();
    var promise1 = defer1.promise;

    promise1
        .then(function(value) {
            console.log("in promise1 ---- success");
            console.log(value);
        }, function(value) {
            console.log("in promise1 ---- error");
            console.log(value);
        }, function(value) {
            console.log("in promise1 ---- notify");
            console.log(value);
        })
        .catch(function(e) {
            console.log("in promise1 ---- catch");
            console.log(e);
        })
        .finally(function(value) {
            console.log('in promise1 ---- finally');
            console.log(value);
        });

    defer1.resolve("hello");



    var funcA = function() {
        console.log("funcA");
        return "hello,funA";
    }
    var funcB = function() {
        console.log("funcB");
        return "hello,funB";
    }
    $q.all([funcA(), funcB()])
        .then(function(result) {
            console.log(result);
        });
})