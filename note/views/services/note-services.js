/**
 * Created by zhoudd on 2015/11/12.
 */

angular.module('noteService', [])
    .factory('note_Services', function ($http, $window) {
        var runNotesRequest = function (path,data) {
            var toke = {token: $window.localStorage.getItem('token')};
            angular.extend(data, toke);
            return $http
                .post(path, data);
        };
        return {
            getAllNotes: function (data) {
                return runNotesRequest('/note/find',data);
            },
            addNote: function (data) {
                return runNotesRequest('/note/add',data);
            }
        }
    })