
'use strict';

module.exports = {
    load: function (dictionary) {
        var glob = require('glob');
        var _ = require('lodash');
        var path = require('path');
        var configs = {};
        var key;

        glob.sync('*.js', {cwd: dictionary}).forEach(function (file) {
          var config = require(path.join(dictionary, file));
          _.extend(configs, config);
        });

        return configs;
    }
};
