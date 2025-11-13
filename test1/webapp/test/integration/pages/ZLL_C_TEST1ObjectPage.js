sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'test1',
            componentId: 'ZLL_C_TEST1ObjectPage',
            contextPath: '/ZLL_C_TEST1'
        },
        CustomPageDefinitions
    );
});