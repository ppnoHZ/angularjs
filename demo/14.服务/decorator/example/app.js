/**
 * Created by ID on 15/11/10.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */

var app = angular.module('app', ['app.service'])
app.controller('appController', function ($scope, s_service, $http) {
    console.log(s_service.getName('测试装饰器'));

    s_service.getType();

    /**
     * 跨域，由于实现的方式，只能发get请求
     */
    $http.jsonp("https://api.github.com?callback=JSON_CALLBACK").success(function (data) {
        // console.log('object', data);􏲪􏺒
        console.log(data);
    });
})
    .config(function ($provide, $httpProvider) {

        //$httpProvider.interceptors.push('myInterceptor');

        $provide.decorator('s_service', function ($delegate, $log) {
            var tmpGetName = $delegate.getName;

            $delegate.getName = function () {
                console.log('装饰器');
                // return '装饰器之后'
                return tmpGetName.apply($delegate, arguments);
            }
            return $delegate;
        })
    })
    .factory('myInterceptor', function ($q) {
        var interceptor = {
            'request': function (config) {
                // 􏶥􏶦的􏵳􏵴􏶧􏲮
                console.log('发送请求');
                return config; // 􏶨􏶩 $q.when(config);
            },
            'response': function (response) { // 􏴘􏴒􏶥􏶦
                console.log('相应请求');

                return response; // 􏶨􏶩 $q.when(config);
            },
            'requestError': function (rejection) {
                //􏵳􏵴􏶪􏶫􏶬错误􏲥􏶭􏶮􏶯􏶰错误中􏶱􏶲􏲥􏱑􏱒􏴛􏴜􏱖􏲉􏶳的􏵳􏵴􏶨promise
                return response; // 􏶨􏶳的promise
                // 􏶨􏶩􏲥􏱑􏱒􏶴􏶵􏴛􏴜􏱖􏲉rejection􏶶􏴤􏶷􏶉􏱖􏶸
                // return $q.reject(rejection);
            },
            'responseError': function (rejection) {
                // 􏵳􏵴􏶪􏶫􏶬错误􏲥􏶭􏶮􏶯􏶰错误中􏶱􏶲􏲥􏱑􏱒􏴛􏴜􏱖􏲉􏶳的􏴘􏴒􏶨promise

                switch (rejection.status) {
                    case 401:
                        if (rejection.config.url !== 'api/login') {
                            $rootScope.$broadcast('auth:loginRequired');
                        }
                        break;
                    case 403:
                        $rootScope.$broadcast('auth:forbidden');
                        break;
                    case 404:
                        $rootScope.$broadcast('page:notFound');
                        break;
                    case 500:
                        $rootScope.$broadcast('server:error');
                        break;
                }
                // return rejection; // 􏶨􏶳的promise
                // 􏶨􏶩􏲥􏱑􏱒􏶴􏶵􏴛􏴜􏱖􏲉rejection􏶶􏴤􏶷􏶉􏱖􏶸
                return $q.reject(rejection);
            }
        };
        return interceptor;
    })
    /**
     * http 请求钩子.
     */
    .factory('AuthInterceptor', ['$q', '$location', 'Storage',
        function ($q, $location, Storage) {
            var interceptor = {};

            interceptor.request = function (config) {
                var token = Storage.get('userInfo');
                if (token) {
                    //console.log('set Header', token.token);
                    config.headers["x-access-token"] = token.token;
                }
                return config;
            };

            interceptor.responseError = function (response) {
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