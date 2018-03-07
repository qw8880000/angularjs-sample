# angularjs-sample

Angular.js 1.x sample.

# Technologies

前端：
* javascript前端框架: [Angular.js]
* javascript编码规范: [Airbnb JavaScript Style Guide] 
* angular.js编码规范: [Angular.js code style]
* javascript 代码检查: [eslint]
    - plugin: [eslint-plugin-angular](https://www.npmjs.com/package/eslint-plugin-angular)
    - config: [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)

* css 命名规范: [BEM]
* css 初始化: [Normalize.css]
* css 代码检查: [stylelint]

后端：
* [node.js]
* [express]

自动化工具：
* [Grunt]

自动化测试：
* [karma](https://karma-runner.github.io/2.0/index.html) + [jasmine](https://jasmine.github.io/) : 单元测试(unit test)
* [Protractor](http://www.protractortest.org/#/) : 端到端测试(end-to-end test)

# AngularJs Architecture

```
     +--------+
     |  app   |
     +--------+
        |
        |
        V
     +------------------+
     |   app.feature1   |
     |   app.feature2   |
     |   app.feature3   |
     |   ...            |
     +------------------+
        |
        +-------------------+
        |                   |
        V                   v
     +-----------+     +---------------+
     |  app.core |     |  app.widgets  |
     +-----------+     +---------------+
        |
        |
        v
     +------------------+
     | blocks.exception |
     | blocks.logger    |
     | ...              |
     +------------------+

```

* 第一层：app启动模块。存放app启动逻辑和模块依赖。
* 第二层：app的功能模块。
* 第三层：此app的通用模块。如 常量，数据服务，控件等。
* 第四层：跨app的通用模块。如 blocks.exception,blocks.logger。

# CSS Architecture

* 命名规范使用 [BEM].
* css 预处理器使用 Less.
* 字体单位使用 [REM], 其他元素使用px. 

# Less Directory Structure

// todo

# css 编码规范

// todo

# How to use

1. 克隆本代码仓库
1. `npm install`
1. `bower install`
1. 普通开发使用`grunt`命令；发布使用`grunt dist`

# Automation

1. 自动注入Bower文件：[grunt-wiredep]
1. javascript 代码检查 ：[grunt-eslint]
1. css 代码检查：[grunt-stylelint]
1. 图片优化：[grunt-image]
1. caching your HTML templates with $templateCache。：[grunt-angular-templates]
1. 合并css/javascript文件：[grunt-contrib-concat]
1. angular自动注入依赖：[grunt-ng-annotate]
1. css后处理：[grunt-postcss]
1. css压缩：[grunt-contrib-cssmin]
1. javascript 压缩：[grunt-contrib-uglify]
1. 组合concat/cssmin/uglify，为它们自动生成配置，并在最后替换index.html里的对应代码块为优化后的css/js文件：[grunt-usemin]

# More

* 管理后台模板：[admin template themes | WrapBootstrap](https://wrapbootstrap.com/tag/admin-template)
* [Coreui-angularjs](https://github.com/mrholek/CoreUI-AngularJS)


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Angular.js]: <http://angularjs.org>
[Airbnb JavaScript Style Guide]: <https://github.com/airbnb/javascript>
[angular.js code style]: <https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md>
[jQuery]: <http://jquery.com>
[eslint]: <http://eslint.org/>
[Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>

[BEM]: <https://en.bem.info/>
[Normalize.css]: <http://necolas.github.io/normalize.css/>
[stylelint]: <https://stylelint.io/>

[node.js]: <http://nodejs.org>
[express]: <http://expressjs.com>

[Grunt]: <https://gruntjs.com/>
[grunt-wiredep]: <https://www.npmjs.com/package/grunt-wiredep>
[grunt-eslint]: <https://www.npmjs.com/package/grunt-eslint>
[grunt-stylelint]: <https://www.npmjs.com/package/grunt-stylelint>
[grunt-angular-templates]: <https://www.npmjs.com/package/grunt-angular-templates>
[grunt-contrib-concat]: <https://www.npmjs.com/package/grunt-contrib-concat>
[grunt-contrib-cssmin]: <https://www.npmjs.com/package/grunt-contrib-cssmin>
[grunt-contrib-uglify]: <https://www.npmjs.com/package/grunt-contrib-uglify>
[grunt-image]: <https://www.npmjs.com/package/grunt-image>
[grunt-ng-annotate]: <https://www.npmjs.com/package/grunt-ng-annotate>
[grunt-postcss]: <https://www.npmjs.com/package/grunt-postcss>
[grunt-usemin]: <https://www.npmjs.com/package/grunt-usemin>

[REM]: <https://blog.bugsnag.com/responsive-typography-with-rems/>
