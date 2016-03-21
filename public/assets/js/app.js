angular.module("psb", [])
  .controller("psbController", function($http, $scope) {
    $scope.items = [];

    $scope.register = function(){
      var data = {
        firstname: $scope.firstname,
        lastname: $scope.lastname,
        email: $scope.email,
        username: $scope.username,
        password: $scope.password
      }
      console.log(data);
      $http({
        method: "POST",
        url: "/registerUser",
        data: data
      }).then(function(result){
        console.log(result)
      });
    };

    $scope.login = function(){
      var data = { username: $scope.username };
      $http({
        method: "POST",
        url: "/login",
        data: data
      }).then(function(result){
        $scope.loggedIn = true;
        console.log(result);
        $scope.userId = result.data._id;
        $scope.username = result.data.username;
        $scope.balance = result.data.balance;
        // $scope.ownedItems = result.data.ownedItems;
      });
    };

    $scope.reloadBalance = function(){
      var data = {balance : Number($scope.balanceAmount) + Number($scope.balance)};
      $http({
        method: "POST",
        url: "/reloadBalance/" + $scope.userId,
        data: data
      }).then (function (result){
        $scope.balance = result.data.balance;
      });
    };


  });  