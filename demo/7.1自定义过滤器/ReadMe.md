#过滤器
用来格式化数据展示给用户。内置的有很多，例如:大小写转换，小数位数限制等。
##使用方法：

1.单个过滤器:

 ```javascript
    {{ expression | filter }}
 ```
    
2.多个过滤器,链式调用

 ```javascript
    {{ expression | filter1 | filter2 |....}}
 ```
 
 3.过滤器传参数(多个)

 ```javascript
    {{ expression | filter1:'arguments1':arguments2:....}}
 ```
##内置过滤器
    1. currency转换成货币。默认情况为当前所处区域的货币格式。
     	* 原形：
     	 	function(amount, currencySymbol, fractionSize)     	 	
    	```javascript
    	 	{{ 12 | currency}}  <!--将12格式化为货币，默认单位符号为 '$', 小数默认2位--> 
 			{{ 12.45 | currency:'￥'}} <!--将12.45格式化为货币，使用自定义单位符号为 '￥', 小数默认2位-->
 			{{ 12.45 | currency:'CHY￥':1}} <!--将12.45格式化为货币，使用自定义单位符号为 'CHY￥', 小数指定1位,会执行四舍五入操作 --> 
 			{{ 12.55 | currency:undefined:0}} <!--将12.55格式化为货币， 不改变单位符号， 小数部分将四舍五入 -->
     	```
     		
    2.date时间格式，默认为 mediumDate
    	* 原形：
    	 	function(date, format, timezone)   	 	
    	```javascript
	       {{ today | date:'medium' }} <!-- Aug 09, 2013 12:09:02 PM --> 
	       {{ today | date:'short' }} <!-- 8/9/1312:09PM -->
	       {{ today | date:'fullDate' }} <!-- Thursday, August 09, 2013 --> 
	       {{ today | date:'longDate' }} <!-- August 09, 2013 -->
	       {{ today | date:'mediumDate' }}<!-- Aug 09, 2013 --> 
	       {{ today | date:'shortDate' }} <!-- 8/9/13 -->
	       {{ today | date:'mediumTime' }}<!-- 12:09:02 PM --> 
	       {{ today | date:'shortTime' }} <!-- 12:09 PM -->
	       自定义格式 也是采用 "yyyy-MM-dd HH:mm:ss:sss"进行组合{{ today | date:'hh:mm:ss:sss'}}
	       <!--使用ISO标准日期格式 -->
			{{ '2015-05-20T03:56:16.887Z' | date:"MM/dd/yyyy @ h:mma"}}
			<!--使用13位（单位：毫秒）时间戳 -->
			{{ 1432075948123 | date:"MM/dd/yyyy @ h:mma"}}
			<!--指定timezone为UTC -->
			{{ 1432075948123 | date:"MM/dd/yyyy @ h:mma":"UTC"}}
       ```
         
    3. filter 从给定的数组中选择一个子集，并将其生产新的数组返回。
   
##使用方法
    * 在{{}}里通过 `|` 来调用过滤器，如：
        * 不带参数：{{ name | uppercase }} 将name转换成大写。
        * 带参数：{{ 123.456789 | number:2 }} 传递参数2，表示只显示两位小数。
        * 过个过滤器一起用: {{ 'ginger loves dog treats' | lowercase | capitalize }}
    * controller调用
     ```javascript
     app.controller('DemoController', ['$scope', '$filter',
           function($scope, $filter) {
             $scope.name = $filter('lowercase')('Ari');
         }]);
    ```
##自定义过滤器
    *创建一个模块
        ```javascript
         angular.module('myApp.filters', [])
             .filter('capitalize', function() {
               return function(input) {};
             });
        ```