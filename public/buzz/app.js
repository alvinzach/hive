/**
 * Created by Alvin on 3/31/2017.
 */
(function() {
    var app = angular.module('hive', ['ui.router']);
    app.controller('buzzcontroller',['$http','$scope','$state',function ($http,$scope,$state) {
        $scope.init=function(id){
            var request={
                id:id
            }
            console.log(request);
            if(id==='stranger'){
                $scope.user=false;
                $scope.stranger=true;
            }
            else{
                $scope.user=true;
                $scope.stranger=false;
            $http.post('../api/dashboard/userdetails',request).then(
                function successCallback(response){
                    $scope.username=response.data.name;
                    $scope.followers=response.data.followers.length;
                    $scope.following=response.data.following.length;
                    $scope.campaigns=response.data.campaigns.length;
                },
                function  errorCallback(response){
                    console.log("bad day");
                }
            ); }
        };
        $scope.logout=function(){
            var request={
                logout:true
            }
            $http.post('../api/dashboard/logout',request).then(
                function successCallback(response){
                    window.location='/';

                },
                function  errorCallback(response){
                    console.log("bad day");
                }
            );
        };
        $scope.getdetails=function(id){
            var request={
                handle:id
            };
            $http.post('../api/buzz/getdetails',request).then(
                function successCallback(response){
                    $scope.title=response.data.title;
                    $scope.description=response.data.description;
                    $scope.fors=response.data.fors;
                    $scope.against=response.data.against;
                    $scope.comments=response.data.comments;
                    console.log($scope.comments);

                }
            );
        }
        $scope.postcomment=function(id){
            var request={
                username:$scope.username,
                handle:id,
                comment:$scope.buzzit.comment,
                stand:$scope.buzzit.opinion

            }
            $http.post('../api/buzz/comment',request).then(function successCallback(response) {
                 $scope.buzzit.comment=" ";
            },function errorCallback(response) {
                console.log('bad day');
            });
        };

    }])


}())