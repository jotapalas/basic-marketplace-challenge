var marketplace = angular.module('marketplace', []);

function mainController($scope, $http) {
  // when landing on the page, get all baskets and show them
  $http.get('/api/basket')
  .success(function(data) {
    $scope.baskets = data.baskets;
    $scope.basketCount = data.count;
    $scope.accordion = 0;
  })
  .error(function(err) {
    console.log('Error: ' + err);
  });

  $http.get('/api/item')
  .success(function(data) {
    $scope.items = data;
  })
  .error(function(err) {
    console.log('Error: ' + err);
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
  };

  $scope.deleteBasket = function(basketId) {
    $http.delete('/api/basket/' + basketId)
    .success(function(newBasket) {
      delete $scope.baskets[newBasket.id];
      $scope.basketCount--;
    })
    .error(function(err) {
      console.log('Error: ' + err);
    });
  };

  $scope.addItem = function(basketId, itemCode) {
    $http.post('/api/basket/' + basketId + '/addItem/' + itemCode)
    .success(function(basket) {
      $scope.baskets[basket.id] = basket;
    })
    .error(function(err) {
      console.log('Error: ' + err);
    });
  };

  $scope.removeItem = function(basketId, itemCode) {
    $http.delete('/api/basket/' + basketId + '/removeItem/' + itemCode)
    .success(function(basket) {
      $scope.baskets[basket.id] = basket;
    })
    .error(function(err) {
      console.log('Error: ' + err);
    });
  }
}