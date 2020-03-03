/*
 Highcharts Gantt JS v8.0.2 (2020-03-03)

 Pathfinder

 (c) 2016-2019 ystein Moseng

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof define&&define.amd?define("highcharts/modules/pathfinder",["highcharts"],function(l){e(l);e.Highcharts=l;return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){function l(C,p,g,e){C.hasOwnProperty(p)||(C[p]=e.apply(null,g))}e=e?e._modules:{};l(e,"parts-gantt/PathfinderAlgorithms.js",[e["parts/Utilities.js"]],function(e){function p(d,c,f){f=f||0;var g=d.length-1;c-=1e-7;
for(var e,p;f<=g;)if(e=g+f>>1,p=c-d[e].xMin,0<p)f=e+1;else if(0>p)g=e-1;else return e;return 0<f?f-1:0}function g(d,c){for(var f=p(d,c.x+1)+1;f--;){var g;if(g=d[f].xMax>=c.x)g=d[f],g=c.x<=g.xMax&&c.x>=g.xMin&&c.y<=g.yMax&&c.y>=g.yMin;if(g)return f}return-1}function C(d){var c=[];if(d.length){c.push("M",d[0].start.x,d[0].start.y);for(var f=0;f<d.length;++f)c.push("L",d[f].end.x,d[f].end.y)}return c}function n(d,c){d.yMin=y(d.yMin,c.yMin);d.yMax=t(d.yMax,c.yMax);d.xMin=y(d.xMin,c.xMin);d.xMax=t(d.xMax,
c.xMax)}var l=e.extend,F=e.pick,t=Math.min,y=Math.max,w=Math.abs;return{straight:function(d,c){return{path:["M",d.x,d.y,"L",c.x,c.y],obstacles:[{start:d,end:c}]}},simpleConnect:l(function(d,c,f){function e(b,a,u,z,d){b={x:b.x,y:b.y};b[a]=u[z||a]+(d||0);return b}function p(b,a,u){var h=w(a[u]-b[u+"Min"])>w(a[u]-b[u+"Max"]);return e(a,u,b,u+(h?"Max":"Min"),h?1:-1)}var n=[],r=F(f.startDirectionX,w(c.x-d.x)>w(c.y-d.y))?"x":"y",t=f.chartObstacles,x=g(t,d);f=g(t,c);if(-1<f){var l=t[f];f=p(l,c,r);l={start:f,
end:c};var a=f}else a=c;-1<x&&(t=t[x],f=p(t,d,r),n.push({start:d,end:f}),f[r]>=d[r]===f[r]>=a[r]&&(r="y"===r?"x":"y",c=d[r]<c[r],n.push({start:f,end:e(f,r,t,r+(c?"Max":"Min"),c?1:-1)}),r="y"===r?"x":"y"));d=n.length?n[n.length-1].end:d;f=e(d,r,a);n.push({start:d,end:f});r=e(f,"y"===r?"x":"y",a);n.push({start:f,end:r});n.push(l);return{path:C(n),obstacles:n}},{requiresObstacles:!0}),fastAvoid:l(function(d,c,f){function e(a,b,h){var k,u=a.x<b.x?1:-1;if(a.x<b.x){var z=a;var d=b}else z=b,d=a;if(a.y<b.y){var c=
a;var v=b}else c=b,v=a;for(k=0>u?t(p(m,d.x),m.length-1):0;m[k]&&(0<u&&m[k].xMin<=d.x||0>u&&m[k].xMax>=z.x);){if(m[k].xMin<=d.x&&m[k].xMax>=z.x&&m[k].yMin<=v.y&&m[k].yMax>=c.y)return h?{y:a.y,x:a.x<b.x?m[k].xMin-1:m[k].xMax+1,obstacle:m[k]}:{x:a.x,y:a.y<b.y?m[k].yMin-1:m[k].yMax+1,obstacle:m[k]};k+=u}return b}function l(a,b,h,u,z){var k=z.soft,d=z.hard,c=u?"x":"y",m={x:b.x,y:b.y},f={x:b.x,y:b.y};z=a[c+"Max"]>=k[c+"Max"];k=a[c+"Min"]<=k[c+"Min"];var H=a[c+"Max"]>=d[c+"Max"];d=a[c+"Min"]<=d[c+"Min"];
var g=w(a[c+"Min"]-b[c]),v=w(a[c+"Max"]-b[c]);h=10>w(g-v)?b[c]<h[c]:v<g;f[c]=a[c+"Min"];m[c]=a[c+"Max"];a=e(b,f,u)[c]!==f[c];b=e(b,m,u)[c]!==m[c];h=a?b?h:!0:b?!1:h;h=k?z?h:!0:z?!1:h;return d?H?h:!0:H?!1:h}function x(b,c,d){if(b.x===c.x&&b.y===c.y)return[];var k=d?"x":"y",E=f.obstacleOptions.margin;var v={soft:{xMin:h,xMax:u,yMin:z,yMax:H},hard:f.hardBounds};var q=g(m,b);if(-1<q){q=m[q];v=l(q,b,c,d,v);n(q,f.hardBounds);var p=d?{y:b.y,x:q[v?"xMax":"xMin"]+(v?1:-1)}:{x:b.x,y:q[v?"yMax":"yMin"]+(v?1:
-1)};var B=g(m,p);-1<B&&(B=m[B],n(B,f.hardBounds),p[k]=v?y(q[k+"Max"]-E+1,(B[k+"Min"]+q[k+"Max"])/2):t(q[k+"Min"]+E-1,(B[k+"Max"]+q[k+"Min"])/2),b.x===p.x&&b.y===p.y?(a&&(p[k]=v?y(q[k+"Max"],B[k+"Max"])+1:t(q[k+"Min"],B[k+"Min"])-1),a=!a):a=!1);b=[{start:b,end:p}]}else k=e(b,{x:d?c.x:b.x,y:d?b.y:c.y},d),b=[{start:b,end:{x:k.x,y:k.y}}],k[d?"x":"y"]!==c[d?"x":"y"]&&(v=l(k.obstacle,k,c,!d,v),n(k.obstacle,f.hardBounds),v={x:d?k.x:k.obstacle[v?"xMax":"xMin"]+(v?1:-1),y:d?k.obstacle[v?"yMax":"yMin"]+(v?
1:-1):k.y},d=!d,b=b.concat(x({x:k.x,y:k.y},v,d)));return b=b.concat(x(b[b.length-1].end,c,!d))}function r(b,a,h){var c=t(b.xMax-a.x,a.x-b.xMin)<t(b.yMax-a.y,a.y-b.yMin);h=l(b,a,h,c,{soft:f.hardBounds,hard:f.hardBounds});return c?{y:a.y,x:b[h?"xMax":"xMin"]+(h?1:-1)}:{x:a.x,y:b[h?"yMax":"yMin"]+(h?1:-1)}}var I=F(f.startDirectionX,w(c.x-d.x)>w(c.y-d.y)),A=I?"x":"y",G=[],a=!1,b=f.obstacleMetrics,h=t(d.x,c.x)-b.maxWidth-10,u=y(d.x,c.x)+b.maxWidth+10,z=t(d.y,c.y)-b.maxHeight-10,H=y(d.y,c.y)+b.maxHeight+
10,m=f.chartObstacles;var E=p(m,h);b=p(m,u);m=m.slice(E,b+1);if(-1<(b=g(m,c))){var q=r(m[b],c,d);G.push({end:c,start:q});c=q}for(;-1<(b=g(m,c));)E=0>c[A]-d[A],q={x:c.x,y:c.y},q[A]=m[b][E?A+"Max":A+"Min"]+(E?1:-1),G.push({end:c,start:q}),c=q;d=x(d,c,I);d=d.concat(G.reverse());return{path:C(d),obstacles:d}},{requiresObstacles:!0})}});l(e,"parts-gantt/ArrowSymbols.js",[e["parts/Globals.js"]],function(e){e.SVGRenderer.prototype.symbols.arrow=function(e,g,l,n){return["M",e,g+n/2,"L",e+l,g,"L",e,g+n/2,
"L",e+l,g+n]};e.SVGRenderer.prototype.symbols["arrow-half"]=function(p,g,l,n){return e.SVGRenderer.prototype.symbols.arrow(p,g,l/2,n)};e.SVGRenderer.prototype.symbols["triangle-left"]=function(e,g,l,n){return["M",e+l,g,"L",e,g+n/2,"L",e+l,g+n,"Z"]};e.SVGRenderer.prototype.symbols["arrow-filled"]=e.SVGRenderer.prototype.symbols["triangle-left"];e.SVGRenderer.prototype.symbols["triangle-left-half"]=function(p,g,l,n){return e.SVGRenderer.prototype.symbols["triangle-left"](p,g,l/2,n)};e.SVGRenderer.prototype.symbols["arrow-filled-half"]=
e.SVGRenderer.prototype.symbols["triangle-left-half"]});l(e,"parts-gantt/Pathfinder.js",[e["parts/Globals.js"],e["parts/Point.js"],e["parts/Utilities.js"],e["parts-gantt/PathfinderAlgorithms.js"]],function(e,l,g,x){function n(a){var b=a.shapeArgs;return b?{xMin:b.x,xMax:b.x+b.width,yMin:b.y,yMax:b.y+b.height}:(b=a.graphic&&a.graphic.getBBox())?{xMin:a.plotX-b.width/2,xMax:a.plotX+b.width/2,yMin:a.plotY-b.height/2,yMax:a.plotY+b.height/2}:null}function p(a){for(var b=a.length,h=0,c,d,e=[],m=function(b,
a,h){h=J(h,10);var c=b.yMax+h>a.yMin-h&&b.yMin-h<a.yMax+h,d=b.xMax+h>a.xMin-h&&b.xMin-h<a.xMax+h,e=c?b.xMin>a.xMax?b.xMin-a.xMax:a.xMin-b.xMax:Infinity,u=d?b.yMin>a.yMax?b.yMin-a.yMax:a.yMin-b.yMax:Infinity;return d&&c?h?m(b,a,Math.floor(h/2)):Infinity:G(e,u)};h<b;++h)for(c=h+1;c<b;++c)d=m(a[h],a[c]),80>d&&e.push(d);e.push(80);return A(Math.floor(e.sort(function(b,a){return b-a})[Math.floor(e.length/10)]/2-1),1)}function F(a,b,h){this.init(a,b,h)}function t(a){this.init(a)}function y(a){if(a.options.pathfinder||
a.series.reduce(function(b,a){a.options&&D(!0,a.options.connectors=a.options.connectors||{},a.options.pathfinder);return b||a.options&&a.options.pathfinder},!1))D(!0,a.options.connectors=a.options.connectors||{},a.options.pathfinder),c('WARNING: Pathfinder options have been renamed. Use "chart.connectors" or "series.connectors" instead.')}"";var w=g.addEvent,d=g.defined,c=g.error,f=g.extend,D=g.merge,C=g.objectEach,J=g.pick,r=g.splat,I=e.deg2rad,A=Math.max,G=Math.min;f(e.defaultOptions,{connectors:{type:"straight",
lineWidth:1,marker:{enabled:!1,align:"center",verticalAlign:"middle",inside:!1,lineWidth:1},startMarker:{symbol:"diamond"},endMarker:{symbol:"arrow-filled"}}});F.prototype={init:function(a,b,h){this.fromPoint=a;this.toPoint=b;this.options=h;this.chart=a.series.chart;this.pathfinder=this.chart.pathfinder},renderPath:function(a,b,h){var c=this.chart,d=c.styledMode,e=c.pathfinder,m=!c.options.chart.forExport&&!1!==h,f=this.graphics&&this.graphics.path;e.group||(e.group=c.renderer.g().addClass("highcharts-pathfinder-group").attr({zIndex:-1}).add(c.seriesGroup));
e.group.translate(c.plotLeft,c.plotTop);f&&f.renderer||(f=c.renderer.path().add(e.group),d||f.attr({opacity:0}));f.attr(b);a={d:a};d||(a.opacity=1);f[m?"animate":"attr"](a,h);this.graphics=this.graphics||{};this.graphics.path=f},addMarker:function(a,b,c){var d=this.fromPoint.series.chart,h=d.pathfinder;d=d.renderer;var e="start"===a?this.fromPoint:this.toPoint,f=e.getPathfinderAnchorPoint(b);if(b.enabled){c="start"===a?{x:c[4],y:c[5]}:{x:c[c.length-5],y:c[c.length-4]};c=e.getRadiansToVector(c,f);
f=e.getMarkerVector(c,b.radius,f);c=-c/I;if(b.width&&b.height){var g=b.width;var q=b.height}else g=q=2*b.radius;this.graphics=this.graphics||{};f={x:f.x-g/2,y:f.y-q/2,width:g,height:q,rotation:c,rotationOriginX:f.x,rotationOriginY:f.y};this.graphics[a]?this.graphics[a].animate(f):(this.graphics[a]=d.symbol(b.symbol).addClass("highcharts-point-connecting-path-"+a+"-marker").attr(f).add(h.group),d.styledMode||this.graphics[a].attr({fill:b.color||this.fromPoint.color,stroke:b.lineColor,"stroke-width":b.lineWidth,
opacity:0}).animate({opacity:1},e.series.options.animation))}},getPath:function(a){var b=this.pathfinder,d=this.chart,e=b.algorithms[a.type],f=b.chartObstacles;if("function"!==typeof e)c('"'+a.type+'" is not a Pathfinder algorithm.');else return e.requiresObstacles&&!f&&(f=b.chartObstacles=b.getChartObstacles(a),d.options.connectors.algorithmMargin=a.algorithmMargin,b.chartObstacleMetrics=b.getObstacleMetrics(f)),e(this.fromPoint.getPathfinderAnchorPoint(a.startMarker),this.toPoint.getPathfinderAnchorPoint(a.endMarker),
D({chartObstacles:f,lineObstacles:b.lineObstacles||[],obstacleMetrics:b.chartObstacleMetrics,hardBounds:{xMin:0,xMax:d.plotWidth,yMin:0,yMax:d.plotHeight},obstacleOptions:{margin:a.algorithmMargin},startDirectionX:b.getAlgorithmStartDirection(a.startMarker)},a))},render:function(){var a=this.fromPoint,b=a.series,c=b.chart,e=c.pathfinder,f=D(c.options.connectors,b.options.connectors,a.options.connectors,this.options),g={};c.styledMode||(g.stroke=f.lineColor||a.color,g["stroke-width"]=f.lineWidth,f.dashStyle&&
(g.dashstyle=f.dashStyle));g["class"]="highcharts-point-connecting-path highcharts-color-"+a.colorIndex;f=D(g,f);d(f.marker.radius)||(f.marker.radius=G(A(Math.ceil((f.algorithmMargin||8)/2)-1,1),5));a=this.getPath(f);c=a.path;a.obstacles&&(e.lineObstacles=e.lineObstacles||[],e.lineObstacles=e.lineObstacles.concat(a.obstacles));this.renderPath(c,g,b.options.animation);this.addMarker("start",D(f.marker,f.startMarker),c);this.addMarker("end",D(f.marker,f.endMarker),c)},destroy:function(){this.graphics&&
(C(this.graphics,function(a){a.destroy()}),delete this.graphics)}};t.prototype={algorithms:x,init:function(a){this.chart=a;this.connections=[];w(a,"redraw",function(){this.pathfinder.update()})},update:function(a){var b=this.chart,c=this,d=c.connections;c.connections=[];b.series.forEach(function(a){a.visible&&!a.options.isInternal&&a.points.forEach(function(a){var d,e=a.options&&a.options.connect&&r(a.options.connect);a.visible&&!1!==a.isInside&&e&&e.forEach(function(e){d=b.get("string"===typeof e?
e:e.to);d instanceof l&&d.series.visible&&d.visible&&!1!==d.isInside&&c.connections.push(new F(a,d,"string"===typeof e?{}:e))})})});for(var e=0,f,g,n=d.length,q=c.connections.length;e<n;++e){g=!1;for(f=0;f<q;++f)if(d[e].fromPoint===c.connections[f].fromPoint&&d[e].toPoint===c.connections[f].toPoint){c.connections[f].graphics=d[e].graphics;g=!0;break}g||d[e].destroy()}delete this.chartObstacles;delete this.lineObstacles;c.renderConnections(a)},renderConnections:function(a){a?this.chart.series.forEach(function(b){var a=
function(){var a=b.chart.pathfinder;(a&&a.connections||[]).forEach(function(a){a.fromPoint&&a.fromPoint.series===b&&a.render()});b.pathfinderRemoveRenderEvent&&(b.pathfinderRemoveRenderEvent(),delete b.pathfinderRemoveRenderEvent)};!1===b.options.animation?a():b.pathfinderRemoveRenderEvent=w(b,"afterAnimate",a)}):this.connections.forEach(function(a){a.render()})},getChartObstacles:function(a){for(var b=[],c=this.chart.series,e=J(a.algorithmMargin,0),f,g=0,m=c.length;g<m;++g)if(c[g].visible&&!c[g].options.isInternal)for(var l=
0,q=c[g].points.length,k;l<q;++l)k=c[g].points[l],k.visible&&(k=n(k))&&b.push({xMin:k.xMin-e,xMax:k.xMax+e,yMin:k.yMin-e,yMax:k.yMax+e});b=b.sort(function(a,b){return a.xMin-b.xMin});d(a.algorithmMargin)||(f=a.algorithmMargin=p(b),b.forEach(function(a){a.xMin-=f;a.xMax+=f;a.yMin-=f;a.yMax+=f}));return b},getObstacleMetrics:function(a){for(var b=0,c=0,d,e,f=a.length;f--;)d=a[f].xMax-a[f].xMin,e=a[f].yMax-a[f].yMin,b<d&&(b=d),c<e&&(c=e);return{maxHeight:c,maxWidth:b}},getAlgorithmStartDirection:function(a){var b=
"top"!==a.verticalAlign&&"bottom"!==a.verticalAlign;return"left"!==a.align&&"right"!==a.align?b?void 0:!1:b?!0:void 0}};e.Connection=F;e.Pathfinder=t;f(l.prototype,{getPathfinderAnchorPoint:function(a){var b=n(this);switch(a.align){case "right":var c="xMax";break;case "left":c="xMin"}switch(a.verticalAlign){case "top":var d="yMin";break;case "bottom":d="yMax"}return{x:c?b[c]:(b.xMin+b.xMax)/2,y:d?b[d]:(b.yMin+b.yMax)/2}},getRadiansToVector:function(a,b){d(b)||(b=n(this),b={x:(b.xMin+b.xMax)/2,y:(b.yMin+
b.yMax)/2});return Math.atan2(b.y-a.y,a.x-b.x)},getMarkerVector:function(a,b,c){var d=2*Math.PI,e=n(this),f=e.xMax-e.xMin,g=e.yMax-e.yMin,h=Math.atan2(g,f),l=!1;f/=2;var k=g/2,p=e.xMin+f;e=e.yMin+k;for(var r=p,t=e,w={},x=1,y=1;a<-Math.PI;)a+=d;for(;a>Math.PI;)a-=d;d=Math.tan(a);a>-h&&a<=h?(y=-1,l=!0):a>h&&a<=Math.PI-h?y=-1:a>Math.PI-h||a<=-(Math.PI-h)?(x=-1,l=!0):x=-1;l?(r+=x*f,t+=y*f*d):(r+=g/(2*d)*x,t+=y*k);c.x!==p&&(r=c.x);c.y!==e&&(t=c.y);w.x=r+b*Math.cos(a);w.y=t-b*Math.sin(a);return w}});e.Chart.prototype.callbacks.push(function(a){!1!==
a.options.connectors.enabled&&(y(a),this.pathfinder=new t(this),this.pathfinder.update(!0))})});l(e,"masters/modules/pathfinder.src.js",[],function(){})});
//# sourceMappingURL=pathfinder.js.map