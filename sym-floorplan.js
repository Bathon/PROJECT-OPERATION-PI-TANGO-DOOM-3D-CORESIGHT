(function (CS) {
	'use strict';
	
	// Specify the symbol definition
	var customSymbolDefinition = {
		// Unique Name
		typeName: 'Floorplan',
		// Name to be displayed
		displayName: 'Floor Plan',
		// Uses multiple data sources
		dataSourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
		// Path to custom icon
		iconUrl: '/Scripts/app/editor/symbols/ext/icon.png',
		visObjectType: symbolVis,
		
		// Default symbol config
		getDefaultConfig: function () {
			return {
				// Data shape
				DataShape: 'Value',
				// Default width and height
				Height: 600,
				Width: 800,
				// Custom options TODO
				
			};
		},
		// Configuration options menu bar
		configOptions: function () {
			return [{
				// Title for right clicks
				title: 'Format Symbol',
				mode: 'format'
			}];
		},
	};
	
	// Initialization function
	function symbolVis() { }
	CS.deriveVisualizationFromBase(symbolVis);
	symbolVis.prototype.init = function(scope, elem) {
		this.onConfigChange = customConfigurationChange;
		
		// Locate the html div that will contain the symbol, using its id, which is "container" by default
		var symbolContainerElement = elem.find('#container')[0];
        // Use random functions to generate a new unique id for this symbol, to make it unique among all other custom symbols
		var newUniqueIDString = "myCustomSymbol_" + Math.random().toString(36).substr(2, 16);
		// Write that new unique ID back to overwrite the old id
		symbolContainerElement.id = newUniqueIDString;
		
		function customConfigurationChange () {
			//do stuff
		}
	}
	
	//register the symbol with coresight
	CS.symbolCatalog.register(customSmbolDefinition);
	
})(window.PIVisualization);