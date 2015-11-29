/**
 * Created by zhoudd on 2015/11/12.
 */

angular.module('app.Services', [])
    .factory('note_Services', function ($http, $window) {
        var runNotesRequest = function (path, data) {
            var toke = {token: JSON.parse($window.sessionStorage['userInfo']).token};
            angular.extend(data, toke);
            return $http
                .post(path, data);
        };
        return {
            getAllNotes: function (data) {
                return runNotesRequest('/note/find', data);
            },
            addNote: function (data) {
                return runNotesRequest('/note/add', data);
            }
        }
    })
    //.factory('UserService', function ($http, $window) {
    //    var runNotesRequest = function (path, data) {
    //        var toke = {token: $window.localStorage.getItem('token')};
    //        //angular.extend(data, toke);
    //        return $http
    //            .post(path, data);
    //    };
    //    return {
    //        login: function (data) {
    //            return runNotesRequest('/account/login', data);
    //        },
    //        register: function (data) {
    //            return runNotesRequest('/account/signup', data);
    //        }
    //    }
    //})
    .factory('authenticationSvc', function ($http, $q, $window) {
        var userInfo;

        function login(data) {
            var deferred = $q.defer();

            $http.post('/account/login', data).then(function (result) {
                userInfo = {
                    token: result.data.token,
                    nickname: result.data.nickname
                };
                $window.sessionStorage['userInfo'] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function getUserInfo() {
            return userInfo;
        }

        function register(data) {
            var deferred = $q.defer();
            $http.post('/account/signup', data).then(function (result) {
                userInfo = {
                    token: result.data.token,
                    nickname: result.data.nickname
                };
                $window.sessionStorage['userInfo'] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function init() {
            if ($window.sessionStorage['userInfo']) {
                console.log('has sessionStorage');
                userInfo = JSON.parse($window.sessionStorage['userInfo']);
            }else
            {
                console.log(userInfo);
            }
        }


        init();
        return {
            login: login,
            getUserInfo: getUserInfo,
            register: register
        };
    })
