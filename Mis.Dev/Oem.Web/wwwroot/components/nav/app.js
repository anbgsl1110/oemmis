/**
 * Created by CaiFeng on 2015/3/3 0003.
 */

'use strict';

define([
    'angular',
    'components/nav/directives',
    'components/nav/service',
    'components/nav/filter',
    'components/nav/directives/profile-edit/directive',
    'uiRouter'
], function (angular, directive, filter) {
    angular.module('components.nav', [
            'components.nav.directive',
            'components.nav.filter',
            'components.nav.services',
            'components.nav.directive.profile',
            'ui.router'
        ])
        //建议自定义共用组件都增加版本号
        .value('version', '0.1');
});
