# angularjs-sample

Angular.js 1.x sample.

# Technologies

javascript:
* [Angular.js]
* [Airbnb JavaScript Style Guide]
* [angular.js code style]
* [jQuery]

css:
* [BEM]
* [Normalize.css]
* [eslint]
    - plugin: [eslint-plugin-angular](https://www.npmjs.com/package/eslint-plugin-angular)
    - config: [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)
* [Twitter Bootstrap]

server:
* [node.js]
* [Grunt]
* [express]

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
        +----------------+-------------------+
        |                |                   |
        V                v                   v
     +-------------+   +-------------+    +------------------+
     |  ngAnimate  |   |  ngPlus     |    | blocks.exception |
     |  ngSanitize |   |  ui.Router  |    | blocks.logger    |
     |  ...        |   |  ...        |    | ...              |
     +-------------+   +-------------+    +------------------+

```

# more

管理后台模板：[admin template themes | WrapBootstrap](https://wrapbootstrap.com/tag/admin-template)

[slim](http://iarouse.com/dist-slim/v3/index.html#/dashboard)



[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Angular.js]: <http://angularjs.org>
[Airbnb JavaScript Style Guide]: <https://github.com/airbnb/javascript>
[angular.js code style]: <https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md>
[jQuery]: <http://jquery.com>

[BEM]: <https://en.bem.info/>
[Normalize.css]: <http://necolas.github.io/normalize.css/>
[eslint]: <http://eslint.org/>
[Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>

[node.js]: <http://nodejs.org>
[Grunt]: <https://gruntjs.com/>
[express]: <http://expressjs.com>



