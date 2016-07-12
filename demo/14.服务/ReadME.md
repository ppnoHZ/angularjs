# Service
5种方式创建服务:

> **factory**  最常见的创建服务的方式。

> **service**  注册一个支持构造函数的服务。

> **constant** 将已存在的常量注册为服务,可以注入到config配置函数中,值不能改变。

> **value**    当$get方法返回的是一个常量的时候使用，和constant创建的服务类似,但是不可注入到config。

> **provider**


## factory
最快速的创建服务的方式。
### params：
> **name**(string)
服务的名称。

> **fun**(object、array、function)
创建服务实例的时候被调用，可返回简单的类型，函数，对象等任意类型的数据。(同value()函数类似)

### example：
```javascript
	angular.module('app')
	.factory('testFactroy',function(){
		return {
			get:function(username){
						
		}
	})
```
	
## service
注册一个支持构造函数的服务，允许我们为服务对象注册一个构造函数。service()函数在穿件实例时通过new关键字来实例化服务对象。
在service里面可以不用返回东西，因为AngularJS会调用new关键字来创建对象。但是返回一个自定义对象好像也不会出错。
### params:
	
>name
服务名称

>constructor
函数:通过这个方法来实例化服务对象。

### example：

```javascript
	var Person =function($http){
		this.getName=function(){
			return $http({method:'GET',url:'api/user'});
					
		}
	}
	angular.service('personService',Person);
```
## constant
将一个已经存在的**变量**注册为服务,并将其注入到应用的其他部分中。
<mark>可以注入到config中,不能被装饰器拦截。值不能更改，当在一个控制器中赋值之后，在另外一个控制器中将还是原来的值。</mark>
### params:
>name(字符串) 服务名称

>value(常量)
需要注册的常量的值

### example:
```javascript
app.constant('constValue','testConstantService')
app.constant('constService', {
    name: 'zdd',
    age: 11,
    getName: function () {
        return this.name;
    }
})
```

## value

如果服务的$get方法返回的是一个常量,就没有必要定义一个包含复杂功能的完整服务,可以通过value()函数方便的注册服务。
<mark>值可以更改。跨控制器可获得新值</mark>

### params
> name(字符串)

> value(值)

### example
```javascript
app.value('valueService', '123')
app.value('valueObject',{
        name: 'zdd',
        getName: function () {
            return this.name;
        }
    }
)
```

