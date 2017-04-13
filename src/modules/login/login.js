/**
 * Home module - Home screen
 */
angular.module('hotstar.login', [])
    .controller('loginCtrl', ['$scope','$state', function loginCtrl($scope,$state) {
       $scope.doLogin = function(form){
           $state.go('dashboard');
       };
  }]);
