(function (CS) {
    function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);

	symbolVis.prototype.init = function (scope) {
		// Parse image for red pixels (waypoints) and setup elements to hold the associated data
		var img = document.getElementById("map_container");
		img.onload = loadImage;
		
		function loadImage() {
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
			for( x = 0; x < canvas.width; x++ ) {
				for( y = 0; y < canvas.height; y++ ) {
					index = (( y * canvas.width ) + x) * 4;
					//imageData.data[index] = 255 - imageData.data[index];
					//imageData.data[index + 1] = 255 - imageData.data[index + 1];
					//imageData.data[index + 2] = 255 - imageData.data[index + 2];
					//imageData.data[index + 3] = 255;
					
					//if the pixel is just red
					if(imageData.data[index] == 255 && imageData.data[index + 1] == 0 && imageData.data[index + 2] == 0) {
						document.getElementById("found").style.color = "red";
					}
				}
			}
			
			context.putImageData(imageData, 0, 0);
		}
		/*
		// Hovering over image (TODO: coordinates)
        document.getElementById("hover_test").onmouseover = mouseOver;
		document.getElementById("hover_test").onmouseout = mouseOut;
		this.onDataUpdate = dataUpdate;
		
		function mouseOver() {
			//document.getElementById("hover_test").style.color = "red";
			document.getElementById("hover_test_2").style.display = "block";
		}
		
		function mouseOut() {
			//document.getElementById("hover_test").style.color = "white";
			document.getElementById("hover_test_2").style.display = "none";
		}*/
		
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