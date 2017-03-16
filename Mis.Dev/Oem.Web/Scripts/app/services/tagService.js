"use strict";

define([
    'angular'
], function (angular) {
    return angular.module("Tag.services", [])
        .constant('TAG_TREE_ENUM', {
            student: 2,
            task: 11,
            assignment: 23,
            course: 3,
            courseware: 4,
            employee: 5
        })
        .constant('TAG_TYPE_ENUM', {
            //type: 0(two-tier)， 1(three-tier)
            two: 0,
            three: 1
        })
        .service('tagNetService', ['TAG_TREE_ENUM', '$http', '$q', function (TAG_TREE_ENUM, $http, $q) {

            function request(labelTypeModel) {
                var queryUrl = '/LabelService/GetLabelsByTargetType?labelTypeModel=';
                var deferred = $q.defer();

                $http.get(queryUrl + labelTypeModel).success(function (result) {
                    deferred.resolve(result.data.list);
                }).error(function (reason) {
                    deferred.reject(reason);
                });

                return deferred.promise;
            }

            function requestDetail(labelTypeModel) {
                var queryUrl = '/LabelService/GetLabelsByTargetTypeDetails?labelTypeModel=';
                var deferred = $q.defer();

                $http.get(queryUrl + labelTypeModel).success(function (result) {
                    deferred.resolve(result.data.list);
                }).error(function (reason) {
                    deferred.reject(reason);
                });

                return deferred.promise;
            }

            return {
                get: function (typeEnum) {
                    return request(TAG_TREE_ENUM[typeEnum]);
                },
                getByTypeNumber: function (type) {
                    return request(type);
                },
                getDetailByTypeNumber: function (type) {
                    return requestDetail(type);
                }
            };
        }])
        .service('tagTreeService', [function () {
            function insertTagTree(list, tag) {
                if (!list) return false;

                var isInserted = false;
                _.find(list, function (item) {
                    if (insertTagTree(item.list, tag)) {
                        isInserted = true;
                        return true;
                    }

                    if (item.id === tag.ParentId) {
                        item.isLeaf = false;
                        item.list = item.list || [];
                        item.list.push({
                            id: tag.Id,
                            name: tag.LabelName,
                            pid: tag.ParentId,
                            isLeaf: true,
                            lableIndex: tag.LabelIndex
                        });
                        isInserted = true;
                        return true;
                    }
                });

                return isInserted;
            }

            function buildTagTree(tagTree, tags) {
                var isFinish = false;

                while (!isFinish) {
                    var isInserted = false;
                    // 遍历tags数组，尝试将一个tag.state == treu;的节点插入到tagTree中。
                    // 每次遍历只要有一个节点插入tagTree就跳出循环
                    // 如果本次遍历没有一个节点能插入tagTree则说明tagTree已经构建完成。
                    _.find(tags, function (tag) {
                        if (tag.state) {
                            isInserted = insertTagTree(tagTree, tag);
                            if (isInserted) {
                                tag.state = false;
                                return true;
                            }
                        }
                    });

                    if (!isInserted) {
                        isFinish = true;
                    }
                }
            }

            function sortTagTree(list) {
                if (!_.isArray(list) || list.length === 0) return;

                _.each(list, function (item) {
                    item.list = sortTagTree(item.list);
                });

                return _.sortBy(list, 'lableIndex');
            }

            return {
                getTagTree: function (tags) {
                    var tagTree = [];
                    _.each(tags, function (tag) {
                        tag.state = true;
                        if (tag.ParentId === 0) {
                            tagTree.push({
                                id: tag.Id,
                                name: tag.LabelName,
                                pid: tag.ParentId,
                                isLeaf: false,
                                lableIndex: tag.LabelIndex
                            });
                            tag.state = false;
                        }
                    });
                    buildTagTree(tagTree, tags);
                    return sortTagTree(tagTree);
                }
            };
        }])
        .service('tagTypeService', ['tagTreeService', 'TAG_TYPE_ENUM', function (tagTreeService, TAG_TYPE_ENUM) {
            return {
                getTagTreeWithType: function (tags) {
                    var tagTree = tagTreeService.getTagTree(tags);
                    _.each(tagTree, function (rootTag) {

                        var isFindThird = false;
                        _.find(rootTag.list, function (secondLevelTag) {
                            if (secondLevelTag.list && secondLevelTag.list.length > 0) {
                                isFindThird = true;
                                return true;
                            }
                        });
                        rootTag.type = isFindThird ? TAG_TYPE_ENUM.three : TAG_TYPE_ENUM.two;
                    });

                    return tagTree;
                }
            };
        }]);
});
