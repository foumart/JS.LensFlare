# JS.LensFlare
Lens Flare effect component. Relies on the Greensock TweenLite library. Not dependent on external graphical resources.

All assets are generated on the fly with pure javascript using the HTML5 Canvas element.

Current Filesize: 6KB, Compiled: 1.6KB gzipped (3.66KB uncompressed) (http://closure-compiler.appspot.com/home)

####Demo:
https://jsfiddle.net/Foumart/mtos60jd/

####Usage:
```javascript
var lensCanvas = LensFlare.init(bgrImage, width, height, customLensArray, lensGenerated);

function lensGenerated(e){
	lensCanvas.play(startX, startY, destinationX, destinationY, duration, central);
}
```
Returns a canvas element with integrated play() method.

===
####Global methods:
LensFlare effect initialization.
```javascript
LensFlare.init(bgrImage, width, height, flaresData, generated, finished)
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

