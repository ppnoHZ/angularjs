angular.module('myApp', [])
    .controller('MyController', function ($scope) {
        $scope.name = "zhoudd";
    })
    .controller('ParentController', function ($scope) {
        $scope.person = {greeted: false};
        $scope.p = {name: 'zhoudd'};//不能直接写 $scope.p.name='z' 来赋值
    })
    .controller('ChildController', function ($scope) {
        $scope.sayHello = function () {
            $scope.person.name = 'Child.change';//给父控制器的person对象加一个属性
            $scope.person.greeted = true;
            $scope.p.name = 'Child.change to z';//无效
        }
    })
    .controller('ExpressController', ['$scope', '$parse', function ($scope, $parse) {
        $scope.$watch('expr', function (newVal, oldVal, scope) {
            if (newVal !== oldVal) {
                var parseFun = $parse(newVal);
                $scope.parseValue = parseFun(scope);
            }
        })
    }])
	


