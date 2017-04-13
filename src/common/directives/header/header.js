/**
 * @ used to show header in the application
 */
angular.module("hotstar.main").directive('header', function () {
    return {
        restrict: 'A', //This means that it will be used as an attribute and NOT as an element.
        replace: true,
        scope: true,
        templateUrl: "directives/header/header.tpl.html",
        controller: function($scope) {

        }
    };
});