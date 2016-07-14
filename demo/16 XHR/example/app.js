/**
 * Created by ID on 15/11/10.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */

var app = angular.module('app', [])
app.controller('appController', function ($scope,$http) {
     $http.jsonp("https://api.github.com?callback=JSON_CALLBACK").success(function(data) {
            // console.log('object', data);􏲪􏺒
            console.log(data);
        });
});
