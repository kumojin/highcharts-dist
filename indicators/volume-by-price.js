/*
 Highstock JS v8.0.2 (2020-03-03)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/indicators/volume-by-price",["highcharts","highcharts/modules/stock"],function(m){b(m);b.Highcharts=m;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function m(b,m,f,p){b.hasOwnProperty(m)||(b[m]=p.apply(null,f))}b=b?b._modules:{};m(b,"indicators/volume-by-price.src.js",[b["parts/Globals.js"],b["parts/Point.js"],b["parts/Utilities.js"]],
function(b,m,f){var p=f.addEvent,C=f.animObject,A=f.arrayMax,D=f.arrayMin,y=f.correctFloat,z=f.error,E=f.extend,F=f.isArray;f=f.seriesType;var v=Math.abs,B=b.noop,x=b.seriesTypes.column.prototype;f("vbp","sma",{params:{ranges:12,volumeSeriesID:"volume"},zoneLines:{enabled:!0,styles:{color:"#0A9AC9",dashStyle:"LongDash",lineWidth:1}},volumeDivision:{enabled:!0,styles:{positiveColor:"rgba(144, 237, 125, 0.8)",negativeColor:"rgba(244, 91, 91, 0.8)"}},animationLimit:1E3,enableMouseTracking:!1,pointPadding:0,
zIndex:-1,crisp:!0,dataGrouping:{enabled:!1},dataLabels:{allowOverlap:!0,enabled:!0,format:"P: {point.volumePos:.2f} | N: {point.volumeNeg:.2f}",padding:0,style:{fontSize:"7px"},verticalAlign:"top"}},{nameBase:"Volume by Price",bindTo:{series:!1,eventName:"afterSetExtremes"},calculateOn:"render",markerAttribs:B,drawGraph:B,getColumnMetrics:x.getColumnMetrics,crispCol:x.crispCol,init:function(c){b.seriesTypes.sma.prototype.init.apply(this,arguments);var a=this.options.params;var h=this.linkedParent;
a=c.get(a.volumeSeriesID);this.addCustomEvents(h,a);return this},addCustomEvents:function(c,a){function h(){e.chart.redraw();e.setData([]);e.zoneStarts=[];e.zoneLinesSVG&&(e.zoneLinesSVG.destroy(),delete e.zoneLinesSVG)}var e=this;e.dataEventsToUnbind.push(p(c,"remove",function(){h()}));a&&e.dataEventsToUnbind.push(p(a,"remove",function(){h()}));return e},animate:function(c){var a=this,h={};b.svg&&!c&&(h.translateX=a.yAxis.pos,a.group.animate(h,E(C(a.options.animation),{step:function(c,h){a.group.attr({scaleX:Math.max(.001,
h.pos)})}})),a.animate=null)},drawPoints:function(){this.options.volumeDivision.enabled&&(this.posNegVolume(!0,!0),x.drawPoints.apply(this,arguments),this.posNegVolume(!1,!1));x.drawPoints.apply(this,arguments)},posNegVolume:function(c,a){var h=a?["positive","negative"]:["negative","positive"],e=this.options.volumeDivision,b=this.points.length,r=[],d=[],k=0,l;c?(this.posWidths=r,this.negWidths=d):(r=this.posWidths,d=this.negWidths);for(;k<b;k++){var g=this.points[k];g[h[0]+"Graphic"]=g.graphic;g.graphic=
g[h[1]+"Graphic"];if(c){var t=g.shapeArgs.width;var q=this.priceZones[k];(l=q.wholeVolumeData)?(r.push(t/l*q.positiveVolumeData),d.push(t/l*q.negativeVolumeData)):(r.push(0),d.push(0))}g.color=a?e.styles.positiveColor:e.styles.negativeColor;g.shapeArgs.width=a?this.posWidths[k]:this.negWidths[k];g.shapeArgs.x=a?g.shapeArgs.x:this.posWidths[k]}},translate:function(){var c=this,a=c.options,h=c.chart,e=c.yAxis,b=e.min,r=c.options.zoneLines,d=c.priceZones,k=0,l,g,t;x.translate.apply(c);var q=c.points;
if(q.length){var f=.5>a.pointPadding?a.pointPadding:.1;a=c.volumeDataArray;var m=A(a);var n=h.plotWidth/2;var G=h.plotTop;var w=v(e.toPixels(b)-e.toPixels(b+c.rangeStep));var p=v(e.toPixels(b)-e.toPixels(b+c.rangeStep));f&&(b=v(w*(1-2*f)),k=v((w-b)/2),w=v(b));q.forEach(function(a,b){g=a.barX=a.plotX=0;t=a.plotY=e.toPixels(d[b].start)-G-(e.reversed?w-p:w)-k;l=y(n*d[b].wholeVolumeData/m);a.pointWidth=l;a.shapeArgs=c.crispCol.apply(c,[g,t,l,w]);a.volumeNeg=d[b].negativeVolumeData;a.volumePos=d[b].positiveVolumeData;
a.volumeAll=d[b].wholeVolumeData});r.enabled&&c.drawZones(h,e,c.zoneStarts,r.styles)}},getValues:function(b,a){var c=b.processedXData,e=b.processedYData,f=this.chart,r=a.ranges,d=[],k=[],l=[],g;if(b.chart)if(g=f.get(a.volumeSeriesID))if((a=F(e[0]))&&4!==e[0].length)z("Type of "+b.name+" series is different than line, OHLC or candlestick.",!0,f);else return(this.priceZones=this.specifyZones(a,c,e,r,g)).forEach(function(a,b){d.push([a.x,a.end]);k.push(d[b][0]);l.push(d[b][1])}),{values:d,xData:k,yData:l};
else z("Series "+a.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,f);else z("Base series not found! In case it has been removed, add a new one.",!0,f)},specifyZones:function(b,a,h,e,f){if(b){var c=h.length;for(var d=h[0][3],k=d,l=1,g;l<c;l++)g=h[l][3],g<d&&(d=g),g>k&&(k=g);c={min:d,max:k}}else c=!1;c=(d=c)?d.min:D(h);g=d?d.max:A(h);d=this.zoneStarts=[];k=[];var t=0;l=1;if(!c||!g)return this.points.length&&(this.setData([]),this.zoneStarts=[],this.zoneLinesSVG.destroy()),[];var m=this.rangeStep=
y(g-c)/e;for(d.push(c);t<e-1;t++)d.push(y(d[t]+m));d.push(g);for(e=d.length;l<e;l++)k.push({index:l-1,x:a[0],start:d[l-1],end:d[l]});return this.volumePerZone(b,k,f,a,h)},volumePerZone:function(b,a,h,e,f){var c=this,d=h.processedXData,k=h.processedYData,l=a.length-1,g=f.length;h=k.length;var m,q,p,u,n;v(g-h)&&(e[0]!==d[0]&&k.unshift(0),e[g-1]!==d[h-1]&&k.push(0));c.volumeDataArray=[];a.forEach(function(a){a.wholeVolumeData=0;a.positiveVolumeData=0;for(n=a.negativeVolumeData=0;n<g;n++)p=q=!1,u=b?f[n][3]:
f[n],m=n?b?f[n-1][3]:f[n-1]:u,u<=a.start&&0===a.index&&(q=!0),u>=a.end&&a.index===l&&(p=!0),(u>a.start||q)&&(u<a.end||p)&&(a.wholeVolumeData+=k[n],m>u?a.negativeVolumeData+=k[n]:a.positiveVolumeData+=k[n]);c.volumeDataArray.push(a.wholeVolumeData)});return a},drawZones:function(b,a,h,e){var c=b.renderer,f=this.zoneLinesSVG,d=[],k=b.plotWidth,l=b.plotTop,g;h.forEach(function(c){g=a.toPixels(c)-l;d=d.concat(b.renderer.crispLine(["M",0,g,"L",k,g],e.lineWidth))});f?f.animate({d:d}):f=this.zoneLinesSVG=
c.path(d).attr({"stroke-width":e.lineWidth,stroke:e.color,dashstyle:e.dashStyle,zIndex:this.group.zIndex+.1}).add(this.group)}},{destroy:function(){this.negativeGraphic&&(this.negativeGraphic=this.negativeGraphic.destroy());return m.prototype.destroy.apply(this,arguments)}});""});m(b,"masters/indicators/volume-by-price.src.js",[],function(){})});
//# sourceMappingURL=volume-by-price.js.map