
define(["angular"],
    function(angular) {
        return angular.module("service.currentUser", [])
            .factory("currentUserService",
            [
                "$http", "$timeout", "$q", "$window", function($http, $timeout, $q, $window) {
                    var currentUser;

                    return {
                        setCurrentUser: function(user) {
                            currentUser = user;
                        },
                        hasPermission: function(permissions, isRedirect) {
                            var flg = false;
                            for (var i = 0; i < permissions.length; i++) {
                                if (flg) {
                                    break;
                                }
                                if (currentUser.userFunction == null) {
                                    var org = document.cookie ? document.cookie.match(/\borg=([^;]+)/)[1] : null;
                                    location.href = org ? '/' + org + '/Login' : "/";
                                    var d = $q.defer();
                                    d.reject();
                                    return d.promise;
                                }
                                for (var j = 0; j < currentUser.userFunction.length; j++) {
                                    if (permissions[i] == currentUser.userFunction[j]) {
                                        flg = true;
                                        break;
                                    }
                                }
                            }
                            if (flg) {
                                return true;
                            } else {
                                if (isRedirect) {
                                    var org = document.cookie ? document.cookie.match(/\borg=([^;]+)/)[1] : null;
                                    location.href = org ? '/' + org + '/Login' : "/";
                                    var d = $q.defer();
                                    d.reject();
                                    return d.promise;
                                } else {
                                    return false;
                                }
                            }
                        },
                        getCurrentUser: function() {
                            return currentUser;
                        },
                        JudgeRedirectToLogin: function(hasPermission) {
                            var deferred = $q.defer();
                            if (hasPermission) {
                                deferred.resolve(true);
                            } else {
                                var org = document.cookie ? document.cookie.match(/\borg=([^;]+)/)[1] : null;
                                location.href = org ? '/' + org + '/Login' : "/";
                                deferred.reject(false);
                            }
                            return deferred.promise;
                        }
                    };
                }
            ])
            .constant('rolesService',
            {
                //员工
                "员工": 50000,

                //超级管理员
                "admin": 10000

            })
            //20000以后是后端报错信息
            .constant('messages',
            {
                //前端公用部分或其他
                10001: "请输入{0}！", //请输入（必填项名称）
                10002: "请选择{0}！", //请选择（必填项名称）！
                10003: "{0}最多允许输入{1}个字！", //（输入项名称）最多允许输入（字数限制数）个字！
                10004: "{0}只支持输入0或小数点后最多两位的正数！", //（输入项名称）只支持输入0或小数点后最多两位的正数！
                10005: "{0}已存在！", //（输入项名称）已存在！
                10006: "用户名已存在！",
                
                //员工相关
                25001: "用户名或密码不正确！",
                25002: "用户被禁用！",
                25003: "请输入用户名！",
                25004: "请输入密码！",
                25006: "用户名重复！",
                25007: "用户状态选择错误！",
                25008: "请输入姓名！",
                25009: "{0}在CRM中已经绑定相关数据，无法删除。如需限制登录，可将账号状态改为“离职”！",
                25010: "两次密码不一致！",
                25011: "登录失败！",
                25012: "跟进人{0}已经被删除账号，请重新选择！",
                25013: "用户权限不存在！",
                25014: "原始密码错误！",
                25015: "{0}还有正在跟进的线索，建议先处理这些线索后再离职！",
                25016: "所选部门已被删除，请重新选择！",
                25017: "存在上下级关系不成立的上级或下级，请修改后重新保存！",
                //机构
                26001: "当前登录机构不存在！",
                //角色相关
                26003: "角色不存在！",
                26004: "请输入任务名称！",
                26005: "角色已绑定用户！",
                26006: "权限不能为空！",
                26007: "角色名已存在！",
                //系统参数
                26501: "请输入类别名称！",
                26502: "类别不存在！",
                26503: "类别属性不存在！",
                //公用部分
                30004: "无操作数据！",
                310006: "所选主讲老师可能已经被删除账号，请重新选择！",
                100001: "该数据已被其他人删除，请刷新后重试！",
                100002: "该数据已被其他人反馈，请刷新后重试！",
                100003: function() { location.href = "/Home/Error"; },
                100004: "操作失败，您的登录账号可能已被删除！",
                100005: "不能删除系统数据",
                100006: "不能编辑系统数据"

            });
    });
