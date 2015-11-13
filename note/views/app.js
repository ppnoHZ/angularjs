/** * Created by ID on 15/11/12. * Author:zhoudd * email:zhoudd@stark.tm */angular.module('note', ['noteRouter', 'ngStorage', 'app.Services'])    .controller('HomeController', function ($scope, $http, note_Services, authenticationSvc, auth) {        $scope.userInfo = auth;        $scope.notes = [];        note_Services.getAllNotes({})            .success(function (data) {                $scope.notes = data.notes;            }        );        $scope.submitForm = function () {            note_Services.addNote({text: $scope.text})                .success(function (data) {                    if (data.status != 'success') {                        console.log(data);                    }                    else {                        note_Services.getAllNotes({})                            .success(function (data) {                                $scope.notes = data.notes;                            });                    }                });        }    })    .controller('NavbarControler', function ($scope, $window, $location, authenticationSvc) {        $scope.UserInfo = authenticationSvc.getUserInfo();        $scope.$on('loginToChild', function (e, data) {            $scope.UserInfo = data;        });        $scope.submitForm = function () {            if (!$scope.userName || !$scope.password) {                return;            }            authenticationSvc.login({                username: $scope.userName,                password: $scope.password            }).then(function (userInfo) {                $scope.UserInfo = userInfo;                $location.path('/home');            }, function (error) {                console.log(error);                alert("用户或者密码错误！");            })        }        $scope.logout = function () {            $scope.UserInfo = null;            $window.sessionStorage.removeItem('userInfo');            $location.path('/login');        }    })    .controller('RegisterController', function ($scope, $location, $http, $localStorage, $window, $sessionStorage, authenticationSvc) {        $scope.submitForm = function () {            if (!$scope.userName || !$scope.password || !$scope.password2 || !$scope.nickName) {                return;            } else {                if ($scope.password != $scope.password2) {                    return;                }            }            authenticationSvc.register({                username: $scope.userName,                password: $scope.password,                nickName: $scope.nickName            }).then(function (userInfo) {                $scope.UserInfo = userInfo;                $location.path('/home');            }, function (error) {                console.log('error', error);            })        }    })    .controller('LoginController', function ($window, $scope, $location, authenticationSvc) {        $scope.login = function () {            authenticationSvc.login({                username: $scope.userName,                password: $scope.password            }).then(function (userInfo) {                $scope.UserInfo = userInfo;                $scope.$emit('loginByChild', userInfo);                $location.path('/home');            }, function (error) {                console.log(error);                alert("用户或者密码错误！");            })        }    })