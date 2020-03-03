/*
 Highstock JS v8.0.2 (2020-03-03)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof define&&define.amd?define("highcharts/indicators/ichimoku-kinko-hyo",["highcharts","highcharts/modules/stock"],function(g){e(g);e.Highcharts=g;return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){function g(e,x,m,g){e.hasOwnProperty(x)||(e[x]=g.apply(null,m))}e=e?e._modules:{};g(e,"indicators/ichimoku-kinko-hyo.src.js",[e["parts/Globals.js"],e["parts/Color.js"],e["parts/Utilities.js"]],
function(e,g,m){function x(a){return a.reduce(function(a,b){return Math.max(a,b[1])},-Infinity)}function F(a){return a.reduce(function(a,b){return Math.min(a,b[2])},Infinity)}function y(a){return{high:x(a),low:F(a)}}function G(a){var d,b,n,e,k;a.series.forEach(function(a){if(a.xData)for(e=a.xData,k=b=a.xIncrement?1:e.length-1;0<k;k--)if(n=e[k]-e[k-1],d===q||n<d)d=n});return d}function H(a,d,b,n){if(a&&d&&b&&n){var e=d.plotX-a.plotX;d=d.plotY-a.plotY;var k=n.plotX-b.plotX;n=n.plotY-b.plotY;var g=a.plotX-
b.plotX,h=a.plotY-b.plotY;b=(-d*g+e*h)/(-k*d+e*n);k=(k*h-n*g)/(-k*d+e*n);if(0<=b&&1>=b&&0<=k&&1>=k)return{plotX:a.plotX+k*e,plotY:a.plotY+k*d}}return!1}function D(a){var d=a.indicator;d.points=a.points;d.nextPoints=a.nextPoints;d.color=a.color;d.options=B(a.options.senkouSpan.styles,a.gap);d.graph=a.graph;d.fillGraph=!0;u.prototype.drawGraph.call(d)}var C=g.parse,E=m.defined,I=m.isArray,B=m.merge,J=m.objectEach;g=m.seriesType;var q,u=e.seriesTypes.sma;e.approximations["ichimoku-averages"]=function(){var a=
[],d;[].forEach.call(arguments,function(b,n){a.push(e.approximations.average(b));d=!d&&"undefined"===typeof a[n]});return d?void 0:a};g("ikh","sma",{params:{period:26,periodTenkan:9,periodSenkouSpanB:52},marker:{enabled:!1},tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>TENKAN SEN: {point.tenkanSen:.3f}<br/>KIJUN SEN: {point.kijunSen:.3f}<br/>CHIKOU SPAN: {point.chikouSpan:.3f}<br/>SENKOU SPAN A: {point.senkouSpanA:.3f}<br/>SENKOU SPAN B: {point.senkouSpanB:.3f}<br/>'},
tenkanLine:{styles:{lineWidth:1,lineColor:void 0}},kijunLine:{styles:{lineWidth:1,lineColor:void 0}},chikouLine:{styles:{lineWidth:1,lineColor:void 0}},senkouSpanA:{styles:{lineWidth:1,lineColor:void 0}},senkouSpanB:{styles:{lineWidth:1,lineColor:void 0}},senkouSpan:{styles:{fill:"rgba(255, 0, 0, 0.5)"}},dataGrouping:{approximation:"ichimoku-averages"}},{pointArrayMap:["tenkanSen","kijunSen","chikouSpan","senkouSpanA","senkouSpanB"],pointValKey:"tenkanSen",nameComponents:["periodSenkouSpanB","period",
"periodTenkan"],init:function(){u.prototype.init.apply(this,arguments);this.options=B({tenkanLine:{styles:{lineColor:this.color}},kijunLine:{styles:{lineColor:this.color}},chikouLine:{styles:{lineColor:this.color}},senkouSpanA:{styles:{lineColor:this.color,fill:C(this.color).setOpacity(.5).get()}},senkouSpanB:{styles:{lineColor:this.color,fill:C(this.color).setOpacity(.5).get()}},senkouSpan:{styles:{fill:C(this.color).setOpacity(.2).get()}}},this.options)},toYData:function(a){return[a.tenkanSen,a.kijunSen,
a.chikouSpan,a.senkouSpanA,a.senkouSpanB]},translate:function(){var a=this;u.prototype.translate.apply(a);a.points.forEach(function(d){a.pointArrayMap.forEach(function(b){E(d[b])&&(d["plot"+b]=a.yAxis.toPixels(d[b],!0),d.plotY=d["plot"+b],d.tooltipPos=[d.plotX,d["plot"+b]],d.isNull=!1)})})},drawGraph:function(){var a=this,d=a.points,b=d.length,e=a.options,g=a.graph,k=a.color,m={options:{gapSize:e.gapSize}},h=a.pointArrayMap.length,p=[[],[],[],[],[],[]],c={tenkanLine:p[0],kijunLine:p[1],chikouLine:p[2],
senkouSpanA:p[3],senkouSpanB:p[4],senkouSpan:p[5]},v=[],f=a.options.senkouSpan,w=f.color||f.styles.fill,q=f.negativeColor,r=[[],[]],A=[[],[]],x=0,t,y,z;for(a.ikhMap=c;b--;){var l=d[b];for(t=0;t<h;t++)f=a.pointArrayMap[t],E(l[f])&&p[t].push({plotX:l.plotX,plotY:l["plot"+f],isNull:!1});q&&b!==d.length-1&&(f=c.senkouSpanB.length-1,l=H(c.senkouSpanA[f-1],c.senkouSpanA[f],c.senkouSpanB[f-1],c.senkouSpanB[f]),t={plotX:l.plotX,plotY:l.plotY,isNull:!1,intersectPoint:!0},l&&(c.senkouSpanA.splice(f,0,t),c.senkouSpanB.splice(f,
0,t),v.push(f)))}J(c,function(b,c){e[c]&&"senkouSpan"!==c&&(a.points=p[x],a.options=B(e[c].styles,m),a.graph=a["graph"+c],a.fillGraph=!1,a.color=k,u.prototype.drawGraph.call(a),a["graph"+c]=a.graph);x++});a.graphCollection&&a.graphCollection.forEach(function(b){a[b].destroy();delete a[b]});a.graphCollection=[];if(q&&c.senkouSpanA[0]&&c.senkouSpanB[0]){v.unshift(0);v.push(c.senkouSpanA.length-1);for(h=0;h<v.length-1;h++){f=v[h];l=v[h+1];b=c.senkouSpanB.slice(f,l+1);f=c.senkouSpanA.slice(f,l+1);if(1<=
Math.floor(b.length/2))if(l=Math.floor(b.length/2),b[l].plotY===f[l].plotY){for(z=t=l=0;z<b.length;z++)l+=b[z].plotY,t+=f[z].plotY;l=l>t?0:1}else l=b[l].plotY>f[l].plotY?0:1;else l=b[0].plotY>f[0].plotY?0:1;r[l]=r[l].concat(b);A[l]=A[l].concat(f)}["graphsenkouSpanColor","graphsenkouSpanNegativeColor"].forEach(function(b,c){r[c].length&&A[c].length&&(y=0===c?w:q,D({indicator:a,points:r[c],nextPoints:A[c],color:y,options:e,gap:m,graph:a[b]}),a[b]=a.graph,a.graphCollection.push(b))})}else D({indicator:a,
points:c.senkouSpanB,nextPoints:c.senkouSpanA,color:w,options:e,gap:m,graph:a.graphsenkouSpan}),a.graphsenkouSpan=a.graph;delete a.nextPoints;delete a.fillGraph;a.points=d;a.options=e;a.graph=g},getGraphPath:function(a){var d=[];a=a||this.points;if(this.fillGraph&&this.nextPoints){var b=u.prototype.getGraphPath.call(this,this.nextPoints);b[0]="L";var e=u.prototype.getGraphPath.call(this,a);b=b.slice(0,e.length);for(var g=b.length-1;0<g;g-=3)d.push(b[g-2],b[g-1],b[g]);e=e.concat(d)}else e=u.prototype.getGraphPath.apply(this,
arguments);return e},getValues:function(a,d){var b=d.period,e=d.periodTenkan;d=d.periodSenkouSpanB;var g=a.xData,k=a.yData,m=k&&k.length||0;a=G(a.xAxis);var h=[],p=[],c;if(!(g.length<=b)&&I(k[0])&&4===k[0].length){var v=g[0]-b*a;for(c=0;c<b;c++)p.push(v+c*a);for(c=0;c<m;c++){if(c>=e){var f=k.slice(c-e,c);f=y(f);f=(f.high+f.low)/2}if(c>=b){var w=k.slice(c-b,c);w=y(w);w=(w.high+w.low)/2;var x=(f+w)/2}if(c>=d){var r=k.slice(c-d,c);r=y(r);r=(r.high+r.low)/2}v=k[c][3];var u=g[c];h[c]===q&&(h[c]=[]);h[c+
b]===q&&(h[c+b]=[]);h[c+b][0]=f;h[c+b][1]=w;h[c+b][2]=q;h[c][2]=v;c<=b&&(h[c+b][3]=q,h[c+b][4]=q);h[c+2*b]===q&&(h[c+2*b]=[]);h[c+2*b][3]=x;h[c+2*b][4]=r;p.push(u)}for(c=1;c<=b;c++)p.push(u+c*a);return{values:h,xData:p,yData:h}}}});""});g(e,"masters/indicators/ichimoku-kinko-hyo.src.js",[],function(){})});
//# sourceMappingURL=ichimoku-kinko-hyo.js.map