/**
 * Created by ID on 15/11/10.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */

var app = angular.module('app', [])
app.controller('appController', function($scope, valueObject, valueService, constValue, constService) {
    console.log('[controller1] 更改valueObject服务的值name为111', valueObject)
    valueObject.name = '111'
    console.log('[controller1] 更改valueObject服务之后name的值', valueObject)


    console.log('[controller1] 更改valueObject服务之后name的值', valueObject.getName()) //111

    console.log('[controller1] 拦截之后valueService]', valueService); //2

    console.log('[controller1]', constValue)

    console.log('[controller1] 改变constValue', constValue)

    constValue = 'change'

    console.log('[controller1] 改变之后', constValue)

    console.log('[controller1] constService', constService);

});
app.controller('appController2', function($scope, valueObject, valueService, constValue, constService) {
    console.log('[controller2]', valueObject)

    console.log('[controller2]', constValue)

    console.log('[controller2] constService', constService);
});
/**
 * value 创建的服务第二个参数只能是具体的值(字符串、对象{}),不能通过function
 * 来返回一个对象，如果用function的话，服务返回是一个function。
 * 不可注入到config方法中
 */
app.value('valueService', 1)
app.value('valueObject', {
    name: 'valueObject-zdd',
    getName: function() {
        return this.name;
    }
})

/**
 * constant 可以注入到config方法中
 */
app.constant('constValue', 'testConstantService')
app.constant('constService', {
        name: 'zdd',
        age: 11,
        getName: function() {
            return this.name;
        }
    })
    //app.config(function (valueService) {
    //    //value 方式创建的服务，无法再config里注入，加载的时候就会报错。
    //})
app.config(function(constService, constValue, $provide) {
    console.log('[config]', '改变constant值')

    console.log('[config]', constService)
    constService.name = 'z'
    console.log('[config]', constService.getName()); // z
    console.log('[config]', constService)
    console.log('[config]', '改变constant值')

    constService = {
        adddd: '111'
    }
    console.log('[config]', '改变constant值之后', constService) // {addd:'111'}

    console.log('[config]', constValue); //testConstantService
    constValue = 'dddddd'

    $provide.decorator('valueService', function($delegate, $log) {
        $log.info('拦截器')
        return $delegate + 1;
    })


    //$provide.decorator('constService', function ($delegate, $log) {
    //    $log.info('拦截器')
    //    $delegate.name = '拦截器 之后'
    //    return $delegate;
    //})


})