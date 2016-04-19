app.controller('HomeController',['$scope', '$http', 'fileUpload', function($scope, $http, fileUpload) {
  	$scope.message = "";
    $scope.uploadFile = function(){
    	console.log("Uploading files");
        $scope.message = "Uploading...";
        var file = $scope.myFile;
        if(!file){
        	$scope.message = "Please choose a file"
        }        
        var label = $scope.label;
        if(!label){
        	$scope.message = "Please Input a Label"
        }           
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "/api/modules/image";
        if(file && label){
        fileUpload.uploadFileToUrl(file, label, uploadUrl);
    	}
    };

    $scope.$on('image:posted', function(e, msg){
    	$scope.message = msg.message;
    });

    $scope.$on('image:failed', function(e, msg){
    	$scope.message = msg.message;
    });

}]);


