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
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.

define(["require","../Widget","./PopupRendererViewModel","../../core/requireUtils","../../core/watchUtils","dojo/_base/lang","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/on","dijit/_TemplatedMixin","dijit/a11yclick","dojo/i18n!./nls/PopupRenderer","dojo/text!./templates/PopupRenderer.html"],function(e,t,i,r,a,n,s,o,d,c,m,p,l,h){var u={iconText:"esri-icon-font-fallback-text",iconLoading:"esri-icon-loading-indicator esri-rotating",iconDownload:"esri-icon-download",iconLeftTriangleArrow:"esri-icon-left-triangle-arrow",iconRightTriangleArrow:"esri-icon-right-triangle-arrow",iconMedia:"esri-icon-media",iconChart:"esri-icon-chart",base:"esri-popup-renderer",container:"esri-popup-renderer__size-container",main:"esri-popup-renderer__main-container",btn:"esri-popup-renderer__button",icon:"esri-popup-renderer__icon",content:"esri-popup-renderer__content",contentElement:"esri-popup-renderer__content-element",text:"esri-popup-renderer__text",showMediaPagination:"esri-popup-renderer--media-pagination-visible",attachments:"esri-popup-renderer__attachments",attachmentsTitle:"esri-popup-renderer__attachments-title",attachmentsItem:"esri-popup-renderer__attachments-item",attachmentsItemIcon:"esri-popup-renderer__attachments-item-icon",fields:"esri-popup-renderer__fields",media:"esri-popup-renderer__media",mediaContainer:"esri-popup-renderer__media-container",mediaItemContainer:"esri-popup-renderer__media-item-container",mediaItem:"esri-popup-renderer__media-item",mediaItemTitle:"esri-popup-renderer__media-item-title",mediaItemCaption:"esri-popup-renderer__media-item-caption",mediaPrevious:"esri-popup-renderer__media-previous",mediaPreviousIconLTR:"esri-popup-renderer__media-previous-icon",mediaPreviousIconRTL:"esri-popup-renderer__media-previous-icon--rtl",mediaNext:"esri-popup-renderer__media-next",mediaNextIconLTR:"esri-popup-renderer__media-next-icon",mediaNextIconRTL:"esri-popup-renderer__media-next-icon--rtl",mediaSummary:"esri-popup-renderer__media-summary",mediaCount:"esri-popup-renderer__media-count",mediaImageSummary:"esri-popup-renderer__media-image-summary",mediaImageIcon:"esri-popup-renderer__media-image-icon",mediaChart:"esri-popup-renderer__media-chart",mediaChartSummary:"esri-popup-renderer__media-chart-summary",mediaChartIcon:"esri-popup-renderer__media-chart-icon",loading:"esri-popup-renderer__loading",loadingSpinnerContainer:"esri-popup-renderer__loading-container",spinner:"esri-popup-renderer__loading-spinner"},_=/^\s*(https?:\/\/[^\s]+)\s*$/i,f="data-element-index",v={previous:"previous",next:"next"},g=t.createSubclass([m],{declaredClass:"esri.widgets.Popup.PopupRenderer",templateString:h,properties:{viewModel:{type:i}},baseClass:u.base,constructor:function(){this._charts=[],this._chartTooltips=[]},postCreate:function(){this.inherited(arguments);var e=this,t=this.viewModel;this.own(a.init(t,"waitingForContent",this._loadingSpinner.bind(this)),a.init(t,"content",this._render.bind(this)),c(this._contentNode,c.selector("."+u.mediaNext,p),function(){e._nextMedia(this)}),c(this._contentNode,c.selector("."+u.mediaPrevious,p),function(){e._previousMedia(this)}))},destroy:function(){this._destroyCharts(),this._clearResizeTimer()},_i18n:l,_css:u,resize:function(){this._resizeCharts(),this.emit("resize")},_clearResizeTimer:function(){this._mediaResizeTimer&&(clearTimeout(this._mediaResizeTimer),this._mediaResizeTimer=0)},_countMediaInfos:function(e){var t=0,i=0;return e.forEach(function(e){"image"===e.type?t++:-1!==e.type.indexOf("chart")&&i++}),{total:i+t,images:t,charts:i}},_createMediaNodes:function(e){this._destroyCharts();var t=e.mediaIndex,i=e.mediaInfos[t],r=e.node;d.empty(r);var a=d.create("div",{className:u.mediaItem},r),n=this._createMediaType(i,t);d.place(n,a,"only"),i.title&&d.create("div",{className:u.mediaItemTitle,innerHTML:i.title},r),i.caption&&d.create("div",{className:u.mediaItemCaption,innerHTML:i.caption},r),this._clearResizeTimer(),this._mediaResizeTimer=setTimeout(function(){this.resize(),this._clearResizeTimer()}.bind(this),0)},_createMediaType:function(t,i){var a,n=t.value;if("image"===t.type){var s=d.create("img",{alt:t.title||"",src:n.sourceURL});n.linkURL?(a=d.create("a",{title:t.title||"",href:n.linkURL,target:this._preventNewTab(n.linkURL)?"":"_blank"}),d.place(s,a)):a=s}else if(-1!==t.type.indexOf("chart")){a=d.create("div",{className:u.mediaChart},a);var o=["dojox/charting/Chart2D","dojox/charting/action2d/Tooltip"],c=t.value.theme||this.chartTheme;"string"==typeof c&&(c=c.replace(/\./gi,"/"),-1===c.indexOf("/")&&(c="dojox/charting/themes/"+c)),c||(c="dojox/charting/themes/Claro"),o.push(c),this._cancelChartModules(),this._chartsPromise=r.when(e,o).then(function(e){var i=e[0],r=e[1],n=e[2];this._showChart(a,t.type,t.value,i,r,n),this._chartsPromise=null}.bind(this))}return a},_cancelChartModules:function(){this._chartsPromise&&this._chartsPromise.cancel()},_destroyCharts:function(){this._cancelChartModules();var e;if(this._chartTooltips&&this._chartTooltips.length)for(e=0;e<this._chartTooltips.length;e++)this._chartTooltips[e].destroy();if(this._chartTooltips.length=0,this._charts&&this._charts.length)for(e=0;e<this._charts.length;e++)this._charts[e].destroy();this._charts.length=0},_loadingSpinner:function(e){o.toggle(this.domNode,u.loading,!!e)},_nextMedia:function(e){this._pageMedia(e,v.next)},_pageMedia:function(e,t){var i,r,a=s.get(e,f);if(a&&(i=parseInt(a,10),r=this._elementInfo[i]),r){var n=r.mediaInfos,o=r.mediaIndex;t===v.previous?o--:o++,n&&n.length&&(o=(o+n.length)%n.length),r.mediaIndex=o,this._createMediaNodes(r)}},_preventNewTab:function(e){return e=e&&n.trim(e).toLowerCase(),e&&(0===e.indexOf("mailto:")||0===e.indexOf("tel:"))},_previousMedia:function(e){this._pageMedia(e,v.previous)},_render:function(e){this._elementInfo=[],this._destroyCharts(),d.empty(this._contentNode);var t=this.viewModel;if(e)if("string"==typeof e){var i=this._renderText({type:"text",text:e});i&&d.place(i,this._contentNode,"only")}else e.nodeName?d.place(e,this._contentNode,"only"):Array.isArray(e)&&e.forEach(function(e,i){var r,a=e.type;switch(a){case t.contentTypes.attachments:r=this._renderAttachments(e,i);break;case t.contentTypes.fields:r=this._renderFields(e,i);break;case t.contentTypes.media:r=this._renderMedia(e,i);break;case t.contentTypes.text:r=this._renderText(e,i)}r&&d.place(r,this._contentNode,0===i?"only":"last")},this);this.resize()},_renderAttachments:function(e,t){var i,r=e.attachmentInfos;if(r&&r.length){i=d.create("div"),o.add(i,[u.attachments,u.contentElement]),d.create("div",{className:u.attachmentsTitle,textContent:l.attach},i);var a=d.create("ul",{},i);r.forEach(function(e){var t=d.create("li",{},a),i=d.create("a",{href:e.url,target:"_blank"},t);d.create("span",{className:u.iconDownload+" "+u.attachmentsItemIcon},i),d.create("span",{className:u.attachmentsItem,textContent:e.name||l.noTitle},i)},this)}return i},_renderFields:function(e,t){var i,r=this.viewModel,a=r.graphic.getEffectivePopupTemplate(),n=e.fieldInfos||a&&a.fieldInfos;if(n){var s=r.formattedAttributes.content[t]||r.formattedAttributes.global;i=d.create("div"),o.add(i,[u.fields,u.contentElement]);var c=d.create("table",{summary:l.fieldsSummary},i),m=d.create("tbody",{},c);n.forEach(function(e){var t=e.hasOwnProperty("visible")?e.visible:!0;if(t){var i,r=e.fieldName,a=e.label||r,n=s[r]||"";n&&"string"==typeof n&&(i=n.replace(_,'<a target="_blank" href="$1" title="'+a+'">'+l.view+"</a>"));var o=d.create("tr",{},m),c=a,p=n;i&&i!==n&&(c=a,p=i),d.create("th",{innerHTML:c},o),d.create("td",{innerHTML:p},o)}},this)}return i},_renderMedia:function(e,t){var i,r=e.mediaInfos;if(r&&r.length){var a=this._countMediaInfos(r),s={tabIndex:"0",role:"button"};s[f]=t,i=d.create("div"),o.add(i,[u.media,u.contentElement]);var c=a.total>1;o.toggle(i,u.showMediaPagination,c);var m=d.create("ul",{className:u.mediaSummary},i),p=d.create("li",{className:u.mediaImageSummary},m);d.create("span",{className:u.mediaCount,"aria-label":l.numImages,textContent:"("+a.images+")"},p),d.create("span",{"aria-hidden":!0,className:u.mediaImageIcon+" "+u.iconMedia},p);var h=d.create("li",{className:u.mediaImageSummary},m);d.create("span",{className:u.mediaCount,"aria-label":l.numCharts,textContent:"("+a.charts+")"},h),d.create("span",{"aria-hidden":!0,className:u.mediaChartIcon+" "+u.iconChart},h);var _=d.create("div",{className:u.mediaContainer},i),v=d.create("div",n.mixin({title:l.previous},s),_);o.add(v,[u.btn,u.mediaPrevious]);var g=d.create("span",{"aria-hidden":!0},v);o.add(g,[u.icon,u.mediaPreviousIconLTR,u.iconLeftTriangleArrow]);var x=d.create("span",{"aria-hidden":!0},v);o.add(x,[u.icon,u.mediaPreviousIconRTL,u.iconRightTriangleArrow]),d.create("span",{className:u.iconText,textContent:l.previous},v);var T=d.create("div",{className:u.mediaItemContainer},_),y={mediaIndex:0,node:T,mediaInfos:r};this._elementInfo[t]=y,this._createMediaNodes(y);var I=d.create("div",n.mixin({title:l.next},s),_);o.add(I,[u.btn,u.mediaNext]);var b=d.create("span",{"aria-hidden":!0},I);o.add(b,[u.icon,u.mediaNextIconLTR,u.iconRightTriangleArrow]);var C=d.create("span",{"aria-hidden":!0},I);o.add(C,[u.icon,u.mediaNextIconRTL,u.iconLeftTriangleArrow]),d.create("span",{className:u.iconText,textContent:l.next},I)}return i},_renderText:function(e,t){var i;return e&&e.text&&(i=d.create("div",{innerHTML:e.text}),o.add(i,[u.text,u.contentElement])),i},_resizeCharts:function(){if(this._charts&&this._charts.length)for(var e=0;e<this._charts.length;e++){var t=this._charts[e],i=t.node;i&&i.offsetWidth&&i.offsetHeight&&t.resize()}},_showChart:function(e,t,i,r,a,n){var s=new r(e,{margins:{l:4,t:4,r:4,b:4}});switch(n&&s.setTheme(n),t){case"pie-chart":s.addPlot("default",{type:"Pie",labels:!1}),s.addSeries("Series A",i.fields);break;case"line-chart":s.addPlot("default",{type:"Markers"}),s.addAxis("x",{min:0,majorTicks:!1,minorTicks:!1,majorLabels:!1,minorLabels:!1}),s.addAxis("y",{includeZero:!0,vertical:!0,fixUpper:"minor"}),i.fields.forEach(function(e,t){e.x=t+1}),s.addSeries("Series A",i.fields);break;case"column-chart":s.addPlot("default",{type:"Columns",gap:3}),s.addAxis("y",{includeZero:!0,vertical:!0,fixUpper:"minor"}),s.addSeries("Series A",i.fields);break;case"bar-chart":s.addPlot("default",{type:"Bars",gap:3}),s.addAxis("x",{includeZero:!0,fixUpper:"minor",minorLabels:!1}),s.addAxis("y",{vertical:!0,majorTicks:!1,minorTicks:!1,majorLabels:!1,minorLabels:!1}),s.addSeries("Series A",i.fields)}var o=new a(s);s.render(),this._charts.push(s),this._chartTooltips.push(o)}});return g});