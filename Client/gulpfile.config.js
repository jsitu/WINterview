'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './www';

        this.cssOutputPath = this.source + '/css';
        this.allSass = './scss/**/*.scss';

        this.jsOutputPath = this.source + '/js/bundle/';
        this.allJavaScript = ['./www/js/module/*.js', './www/js/config/*.js', './www/js/service/*.js', './www/js/directive/*.js'];

        this.tsOutputPath = this.source + '/js';
        this.allTypeScript = this.source + '/ts/**/*.ts';

        this.typings = './tools/typings/';
        this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
        this.appTypeScriptReferences = './tools/typings/app.d.ts';
    }
    return gulpConfig;
}());
module.exports = GulpConfig;