sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'test1/test/integration/FirstJourney',
		'test1/test/integration/pages/ZLL_C_TEST1List',
		'test1/test/integration/pages/ZLL_C_TEST1ObjectPage'
    ],
    function(JourneyRunner, opaJourney, ZLL_C_TEST1List, ZLL_C_TEST1ObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('test1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheZLL_C_TEST1List: ZLL_C_TEST1List,
					onTheZLL_C_TEST1ObjectPage: ZLL_C_TEST1ObjectPage
                }
            },
            opaJourney.run
        );
    }
);