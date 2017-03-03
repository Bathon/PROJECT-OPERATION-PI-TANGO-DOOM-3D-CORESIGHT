(function (CS) {
    'use strict';

    function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);

	symbolVis.prototype.init = function(scope, elem) {
		this.onDataUpdate = dataUpdate;
		this.onResize = resize;
		
		function dataUpdate(data) {
			
		}
		
		function resize(width, height) {
			
		}
	}
	
    var defintion = {
        typeName: 'Floor Plan',
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
        visObjectType: symbolVis,
		iconUrl: '/Scripts/app/editor/symbols/ext/Icons/floorplan.png',
        getDefaultConfig: function() {
            return {
                DataShape: 'FloorPlan',
                Height: 600,
                Width: 800
            };
        }
    };
    CS.symbolCatalog.register(defintion);
})(window.PIVisualization);