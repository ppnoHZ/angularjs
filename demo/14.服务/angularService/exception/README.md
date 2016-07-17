# Exception

* 主要通过页面的元素id
```javascript
 $location.hash('id');

```

## 问题
当滚动到底部之后，手动将网页拉到顶部在点击按钮回到底部的时候失效了。

* 解决方法使用服务$anchorScroll。
```javascript
.config(function($anchorScrollProvider) {

        $anchorScrollProvider.disableAutoScrolling();
        // body...
    })

    .....
    $scope.show = function(id) {
        $location.hash(id);
        if (id == 'bottom') {
            $anchorScroll();
        }
    }
```


# 完整代码

> js

```javascript
var app = angular.module('app', [])
    .config(function($anchorScrollProvider) {

        $anchorScrollProvider.disableAutoScrolling();
        // body...
    })
app.controller('appController', function($scope, $location, $anchorScroll) {
    $scope.itemCount = 50;
    $scope.items = [];

    for (var i = 0; i < $scope.itemCount; i++) {
        $scope.items[i] = "Item " + i;
    }

    $scope.show = function(id) {
        $location.hash(id);
        if (id == 'bottom') {
            $anchorScroll();
        }
    }
});

```
> html

```html
<html ng-app="app">

<head>
    <meta charset="utf-8" />
    <title></title>
    <link rel="stylesheet" type="text/css" href="../bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../bower_components/bootstrap/dist/css/bootstrap-theme.css">
    <link rel="stylesheet" type="text/css" href="../bower_components/angular-bootstrap/ui-bootstrap-csp.css">
    <script src="../bower_components/angular/angular.min.js"></script>
    <script src="../bower_components/angular-bootstrap/ui-bootstrap.min.js"></script>
    <script src="app.js"></script>
</head>

<body>
    <div ng-controller="appController">
    	<div class="panel panel-default">
    		<h4 class="panel-heading"> URL</h4>
    		<div class="panel-body">
    			<p id='top'> this is the top</p>
    			<button class="btn btn-primary" ng-click="show('bottom')">GO to Bottom</button>
    			<ul>
    				<li ng-repeat='item in items'>{{item}}</li>
    			</ul>
    			<p id='bottom'>This is the bottom</p>
    			<button class="btn btn-primary" ng-click="show('top')">
    				GO to Top
    			</button>
    		</div>
    	</div>
    </div>
</body>

</html>

```