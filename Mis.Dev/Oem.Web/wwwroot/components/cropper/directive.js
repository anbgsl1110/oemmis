/**
 * Created by sue on 2015/3/31. 公用图片裁剪
 */

define(['angular', 'cropper', 'services/net/employee', 'services/bounced'], function(angular) {
    angular.module('Components.cropper', ['services.net.employee', 'Bounced.services'])
        .directive("croperPhoto", [
            '$compile', 'employeeNetService', '$parse', '$timeout', 'gintDialog', function($compile, employeeNetService, $parse, $timeout, gintDialog) {
                return {
                    restrict: 'EA',
                    templateUrl: 'components/cropper/template.html',
                    scope: {
                        imageUrl: '=',
                        jsonImageData: "="
                    },
                    link: function($scope, iElement, iAttr) {


                        var $image = iElement.find('#_cropper-container > img');
                        var $inputImage = iElement.find('#fileInput');
                        //暂时赋值，有值之后删除。
                        if ($scope.imageUrl == "") {
                            $scope.imageUrl = 'http://cdn.1course.cn/GY/Image/20150408181545-46f7d.jpg';
                        }

                        //设置图片
                        $image.attr('src', $scope.imageUrl); 
                        console.log();
                        $image.cropper({
                            aspectRatio: 1 / 1,
                            preview: '.account-head-pic',
                            checkImageOrigin:false,
                            crop: function (data) {
                                //获取截取图片的参数 // string url, int x, int y, int width, int height
                                // $dataX.val(Math.round(data.x));
                                // $dataY.val(Math.round(data.y));
                                // $dataHeight.val(Math.round(data.height));
                                // $dataWidth.val(Math.round(data.width));
                                // $dataRotate.val(Math.round(data.rotate));
                                //fix bug Error: $digest already in progress by xp 2015年5月18日 15:36:30
                                if (!$scope.$root.$$phase) {
                                    $scope.$apply(function() {
                                        $scope.jsonImageData = {
                                            url: $scope.imageUrl,
                                            x: Math.round(data.x),
                                            y: Math.round(data.y),
                                            width: Math.round(data.width),
                                            height: Math.round(data.height)
                                        };
                                    });
                                }

                            },
                            built: function () {
//                                $image.cropper("zoom", -0.5);
                            }
                        });


                        $inputImage.change(function() {
                            var file = this.files[0];

                            //格式限制 image/bmp, image/jpg, image/jpeg,image/png
                            if (file.type != "image/bmp" && file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/png") {
                                gintDialog.error("图片文件格式不支持，请选择bmp、jpeg、jpg、png格式！",1);
                                return;
                            }

                            // 做大小限制 图片文件不能超过4M
                            if (file.size > 4194304) {
                                gintDialog.error("图片文件大小超过4M!",1);
                                return;
                            }

                            //上传图片
                            employeeNetService.uploadImage(file).then(function(result) {
        
                                    $scope.imageUrl = result.data.data;



                            }, function() {
                                gintDialog.error("网络异常，上传失败",1);

                            });

                            $inputImage.val('');

                        });


                        //点击按钮【更新头像】 触发原生file click
                        $scope.changeImage = function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                            $inputImage.click();
                        };


                        //每次图片值改变生成新的cropper实例
                        $scope.$watch('imageUrl', function (nv, ov) {
                            if (nv!==ov) {
                                $image.cropper('replace', nv);
                            }

                        });

                    }
                };
            }
        ]);
});