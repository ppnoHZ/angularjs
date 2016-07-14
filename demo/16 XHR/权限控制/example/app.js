/**
 * Created by ID on 15/11/10.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */

var app = angular.module('app', ['ngRoute'])
app.config(function ($routeProvider, ACCESS_LEVELS) {
    $routeProvider.when('/', {
        controller: 'home_ctrl',
        templateUrl: 'views/home.html',
        controllerAs: 'home',
        access_levels: ACCESS_LEVELS.admin
    }).when('/view1', {
        controller: 'home_ctrl',
        templateUrl: 'views/view1.html',
        access_levels: ACCESS_LEVELS.user
    }).when('/login', {
        controller: 'home_ctrl',
        templateUrl: 'views/login.html',
        access_levels: ACCESS_LEVELS.user
    })
        .otherwise({
            redirectTo: '/'
        })
})
app.run(function ($rootScope, $location, $log, Auth) {
    /**
     * 事件对象，将要跳转的路由对象，当前路由对象
     * function (event, next, current)
     * 
     */
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        $log.debug('路由开始跳转', arguments);
        /**
         * 权限判断，
         */
        if (!Auth.isAuthorized(next.$$route.access_levels)) {
            if (Auth.isLogin()) {
                //登录了但是没有权限
                $location.path('/')
            } else {
                $location.path('/login')

            }
        }
    })
})
app.factory('Auth', function (ACCESS_LEVELS) {
    var _user =angular.fromJson(window.localStorage.getItem('user'));

    var setUser = function (user) {
        if (!user.role || user.role > 0) {
            user.role = ACCESS_LEVELS.admin
        }
        _user = user;
        window.localStorage.setItem('user',angular.toJson(_user));
    }

    return {
        setUser: setUser,
        getUser: function () {
            return _user;
        },
        isAuthorized: function (lvl) {
            return _user.role >= lvl;
        }, isLogin: function () {
            return _user ? true : false
        }
    }
})
app.constant('ACCESS_LEVELS', {
    admin: 1,
    user: 2
})
app.controller('home_ctrl', function ($scope, $http, $log, Auth) {
    $scope.btnClick = function (type) {
        var user;
        if (type == 'admin') {
            user = {
                role: 3
            }
        } else {
            user = {
                role: 1
            }
        }
        console.log(user);
        Auth.setUser(user)

    }
    // $http.jsonp("https://api.github.com?callback=JSON_CALLBACK").success(function (data) {
    //     // console.log('object', data);􏲪􏺒
    //     console.log(data);
    // });
});

