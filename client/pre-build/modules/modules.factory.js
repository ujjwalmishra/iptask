app.service('fileUpload', ['$http','$rootScope', function ($http, $rootScope) {
    this.uploadFileToUrl = function(file, label, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        fd.append('label', label);
        console.log('loading file' + label);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(msg){
        	$rootScope.$broadcast('image:posted',msg);
        })
        .error(function(msg){
        	$rootScope.$broadcast('image:failed',msg);
        });
    }
}]).service('fileGet', ['$http', '$rootScope', function($http, $rootScope){
	this.getImgCount = function(cb){
		$http({
			method: 'GET',
			url: '/api/modules/images/count'
		}).success(function(n){
			var count = 0;
			var totImg = n.count;
			$rootScope.$broadcast('counted', n.count);
			if(totImg > 0){
				getImages(cb);
			}
		  function getImages(cb){	
			$http({
				  method: 'GET',
				  url: '/api/modules/images',
				  params: {"limit": count}
			 	  }).success(function(data){
		        // With the data succesfully returned, call our callback
		        	count++;
		        	cb(data);
		        	if(count < totImg){
		        		getImages(cb)
		        	}
				   }).error(function(){
			        alert("error");
			   });
			}

		}).error(function(err){
			console.log(err);
		});
	}


	
}]);