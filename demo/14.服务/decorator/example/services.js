angular.module('app.service', [])

.service('s_service', function() {
        return {
            getName: function(name) {
                return 'service ' + name
            },
            getType: function() {
                console.log('service');
            }
        }
    })
    .constant('constantService', {
        name: 'constantService'
    })
    .value('valueService', {
        name: 'valueService'
    })


.factory('myInterceptor', function($q) {
        var interceptor = {
            'request': function(config) {
                // 􏶥􏶦的􏵳􏵴􏶧􏲮
                return config; // 􏶨􏶩 $q.when(config);
            },
            'response': function(response) { // 􏴘􏴒􏶥􏶦
                return response; // 􏶨􏶩 $q.when(config);
            },
            'requestError': function(rejection) {
                //􏵳􏵴􏶪􏶫􏶬错误􏲥􏶭􏶮􏶯􏶰错误中􏶱􏶲􏲥􏱑􏱒􏴛􏴜􏱖􏲉􏶳的􏵳􏵴􏶨promise
                return response; // 􏶨􏶳的promise
                // 􏶨􏶩􏲥􏱑􏱒􏶴􏶵􏴛􏴜􏱖􏲉rejection􏶶􏴤􏶷􏶉􏱖􏶸
                // return $q.reject(rejection);
            },
            'responseError': function(rejection) {
                // 􏵳􏵴􏶪􏶫􏶬错误􏲥􏶭􏶮􏶯􏶰错误中􏶱􏶲􏲥􏱑􏱒􏴛􏴜􏱖􏲉􏶳的􏴘􏴒􏶨promise
                return rejection; // 􏶨􏶳的promise
                // 􏶨􏶩􏲥􏱑􏱒􏶴􏶵􏴛􏴜􏱖􏲉rejection􏶶􏴤􏶷􏶉􏱖􏶸
                // return $q.reject(rejection);
            }
        };
        return interceptor;
    })
    /**
     * http 请求钩子.
     */
    .factory('AuthInterceptor', ['$q', '$location', 'Storage',
        function($q, $location, Storage) {
            var interceptor = {};

            interceptor.request = function(config) {
                var token = Storage.get('userInfo');
                if (token) {
                    //console.log('set Header', token.token);
                    config.headers["x-access-token"] = token.token;
                }
                return config;
            };

            interceptor.responseError = function(response) {
                if (response.status == 403) {
                    //console.log(403)
                    Storage.remove('userInfo');
                    $location.path("/login");
                }
                return $q.reject(response);
            };

            return interceptor;
        }
    ])