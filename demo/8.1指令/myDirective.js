/**
 * Created by ID on 15/11/11.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */
angular.module('app', [])
    .directive('myDirective', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<a href="http://www.baidu.com"> myDirective go to baidu </a>'
        }
    })
    .directive('myDirectiveParams', function () {
        return {

            restrict: 'E',
            scope: {
                myUrl: '@',//绑定策略：绑定到属性my-url上
                myLinkText: '@' //绑定策略：绑定到属性my-link-text上
            },
            template: '<a href="{{ myUrl }}">{{ myLinkText }} </a>'
        }
    })
    .directive('myDirectiveTest', function () {
        return {
            restrict: 'E',
            scope: {
                myUrl: '@',
                myLinkText: '@'
            },
            template: '<a href="{{ myUrl }}">{{ myLinkText }} </a>',
            controller: function ($scope) {
                $scope.myUrl = 'www.baidu.com';
                $scope.myLinkText = 'controller';

            }
        }
    })
    .directive('myDirectiveTest1', function () {
        return {
            restrict: 'E',
            scope: {
                myUrl: '@',
                myLinkText: '@'
            },
            templateUrl: 'des.html',
            controller: function ($scope) {
                $scope.myUrl = 'www.baidu.com';
                $scope.myLinkText = 'controller';

            }
        }
    })
    .directive('dLinkTest', function ($log) {
        return {
            restrict: 'E',
            template: "<a ng-click='show()'>{{name}}</a>",
            controller: function ($scope) {
                $scope.$watch('name',function (param) {
                    $log.info('name-name',$scope.name)
                    
                  })

            }, link: function (scope, element, attrs) {
                $log.info('attrs', attrs)
                $log.info('text', attrs['text'])
                $log.info('name', attrs["name"])
                scope.name= attrs["name"]

            }
        }
    })
    .controller('appController', function ($scope) {

        $scope.info = {
            name: 'zhoudd'
        }

    });
