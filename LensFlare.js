/*
	Lens Flare effect v1.0
	Copyright (c) 2016 by Noncho Savov at StangaOne1.
   	All rights reserved.

	Redistribution and use in source and binary forms, with or without
	modification, are permitted provided that the following conditions are met:

 	Redistributions of source code must retain the above copyright notice,
	this list of conditions and the following disclaimer.

 	Redistributions in binary form must reproduce the above copyright notice,
	this list of conditions and the following disclaimer in the documentation
	and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
	LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
	SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
	INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
	CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
	ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
	POSSIBILITY OF SUCH DAMAGE.
*/
var LensFlare=function(){function g(c,g,n,u,C,v,w,x,y){v||(v="source-over");null==w&&(w=0);null==x&&(x=0);null==y&&(y=1);c.globalAlpha=y;C&&c.clearRect(0,0,n,u);c.globalCompositeOperation=v;c.drawImage(g,w,x)}function u(c,g){var n=document.createElement("canvas");n.width=c;n.height=g;return n}return{generate:function(c,H,n,I,C,v){function w(){v()}function x(e,b,a,A,c,k,d){d=null==d?.3:d/2;var l=u(b,b);l.style.position="absolute";l.style.transform="translate(-"+m[f.length][0]/2+"px, -"+m[f.length][0]/
2+"px)";e.appendChild(l);e=l.getContext("2d");if(k){A=b/2;var g=b/2;e.globalAlpha=null!=c?c:1;e.fillStyle=a[0];e.beginPath();e.moveTo(A+b/2*Math.cos(0),g+b/2*Math.sin(0));for(d=1;d<=k;d+=1)e.lineTo(A+b/2*Math.cos(2*d*Math.PI/k),g+b/2*Math.sin(2*d*Math.PI/k));e.closePath();e.fill()}else{k=e.createRadialGradient(b/2,b/2,b*d,b/2,b/2,b/2);for(d=0;d<a.length;d++)g=7<a[d].length?parseInt(a[d].substr(7,2),16)/255:1,k.addColorStop(A[d],"#"==a[d].charAt(0)?"rgba("+parseInt(a[d].substr(1,2),16)+","+parseInt(a[d].substr(3,
2),16)+","+parseInt(a[d].substr(5,2),16)+","+(null!=c?c:1)*g+")":a[d]);e.fillStyle=k;e.fillRect(0,0,b,b)}return l}function y(e,b,a,c,g,k,d){F=0;var l,n,q,p;k||(a=e+(a-e)/2);k||(c=b+(c-b)/2);q=Math.sqrt((a-e)*(a-e)+(c-b)*(c-b))/(f.length-1);p=[];for(var h=0;h<f.length;h++)l=Math.atan2(a-e,-(c-b)),n=Math.cos(l-Math.PI/2)*h*q,l=Math.sin(l-Math.PI/2)*h*q,f[h].style.left=e+n-m[h][0]/2+"px",f[h].style.top=b+l-m[h][0]/2+"px",f[h].style.opacity=0,p.push({x:e+n,y:b+l});for(h=0;h<f.length;h++)q=f.length-h-
1,TweenLite.to(f[h],g/2,{x:.5*(p[q].x-p[h].x),y:.5*(p[q].y-p[h].y),ease:Power2.easeIn,alpha:1,onComplete:TweenLite.to,onCompleteParams:[f[h],g/2,{x:p[q].x-p[h].x,y:p[q].y-p[h].y,ease:Power2.easeOut,alpha:.75}]});TweenLite.to(z,g,{x:k?0:a-e,y:k?0:c-b,ease:Power2.easeInOut,onUpdate:J,onUpdateParams:[g,d],onComplete:w})}function J(c,b){F++;for(var a=0;a<f.length;a++)g(G,f[a],r,t,!a,"source-over",z._gsTransform.x+parseInt(f[a].style.left)+f[a]._gsTransform.x,z._gsTransform.y+parseInt(f[a].style.top)+
f[a]._gsTransform.y,f[a].style.opacity);g(B,D,r,t,!0);g(B,E,r,t,!1,"lighter")}var B,f,m,E,G,z,D,r,t,F;D=c;r=H;t=n;c=u(r,t);B=c.getContext("2d");g(B,D,r,t,!0);(function(c){function b(){f.push(x(z,m[a][0],m[a][1],m[a][2],m[a][3],m[a][4],m[a][5]));a++;a>=m.length?setTimeout(c,1):b()}z=document.createElement("div");var a=0;f=[];(function(a){m=a;b()})(I||
[
	// This effect relies on GreenSock TweenLite. Optimized with http://closure-compiler.appspot.com/home
	// Pass similar array as 4th parameter in LensFlare.generate() to create your own custom element list.
	//
	//	Size,	[Colors],
	//			[Color Positions],	Alpha,	Type(number of polygons, omit this to create a circle),	Starting Radius(in the circle's radial gradient)
	[
		18,		["#ddffdd", "#eeffee", "#ddffdd", "#ffffff00"],
				[0,	0.7, 0.8, 1], 0.05
	],[
		160,	["#ffffff00", "#0099ff", "#33ff44", "#FFFF00", "#FFA500", "#ff3333", "#dd22aa", "#cc33ff", "#ffffff00"],
				[0.4, 0.58, 0.64, 0.69, 0.73, 0.76, 0.82, 0.88, 1], 0.1
	],[
		25,		["#66ff66", "#ccffcc", "#ffffff00"],
				[0, 0.95, 1], 0.075, 0, 0.1
	],[
		125,	["#ffffff", "#ffffff00", "#ffffff00", "#ffffff", "#ffffff", "#ffffff00"],
				[0, 0.1, 0.5, 0.85, 0.9, 1], 0.05, 0, 0.05
	],[
		15,		["#449944", "#55bb55", "#66cc66", "#ffffff00"],
				[0, 0.7, 0.8, 1], 0.2
	],[
		30,		["#cc6699", "#ff99cc", "#ffffff00"],
				[0, 0.95, 1], 0.15, 0, 0.1
	],[
		90,		["#ddddff", "#ffffff", "#eeeeff", "#ffffff00"],
				[0, 0.3, 0.7, 1], 0.06, 7
	],[
		100,	["#ffffff", "#ffffff66", "#ffffff00"],
				[0, 0.5, 1], 0.1, 0, 0
	],[
		12,		["#009900", "#33ff33", "#11cc11", "#ffffff00"],
				[0, 0.3, 0.7, 1], 0.1, 8
	],[
		75,		["#ffffff", "#ffffffcc", "#ffffff00", "#ffffff00", "#ffffff11", "#ffffff00", "#ffffff88", "#ffffff00"],
				[0, 0.15, 0.2, 0.5, 0.7, 0.75, 0.9, 1], 0.1, 0, 0
	],[
		35,		["#999999", "#ffffff", "#ffffff00"],
				[0, 0.75, 1], 0.075
	],[
		20,		["#ffffff", "#ffffff00"],
				[0, 1], 0.15, 7, 0.4
	],[
		16,		["#dddddd", "#ffffff", "#eeeeee", "#ffffff00"],
				[0, 0.3, 0.7, 1], 0.1, 7
	],[
		150,	["#ffffff", "#ffffff66", "#ffffff00"],
				[0, 0.5, 1], 0.2, 0, 0
	],[
		12,		["#99bbdd", "#0099ff", "#33ff44", "#FFFF00", "#FFA500", "#ff3333", "#dd22aa", "#cc33ff", "#ffffff00"],
				[0.2, 0.68, 0.74, 0.79, 0.83, 0.86, 0.92, 0.98, 1], 0.075
	],[
		10,		["#dddddd", "#ffffff", "#eeeeee", "#ffffff00"],
				[0, 0.3, 0.7, 1], 0.05
	]
	
])})(function(){C()});E=u(r,t);G=E.getContext("2d");c.play=function(){y.apply(null,arguments)};return c},drawToCanvas:g,generateCanvas:u}}();
