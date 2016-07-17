angular.module('app.services', [])
    .factory('HitService', function ($http, $q) {
        var service = {
            count: function () {
                var d = $q.defer();
                $http.get('/hit/hit')
                    .success(function (data, status) {
                        d.resolve(data.hits)
                    }).error(function (data, status) {
                        d.reject(data);
                    })
                return d.promise;
            },
            registerHit: function () {
                var d = $q.defer();
                $http.post('/hit/register', {})
                    .success(function (data, status) {
                        d.resolve(data.hits)
                    }).error(function (data, status) {
                        d.reject(data);
                    })
                return d.promise;
            }
        }
        return service;
    })