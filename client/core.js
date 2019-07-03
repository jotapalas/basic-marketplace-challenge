var marketplace = angular.module('marketplace', []);

function mainController($scope, $http) {
  // when landing on the page, get all baskets and show them
  $http.get('/api/basket')
  .success(function(data) {
    $scope.baskets = data.baskets;
    $scope.basketCount = data.count;
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  $http.get('/api/item')
  .success(function(data) {
    $scope.items = data;
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  $scope.newBasket = function() {
    $http.post('/api/basket')
    .success(function(newBasket) {
      $scope.baskets[newBasket.id] = newBasket;
      $scope.basketCount++;
    })
    .error(function(err) {
      console.log('Error: ' + err);
    });
  }
}