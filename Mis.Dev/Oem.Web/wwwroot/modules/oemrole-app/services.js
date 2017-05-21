/**
 * author :zy
 * time: 2016年7月14日17:32:55
 * description: 1course角色设置 控制器
 */




define(["angular", 'services/net/oemrole', 'modules/oemrole-app/oemroledatamapservices'], function (angular) {
    return angular.module('CrmRoleApp.services', ['services.net.crmrole', 'CrmRoleDataMap.services'])
        .factory('oemRoleService', ['$q', 'crmRoleNetService', 'modelService', 'oemRoleDataMapService',
            function ($q, crmRoleNetService, modelService, crmRoleDataMapService) {
                var crmRoleService = {};
                crmRoleService.model = {};//存储后端的model，用于校验uimodel是否经过修改
                crmRoleService.uiModel = {};

                crmRoleService.getRoleList = function (queryCondition) {
                    return crmRoleNetService.getRoleList(queryCondition)
                };


                var uiModelToModel = function (uiModel) {
                    var model = {};
                    model.name = uiModel.getName();
                    model.id = uiModel.getId();
                    //"RoleGrade": 1,
                    model.functionList = [];
                    var uiFunctionList = uiModel.getFunctionList();
                    for (var i = 0; i < uiFunctionList.length; i++) {
                        var sysFunctionModel = new modelService.SysFunctionModel(uiFunctionList[i])
                        model.functionList.push(sysFunctionModel);
                    }
                    return model;
                };


                var modelToUiModel = function (model) {
                    var uiModel = new modelService.RoleModel();
                    uiModel.setId(model.id);
                    uiModel.setName(model.name);

                    //初始化 uiModel.functionList；
                    for (var i = 0; i < model.functionList.length; i++) {
                        var functionModel = new modelService.FunctionModel({ id: model.functionList[i].funcId, isRight: model.functionList[i].isRight, name: crmRoleDataMapService.functionNameConfig[model.functionList[i].funcId] });
                        uiModel.functionList.push(functionModel);
                    }

                    for (var i = 0; i < crmRoleDataMapService.functionRelation[0].length; i++) {
                        if (uiModel.getFunctionByFunId(crmRoleDataMapService.functionRelation[0][i])) {
                            var functionModel = uiModel.getFunctionByFunId(crmRoleDataMapService.functionRelation[0][i])
                            uiModel.functionGroupList.push(functionModel);
                            functionModel.setDescription(crmRoleDataMapService.descriptionRelation[functionModel.getId()]);//一级权限添加描述

                        }
                    }
                    var functionList = uiModel.getFunctionList();
                    //查权限关系表，通过functionmodel的children[]
                    for (var i = 0; i < functionList.length; i++) {
                        //父子关系
                        if (crmRoleDataMapService.functionRelation[functionList[i].id]) {
                            var childrenList = crmRoleDataMapService.functionRelation[functionList[i].id];
                            for (var s = 0; s < childrenList.length; s++) {
                                if (uiModel.getFunctionByFunId(childrenList[s])) {
                                    functionList[i].children.push(uiModel.getFunctionByFunId(childrenList[s]));
                                }
                            }
                        }
                        //爷孙关系
                        if (crmRoleDataMapService.functionRelation2[functionList[i].id]) {
                            var grandsonList = crmRoleDataMapService.functionRelation2[functionList[i].id];
                            for (var s = 0; s < grandsonList.length; s++) {
                                if (uiModel.getFunctionByFunId(grandsonList[s])) {
                                    functionList[i].threeFuctionList.push(uiModel.getFunctionByFunId(grandsonList[s]));
                                }
                            }

                        }
                        functionList[i].description = crmRoleDataMapService.descriptionRelation[functionList[i].id];           //加权限描述

                    }
                    return uiModel;
                };
                crmRoleService.updataModelByUiModel = function () {
                    crmRoleService.model = uiModelToModel(crmRoleService.uiModel);

                };


                crmRoleService.getRoleById = function (id) {
                    return crmRoleNetService.getRoleById(id).then(function (model) {
                        var d = $q.defer();
                        if (model.data.data) {
                            model = model.data.data;
                        }
                        else {
                            model = {//后端拒绝给，我只能自己写咯,后来人请注意
                                "functionList": [
                                    {
                                        "funcId": 50100,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50101,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50102,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50103,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50104,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50105,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50106,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50107,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50200,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50201,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50202,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50203,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50204,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50205,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50300,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50302,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50303,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50304,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50305,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50306,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50307,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50308,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50308,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50309,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50310,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50311,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50312,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50313,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50400,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50402,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50403,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50404,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50405,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50500,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50501,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50502,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50600,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50601,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50602,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50603,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50604,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50700,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50701,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50702,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50703,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50704,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50705,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50800,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50801,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50802,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 50803,
                                        "isRight": false
                                    },
                                    {
                                        "funcId": 40000,
                                        "isRight": false
                                    }
                                ],
                                "id": 0,
                                "name": ""
                            };
                        }
                        crmRoleService.model = model;
                        var uiModel = modelToUiModel(model);
                        crmRoleService.uiModel = uiModel;
                        d.resolve(uiModel);
                        return d.promise;

                    }, function (errMessage) {
                        var d = $q.defer();
                        d.reject(errMessage);
                        return d.promise;

                    })
                };

                crmRoleService.editRole = function (uiModel) {
                    var d = $q.defer();
                    var model = uiModelToModel(uiModel);
                    crmRoleNetService.editRole(model).then(function (result) {
                        crmRoleService.updataModelByUiModel();
                        d.resolve(result);
                    }, function (message) {
                        d.reject(message);
                    })
                    return d.promise;

                };
                crmRoleService.deleteRoleById = function (roleId) {

                    return crmRoleNetService.deleteRoleById(roleId)

                };
                crmRoleService.getRoles = function () {

                    return crmRoleNetService.getRoles()

                };
                crmRoleService.getUiModelIsHaveChanage = function () {

                    var model = crmRoleService.model;
                    var uiModel = crmRoleService.uiModel;

                    //新建状态无编辑提示
                    //if (uiModel.id === 0) {
                    //    baseService.getParams().inEditingDector.message = "是否放弃添加？";
                    //    return true;
                    //}
                    //
                    //
                    //baseService.getParams().inEditingDector.message = "是否放弃修改？";


                    //新建状态无编辑不做提示
                    //z                baseService.getParams().inEditingDector.message = uiModel.id === 0 ? "是否放弃添加？" : "是否放弃修改？";

                    if (uiModel.getName() !== model.name) {
                        return true;
                    }

                    for (var i = 0; i < model.functionList.length; i++) {
                        if (model.functionList[i].isRight !== uiModel.functionList[i].getIsRight()) {
                            return true;
                        }
                    }
                    return false;
                };
                crmRoleService.addEmployeeByRole = function (EmployeeInfo) {
                    return crmRoleNetService.addEmployeeByRole(EmployeeInfo)

                };

                return crmRoleService;
            }])


        .factory("modelService", [
            function () {
                var modelService = {};
                modelService.RoleModel = function () {
                    this.id = '';
                    this.name = '';
                    this.functionGroupList = [];
                    this.functionList = [];
                    this.setId = function (id) {
                        this.id = id;
                    }
                    this.setName = function (name) {
                        this.name = name;
                    }
                    this.setFunctionList = function (functionList) {
                        this.functionList = functionList;
                    };

                    this.getId = function () {
                        return this.id;
                    };
                    this.getName = function () {
                        return this.name;
                    };
                    this.getFunctionList = function () {
                        return this.functionList;
                    };

                    this.getFunctionByFunId = function (id) {
                        var funModel = '';
                        for (var i = 0; i < this.functionList.length; i++) {
                            if (id == this.functionList[i].id) {
                                funModel = this.functionList[i];
                                break;
                            }
                        }
                        return funModel;
                    };
                    this.getFunctionListIsHaveRight = function () {
                        var isHave = false;
                        for (var i = 0; i < this.functionList.length; i++) {
                            if (this.functionList[i].getIsRight()) {
                                isHave = true;
                                break;
                            }
                        }
                        return isHave;

                    }

                };
                modelService.FunctionModel = function (model) {
                    this.id = model.id || '';
                    this.name = model.name || '';
                    this.isRight = model.isRight || false;
                    this.description = '';
                    this.children = [];//FunctionModel
                    this.threeFuctionList = [];

                    this.setDescription = function (description) {
                        this.description = description;
                    };
                    this.setIsRight = function (isRight) {
                        this.isRight = isRight;
                    };

                    this.setAllChildrenIsRight = function (isRight) {
                        for (var i = 0; i < this.children.length; i++) {

                            this.children[i].setIsRight(isRight);
                            this.children[i].setAllChildrenIsRight(isRight);
                        }
                    };
                    this.setAllThreeFunIsRight = function (isRight) {
                        for (var i = 0; i < this.threeFuctionList.length; i++) {
                            this.threeFuctionList[i].setIsRight(isRight);
                            this.threeFuctionList[i].setAllChildrenIsRight(isRight);
                        }
                    };
                    this.getId = function () {
                        return this.id;
                    };
                    this.getIsRight = function () {
                        return this.isRight;
                    };
                    this.getChilderIsHaveRight = function () {
                        if (!this.children.length) {
                            return -1
                        }
                        for (var i = 0; i < this.children.length; i++) {
                            if (this.children[i].getIsRight()) {
                                return true;
                            }
                        }
                        return false;

                    };
                    this.getThreeFunctionListHaveRight = function () {
                        if (!this.threeFuctionList.length) {
                            return -1
                        }
                        for (var i = 0; i < this.threeFuctionList.length; i++) {
                            if (this.threeFuctionList[i].getIsRight()) {
                                return true;
                            }
                        }
                        return false;

                    }
                };
                //后端model
                modelService.SysRoleModel = function () {

                };

                modelService.SysFunctionModel = function (uiFunModel) {
                    this.funcId = uiFunModel.id;
                    this.isRight = uiFunModel.isRight;
                };

                return modelService;
            }])
        //快速添加员工，用户校验service
        .factory("verifyEmployeeService", ['$q', function ($q) {
            var verifyEmployeeService = {};
            verifyEmployeeService.verifyEmployeeInfo = function (EmployeeInfo) {
                var result = {};
                result.status = true;
                result.message = '';

                //LoginName: $scope.quickAdditions.LoginName,
                //    name: $scope.quickAdditions.name,
                //    Password: $scope.quickAdditions.Password,
                //                分支流程b
                //                2b1.用户名未输入，系统提示文案：“请输入用户名！”
                //2b2.姓名未输入，系统提示文案：“请输入姓名！”
                //2b3.密码未输入，系统提示文案：“请输入密码！”
                //2b4.用户名已存在，系统提示文案：“用户名已存在！”
                //输入项
                //                用户名：最少1个字，最多32个字，系统提示文案：”用户名最少1个字，最多32个字！“
                //姓名：最少2个字，最多8个字，系统提示文案：”姓名最少2个字，最多8个字！“
                //密码：最少6位，最多16位，系统提示文案：“密码最少6位，最多16位！”
                //头像：默认头像，快速添加时禁止修改
                //                级别：默认普通，快速添加时禁止修改
                if (EmployeeInfo.LoginName == '') {
                    result.status = false;
                    result.message = '请输入用户名！';
                } else if (EmployeeInfo.Name == '') {
                    result.status = false;
                    result.message = '请输入姓名！';
                }
                else if (EmployeeInfo.Password == '') {
                    result.status = false;
                    result.message = '请输入密码！';
                } else if (EmployeeInfo.LoginName.length > 32) {
                    result.status = false;
                    result.message = '用户名最少1个字，最多32个字！';
                } else if (EmployeeInfo.Name.length > 100 || EmployeeInfo.Name.length < 2) {
                    result.status = false;
                    result.message = '姓名最少2个字，最多100个字！';
                } else if (EmployeeInfo.Password.length < 6 || EmployeeInfo.Password.length > 16) {
                    result.status = false;
                    result.message = '密码最少6位，最多16位！';
                }
                return result
            };

            return verifyEmployeeService;

        }])
});