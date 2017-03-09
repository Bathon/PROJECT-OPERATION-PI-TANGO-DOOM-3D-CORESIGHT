// Setup symbol
(function (CS) {
    function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);
	
	
	
	symbolVis.prototype.init = function (scope) {
		
		// Parse image for red pixels (waypoints) and setup elements to hold the associated data
		var img = document.getElementById('map_container');
		img.onload = loadImage;
		
		// Change the settings pane depending on the waypoint selected
		//document.getElementById("waypoint_selection").onchange = selectWaypoint;
		
		// Update the data as necessary
		this.onDataUpdate = dataUpdate;
		
        function dataUpdate(data) {
			// If there is new data to update
			if(data) {
				
				console.log('Array length: '.concat(data.Data[0].Values.length));
				
				// Multiple data source code
				var i;
				var dataItems = [];
				
				if(scope.dataItems) {
					dataItems = scope.dataItems;
				}
				
				for( i = 0; i < data.Data.length; i++) {
					if(data.Data[i].Label && !(dataItems[i].label)) {
						//If there is a new label, make a new object and put it in the array
						console.log('New data point label: '.concat(data.Data[i].Label));
						console.log('New data point value: '.concat(data.Data[i].Value));
						var dataItem = {label:data.Data[i].Label, value:data.Data[i].Value};
						dataItems.push(dataItem);
					} else {
						//Otherwise, update the value in our old array
						console.log('Updated data point value: '.concat(data.Data[i].Value));
						dataItems[i].value = data.Data[i].Value;
					}
					
				}
				
				scope.dataItems = dataItems;
				
            }
        }
		
		function loadImage() {
			// Setup offsets
			var VERTICAL_OFFSET = -29;
			var HORIZONTAL_OFFSET = 0;
			
			// Setup variables to hold image, canvas, etc.
			var x;
			var y;
			var index;
			var found_pixels = [];
			var canvas = document.getElementById('modified_map_container');
			canvas.width = img.width;
			canvas.height = img.height;
			var context = canvas.getContext('2d');
			context.drawImage(img, 0, 0);
			var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			
			
			// Search for red pixels
			for( x = 0; x < canvas.width; x++ ) {
				for( y = 0; y < canvas.height; y++ ) {
					index = (( y * canvas.width ) + x) * 4;
					if(imageData.data[index] == 254 && imageData.data[index + 1] == 0 && imageData.data[index + 2] == 0) {
						// Add the coordinates to the array
						found_pixels.push(x);
						found_pixels.push(y);
						
						// Log the discovery
						console.log('Point found at x: '.concat(x.toString()));
						console.log('Point found at y: '.concat(y.toString()));
						
					}
				}
			}
			
			// Set up objects at found pixel locations
			var i;
			var hoverItems = [];
			for ( i = 0; i < found_pixels.length; i += 2) {
				var hoverItem = {x:((found_pixels[i] / 4) + HORIZONTAL_OFFSET).toString().concat('px'), y:((found_pixels[i + 1] / 4) + VERTICAL_OFFSET).toString().concat('px'), id:(i / 2)};
				hoverItems.push(hoverItem);
			}
			
			scope.hoverItems = hoverItems;
			
			// Draw the image to the canvas
			context.putImageData(imageData, 0, 0);
			
			// Hide the upload pane now that we're done with it
			scope.upload_hidden = "_hidden";
		}
		
		
		// TODO: angular $compile
    };

    var definition = {
		// Name for files
        typeName: 'floorplan',
		// Name to display
		displayName: 'Floor Plan',
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
        visObjectType: symbolVis,
		// Load the icon
		iconUrl: '/Scripts/app/editor/symbols/ext/Icons/floorplan.png',
		// Don't want to resize, but there's no option for 'none'
		resizerMode: 'AutoWidth',
        getDefaultConfig: function() {
    	    return {
    	        DataShape: 'TimeSeries',
				DataQueryMode: CS.Extensibility.Enums.DataQueryMode.ModeSingleton,
				// Default size
				Height: 720,
				Width: 1172
            };
        },
		configOptions: function (context, clickedElement) {
            return [{
				// Add a title that will appear when the user right-clicks a symbol
				title: 'Format Symbol',
				// Define what the configuration does
				action: function(context) {
					loadSettings(context);
				}/*
			}, {
				title: 'Select Image',
				action: function(context) {
					console.log('Image changing option selected.');
				}*/
            }];
        },
		//configOptions: function() {
		//	return [{
		//		title: 'Format Symbol'
		//		//'seperator'
		//		//title: 'Hide',
		//		action: function (context) {
		//			console.log("Hide action preformed.");
		//			//context.def.configure.hide(context.symbol);
		//		}
		//	}];
		//},
    };

    CS.symbolCatalog.register(definition);
})(window.PIVisualization);


// Upload an image file for the symbol to process
function loadFile() {
	var image_element = document.getElementById('map_container');
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();
	
	reader.onloadend = function() {
		image_element.src = reader.result;
	}
	
	if(file) {
		reader.readAsDataURL(file);
	} else {
		image_element.src = "";
	}
}

// Modify the settings pane on load to dynamically create settings for each waypoint
function loadSettings(context) {
	console.log('Action used, hiding symbol.');
}	