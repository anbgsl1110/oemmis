"use strict";

define([
    'angular',
    'services/commonService'
], function (angular) {
    return angular.module("components.nav.services", ['Common.services'])
        .service('navNetService', ['httpRequestWapper', 'singleHttpFactory', function (httpRequestWapper, singleHttpFactory) {
            return {
                uploadUserHead: singleHttpFactory.post('/api/UserApi/UpdateUserHeadImgUrl'),
                changePassword: singleHttpFactory.post('/api/UserApi/UpdateUserPwd'),
                logout: singleHttpFactory.get('/api/UserApi//Logout'),
                openSite: singleHttpFactory.post('/api/UserApi//RedirectToCourse')
            };
        }])
        .factory('navValidator', ['$q', 'hasSpace', function ($q, hasSpace) {
            return {
                password: function (oldPwd, newPwd, comparePwd) {
                    var deferred = $q.defer();

                    var olength = oldPwd.length;
                    var nlength = newPwd.length;
                    var clength = comparePwd.length;

                    if (hasSpace(newPwd)) {
                        deferred.reject('密码不能包含空格字符！');
                    }

                    if (olength === 0) {
                        deferred.reject('原密码不能为空！');
                    }

                    if (nlength === 0) {
                        deferred.reject('新密码不能为空！');
                    }

                    if (clength === 0) {
                        deferred.reject('确认密码不能为空！');
                    }

                    if (nlength > 16 || nlength < 6) {
                        deferred.reject('新密码最少6位，最多16位！');
                    }

                    if (newPwd !== comparePwd) {
                        deferred.reject('两次输入的密码不同，请重新输入！');
                    }

                    deferred.resolve({
                        oldPwd: oldPwd,
                        newPwd: newPwd,
                        comparePwd: comparePwd
                    });

                    return deferred.promise;
                }
            };
        }]);
});
