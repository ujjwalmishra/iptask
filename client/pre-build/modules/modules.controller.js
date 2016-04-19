app.controller('ModulesController',['$scope','fileGet', function($scope, fileGet) {
  
  $scope.imagesFiltered = [];
  $scope.currentPage = 1;
  $scope.numPerPage = 8;
  $scope.maxSize = 5;
  $scope.images = []; 
  $scope.totalItem = 0;
  $scope.count = 0;

  $scope.$on('counted', function(e, count){
    $scope.totalItem = count;
  })

  fileGet.getImgCount(function(images){
      $scope.count++;
      if($scope.count < 9){
        $scope.imagesFiltered.push(images);
      }
      $scope.images.push(images); 
  });

  $scope.$watch('currentPage + numPerPage', function() {
     var begin = (($scope.currentPage - 1) * $scope.numPerPage);
     var  end = begin + $scope.numPerPage;
    
    $scope.imagesFiltered = $scope.images.slice(begin, end);
  });

}]);
