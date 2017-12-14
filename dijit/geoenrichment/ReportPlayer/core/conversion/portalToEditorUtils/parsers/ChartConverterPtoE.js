// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["dojo/_base/lang","esri/dijit/geoenrichment/utils/ImageUtil","esri/dijit/geoenrichment/utils/JsonXmlConverter","../../../charts/chartUtils/ChartJsonUtil","../../ConversionUtil","esri/dijit/geoenrichment/ReportPlayer/core/charts/chartUtils/ChartTypes","./_FieldInfoBuilder"],function(t,e,r,a,i,s,n){function o(t,e,i){var o=r.queryJson(t,"series").filter(function(t){return t.tags&&t.tags[0]&&"point"===t.tags[0].name});return o.map(function(o){if(!o.tags)return null;o.attributes=o.attributes||{};var l={label:o.attributes.Text||"",color:g(o.attributes.color),thickness:o.attributes.thickness,points:o.tags.map(function(o,l){o.attributes=o.attributes||{};var u=t.attributes.type===s.GAUGE&&1===l,c=o.tags&&o.tags[0],b=c&&c.attributes&&c.attributes.f,d=b&&n.getCalculatorOrScriptFieldInfo(b,e,null,i&&i.calculatorName);if(d||u){var p=o.attributes.CaptionField,h=p&&n.getCalculatorOrScriptFieldInfo(p,e,null,i&&i.calculatorName),m=r.queryJson(o,"pointIcon")[0],y=m&&e.parsers.getParser("field").parseField(m.tags[0],m,null,e);return a.createChartPoint(d,o.attributes.Text,g(o.attributes.color),y,h)}}).filter(function(t){return!!t})};return l}).filter(function(t){return t&&t.points&&!!t.points.length})}function l(t){var a=r.queryJson(t,"BackImage")[0];return a&&a.tags&&"#text"===a.tags[0].name?e.base64DataToDataURL(a.tags[0].text):null}function u(t){return"string"!=typeof t?0:(t=t.replace("%",""),"0"===t?0:t.replace("0.","").length)}function g(t){return"string"==typeof t&&6===t.length&&-1===t.indexOf("#")?"#"+t:t}var c={};return c.portalToEditor=function(e,n,c){function b(t,e){return void 0===t?e:Number(t)||e}var d,p=r.queryJson(e,"comparisonInfo")[0];if(p){var h=p.attributes.name,m=c.templateJson.metadata.comparisonCalculatorsHash[h];m&&(d={calculatorName:h,chartType:p.attributes.chartType,color:p.attributes.color,levels:m.levels})}var y=o(e,c,d);if(!y.length)return null;var f=e.attributes,v=r.queryJson(e,"chartTitle")[0],P=r.queryJson(e,"legend")[0],C=r.queryJson(e,"xAxis")[0],S=r.queryJson(e,"yAxis")[0],k=r.queryJson(e,"chartIcon"),k=r.queryJson(e,"chartIcon"),x=r.queryJson(e,"floatingIcon"),L=r.queryJson(e,"floatingText"),I=r.queryJson(e,"trigger");v.attributes=v.attributes||{},P.attributes=P.attributes||{},C.attributes=C.attributes||{},S.attributes=S.attributes||{},y.forEach(function(t){t.thickness=Number(t.thickness)});var T;s.isColumnBarLike(f.type)&&(T=y[0].thickness>1?"Large":y[0].thickness<1?"Small":"Medium");var w=C.tags&&C.tags[0].attributes&&C.tags[0].attributes,A=S.tags&&S.tags[0].attributes&&S.tags[0].attributes,O=l(e),N={isChart:!0,type:f._type||f.type,seriesItems:y,visualProperties:{width:i.ptToPx(f.width),height:i.ptToPx(f.height),backgroundColor:g(f.backColor),barBorders:f.barBorders,dataLabels:f.dataLabels,view3D:!!f.view3D,origin:Number(f.origin)||0,lineThickness:f.type===s.LINE&&y[0].thickness||void 0,columnThickness:T,backgroundImageData:O,dataLabelsDecimals:u(f.CustomPercentFormat||f.CustomValueFormat),title:{text:v.attributes.text,align:v.attributes.align&&v.attributes.align.toLowerCase(),style:i.ptToPxObj(i.parseStyleString(v.attributes.style))},xAxis:{show:"None"!==C.attributes.placement,showTicks:C.attributes.ticks,style:i.ptToPxObj(i.parseStyleString(C.attributes.style)),title:w&&w.text,gridLines:C.attributes.gridlines,gridLinesCentered:C.attributes.gridlinesCentered,titleStyle:w&&i.ptToPxObj(i.parseStyleString(w.style)),placement:"OtherSide"===C.attributes.placement?"OtherSide":void 0,labelsAngle:Number(C.attributes.labelsAngle)||0,showLine:C.attributes.line,lineColor:C.attributes.lineColor,ticksInside:C.attributes.ticksInside,gridLinesOpacity:b(C.attributes.gridlinesOpacity,1)},yAxis:{show:"None"!==S.attributes.placement,showTicks:S.attributes.ticks,style:i.ptToPxObj(i.parseStyleString(S.attributes.style)),title:A&&A.text,gridLines:S.attributes.gridlines,gridLinesCentered:S.attributes.gridlinesCentered,titleStyle:A&&i.ptToPxObj(i.parseStyleString(A.style)),placement:"OtherSide"===S.attributes.placement?"OtherSide":void 0,labelsAngle:Number(S.attributes.labelsAngle)||0,showLine:S.attributes.line,lineColor:S.attributes.lineColor,ticksInside:S.attributes.ticksInside,gridLinesOpacity:b(S.attributes.gridlinesOpacity,1)},legend:{hasBorder:P.attributes.hasBorder,labelParts:P.attributes.labelParts,placement:P.attributes.placement,placementOffset:Number(P.attributes.placementOffset)||0,style:i.ptToPxObj(i.parseStyleString(P.attributes.style))},dataLabelsStyle:i.ptToPxObj(i.parseStyleString(f.dataLabelsStyle))}};N.isMultiFeatureChart=!!f.isMultiFeatureChart,t.mixin(N.visualProperties,{isStacked:f.isStacked,showColumnBarBackground:f.showColumnBarBackground,columnBarBackgroundColor:f.columnBarBackgroundColor,fillLineArea:f.fillLineArea,donutHolePercent:Number(f.donutHolePercent)||void 0,donutGap:Number(f.donutGap)||void 0,donutArcPercent:Number(f.donutArcPercent)||void 0,gaugeHolePercent:Number(f.gaugeHolePercent)||void 0,gaugeGap:Number(f.gaugeGap)||void 0,gaugeStartAngle:Number(f.gaugeStartAngle)||void 0,gaugeArcPercent:Number(f.gaugeArcPercent)||void 0,gaugeLabelStyle:i.ptToPxObj(i.parseStyleString(f.gaugeLabelStyle))||void 0,gaugeLabelPlacement:f.gaugeLabelPlacement||void 0,gaugeShowArrow:f.gaugeShowArrow||void 0,gaugeArrowLineColor:f.gaugeArrowLineColor||void 0,gaugeArrowFillColor:f.gaugeArrowFillColor||void 0,ringBackgroundColor:f.ringBackgroundColor,showWholePictures:f.showWholePictures,dataLabelsInside:f.dataLabelsInside,dataLabelsStackedInColumns:f.dataLabelsStackedInColumns,dataLabelsHorizontalAlign:f.dataLabelsHorizontalAlign,showAxisIcons:f.showAxisIcons,showChartIcons:f.showChartIcons,sorting:f.sorting}),c.revisionVersion<1.2&&(void 0!==N.visualProperties.donutGap&&(N.visualProperties.donutGap/=2*Math.PI),void 0!==N.visualProperties.gaugeGap&&(N.visualProperties.gaugeGap/=2*Math.PI)),k&&k.length&&(N.visualProperties.chartIcons=k.map(function(t){return t.tags&&t.tags[0]?c.parsers.getParser("field").parseField(t.tags[0],t,null,c):null})),x&&x.length&&(N.visualProperties.floatingIcons=x.map(function(t){return c.parsers.getParser("section").parseTable(t.tags[0],c)})),L&&L.length&&(N.visualProperties.floatingTexts=L.map(function(t){return c.parsers.getParser("section").parseTable(t.tags[0],c)})),I&&I.length&&(N.visualProperties.conditionalStyling=c.parsers.getParser("field").parseFieldTrigger(I[0])),N.comparisonInfo=d;var B={};return n.attributes&&n.attributes.style&&t.mixin(B,i.parseStyleString(n.attributes.style)),i.ptToPxObj(B),a.provideDefaultValueForMissing(N,{font:B}),N},c});