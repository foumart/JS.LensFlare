# JS.LensFlare
Lens Flare effect component. Relies on the TweenLite library. Not dependent on external assets. Filesize: 6KB

####Usage:
```javascript
var lensCanvas = LensFlare.generate(bgrCanvas, width, height, customLensArray, lensGenerated);
function lensGenerated(e){
		lensCanvas.play(startX, startY, destinationX, destinationY, duration, central);
}
```
===
####Global methods:
LensFlare effect initialization.
```javascript
LensFlare.init(bgr, width, height, flaresData, generated, finished)
```
===
Generic function for drawing an image to canvas.
```javascript
LensFlare.drawToCanvas(canvas, img, width, height, clear, operation, x, y, alpha)
```
===
Generic function for canvas generation.
```javascript
LensFlare.generateCanvas(width, height)
```
===
####Demo:
https://jsfiddle.net/Foumart/hjtb2790/
