# Angular

## $watch

* 参数

    * watchExpression:
    
    >watchExpression可以是一个作用域对象的属性,或者是一个函数。在$digest循环中的每个$digest调用都会涉及它。 
    
    >如果watchExpression是一个字符串,Angular会在$scope上下文中对它求值。如果它是一个函数,那么Angular会认为它会返回应该被监控的值
    
    * listener/callback
    
    >作为回调的监听器函数,它只会在watchExpression的当前值与先前值不相等(除了首次运 行初始化期间)时调用。
    
    * objectEquality(可选)
    
    >objectEquality是一个进行比较的布尔值,用来告诉Angular是否检查严格相等。
* 返回值
    > $watch函数会给监听器返回一个注销函数,我们可以调用这个注销函数来取消Angular对当前值的监控。
    
    ```javascript

        var unregisterWatch =
            $scope.$watch('newUser.email',
                function(newVal, oldVal) {
    ￼￼              if (newVal === oldVal) return; // 初始化 
            });
        // 稍后,可以通过调用这个注销函数来注销这个监控器
        unregisterWatch();
    ```

* 监控表达式的变化
   ```javascript
   $scope.$watch('full_name',function(newVal, oldVal, scope) {
    if(newVal === oldVal) {
        // 只会在监控器初始化阶段运行
        } else{ 
             // 初始化之后发生的变化
      }
    });
   ```
    

## $watchCollection
   >使用$watchCollection还可以检测对象或数组何时发生了变化,以便确定对象或数组中的 条目是何时添加、移除或者移动的。$watchConllection的行为与$digest循环中标准的$watch 的行为一样,我们甚至可以把它当作标准的$watch。
   
   * 参数
    * obj(string/function)
    * listener(function)
   * 返回值
    > 返回一个注销函数。   
