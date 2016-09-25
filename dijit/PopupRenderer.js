// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/3.18/esri/copyright.txt for details.

define(["require","dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array","dojo/_base/kernel","dojo/sniff","dojo/query","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojox/html/entities","dijit/_Widget","dijit/_Templated","../kernel","../urlUtils","./_EventedWidget","dojo/i18n!../nls/jsapi","dojo/NodeList-dom"],function(e,i,t,a,d,s,n,o,r,h,l,c,m,_,u,v,p,f,g,y){var j=0,L=i([g,u,v],{declaredClass:"esri.dijit._PopupRenderer",constructor:function(){this._nls=a.mixin({},y.widgets.popup)},templateString:"<div class='esriViewPopup'><div class='mainSection'><div class='header' dojoAttachPoint='_title'></div><div class='hzLine'></div><div dojoAttachPoint='_description'></div><div class='break'></div></div><div class='attachmentsSection hidden'><div>${_nls.NLS_attach}:</div><ul dojoAttachPoint='_attachmentsList'></ul><div class='break'></div></div><div class='mediaSection hidden'><div class='header' dojoAttachPoint='_mediaTitle'></div><div class='hzLine'></div><div class='caption' dojoAttachPoint='_mediaCaption'></div><div class='gallery' dojoAttachPoint='_gallery'><div class='mediaHandle prev' dojoAttachPoint='_prevMedia' dojoAttachEvent='onclick: _goToPrevMedia'></div><div class='mediaHandle next' dojoAttachPoint='_nextMedia' dojoAttachEvent='onclick: _goToNextMedia'></div><ul class='summary'><li class='image mediaCount hidden' dojoAttachPoint='_imageCount'>0</li><li class='image mediaIcon hidden'></li><li class='chart mediaCount hidden' dojoAttachPoint='_chartCount'>0</li><li class='chart mediaIcon hidden'></li></ul><div class='frame' dojoAttachPoint='_mediaFrame'></div></div></div><div class='editSummarySection hidden' dojoAttachPoint='_editSummarySection'><div class='break'></div><div class='break hidden' dojoAttachPoint='_mediaBreak'></div><div class='editSummary' dojoAttachPoint='_editSummary'></div></div></div>",showTitle:!0,startup:function(){this.inherited(arguments),this.template.getComponents(this.graphic).then(a.hitch(this,this._handleComponentsSuccess),a.hitch(this,this._handleComponentsError))},destroy:function(){this._dfd&&this._dfd.cancel(),this._destroyFrame(),this.template=this.graphic=this._nls=this._mediaInfos=this._mediaPtr=this._dfd=null,this.inherited(arguments)},_goToPrevMedia:function(){var e=this._mediaPtr-1;0>e||(this._mediaPtr--,this._updateUI(),this._displayMedia())},_goToNextMedia:function(){var e=this._mediaPtr+1;e!==this._mediaInfos.length&&(this._mediaPtr++,this._updateUI(),this._displayMedia())},_updateUI:function(){var e=this._mediaInfos,i=e.length,t=this.domNode,a=this._prevMedia,n=this._nextMedia;if(i>1){var o=0,r=0;d.forEach(e,function(e){"image"===e.type?o++:-1!==e.type.indexOf("chart")&&r++}),o&&(h.set(this._imageCount,"innerHTML",o),s.query(".summary .image",t).removeClass("hidden")),r&&(h.set(this._chartCount,"innerHTML",r),s.query(".summary .chart",t).removeClass("hidden"))}else s.query(".summary",t).addClass("hidden"),l.add(a,"hidden"),l.add(n,"hidden");var c=this._mediaPtr;0===c?l.add(a,"hidden"):l.remove(a,"hidden"),c===i-1?l.add(n,"hidden"):l.remove(n,"hidden"),this._destroyFrame()},_displayMedia:function(){var i=this._mediaInfos[this._mediaPtr],t=i.title,d=i.caption,n=s.query(".mediaSection .hzLine",this.domNode)[0];if(h.set(this._mediaTitle,"innerHTML",t),l[t?"remove":"add"](this._mediaTitle,"hidden"),h.set(this._mediaCaption,"innerHTML",d),l[d?"remove":"add"](this._mediaCaption,"hidden"),l[t&&d?"remove":"add"](n,"hidden"),this._rid=null,"image"===i.type)this._showImage(i.value);else{var o=this,r=["dojox/charting/Chart2D","dojox/charting/action2d/Tooltip"],c=i.value.theme||this.chartTheme;a.isString(c)&&(c=c.replace(/\./gi,"/"),-1===c.indexOf("/")&&(c="dojox/charting/themes/"+c)),c||(c="./Rainbow"),r.push(c);try{var m=this._rid=j++;e(r,function(e,t,a){m===o._rid&&(o._rid=null,o._showChart(i.type,i.value,e,t,a))})}catch(_){console.log("PopupRenderer: error loading modules")}}},_preventNewTab:function(e){return e=e&&a.trim(e).toLowerCase(),e&&(0===e.indexOf("mailto:")||0===e.indexOf("tel:"))},_showImage:function(e){l.add(this._mediaFrame,"image");var i,a=m.get(this._gallery,"height");e.linkURL&&(i=c.create("a",{href:e.linkURL,target:this._preventNewTab(e.linkURL)?"":"_blank"},this._mediaFrame)),c.create("img",{className:"esriPopupMediaImage",src:e.sourceURL},i||this._mediaFrame);var d,n=s.query(".esriPopupMediaImage",this._mediaFrame)[0],o=this;d=t.connect(n,"onload",function(){t.disconnect(d),d=null,o._imageLoaded(n,a)})},_showChart:function(e,i,t,a,s){l.remove(this._mediaFrame,"image");var n=this._chart=new t(c.create("div",{"class":"chart"},this._mediaFrame),{margins:{l:4,t:4,r:4,b:4}});switch(s&&n.setTheme(s),e){case"piechart":n.addPlot("default",{type:"Pie",labels:!1}),n.addSeries("Series A",i.fields);break;case"linechart":n.addPlot("default",{type:"Markers"}),n.addAxis("x",{min:0,majorTicks:!1,minorTicks:!1,majorLabels:!1,minorLabels:!1}),n.addAxis("y",{includeZero:!0,vertical:!0,fixUpper:"minor"}),d.forEach(i.fields,function(e,i){e.x=i+1}),n.addSeries("Series A",i.fields);break;case"columnchart":n.addPlot("default",{type:"Columns",gap:3}),n.addAxis("y",{includeZero:!0,vertical:!0,fixUpper:"minor"}),n.addSeries("Series A",i.fields);break;case"barchart":n.addPlot("default",{type:"Bars",gap:3}),n.addAxis("x",{includeZero:!0,fixUpper:"minor",minorLabels:!1}),n.addAxis("y",{vertical:!0,majorTicks:!1,minorTicks:!1,majorLabels:!1,minorLabels:!1}),n.addSeries("Series A",i.fields)}this._action=new a(n),n.render()},_destroyFrame:function(){this._rid=null,this._chart&&(this._chart.destroy(),this._chart=null),this._action&&(this._action.destroy(),this._action=null),h.set(this._mediaFrame,"innerHTML","")},_imageLoaded:function(e,i){var t=e.height;if(i>t){var a=Math.round((i-t)/2);m.set(e,"marginTop",a+"px")}},_attListHandler:function(e,i){if(e===this._dfd){this._dfd=null;var t="";i instanceof Error||!i||!i.length||d.forEach(i,function(e){t+="<li>",t+="<a href='"+f.addProxy(e.url)+"' target='_blank'>"+(e.name||"[No name]")+"</a>",t+="</li>"}),h.set(this._attachmentsList,"innerHTML",t||"<li>"+this._nls.NLS_noAttach+"</li>")}},_handleComponentsSuccess:function(e){if(e){var i=this.showTitle?e.title:"",t=e.description,n=e.fields,o=e.mediaInfos,c=this.domNode,m=this._nls,u=this,v=this.template,p=this.graphic;this._prevMedia.title=m.NLS_prevMedia,this._nextMedia.title=m.NLS_nextMedia,h.set(this._title,"innerHTML",i),i||l.add(this._title,"hidden"),!e.hasDescription&&n&&(t="",d.forEach(n,function(e){t+="<tr valign='top'>",t+="<td class='attrName'>"+_.encode(e[0])+"</td>",t+="<td class='attrValue'>"+e[1].replace(/^\s*(https?:\/\/[^\s]+)\s*$/i,"<a target='_blank' href='$1' title='$1'>"+m.NLS_moreInfo+"</a>")+"</td>",t+="</tr>"}),t&&(t="<table class='attrTable' cellpadding='0px' cellspacing='0px'>"+t+"</table>")),h.set(this._description,"innerHTML",t),t||l.add(this._description,"hidden"),s.query("a",this._description).forEach(function(e){u._preventNewTab(e.href)?"_blank"===e.target&&h.remove(e,"target"):h.set(e,"target","_blank")}),i&&t?s.query(".mainSection .hzLine",c).removeClass("hidden"):i||t?s.query(".mainSection .hzLine",c).addClass("hidden"):s.query(".mainSection",c).addClass("hidden");var f=this._dfd=v.getAttachments(p);f&&(f.addBoth(a.hitch(this,this._attListHandler,f)),h.set(this._attachmentsList,"innerHTML","<li>"+m.NLS_searching+"...</li>"),s.query(".attachmentsSection",c).removeClass("hidden")),o&&o.length&&(s.query(".mediaSection",c).removeClass("hidden"),r.setSelectable(this._mediaFrame,!1),this._mediaInfos=o,this._mediaPtr=0,this._updateUI(),this._displayMedia()),e.editSummary&&(h.set(this._editSummary,"innerHTML",e.editSummary),o&&o.length&&l.remove(this._mediaBreak,"hidden"),l.remove(this._editSummarySection,"hidden"))}},_handleComponentsError:function(e){console.log("PopupRenderer: error loading template",e)}});return n("extend-esri")&&a.setObject("dijit._PopupRenderer",L,p),L});