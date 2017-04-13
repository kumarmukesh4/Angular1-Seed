/**
 * @ used to show footer in the application
 */
angular.module("hotstar.main").directive('footer', function () {
    return {
        restrict: 'A', //This means that it will be used as an attribute and NOT as an element.
        replace: true,
        templateUrl: "directives/footer/footer.tpl.html"
    };
});