/*! 
// ==UserScript==
// @namespace https://github.com/dotennin/baidu-pan-downloader
// @name 百度网盘下载管理器
// @description A download manager for Baidu Yun
// @version 1.2.0
// @author Dotennin
// @license MIT
// @compatible        chrome/83.0.4103.97 passed
// @compatible        edge/83.0.478.54 passed
// @compatible        firefox untested
// @compatible        opera untested
// @compatible        safari untested
// @include https://pan.baidu.com/disk/*
// @connect baidu.com
// @connect qdall01.baidupcs.com
// @grant GM_xmlhttpRequest
// @grant GM_download
// @grant GM_notification
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_addValueChangeListener
// @run-at document-idle
// ==/UserScript==
 */
!function(n){var e={};function r(a){if(e[a])return e[a].exports;var t=e[a]={i:a,l:!1,exports:{}};return n[a].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=n,r.c=e,r.d=function(n,e,a){r.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:a})},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,e){if(1&e&&(n=r(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var t in n)r.d(a,t,function(e){return n[e]}.bind(null,t));return a},r.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(e,"a",e),e},r.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},r.p="",r(r.s=3)}([function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return InstanceForSystem}));var _types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1),_gmInterface_gmInterface__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2),InstanceForSystem={list:eval("require('system-core:context/context.js')").instanceForSystem.list,autoStart:!0,maxDownloadCount:1,downloadingItems:{},stoppedItems:{},completedItems:{},allDownloads:{},initState:function(){var n=this,e=_gmInterface_gmInterface__WEBPACK_IMPORTED_MODULE_1__.a.getValue(_types__WEBPACK_IMPORTED_MODULE_0__.b.items,{});return _gmInterface_gmInterface__WEBPACK_IMPORTED_MODULE_1__.a.deleteValue(_types__WEBPACK_IMPORTED_MODULE_0__.b.items),this.allDownloads=e,Object.values(e).forEach((function(e){e.status===_types__WEBPACK_IMPORTED_MODULE_0__.a.completed&&(n.completedItems[e.fs_id]=e),e.status===_types__WEBPACK_IMPORTED_MODULE_0__.a.stopped&&(n.stoppedItems[e.fs_id]=e)})),this},get selectedList(){return this.list.getSelected().filter((function(n){return 1!==n.isdir}))},get itemsFromQueue(){var n=this,e={},r=Object.keys(Object.assign({},this.downloadingItems,this.completedItems,this.stoppedItems));return Object.keys(this.allDownloads).forEach((function(a){r.includes(a)||(e[a]=n.allDownloads[a])})),e},get downloadable(){return Object.keys(this.downloadingItems).length<this.maxDownloadCount},get currentList(){return this.list.getCurrentList()},stopAll:function(){Object.values(this.downloadingItems).forEach((function(n){n.request&&n.request.abort&&n.request.abort()}))}}},function(n,e,r){"use strict";var a,t;r.d(e,"a",(function(){return a})),r.d(e,"b",(function(){return t})),function(n){n.downloading="DOWNLOADING",n.stopped="STOPPED",n.completed="COMPLETED",n.inQueued="IN_QUEUED",n.error="ERROR"}(a||(a={})),function(n){n.items="ITEM_LIST"}(t||(t={}))},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return GM}));var GM={addStyle:function(n){GM_addStyle(n)},deleteValue:function(n){GM_deleteValue(n)},listValues:function listValues(){eval("GM_listValues()")},addValueChangeListener:function(n,e){return GM_addValueChangeListener(n,e)},removeValueChangeListener:function(n){GM_removeValueChangeListener(n)},setValue:function(n,e){GM_setValue(n,e)},getValue:function(n,e){return GM_getValue(n,e)},log:function(n){GM_log(n)},getResourceText:function(n){return GM_getResourceText(n)},getResourceURL:function(n){return GM_getResourceURL(n)},registerMenuCommand:function(n,e,r){return GM_registerMenuCommand(n,e,r)},unregisterMenuCommand:function(n){GM_unregisterMenuCommand(n)},openInTab:function(n,e){GM_openInTab(n,e)},xmlHttpRequest:function(n){return GM_xmlhttpRequest(n)},download:function(n,e){return"string"==typeof n?GM_download(n,e):GM_download(n)},getTab:function(n){GM_getTab(n)},saveTab:function(n){GM_saveTab(n)},getTabs:function(n){GM_getTabs(n)},notification:function(n,e,r,a){"string"==typeof n?GM_notification(n,e,r,a):GM_notification(n,e)},setClipboard:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{type:"text",mimetype:"text/plain"};GM_setClipboard(n,e)},info:GM_info}},function(n,e,r){"use strict";r.r(e),r.d(e,"renderOperationElement",(function(){return c}));var a=r(0),t=r(1),i=r(2),g=function(n){if(n<=1e3)return"".concat(n," B");var e=Math.round(n/1024);return e<=1e3?"".concat(e," KB"):"".concat(Math.round(e/10.24)/100," MB")};function o(n){if(a.a.stoppedItems[n.fs_id]&&delete a.a.stoppedItems[n.fs_id],!a.a.downloadable)return n.status=t.a.inQueued,void c(n);n.status=t.a.downloading,c(n),a.a.downloadingItems[n.fs_id]=n;var e=n.url,r=n.server_filename,o=0,f=void 0,s=document.querySelector('div[data-label="'.concat(n.fs_id,'"]')),l=s.parentElement,b=s.closest("tr").querySelector('td[data-label="speed"]');n.request=i.a.download({url:e,name:r,saveAs:!0,headers:{Host:"qdall01.baidupcs.com",Accept:"*/*","User-Agent":"netdisk;P2SP;2.2.60.26","Accept-Encoding":"identity","Accept-Language":"ja-JP","Accept-Charset":"*"},onprogress:function(n){f=n;var e=Math.round(100*f.loaded/f.total);l.className="progress-radial progress-".concat(e),s.innerText="".concat(e,"%")},onload:function(){n.progress_loader_id&&clearInterval(n.progress_loader_id),l.className="progress-radial progress-100",s.innerText="100%",b.innerText="",a.a.completedItems[n.fs_id]=n,delete a.a.downloadingItems[n.fs_id],i.a.notification({text:"下载完成",title:r,highlight:!0}),n.status=t.a.completed,c(n),d()},onerror:function(){n.progress_loader_id&&clearInterval(n.progress_loader_id),l.className="progress-radial progress-0",s.innerHTML='<span style="color: red">error</span>',b.innerText="",a.a.stoppedItems[n.fs_id]=n,delete a.a.downloadingItems[n.fs_id],n.status=t.a.error,c(n),d()}}),n.progress_loader_id=setInterval((function(){if(f){var n=f.loaded-o;o=f.loaded,b.innerText="".concat(g(n),"/s")}}),1e3)}function d(){for(var n in a.a.itemsFromQueue)o(a.a.allDownloads[n])}function f(){var n=document.querySelector(".modal-wrapper");n.className=n.className+" open"}function s(){document.querySelector(".modal-wrapper").className="modal-wrapper"}function l(n){document.getElementById("popup-tbody").insertAdjacentHTML("beforeend",'\n        <tr id="row-'.concat(n.fs_id,'">\n          <td data-label="filename">').concat(n.server_filename,'</td>\n          <td data-label="download">\n            <div class="wrap">\n              <div class="progress-radial progress-').concat(n.status===t.a.completed?"100":"0",'">\n                <div data-label="').concat(n.fs_id,'"\n                    class="overlay">').concat(n.status===t.a.completed?"100":"0",'%</div>\n              </div>\n            </div>\n          </td>\n          <td data-label="url">').concat(g(n.size),'</td>\n          <td data-label="speed"></td>\n          <td data-label="operation"></td>\n        </tr>\n  ')),c(n)}function c(n){var e=document.getElementById("row-".concat(n.fs_id)).querySelector('td[data-label="operation"]');if(e){e.innerHTML="",e.insertAdjacentHTML("beforeend",'\n            <svg\n                id="start-item-'.concat(n.fs_id,'"\n                class="').concat([t.a.downloading,t.a.inQueued].includes(n.status)?"disabled":"",'"\n                xmlns="http://www.w3.org/2000/svg"\n                height="24"\n                viewBox="0 0 24 24"\n                width="24">\n                <path d="M0 0h24v24H0z" fill="none"/>\n                <path d="M8 5v14l11-7z"/>\n            </svg>\n            <svg\n                id="stop-item-').concat(n.fs_id,'"\n                class="').concat([t.a.downloading,t.a.inQueued].includes(n.status)?"":"disabled",'"\n                xmlns="http://www.w3.org/2000/svg"\n                height="24"\n                viewBox="0 0 24 24"\n                width="24">\n                    <path d="M0 0h24v24H0z" fill="none"/>\n                    <path d="M6 6h12v12H6z"/>\n            </svg>\n            <svg\n                id="delete-item-').concat(n.fs_id,'"\n                class="delete-item"\n                style="cursor: pointer; position: absolute; right: 5px"\n                xmlns="http://www.w3.org/2000/svg"\n                height="24" viewBox="0 0 24 24" width="24">\n                    <path d="M0 0h24v24H0z" fill="none"/>\n                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\n            </svg>\n    '));var r=a.a.allDownloads,i=a.a.downloadingItems,g=a.a.completedItems,f=a.a.stoppedItems;document.getElementById("start-item-".concat(n.fs_id)).addEventListener("click",(function(){o(n)})),document.getElementById("stop-item-".concat(n.fs_id)).addEventListener("click",(function(){var e=a.a.downloadingItems[n.fs_id];if(e)return confirm("停止后将需要重新下载， 确认吗？")&&(n.status=t.a.stopped,e.request&&e.request.abort&&e.request.abort(),clearInterval(e.progress_loader_id),f[n.fs_id]=n,delete i[n.fs_id],c(n),d()),!1})),document.getElementById("delete-item-".concat(n.fs_id)).addEventListener("click",(function(){n.request&&n.request.abort&&n.request.abort(),delete r[n.fs_id],delete i[n.fs_id],delete g[n.fs_id],delete f[n.fs_id],document.getElementById("popup-tbody").removeChild(document.getElementById("row-".concat(n.fs_id))),d()}))}}window.onunload=function(){i.a.setValue(t.b.items,a.a.allDownloads),a.a.stopAll()},document.body.insertAdjacentHTML("beforeend",'\n    <style>\n@import url(https://fonts.googleapis.com/css?family=Noto+Sans);\nbody {\n  padding: 30px 0;\n  background-color: #2f3439;\n  font-family: "Noto Sans", sans-serif;\n}\n\n.wrap {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n}\n\n/* -------------------------------------\n * Bar container\n * ------------------------------------- */\n.progress-radial {\n  float: left;\n  position: relative;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  border: 2px solid #2f3439;\n  background-color: tomato;\n  transition: all 1s ease-out;\n  cursor: pointer;\n}\n.progress-radial:hover {\n  background: #2e6da4;\n}\n\n/* -------------------------------------\n * Optional centered circle w/text\n * ------------------------------------- */\n.progress-radial .overlay {\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  background-color: #fffde8;\n  border-radius: 50%;\n  margin-left: 10px;\n  margin-top: 10px;\n  text-align: center;\n  line-height: 2rem;\n  font-size: 12px;\n}\n\n/* -------------------------------------\n * Mixin for progress-% class\n * ------------------------------------- */\n.progress-0 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(90deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-1 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(93.6deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-2 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(97.2deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-3 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(100.8deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-4 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(104.4deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-5 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(108deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-6 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(111.6deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-7 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(115.2deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-8 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(118.8deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-9 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(122.4deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-10 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(126deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-11 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(129.6deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-12 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(133.2deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-13 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(136.8deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-14 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(140.4deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-15 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(144deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-16 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(147.6deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-17 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(151.2deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-18 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(154.8deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-19 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(158.4deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-20 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(162deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-21 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(165.6deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-22 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(169.2deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-23 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(172.8deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-24 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(176.4deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-25 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(180deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-26 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(183.6deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-27 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(187.2deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-28 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(190.8deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-29 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(194.4deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-30 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(198deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-31 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(201.6deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-32 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(205.2deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-33 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(208.8deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-34 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(212.4deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-35 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(216deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-36 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(219.6deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-37 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(223.2deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-38 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(226.8deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-39 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(230.4deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-40 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(234deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-41 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(237.6deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-42 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(241.2deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-43 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(244.8deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-44 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(248.4deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-45 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(252deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-46 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(255.6deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-47 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(259.2deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-48 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(262.8deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-49 {\n  background-image: linear-gradient(90deg, #2f3439 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(266.4deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-50 {\n  background-image: linear-gradient(-90deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-51 {\n  background-image: linear-gradient(-86.4deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-52 {\n  background-image: linear-gradient(-82.8deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-53 {\n  background-image: linear-gradient(-79.2deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-54 {\n  background-image: linear-gradient(-75.6deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-55 {\n  background-image: linear-gradient(-72deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-56 {\n  background-image: linear-gradient(-68.4deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-57 {\n  background-image: linear-gradient(-64.8deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-58 {\n  background-image: linear-gradient(-61.2deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-59 {\n  background-image: linear-gradient(-57.6deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-60 {\n  background-image: linear-gradient(-54deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-61 {\n  background-image: linear-gradient(-50.4deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-62 {\n  background-image: linear-gradient(-46.8deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-63 {\n  background-image: linear-gradient(-43.2deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-64 {\n  background-image: linear-gradient(-39.6deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-65 {\n  background-image: linear-gradient(-36deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-66 {\n  background-image: linear-gradient(-32.4deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-67 {\n  background-image: linear-gradient(-28.8deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-68 {\n  background-image: linear-gradient(-25.2deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-69 {\n  background-image: linear-gradient(-21.6deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-70 {\n  background-image: linear-gradient(-18deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-71 {\n  background-image: linear-gradient(-14.4deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-72 {\n  background-image: linear-gradient(-10.8deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-73 {\n  background-image: linear-gradient(-7.2deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-74 {\n  background-image: linear-gradient(-3.6deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-75 {\n  background-image: linear-gradient(0deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-76 {\n  background-image: linear-gradient(3.6deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-77 {\n  background-image: linear-gradient(7.2deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-78 {\n  background-image: linear-gradient(10.8deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-79 {\n  background-image: linear-gradient(14.4deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-80 {\n  background-image: linear-gradient(18deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-81 {\n  background-image: linear-gradient(21.6deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-82 {\n  background-image: linear-gradient(25.2deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-83 {\n  background-image: linear-gradient(28.8deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-84 {\n  background-image: linear-gradient(32.4deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-85 {\n  background-image: linear-gradient(36deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-86 {\n  background-image: linear-gradient(39.6deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-87 {\n  background-image: linear-gradient(43.2deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-88 {\n  background-image: linear-gradient(46.8deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-89 {\n  background-image: linear-gradient(50.4deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-90 {\n  background-image: linear-gradient(54deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-91 {\n  background-image: linear-gradient(57.6deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-92 {\n  background-image: linear-gradient(61.2deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-93 {\n  background-image: linear-gradient(64.8deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-94 {\n  background-image: linear-gradient(68.4deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-95 {\n  background-image: linear-gradient(72deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-96 {\n  background-image: linear-gradient(75.6deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-97 {\n  background-image: linear-gradient(79.2deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-98 {\n  background-image: linear-gradient(82.8deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-99 {\n  background-image: linear-gradient(86.4deg, #ff6347 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n.progress-100 {\n  background-image: linear-gradient(90deg, #ff6347 52%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, #ff6347 50%, #2f3439 50%, #2f3439);\n}\n\n\ntable {\n  border: 1px solid #ccc;\n  border-collapse: collapse;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  table-layout: fixed;\n}\n\ntable caption {\n  font-size: 1.5em;\n  margin: .5em 0 .75em;\n}\n\ntable tr {\n  background-color: #f8f8f8;\n  border: 1px solid #ddd;\n  padding: .35em;\n}\n\ntable th,\ntable td {\n  padding: .625em;\n  text-align: center;\n}\n\ntable th {\n  font-size: .85em;\n  letter-spacing: .1em;\n  text-transform: uppercase;\n}\n\n@media screen and (max-width: 600px) {\n  table {\n    border: 0;\n  }\n\n  table caption {\n    font-size: 1.3em;\n  }\n\n  table thead {\n    border: none;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n  }\n\n  table tr {\n    border-bottom: 3px solid #ddd;\n    display: block;\n    margin-bottom: .625em;\n  }\n\n  table td {\n    border-bottom: 1px solid #ddd;\n    display: block;\n    font-size: .8em;\n    text-align: right;\n  }\n\n  table td::before {\n    /*\n    * aria-label has no advantage, it won\'t be read inside a table\n    content: attr(aria-label);\n    */\n    content: attr(data-label);\n    float: left;\n    font-weight: bold;\n    text-transform: uppercase;\n  }\n\n  table td:last-child {\n    border-bottom: 0;\n  }\n}\n/* modal */\n.modal-wrapper {\n  z-index: 999;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .3s, visibility .3s;\n}\n\n.modal-wrapper.open {\n  opacity: 1;\n  visibility: visible;\n  transition: opacity .4s, visibility .4s;\n}\n\n.modal-wrapper::after {\n  display: inline-block;\n  height: 100%;\n  margin-left: -.05em;\n  vertical-align: middle;\n  content: ""\n}\n\n.modal-wrapper .modal-window {\n  box-sizing: border-box;\n  display: inline-block;\n  z-index: 20;\n  position: relative;\n  width: 60vw;\n  /*padding: 30px 30px 15px;*/\n  border-radius: 2px;\n  background: #fff;\n  box-shadow: 0 0 30px rgba(0, 0, 0, .6);\n  vertical-align: middle;\n  align-self: center;\n}\n\n.modal-wrapper .modal-window .modal-content {\n  max-height: 60vh;\n  overflow-y: auto;\n}\n\n.modal-overlay {\n  z-index: 10;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: rgba(0, 0, 0, .8)\n}\n\n.modal-wrapper .modal-close {\n  z-index: 20;\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 35px;\n  color: #95979c!important;\n  font-size: 20px;\n  font-weight: 700;\n  line-height: 35px;\n  text-align: center;\n  text-decoration: none;\n  text-indent: 0;\n  cursor: pointer;\n}\n\n.modal-wrapper .modal-close:hover {\n  color: #2b2e38!important\n}\npre.code {\n  text-align: left;\n  background: rgb(250, 250, 250);\n  border-radius: 3px;\n  border: 0px;\n  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px inset;\n  color: #4d4d4d;\n  font-family: Monaco, Consolas, "Courier New", Courier, monospace, sans-serif;\n  font-size: 13px;\n  outline: 0px;\n  overflow: auto;\n  max-height: 55vh;\n  padding: 10px;\n  vertical-align: baseline;\n  line-height: normal;\n}\n\n#copy-code {\n  -webkit-tap-highlight-color: rgba(0,0,0,0);\n  box-sizing: border-box;\n  margin: 0;\n  font: inherit;\n  font-family: inherit;\n  display: inline-block;\n  padding: 6px 12px;\n  margin-bottom: 0;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 1.42857143;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  touch-action: manipulation;\n  user-select: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  color: #fff;\n  background-color: #337ab7;\n  text-shadow: 0 -1px 0 rgba(0,0,0,.2);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,.15),0 1px 1px rgba(0,0,0,.075);\n  background-image: linear-gradient(to bottom,#337ab7 0,#265a88 100%);\n  background-repeat: repeat-x;\n  border-color: #245580;\n  -webkit-appearance: button;\n  cursor: pointer;\n}\n#copy-code:focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n#copy-code:active {\n  background-color: #265a88;\n  border-color: #245580;\n}\n#copy-code:hover {\n  background-color: #265a88;\n  background-position: 0 -15px;\n}\n#copy-code.disable {\n  background-repeat: repeat-x;\n  -webkit-appearance: button;\n  pointer-events: none;\n  cursor: not-allowed;\n  box-shadow: none;\n  opacity: .65;\n  border-color: #2e6da4;\n  background-color: #265a88;\n  background-image: none;\n}\n\n\n#floating-button{\n  width: 55px;\n  height: 55px;\n  border-radius: 50%;\n  background: #db4437;\n  position: fixed;\n  bottom: 55px;\n  right: 32px;\n  cursor: pointer;\n  box-shadow: 0px 2px 5px #666;\n}\n\n.plus{\n  color: white;\n  position: absolute;\n  top: 0;\n  display: block;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  text-align: center;\n  padding: 0;\n  margin: 0;\n  line-height: 55px;\n  font-size: 38px;\n  font-family: \'Roboto\';\n  font-weight: 300;\n  animation: plus-out 0.3s;\n  transition: all 0.3s;\n}\n\n#container-floating{\n  position: fixed;\n  width: 70px;\n  height: 70px;\n  bottom: 30px;\n  right: 30px;\n  z-index: 50;\n}\n\n#container-floating:hover{\n  height: 400px;\n  width: 90px;\n  padding: 30px;\n}\n\n#container-floating:hover .plus{\n  animation: plus-in 0.15s linear;\n  animation-fill-mode: forwards;\n}\n\n.edit{\n  position: absolute;\n  top: 0;\n  display: block;\n  bottom: 0;\n  left: 0;\n  display: block;\n  right: 0;\n  padding: 0;\n  opacity: 0;\n  margin: auto;\n  line-height: 65px;\n  transform: rotateZ(-70deg);\n  transition: all 0.3s;\n  animation: edit-out 0.3s;\n}\n\n#container-floating:hover .edit{\n  animation: edit-in 0.2s;\n  animation-delay: 0.1s;\n  animation-fill-mode: forwards;\n}\n\n@keyframes edit-in{\n  from {opacity: 0; transform: rotateZ(-70deg);}\n  to {opacity: 1; transform: rotateZ(0deg);}\n}\n\n@keyframes edit-out{\n  from {opacity: 1; transform: rotateZ(0deg);}\n  to {opacity: 0; transform: rotateZ(-70deg);}\n}\n\n@keyframes plus-in{\n  from {opacity: 1; transform: rotateZ(0deg);}\n  to {opacity: 0; transform: rotateZ(180deg);}\n}\n\n@keyframes plus-out{\n  from {opacity: 0; transform: rotateZ(180deg);}\n  to {opacity: 1; transform: rotateZ(0deg);}\n}\n.nds{\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  position: fixed;\n  z-index: 300;\n  transform:  scale(0);\n  cursor: pointer;\n}\n\n.nd1{\n  background: #d3a411;\n  right: 40px;\n  bottom: 120px;\n  animation-delay: 0.2s;\n  animation: bounce-out-nds 0.3s linear;\n  animation-fill-mode:  forwards;\n}\n@keyframes bounce-nds{\n  from {opacity: 0;}\n  to {opacity: 1; transform: scale(1);}\n}\n\n@keyframes bounce-out-nds{\n  from {opacity: 1; transform: scale(1);}\n  to {opacity: 0; transform: scale(0);}\n}\n\n#container-floating:hover .nds{\n\n  animation: bounce-nds 0.1s linear;\n  animation-fill-mode:  forwards;\n}\n.reminder{\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin: auto;\n  top: 0;\n  bottom: 0;\n  line-height: 40px;\n}\n    </style>\n  '),document.body.insertAdjacentHTML("beforeend",'\n        <div class="modal-wrapper">\n            <div class="modal-overlay"></div>\n            <div class="modal-window">\n                <div class="modal-content">\n\x3c!--                    <button id="copy-code" class="disable">复制到剪切板</button>--\x3e\n              <table>\n                <thead>\n                  <tr>\n                    <th scope="col">文件</th>\n                    <th scope="col">进度</th>\n                    <th scope="col">大小</th>\n                    <th scope="col">速度</th>\n                    <th scope="col">操作</th>\n                  </tr>\n                </thead>\n                <tbody id="popup-tbody"></tbody>\n              </table>\n                </div>\n\x3c!--                <span class="modal-close">×</a>--\x3e\n            </div>\n        </div>\n        <div id="container-floating">\n          <div class="nd1 nds" data-toggle="tooltip" data-placement="left" onclick="alert(\'此功能正在开发中...\')">\n              <img class="reminder" src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/bt_compose2_1x.png">\n          </div>\n          <div id="floating-button" data-toggle="tooltip" data-placement="left" data-original-title="Create">\n            <p class="plus">+</p>\n            <img class="edit" src="//ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_reminders_speeddial_white_24dp.png">\n          </div>\n        </div>\n    '),document.querySelectorAll(".modal-overlay,.modal-close").forEach((function(n){return n.addEventListener("click",s)})),document.querySelector("#floating-button").addEventListener("click",f),Object.values(a.a.initState().allDownloads).forEach((function(n){l(n),n.status===t.a.downloading&&a.a.downloadable&&o(n)})),i.a.addValueChangeListener(t.b.items,(function(n,e,r){Object.values(r).forEach((function(n){c(n)}))})),document.getElementById("floating-button").addEventListener("click",(function(){var n,e,r,g;f(),n=a.a.selectedList,e=a.a.allDownloads,r=a.a.autoStart,g=[],n.forEach((function(n){void 0===e[n.fs_id]&&(n.status=t.a.inQueued,e[n.fs_id]=n,l(n),g.push(function(n){return new Promise((function(e,r){i.a.xmlHttpRequest({url:"http://pcs.baidu.com/rest/2.0/pcs/file?app_id=778750&ver=2.0&method=locatedownload&path="+encodeURIComponent(n.path),method:"GET",responseType:"json",headers:{"User-Agent":"netdisk;P2SP;2.2.60.26"},onload:function(a){if(a.response.hasOwnProperty("client_ip")){var t=a.response.urls[0].url+"&filename="+encodeURIComponent(n.server_filename);return n.url=t,e(n)}return r(a)}})}))}(n)))})),Promise.all(g).then((function(n){n.forEach((function(n){r&&o(n)}))}))}))}]);