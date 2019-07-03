var marketplace = angular.module('marketplace', []);

function mainController($scope, $http) {
  console.log("HOLA");

  // when landing on the page, get all baskets and show them
  $http.get('/api/basket')
  .success(function(data) {
    $scope.baskets = data;
    console.log(data);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  $http.get('/api/item')
  .success(function(data) {
    $scope.items = data;
    console.log(data);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });
}