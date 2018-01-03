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

# 软件架构

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

第一层：app启动模块。存放app启动逻辑和模块依赖。
第二层：app的功能模块。
第三层：此app的通用模块。如 常量，数据服务，控件等。
第四层：跨app的通用模块。如 blocks.exception,blocks.logger。


# 更多

管理后台模板：[admin template themes | WrapBootstrap](https://wrapbootstrap.com/tag/admin-template)


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
[Grunt]: <https://gruntjs.com/>
[express]: <http://expressjs.com>



