require('jquery');
require('lodash');
require('angular');
require('pdfjs-dist');
PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
var nfpdf = require('../../src/nfpdf');

((app) => {
    app.controller('MainCtrl', MainCtrl);
    MainCtrl.$inject = ['$rootScope', '$scope'];

    function MainCtrl($rootScope, $scope) {
        var vm = this;
        vm.url = 'avatar.pdf';
        vm.options = {
            resizeToWidth: 200,
        };
    }
})(angular.module('app', [
    'nfpdf'
]));
