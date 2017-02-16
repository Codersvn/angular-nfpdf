((app) => {
    "use strict";
    app.directive('nfPdf', ['$sce', ($sce) => {
        return {
            restrict: 'E',
            scope: {
                url: '=',
                options: '=',
            },
            link: (scope, element, attrs) => {
                var canvas = document.createElement('canvas');

                PDFJS.getDocument(scope.url).then(function(pdf) {
                    console.log(pdf);
                    pdf.getPage(1).then(function(page) {
                        let options = scope.options || {};
                        options.scale = options.scale || 1;
                        var viewport = page.getViewport(options.scale);

                        var canvas = document.createElement('canvas');
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        if (options.resizeToWidth || options.resizeToHeight) {
                            let {
                                resizeToWidth, resizeToHeight
                            } = options;
                            let s = 1;
                            if (resizeToWidth) {
                                s = Math.round((resizeToWidth / canvas.width) * 100) / 100;
                            }
                            if (resizeToHeight) {
                                s = Math.round((resizeToHeight / canvas.height) * 100) / 100;
                            }
                            canvas.width = canvas.width * s;
                            canvas.height = canvas.height * s;
                            var viewport = page.getViewport(s);
                        }

                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        page.render(renderContext);
                        if (element && element.nodeType === 1) {
                            element.appendChild(canvas);
                        }
                        if (element[0] && element[0].nodeType === 1) {
                            element[0].appendChild(canvas);
                        }
                    });
                });

            }
        };
    }]);
})(angular.module('nfpdf', []));
