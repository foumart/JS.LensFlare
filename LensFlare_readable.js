var LensFlare = (function() {

	function init(_bgrImage, _width, _height, _flaresData, _generated, _finished){
	
		var bgrCanvas, bgrContext, flares, flaresData, flaresCanvas, flaresContext, flaresGraphics;
		var bgrImg, dimensions;
		var width, height, frame;

		bgrImg = _bgrImage || generateCanvas(width, height);
		width = _width;
		height = _height;

		bgrCanvas = generateCanvas(width, height);
		bgrContext = bgrCanvas.getContext("2d");
		
		drawToCanvas(bgrContext, bgrImg, width, height, true);
		
		generateFlares(flaresGenerated);
		
		flaresCanvas = generateCanvas(width, height);
		flaresContext = flaresCanvas.getContext("2d");

		// direct approach
		bgrCanvas.play = function(){
			playFlares.apply(null, arguments);
		};
		bgrCanvas.update = function(_bgr){
			bgrImg = _bgr;
			drawToCanvas(bgrContext, bgrImg, width, height, true);
		}

		function flaresGenerated(){//log("LensFlare: Event fired: flaresGenerated");
			if(_generated!=null) _generated();
		}

		function flaresFinished(){//log("LensFlare: Event fired: flaresFinished");
			if(_finished!=null) _finished();
		}

		function generateFlares(callBack){
			flaresGraphics = document.createElement("div");
			var count = 0;
			flares = [];
			preDrawStart(_flaresData ||
				[// size, [colors], [color positions], alpha, number of polygons (omit this to create a circle), radius of the starting circle (if using a circle)
					[18, ["#ddffdd", "#eeffee", "#ddffdd", "#ffffff00"], [0, 0.7, 0.8, 1], 0.05],//0.1
					[160, ["#ffffff00", "#0099ff", "#33ff44", "#FFFF00", "#FFA500", "#ff3333", "#dd22aa", "#cc33ff", "#ffffff00"], [0.4, 0.58, 0.64, 0.69, 0.73, 0.76, 0.82, 0.88, 1], 0.1],
					[25, ["#66ff66", "#ccffcc", "#ffffff00"], [0, 0.95, 1], 0.075, 0, 0.1],
					[125, ["#ffffff", "#ffffff00", "#ffffff00", "#ffffff", "#ffffff", "#ffffff00"], [0, 0.1, 0.5, 0.85, 0.9, 1], 0.05, 0, 0.05],
					[15, ["#449944", "#55bb55", "#66cc66", "#ffffff00"], [0, 0.7, 0.8, 1], 0.2],
					[30, ["#cc6699", "#ff99cc", "#ffffff00"], [0, 0.95, 1], 0.15, 0, 0.1],
					[90, ["#ddddff", "#ffffff", "#eeeeff", "#ffffff00"], [0, 0.3, 0.7, 1], 0.06, 7],
					[100, ["#ffffff", "#ffffff66", "#ffffff00"], [0, 0.5, 1], 0.1, 0, 0],
					[12, ["#009900", "#33ff33", "#11cc11", "#ffffff00"], [0, 0.3, 0.7, 1], 0.1, 8],
					[75, ["#ffffff", "#ffffffcc", "#ffffff00", "#ffffff00", "#ffffff11", "#ffffff00", "#ffffff88", "#ffffff00"], [0, 0.15, 0.2, 0.5, 0.7, 0.75, 0.9, 1], 0.1, 0, 0],
					[35, ["#999999", "#ffffff", "#ffffff00"], [0, 0.75, 1], 0.075],
					[20, ["#ffffff", "#ffffff00"], [0, 1], 0.15, 7, 0.4],
					[16, ["#dddddd", "#ffffff", "#eeeeee", "#ffffff00"], [0, 0.3, 0.7, 1], 0.1, 7],
					[150, ["#ffffff", "#ffffff66", "#ffffff00"], [0, 0.5, 1], 0.2, 0, 0],
					[12, ["#99bbdd", "#0099ff", "#33ff44", "#FFFF00", "#FFA500", "#ff3333", "#dd22aa", "#cc33ff", "#ffffff00"], [0.2, 0.68, 0.74, 0.79, 0.83, 0.86, 0.92, 0.98, 1], 0.075],
					[10, ["#dddddd", "#ffffff", "#eeeeee", "#ffffff00"], [0, 0.3, 0.7, 1], 0.05]//0.05
				]
			);
			function preDrawStart(_flares){
				flaresData = _flares;
				preDrawNext();
			}
			function preDrawNext(){
				flares.push(createLensFlare(flaresGraphics, flaresData[count][0], flaresData[count][1], flaresData[count][2], flaresData[count][3], flaresData[count][4], flaresData[count][5]));
				count ++; if(count >= flaresData.length) {
					setTimeout(callBack, 1);
					return;
				}
				preDrawNext();
			}
		}

		function createLensFlare(_container, _size, _colors, _offsets, _alpha, _type, _amount){
			if(_amount==null) _amount = 0.3; else _amount/=2;
			var canvas = generateCanvas(_size, _size);
			canvas.style.position = "absolute";
			canvas.style.transform = "translate(-"+(flaresData[flares.length][0]/2)+"px, -"+(flaresData[flares.length][0]/2)+"px)";
			_container.appendChild(canvas);

			var ctx = canvas.getContext("2d");
			if(_type){// create polygonal shape with certain(_type) number of polygons and solid color
				var Xcenter = _size/2,
				Ycenter = _size/2;

				ctx.globalAlpha = (_alpha!=null) ? _alpha : 1;
				ctx.fillStyle = _colors[0];
				ctx.beginPath();
				ctx.moveTo (Xcenter + _size/2 * Math.cos(0), Ycenter + _size/2 * Math.sin(0));	

				for (var i = 1; i <= _type; i += 1) {
					ctx.lineTo (Xcenter + _size/2 * Math.cos(i * 2 * Math.PI / _type), Ycenter + _size/2 * Math.sin(i * 2 * Math.PI / _type));
				}
				ctx.closePath();
				ctx.fill();
			} else {// create a radial gradient circular shape
				var grd = ctx.createRadialGradient(_size/2,_size/2,(_size*_amount),_size/2,_size/2,_size/2);
				var alphaColor;
				for(var i = 0; i < _colors.length; i++){
					alphaColor = (_colors[i].length > 7) ? parseInt(_colors[i].substr(7,2), 16) / 255 : 1;
					grd.addColorStop(_offsets[i], ((_colors[i].charAt(0)=="#") ? "rgba("+parseInt(_colors[i].substr(1,2),16)+","+parseInt(_colors[i].substr(3,2),16)+","+parseInt(_colors[i].substr(5,2),16)+","+(((_alpha!=null) ? _alpha : 1) * alphaColor)+")" : _colors[i]));
				}
				ctx.fillStyle = grd;
				ctx.fillRect(0, 0, _size, _size);
			}
			return canvas;
		}

		function playFlares(_x, _y, _tx, _ty, _duration, _central, _offset){
			frame = 0;
			var angle, vx, vy, distance, positions;
			if(!_central) _tx = _x+(_tx-_x)/2;
			if(!_central) _ty = _y+(_ty-_y)/2;
			distance = Math.sqrt( (_tx-_x)*(_tx-_x) + (_ty-_y)*(_ty-_y) ) / (flares.length-1);
			positions = [];
			for(var i = 0; i < flares.length; i++){
				angle = Math.atan2(_tx-_x, -(_ty-_y));
				vx = Math.cos(angle - (Math.PI/2)) * i * distance;
				vy = Math.sin(angle - (Math.PI/2)) * i * distance;
				flares[i].style.left = (_x+vx - flaresData[i][0]/2)+"px";
				flares[i].style.top = (_y+vy - flaresData[i][0]/2)+"px";
				flares[i].style.opacity = 0;
				positions.push({x:(_x+vx), y:(_y+vy)});
			}
			for(i = 0; i < flares.length; i++){
				distance = flares.length-i-1;
				TweenLite.to(flares[i], _duration/2, {x:(positions[distance].x - positions[i].x)*0.5, y:(positions[distance].y - positions[i].y)*0.5, ease:Power2.easeIn, alpha:1,
					onComplete: TweenLite.to,
					onCompleteParams:[flares[i], _duration/2, {x:(positions[distance].x-positions[i].x), y:(positions[distance].y-positions[i].y), ease:Power2.easeOut, alpha:0.75}],
				});
			}
			TweenLite.to(flaresGraphics, _duration, {x:(_central)?0:(_tx -_x), y:(_central)?0:(_ty -_y), ease:Power2.easeInOut, onUpdate:updateBgr, onUpdateParams:[_duration, _offset], onComplete:flaresFinished});
		}

		function updateBgr(_duration, _offset){
			frame ++;
			for(var i = 0; i < flares.length; i++){
				drawToCanvas(flaresContext, flares[i], width, height, !i, 'source-over', flaresGraphics._gsTransform.x + parseInt(flares[i].style.left) + flares[i]._gsTransform.x, flaresGraphics._gsTransform.y + parseInt(flares[i].style.top) + flares[i]._gsTransform.y, flares[i].style.opacity);
			}
			drawToCanvas(bgrContext, bgrImg, width, height, true);
			drawToCanvas(bgrContext, flaresCanvas, width, height, false, 'lighter');
		}

		return bgrCanvas;
	}

	function drawToCanvas(_canvas, _img, _width, _height, _clear, _operation, _x, _y, _alpha){
		if(!_operation) _operation = 'source-over';
		if(_x == null) _x = 0;
		if(_y == null) _y = 0;
		if(_alpha == null) _alpha = 1;
		_canvas.globalAlpha = _alpha;
		if(_clear) _canvas.clearRect(0, 0, _width, _height);
		_canvas.globalCompositeOperation = _operation;
		_canvas.drawImage(_img, _x, _y);
	}

	function generateCanvas(width, height) {
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		return canvas;
	}

	// Global accessible methods
	return {
		init:init,
		drawToCanvas:drawToCanvas,
		generateCanvas:generateCanvas
	};
})();
