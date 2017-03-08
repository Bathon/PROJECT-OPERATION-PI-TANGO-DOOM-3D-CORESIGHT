(function (CS) {
    function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);

	symbolVis.prototype.init = function (scope) {
		// Parse image for red pixels (waypoints) and setup elements to hold the associated data
		var img = document.getElementById("map_container");
		img.onload = loadImage;
		
		function loadImage() {
			
			// Setup variables to hold image and canvas
			var canvas = document.getElementById("modified_map_container");
			canvas.width = img.width;
			canvas.height = img.height;
			var context = canvas.getContext('2d');
			context.drawImage(img, 0, 0);
			var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			
			//search for red pixels
			var x;
			var y;
			var index;
			var found_pixels;
			
			// Find pixels
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
			
			// Set up objects at locations
			var i;
			for ( i = 0; i < found_pixels.length; i += 2) {
				x = found_pixels[i];
				y = found_pixels[i + 1];
			}
			
			
			context.putImageData(imageData, 0, 0);
		}
		
		this.onDataUpdate = dataUpdate;
		
        function dataUpdate(data) {
            if(data) {
                scope.value = data.Value;
                scope.time = data.Time;
                if(data.Label) {
                    scope.label = data.Label;
                }
            }
        }
    };

    var definition = {
        typeName: 'floorplan',
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
        visObjectType: symbolVis,
		iconUrl: '/Scripts/app/editor/symbols/ext/Icons/floorplan.png',
        getDefaultConfig: function() {
    	    return {
    	        DataShape: 'Value',
				Height: 720,
				Width: 1172,
                BackgroundColor: 'rgb(0,0,0)',
                TextColor: 'rgb(255,255,255)',
                ShowLabel: true,
                ShowTime: false,
				SourcePath: ""
            };
        },
        configTitle: 'Format Symbol',
    };

    CS.symbolCatalog.register(definition);
})(window.PIVisualization);