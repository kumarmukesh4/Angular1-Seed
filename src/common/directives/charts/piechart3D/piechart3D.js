/**
 * Pie Chart directive
 */
(function() {
    angular.module("hotstar.main").directive('piechartthree',function($timeout, $document) {
        return {
            restrict: 'A',
            scope: {
                pieData: '=',
                pieWidth: '=',
                pieHeight: '=',
                pieColors: '='
            },
            link: function(scope, elem) {

              // scope.$watchGroup(['pieData'], function() {
              //     if (typeof scope.pieData === 'string') {
              //         scope.pieData = JSON.parse(scope.pieData);
              //     }
              //
              //     elem.empty();
              //     scope.pieChartInstance = null;
              //     var options = {
              //         "type": "pie",
              //         "pathToImages": "assets/img/amcharts/",
              //         "angle":32,
              //         "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
              //         "depth3D": 18,
              //         "startRadius": "30%",
              //         "pullOutEffect": "easeOutSine",
              //         "pullOutOnlyOne": true,
              //         "startEffect": "easeOutSine",
              //         "labelText": "",
              //         "colors": [
              //             "#78C9FA",
              //             "#3277CE",
              //             "#225A93",
              //             "#283E4F",
              //             "#000000",
              //             "#333333",
              //             "#4D4D4D",
              //             "#808080",
              //             "#999999",
              //             "#B3B3B3",
              //             "#B3B3B3"
              //         ],
              //         "labelColorField": "#FFFFFF",
              //         "marginBottom": 0,
              //         "marginTop": 0,
              //         "showZeroSlices": true,
              //         "titleField": "label",
              //         "valueField": "value",
              //         "colorField": "color",
              //         "borderColor": "#FFFFFF",
              //         "allLabels": [],
              //         "balloon": {
              //             "adjustBorderColor": false,
              //             "color": "#FFFFFF"
              //         },
              //         export: {
              //             enabled: true,
              //             "libs": {
              //                 "path": "libs/amcharts/plugins/export/libs/"
              //             },
              //             "menu": [ {
              //                 "class": "export-main",
              //                 "menu": [{
              //                     "label": "Download",
              //                     "menu": ["PNG"]
              //                 }]
              //             } ]
              //         },
              //         "titles": [],
              //         "dataProvider":scope.pieData
              //     };
              //     $timeout(function(){
              //         scope.pieChartInstance = AmCharts.makeChart(elem[0],options);
              //
              //         scope.pieChartInstance.addListener("rollOverSlice", rollover);
              //
              //         function rollover (event) {
              //             console.log("rollover");
              //             angular.element(".piechart-state-wise").removeClass('highlightBar dimBar');
              //             //console.log(event);
              //             var elemID = angular.element("#piechartbar-"+ (event.dataItem.dataContext.id));
              //             angular.element(".piechart-state-wise").addClass('dimBar');
              //             if (elemID.length > 0) {
              //                 angular.element(elemID).addClass('highlightBar');
              //             } else {
              //                 angular.element("#state-others").addClass('highlightBar');
              //                 angular.element(".piechart-state-wise").removeClass('highlightBar dimBar');
              //             }
              //         }
              //
              //         angular.element('.piechart').bind('mouseleave',function() {
              //             angular.element(".piechart-state-wise").removeClass('highlightBar dimBar');
              //           });
              //  },500);
              //
              //     // Touch event to reset chart selection
              //     $document.on("click touchend", function(event){
              //         if ($(event.target).closest('.piechart, .usa-map').length === 0) {
              //             angular.element(".piechart-state-wise").removeClass('highlightBar dimBar');
              //         }
              //     });
              //
              // });
            }
        };
    });
})();




