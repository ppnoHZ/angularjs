# 处理非安全代码

* 场景：在输入框中输入一些可执行的js如：

> js

```html
<div class="panel-body">
            <div class="well">
                <p><input type="text" class="form-control" ng-model='htmlData'></p>

                <p ng-bind-html='htmlData'></p>
            </div>
</div>

```
> js

```javascript
	//必须转换一下不然报错。
	$scope.htmlData=$sce.trustAsHtml("<p>This is <b onclick=alert('attack!')>dangerous</b> data</p>");
```


* 转换后的代码将会