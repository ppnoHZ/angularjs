/**
 * Created by ID on 15/11/10.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */

var app = angular.module('app', ['ngRoute', 'restangular'])
app.constant('apiKey', 'ora30DQjozuoo6GJlF51ckukPGgEHWta')
app.config(function ($routeProvider, ACCESS_LEVELS, apiKey, RestangularProvider) {
    $routeProvider.when('/home', {
        controller: 'home_ctrl',
        templateUrl: 'views/home.html',
        controllerAs: 'home',
        access_levels: ACCESS_LEVELS.admin
    }).when('/view1', {
        controller: 'home_ctrl',
        templateUrl: 'views/view1.html',
        access_levels: 5
    }).when('/login', {
        controller: 'home_ctrl',
        templateUrl: 'views/login.html',
    })
        .otherwise({
            redirectTo: '/home'
        })

    RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/zdd/collections');

    RestangularProvider.setDefaultRequestParams({
        apiKey: apiKey
    })
    // 将mongodb的_id 映射到id
    RestangularProvider.setRestangularFields({
        id: '_id.$oid'
    });
    RestangularProvider.setRequestInterceptor(function (elem, operation, what) {
        console.log('setRequestInterceptor', arguments);
        if (operation === 'put') {
            elem._id = undefined;
            return elem;
        }
        return elem;
    });

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
        if (next.$$route.access_levels > 0) {
            if (!Auth.isAuthorized(next.$$route.access_levels)) {
                if (Auth.isLogin()) {
                    //登录了但是没有权限
                    console.error('无权访问');
                    $location.path('/')
                } else {
                    console.error('未登录');
                    $location.path('/login')
                }
            } else {
                console.log('通过');
            }
        }

    })
})
app.factory('Auth', function (ACCESS_LEVELS) {
    var _user = angular.fromJson(window.localStorage.getItem('user'));

    var setUser = function (user) {
        // if (!user.role || user.role > 0) {
        //     user.role = ACCESS_LEVELS.admin
        // }
        _user = user;
        window.localStorage.setItem('user', angular.toJson(_user));
    }

    return {
        setUser: setUser,
        getUser: function () {
            return _user;
        },
        isAuthorized: function (lvl) {
            if (_user) {
                return _user.role >= lvl;
            } else {
                return false;
            }
        }, isLogin: function () {
            return _user ? true : false
        }
    }
})
app.constant('ACCESS_LEVELS', {
    admin: 1,
    user: 2
})
app.controller('home_ctrl', function ($scope, $http, $log, Auth, Restangular) {
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
    // var info = Restangular.allUrl('/user');
    // info.post({
    //     name: 'zhoudd'
    // }).then(function (result) {
    //     console.log(result);
    // });

    var info1 = Restangular.one('/user', { q: {} }, {});

    info1.getList().then(function (users) {
        console.log('users',users);
        
        console.log(users[0]);

    })



    var searches = Restangular.allUrl('one1', 'http://google.com/');

    searches.getList()
    // .then(function (result) {
    //     console.log(result);
    // });

    // $http.jsonp("https://api.github.com?callback=JSON_CALLBACK").success(function (data) {
    //     // console.log('object', data);􏲪􏺒
    //     console.log(data);
    // });
});

