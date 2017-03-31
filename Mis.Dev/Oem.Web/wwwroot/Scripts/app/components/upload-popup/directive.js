'use strict';


define(['angular', 'jquery', 'services/dialogService', 'angularFileUpload', "services/net/clue"], function (angular, $) {
    angular.module('components.uploadPopup', ["Dialog.services", "angularFileUpload", "service.net.clue"])
        .directive('uploadPopup', [
            "$rootScope", "$timeout", "$http", "gintDialog", "FileUploader", "messages", "clueNetService", "currentUserService", "rolesService", function ($rootScope, $timeout, $http, gintDialog, FileUploader, messages, clueNetService, currentUserService, rolesService) {
                return {
                    restrict: 'E',
                    templateUrl: 'components/upload-popup/template.html',
                    replace: true,
                    scope: {
                        uploadConfig: '=',
                        cancelAction: '&',
                        confirmAction: '&',
                    },
                    link: function ($scope, $element, $attrs) {


                        $scope.deleteFile = function (idx) {
                            $scope.model.TemporaryContent.pictureList.splice(idx, 1);
                        };

                        //模板文件
                        $scope.downloadXlsUrl = "";
                        $scope.showFileDialog = function () {
                            $("#addFile").click();
                        };
                        //上传操作，angular Uploader
                        var uploader = $scope.uploader = new FileUploader();
                        var patt = new RegExp($scope.uploadConfig.uploadFormat);
                        uploader.filters.push({
                            name: 'formatFilter',
                            fn: function (item /*{File|FileLikeObject}*/, options) {
                                return (patt.test(item.name.substr(item.name.lastIndexOf('.')).toLowerCase()));
                            }
                        });
                        uploader.filters.push({
                            name: 'sizeFilter',
                            fn: function (item) {
                                return (item.size < $scope.uploadConfig.uploadFiles.allowedFilesSize * 1024 * 1024);
                            }
                        });
                        //uploader.filters.push({
                        //    name: 'fileNameFilter',
                        //    fn: function (item) {
                        //        return (item.name.substr(0,item.name.lastIndexOf('.')) < $scope.uploadConfig.uploadFiles.allowedFileNameLengthLimit);
                        //    }
                        //});
                        uploader.onWhenAddingFileFailed = function (item, filter) {
                            if (filter.name == "formatFilter") {
                                gintDialog.error($scope.uploadConfig.formatErrorMsg);
                            } else if (filter.name == "sizeFilter") {
                                gintDialog.error($scope.uploadConfig.sizeErrorMsg);
                            }
                            //else if (filter.name == "fileNameFilter") {
                            //    gintDialog.error($scope.uploadConfig.fileNameLengthErrorMsg);
                            //}
                        }
                        uploader.url = $scope.uploadConfig.uploadUrl;
                        uploader.onAfterAddingFile = function (fileItem) {         //文件添加到队列后
                            $scope.uploadConfig.uploadFiles.files.push({
                                fileName: fileItem.file.name,
                                fileUrl: "",
                                isConfirmed: false
                            });
                            fileItem.onBeforeUpload = function () {              //文件上传之前
                                console.log("onBeforeUpload");
                              
                            }
                            fileItem.upload();
                            fileItem.onProgress = function (progress) {       //文件上传中
                                console.log(progress);
                            }
                            fileItem.onSuccess = function (response, status, headers) {       //上传成功
                                console.log("onSuccess");
                                $scope.uploadConfig.uploadFiles.files[$scope.uploadConfig.uploadFiles.files.length - 1].fileUrl = response.data.url; 
                            }
                            fileItem.onError = function (response, status, headers) {
                                gintDialog.error("文件上传出错");
                                $scope.uploadConfig.uploadFiles.files.pop();
                            }
                            fileItem.onComplete = function (response, status, headers) {
                                console.log("onSuccess");
                            }
                        };
                        uploader.onCompleteAll = function () {

                        };
                        $scope.showFileDialog = function () {
                            $("#addFile").click();
                        }
                        //删除文件
                        $scope.deleteFile = function (index) {
                            $scope.uploadConfig.uploadFiles.files.splice(index, 1)
                        }
                        //取消按钮
                        $scope.dgCancel = function () {
                            $scope.cancelAction();
                        }
                        //确认按钮
                        $scope.dgConfirm = function () {
                            $scope.confirmAction();
                        }
                    }
                };
            }
        ]);
});
