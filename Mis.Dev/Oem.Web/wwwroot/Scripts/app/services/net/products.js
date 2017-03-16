/**
 * author:shaobo.wang
 * date:2016.10.18
 * description:产品库获取数据接口定义
 */
define(['angular', 'services/net/common'], function (angular) {
    return angular.module('services.net.products', ['services.net.common'])
        .service('productsNetService', ['$http', '$q', 'commonNetService', function (http, q, commonNetService) {

            //获取产品类别
            this.getProductsType = function () {
                return http.get('/api/SystypeApi/GetProductSystypes');
            };
            //获取产品详情
            this.getProductDetail = function (obj) {
                return http.get('/api/ProductApi/GetProductDetail', { params: obj });
            };
            //新建/编辑时选择校区弹窗
            this.getSchool = function () {
                return function (params) {
                    var filter = {
                        key: params.search,
                        page: {
                            pageIndex: params.page,
                            pageSize: 20
                        }
                    };
                    return http.post('/api/OrgApi/GetCRMSchoolListByUserId', filter);
                }
            };
            //保存产品
            this.saveProduct = function (params) {
                return http.post('/api/ProductApi/SaveProduct', params);
            };
            //删除产品
            this.deleteProducts = function (params) {
                return http.post('/api/ProductApi/BatchDeleteProduct', params);
            };
            //上/下架
            this.changeStatus = function (params) {
                return http.post('/api/ProductApi/BatchUpdateProductState', params);
            };
            //获取产品详情处统计信息
            this.getProductStatistics = function (params) {
                return http.post('/api/ProductApi/GetProductStatic', params);
            }
            //校验产品是否存在
            this.checkProductIsDel = function (obj) {
                return http.get('/api/ProductApi/GetProductIsDel', { params: obj });
            }
        }]);
});