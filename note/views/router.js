/**
 * Created by zhoudd on 2015/11/12.
 */
angular.module('noteRouter', ['ngRoute'])
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeSuccess', function (userInfo) {
            //通过 $q.when(userInfo);
            console.log('userInfo', userInfo);
        });
        $rootScope.$on('$routeChangeError', function (event, current, previous, eventObj) {
            //eventObj是通过$q.reject({authenticated: false});传递过来的
            if (eventObj.authenticated === false) {
                $location.path('/login');
            }

        });
        $rootScope.$on('loginByChild', function (event, data) {
            $rootScope.$broadcast('loginToChild', data)
        });

    }])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        //$routeProvider.hasOwnProperty('!');
        //如果设置了 resolve 属性 angular会将列表中的元素注入到控制器中，
        //如果这些依赖是promise对象，那么他们在控制器加载以及$routeChangeSuccuss被触发
        //之前会被resolve 并设置成为一个值。

        //控制器中这样访问 function(auth){ auth} 见HomeController  内容是   $q.when(userInfo)里的userInfo

        $routeProvider.when('/home', {
            templateUrl: 'view/home.html',
            controller: 'HomeController',
            cache: 'false',
            resolve: {
                auth: ['$q', 'authenticationSvc', function ($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);// 成功则会进到  $routeChangeSuccess事件
                    } else {
                        return $q.reject({authenticated: false});// 没有登陆 进入$routeChangeError
                    }
                }]
            }
        });
        $routeProvider.when('/register', {
            templateUrl: 'view/register.html',
            controller: 'RegisterController',
            cache: 'false'

        });
        $routeProvider.when('/login', {
            templateUrl: 'view/login.html',
            controller: 'LoginController',
            cache: 'false'
        });
        $locationProvider.html5Mode(true);

    }])

//angular.run(['$rootScope', '$location', function ($rootScope, $location) {
//    $rootScope.$on('$routeChangeSuccess', function (userInfo) {
//        console.log(userInfo);
//    });
//    $rootScope.$on('$routeChangeError', function (event, current, previous, eventObj) {
//        if (eventObj.authenticated === false) {
//            $location.path('/login');
//        }
//
//    })
//}])