sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'test1',
            componentId: 'ZLL_C_TEST1List',
            contextPath: '/ZLL_C_TEST1'
        },
        CustomPageDefinitions
    );
});