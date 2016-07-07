#指令
##定义方式
    ```javascript
    angular.module('app', [])
        .directive('myDriective', function () {
            return {
                restrict: 'E',
                template: '<a href="http://www.baidu.com"> myDirective go to baidu </a>'
            }
        })
    ```
##命名方式和使用方式

* directive的名称要用驼峰的命名方式
* 前台访问则以my-directive的方式，
        例如：name为myDriective，标签名称则为my-directive,
             name为myDriectiveParams,标签名则为my-driective-params
        属性的设置也是类似

##其他属性设置

* restrict:指定angular在编译html的时候以哪种声明格式来匹配指令定义，可以指定多个。
        *E(元素):<my-directive>
        *A(属性):<div my-directive>   【推荐使用，兼容性好】
        *C(class):<div class="my-directive">
        *M(注释):<!--directive:my-directive-->

* template：指令返回的标签内容
* replace ：如果为true 页面中则不会出现自定义的标签<my-directive>
* priority： 优先级
* terminal[bool] ：这个参数用来告诉AngularJS停止运行当前元素上比本指令优先级低的指令。但同当前指令 优先级相同的指令还是会被执行。
* scope ：可以是一个bool或者一个对象，当为true的时候回从父作用域继承并创建一个新的作用域对象，默认为false；
* transclude:默认值为false，只有当你希望创建一个可以包含任意内容的指令时,才使用transclude: true。嵌入允许指令的使用者方便地提供自己的HTML模板,其中可以包含独特的状态和行为,并
对指令的各方面进行自定义。这段代码告诉AngularJS编译器,将它从DOM元素中获取的内容放到它发现ng-transclude 指令的地方。
    ```javascript
        angular.module('myApp', [])
        .directive('sidebox', function() {
            return {
                restrict: 'EA',
                scope: {
                    title: '@'
                },
                transclude: true,
                template: '<div class="sidebox">\
                    <div class="content">\
                        <h2 class="header">{{ title }}</h2>\
                        <span class="content" ng-transclude>\
                            <!--自定义的内容会出先在 ng-transclude 标记的元素下-->
                        </span>\
                    </div>\
                </div>'
        }; });
    ```

    ```html
        <div sidebox title="Links">
                <ul>
                    <li>First link</li>
                    <li>Second link</li>
                </ul>
        ￼￼￼￼</div>
    ```

* controllerAs:设置控制器别名
    ```javascript
     angular.module('myApp')
     .directive('myDirective', function() {
         return {
             restrict: 'A',
             template: '<h4>{{ myController.msg }}</h4>',
             controllerAs: 'myController',
             controller: function() {
                 this.msg = "Hello World"
             }
    }; });
    ```

    ```javascript
    angular.module('myApp')
        .controller('MainController', function() {
            this.name = "Ari";
    });
    ```

    ```html
    <div ng-app ng-controller="MainController as main">
        <input type="text" ng-model="main.name" />
        <span>{{ main.name }}</span>
    </div>
    ```



##给指令传参数
    为指令单独创建一个作用域，
    template: "<a href="{{ myUrl }}">{{ myLinkText }} </a>"
    