# js语法## 定义对象的方法```javascript```
### 原形

```javascript
 function Stroage () {}
 Stroage.prototype.set= function (key, data)  {
           return storge.setItem(key, window.JSON.stringify(data));
        }
        Stroage.prototype.get= function (key) {
            return window.JSON.parse(storge.getItem(key));
        
        }
        Stroage.prototype. remove= function (key) {
            //window.localStorage.removeItem(key);
            storge.removeItem(key);
        }
```
### 构造参数
* 1,无参数构造函数

```javascript
function Stroage () {
            this.set= function (key, data)  {
                return storge.setItem(key, window.JSON.stringify(data));

            }
            this.get= function (key) {
                return window.JSON.parse(storge.getItem(key));

            }
            this.remove= function (key) {
                storge.removeItem(key);

            }
        }
```

* 2,有参数构造函数

```javascript
function Stroage (storge) {
            this.set= function (key, data)  {
                return storge.setItem(key, window.JSON.stringify(data));

            }
            this.get= function (key) {
                return window.JSON.parse(storge.getItem(key));

            }
            this.remove= function (key) {
                storge.removeItem(key);

            }
        }
```

