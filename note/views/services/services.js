/**
 * Created by zhoudd on 2015/11/12.
 */

angular.module('app.Services', [])
    .factory('note_Services', function ($http, $window) {
        var runNotesRequest = function (path, data) {
            var toke = {token: $window.localStorage.getItem('token')};
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
    .factory('UserService', function ($http, $window) {
        var runNotesRequest = function (path, data) {
            var toke = {token: $window.localStorage.getItem('token')};
            //angular.extend(data, toke);
            return $http
                .post(path, data);
        };
        return {
            login: function (data) {
                return runNotesRequest('/account/login', data);
            },
            register: function (data) {
                return runNotesRequest('/account/signup', data);
            }
        }
    })