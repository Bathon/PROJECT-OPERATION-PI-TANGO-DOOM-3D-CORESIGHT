(function (CS) {
    function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);

	symbolVis.prototype.init = function (scope) {
		// Setup offsets
		var VERTICAL_OFFSET = -43;
		var HORIZONTAL_OFFSET = 0;
		
		// Setup arrays to hold stuff
		
		// Parse image for red pixels (waypoints) and setup elements to hold the associated data
		var img = document.getElementById('map_container');
		img.onload = loadImage;
		
		// Change the settings pane depending on the waypoint selected
		//document.getElementById("waypoint_selection").onchange = selectWaypoint;
		
		// Update the data as necessary
		this.onDataUpdate = dataUpdate;
		
		document.getElementsByClassName("hover_objects").onclick = selectWaypoint;
		
        function dataUpdate(data) {
            if(data) {
				// Multiple data source code
				
				
				// Original 1 data source code
				
                scope.value = data.Value;
                scope.time = data.Time;
                if(data.Label) {
                    scope.label = data.Label;
                }
				
            }
        }
		
		function loadImage() {
			
			// Setup variables to hold image and canvas
			var canvas = document.getElementById('modified_map_container');
			canvas.width = img.width;
			canvas.height = img.height;
			var context = canvas.getContext('2d');
			context.drawImage(img, 0, 0);
			var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			
			// Search for red pixels
			var x;
			var y;
			var index;
			var found_pixels = [];
			
			for( x = 0; x < canvas.width; x++ ) {
				for( y = 0; y < canvas.height; y++ ) {
					index = (( y * canvas.width ) + x) * 4;
					if(imageData.data[index] == 254 && imageData.data[index + 1] == 0 && imageData.data[index + 2] == 0) {
						// Add the coordinates to the array
						found_pixels.push(x);
						found_pixels.push(y);
					}
				}
			}
			
			// Set up objects at found pixel locations
			var i;
			for ( i = 0; i < found_pixels.length; i += 2) {
				// Create new div elements
				var newDiv = document.createElement('div');
				var newLabelDiv = document.createElement('div');
				var newValueDiv = document.createElement('div');
				
				// Setup identification
				newDiv.className = 'hover_objects';
				newDiv.id = 'hover_obj_'.concat((i / 2).toString());
				
				x = ((found_pixels[i] / 4) + HORIZONTAL_OFFSET).toString().concat('px');
				y = ((found_pixels[i + 1] / 4) + VERTICAL_OFFSET).toString().concat('px');
				
				console.log('Point found at x: '.concat(x.toString()));
				console.log('Point found at y: '.concat(y.toString()));
				
				// Setup location
				newDiv.style.left = x;
				newDiv.style.top = y;
				
				// Setup values
				newLabelDiv.innerHTML = 'TEST_label'.concat((i / 2).toString());
				newValueDiv.innerHTML = 'TEST_value'.concat((i / 2).toString());
				
				newLabelDiv.setAttribute('ng-bind', 'label');
				newValueDiv.setAttribute('ng-bind', 'value');
				
				// Insert objects into page
				document.getElementById('canvas_container').appendChild(newDiv);
				document.getElementById('hover_obj_'.concat((i / 2).toString())).appendChild(newLabelDiv);
				document.getElementById('hover_obj_'.concat((i / 2).toString())).appendChild(newValueDiv);
			}
			
			// Draw the image to the canvas
			context.putImageData(imageData, 0, 0);
		}
		
		function selectWaypoint() {
			console.log("Selected index: " + this.options[this.selectedIndex].getAttribute("value").toString());
		}
		
		
		// TODO: angular $compile
    };

    var definition = {
		// Name for files
        typeName: 'floorplan',
		// Name to display
		displayName: 'Floor Plan',
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Single,
        visObjectType: symbolVis,
		// Load the icon
		iconUrl: '/Scripts/app/editor/symbols/ext/Icons/floorplan.png',
		// Don't want to resize, but there's no option for 'none'
		resizerMode: 'AutoWidth',
        getDefaultConfig: function() {
    	    return {
    	        DataShape: 'Value',
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
					console.log('Action used, hiding symbol.');
				}
			}, {
				title: 'Select Image',
				action: function(context) {
					console.log('Image changing option selected.');
				}
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

