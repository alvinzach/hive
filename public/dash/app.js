(function() {
    var app = angular.module('hive', ['ui.router']);
    app.controller('dashboardcontroller',['$http','$scope','$state',function ($http,$scope,$state) {
        $scope.init=function(id){
            var request={
                id:id
            }
            console.log(request);

            $http.post('api/dashboard/userdetails',request).then(
                function successCallback(response){
                    $scope.username=response.data.name;
                    $scope.followers=response.data.followers.length;
                    $scope.following=response.data.following.length;
                    $scope.campaigns=response.data.campaigns.length;
            },
           function  errorCallback(response){
                    console.log("bad day");
            }
            );
        };
        $scope.logout=function(){
            var request={
                logout:true
            }
            $http.post('api/dashboard/logout',request).then(
                function successCallback(response){
                    window.location='/';

                },
                function  errorCallback(response){
                    console.log("bad day");
                }
            );
        };
        $scope.createbuzz=function () {
               $scope.error=false;
               $scope.success=false;
               $http.post('api/buzz/createbuzz',$scope.buzz).then(
                   function successCallback(response){
                       if(response.data.error)
                           $scope.error=true;
                       else
                           $scope.success=true;
                           console.log(response.data.message);
                           $scope.message=response.data.message;
                   },
                   function errorCallback(response) {
                     console.log("bad day");
                   }
               )
        };
        $scope.handlentry=function(){
            var request={
                handle:$scope.buzz.handle
            }
            $scope.buzzerror=false;
            $scope.buzzsuccess=false;
            $http.post('api/buzz/checkhandle',request).then(
                function successCallback(response){
                    if(response.data.error)
                        $scope.buzzerror=true;
                    else
                        $scope.buzzsuccess=true;
                        console.log(response.data.message);
                        $scope.buzzmessage=response.data.message;
                },
                function errorCallback(response) {
                    console.log('bad day');
                }
            );
        }
    }])

}())