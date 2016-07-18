experss -e myapp 创建ejs模板的工程
views 文件夹下必须要有error文件，error.html,error.ejs,error.jade
不然会报错：Error: Failed to lookup view "error" in views directory "e:\GitHub\angularjs\demo\server\angualr-basic\app\views"

# 测试
$ npm install -g karma
$ karma init test/karma.conf.js
$ karma start test/karma.conf.js

# 代码覆盖率
npm install karma-coverage

配置

```javascript

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'script/**/*.js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
```

## error