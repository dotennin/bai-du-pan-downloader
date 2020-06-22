// ==UserScript==
// @namespace https://dotennin.blogspot.com/
// @name 百度网盘下载管理器-alpha
// @description A download manager for Baidu Yun
// @version 0.2
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
// @resource customStyle https://dotennin.github.io/baidu-disk-straight-chain/src/baiduPanDownloader/style.css
// @grant GM_setClipboard
// @grant GM_xmlhttpRequest
// @grant GM_getResourceText
// @grant GM_download
// @grant GM_addStyle
// @grant GM_notification
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @run-at document-idle
// ==/UserScript==
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/baiduPanDownloader/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/baiduPanDownloader/InstaceForSystem.ts":
/*!****************************************************!*\
  !*** ./src/baiduPanDownloader/InstaceForSystem.ts ***!
  \****************************************************/
/*! exports provided: InstanceForSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InstanceForSystem\", function() { return InstanceForSystem; });\n/* eslint-disable @typescript-eslint/no-object-literal-type-assertion,no-undef */\nvar InstanceForSystem = {\n  // eslint-disable-next-line no-undef\n  list: eval(\"require('system-core:context/context.js')\").instanceForSystem.list,\n  autoStart: true,\n  maxDownloadCount: 1,\n  downloadingItems: {},\n  stoppedItems: {},\n  completedItems: {},\n  allDownloads: {},\n\n  get selectedList() {\n    var objectFromValue = Object.assign( // @ts-ignore\n    GM_getValue('downloadingItems', {}), // @ts-ignore\n    GM_getValue('stoppedItems', {})); // @ts-ignore\n\n    GM_deleteValue('downloadingItems'); // @ts-ignore\n\n    GM_deleteValue('stoppedItems');\n    var selected = this.list.getSelected();\n    return selected.filter(function (arr) {\n      return arr.isdir !== 1;\n    }).concat(Object.values(objectFromValue));\n  },\n\n  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type\n  get itemsFromQueue() {\n    var _this = this;\n\n    var queue = {};\n    var filterKeys = Object.keys(Object.assign({}, this.downloadingItems, this.completedItems, this.stoppedItems));\n    Object.keys(this.allDownloads).forEach(function (fsId) {\n      if (!filterKeys.includes(fsId)) {\n        queue[fsId] = _this.allDownloads[fsId];\n      }\n    });\n    return queue;\n  },\n\n  get downloadable() {\n    return Object.keys(this.downloadingItems).length < this.maxDownloadCount;\n  },\n\n  get currentList() {\n    return this.list.getCurrentList();\n  },\n\n  stopAll: function stopAll() {\n    Object.values(this.downloadingItems).forEach(function (item) {\n      item.request.abort();\n    });\n  }\n};\n\n\n//# sourceURL=webpack:///./src/baiduPanDownloader/InstaceForSystem.ts?");

/***/ }),

/***/ "./src/baiduPanDownloader/index.ts":
/*!*****************************************!*\
  !*** ./src/baiduPanDownloader/index.ts ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InstaceForSystem */ \"./src/baiduPanDownloader/InstaceForSystem.ts\");\n/* eslint-disable @typescript-eslint/no-use-before-define,no-undef,@typescript-eslint/camelcase */\n// ==UserScript==\n// @namespace https://dotennin.blogspot.com/\n// @name 百度网盘下载管理器-alpha\n// @description A download manager for Baidu Yun\n// @version 0.2\n// @author Dotennin\n// @license MIT\n// @compatible        chrome/83.0.4103.97 passed\n// @compatible        edge/83.0.478.54 passed\n// @compatible        firefox untested\n// @compatible        opera untested\n// @compatible        safari untested\n// @include https://pan.baidu.com/disk/*\n// @connect baidu.com\n// @connect qdall01.baidupcs.com\n// @resource customStyle https://dotennin.github.io/baidu-disk-straight-chain/src/baiduPanDownloader/style.css\n// @grant GM_setClipboard\n// @grant GM_xmlhttpRequest\n// @grant GM_getResourceText\n// @grant GM_download\n// @grant GM_addStyle\n// @grant GM_notification\n// @grant GM_getValue\n// @grant GM_setValue\n// @grant GM_deleteValue\n// @run-at document-idle\n// ==/UserScript==\n\n\nwindow.onunload = function () {\n  // @ts-ignore\n  GM_setValue('downloadingItems', _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].downloadingItems); // @ts-ignore\n\n  GM_setValue('stoppedItems', _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].stoppedItems); // @ts-ignore\n\n  GM_setValue('completedItems', _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].completedItems);\n  _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].stopAll();\n}; // @ts-ignore\n\n\n!function () {\n  initStyle();\n  startInstance();\n  document.getElementById('floating-button').addEventListener('click', function () {\n    openModal();\n    startInstance();\n  });\n}();\n\nfunction addNextDownloadRequest() {\n  for (var fs_id in _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].itemsFromQueue) {\n    downloadItem(_InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].allDownloads[fs_id]);\n  }\n}\n\nfunction downloadItem(arr) {\n  // Remove Item if target still in stop cluster\n  if (_InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].stoppedItems[arr.fs_id]) {\n    delete _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].stoppedItems[arr.fs_id];\n  }\n\n  var operationButton = document.querySelector(\"button[data-label=\\\"\".concat(arr.fs_id, \"\\\"]\"));\n\n  if (!_InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].downloadable) {\n    operationButton.innerText = '等待中';\n    return;\n  }\n\n  _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].downloadingItems[arr.fs_id] = arr;\n  var url = arr.url,\n      server_filename = arr.server_filename;\n  var loaded = 0;\n  var currentEvent = undefined;\n  var percentOverlay = document.querySelector(\"div[data-label=\\\"\".concat(arr.fs_id, \"\\\"]\"));\n  var progressRadial = percentOverlay.parentElement;\n  var speedOverlay = percentOverlay.closest('tr').querySelector('td[data-label=\"speed\"]');\n  operationButton.innerText = '停止'; // @ts-ignore\n\n  arr.request = GM_download({\n    url: url,\n    name: server_filename,\n    saveAs: true,\n    headers: {\n      Host: 'qdall01.baidupcs.com',\n      Accept: '*/*',\n      'User-Agent': 'netdisk;P2SP;2.2.60.26',\n      'Accept-Encoding': 'identity',\n      'Accept-Language': 'ja-JP',\n      'Accept-Charset': '*'\n    },\n    onprogress: function onprogress(e) {\n      currentEvent = e;\n      var percent = Math.round(currentEvent.loaded * 100 / currentEvent.total);\n      progressRadial.className = \"progress-radial progress-\".concat(percent);\n      percentOverlay.innerText = \"\".concat(percent, \"%\");\n    },\n    onload: function onload() {\n      arr.progressLoader && clearInterval(arr.progressLoader);\n      progressRadial.className = 'progress-radial progress-100';\n      percentOverlay.innerText = '100%';\n      speedOverlay.innerText = '';\n      operationButton.innerText = '重新下载';\n      _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].completedItems[arr.fs_id] = arr;\n      delete _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].downloadingItems[arr.fs_id]; // @ts-ignore\n\n      GM_notification({\n        text: '下载完成',\n        title: server_filename,\n        highlight: true\n      });\n      addNextDownloadRequest();\n    },\n    onerror: function onerror() {\n      arr.progressLoader && clearInterval(arr.progressLoader);\n      progressRadial.className = 'progress-radial progress-0';\n      percentOverlay.innerHTML = \"<span style=\\\"color: red\\\">error</span>\";\n      operationButton.innerText = '重新下载';\n      speedOverlay.innerText = '';\n      _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].stoppedItems[arr.fs_id] = arr;\n      delete _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].downloadingItems[arr.fs_id];\n      addNextDownloadRequest();\n    }\n  });\n  arr.progressLoader = setInterval(function () {\n    if (currentEvent) {\n      var speed = currentEvent.loaded - loaded;\n      loaded = currentEvent.loaded;\n      speedOverlay.innerText = \"\".concat(formatByte(speed), \"/\\u79D2\");\n    }\n  }, 1000);\n}\n\nfunction formatByte(_byte) {\n  var KiByte = Math.round(_byte / 1024);\n  return KiByte <= 1000 ? \"\".concat(KiByte, \" KiB\") : \"\".concat(Math.round(KiByte / 10.24) / 100, \" MiB\");\n}\n\nfunction getDownloadUrl(arr) {\n  return new Promise(function (resolve, reject) {\n    // @ts-ignore\n    GM_xmlhttpRequest({\n      url: 'http://pcs.baidu.com/rest/2.0/pcs/file?app_id=778750&ver=2.0&method=locatedownload&path=' + encodeURIComponent(arr.path),\n      method: 'GET',\n      responseType: 'json',\n      headers: {\n        'User-Agent': 'netdisk;P2SP;2.2.60.26'\n      },\n      onload: function onload(r) {\n        if (r.response.hasOwnProperty('client_ip')) {\n          var url = r.response.urls[0].url + '&filename=' + encodeURIComponent(arr.server_filename);\n          arr.url = url;\n          appendRow(arr);\n          return resolve(arr);\n        } else {\n          // Todo return error message\n          return reject(r);\n        }\n      }\n    });\n  });\n}\n\nfunction openModal() {\n  var modalWrapper = document.querySelector('.modal-wrapper');\n  modalWrapper.className = modalWrapper.className + ' open';\n}\n\nfunction closeModal() {\n  var modalWrapper = document.querySelector('.modal-wrapper');\n  modalWrapper.className = 'modal-wrapper';\n}\n\nfunction appendRow(arr) {\n  document.getElementById('popup-tbody').insertAdjacentHTML('beforeend', \"\\n        <tr id=\\\"row-\".concat(arr.fs_id, \"\\\">\\n          <td data-label=\\\"filename\\\">\").concat(arr.server_filename, \"</td>\\n          <td data-label=\\\"download\\\">\\n            <div class=\\\"wrap\\\">\\n              <div class=\\\"progress-radial progress-0\\\">\\n                <div data-label=\\\"\").concat(arr.fs_id, \"\\\" class=\\\"overlay\\\">0%</div>\\n              </div>\\n            </div>\\n          </td>\\n          <td data-label=\\\"url\\\">\").concat(formatByte(arr.size), \"</td>\\n          <td data-label=\\\"speed\\\"></td>\\n          <td data-label=\\\"operation\\\">\\n            <button data-label=\\\"\").concat(arr.fs_id, \"\\\">\\u7B49\\u5F85\\u4E2D</button>\\n            <svg id=\\\"delete-item-\").concat(arr.fs_id, \"\\\"\\n                class=\\\"delete-item\\\"\\n                style=\\\"cursor: pointer; position: absolute; right: 5px\\\"\\n                xmlns=\\\"http://www.w3.org/2000/svg\\\"\\n                height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" width=\\\"24\\\">\\n                    <path d=\\\"M0 0h24v24H0z\\\" fill=\\\"none\\\"/>\\n                    <path d=\\\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\\\"/>\\n            </svg>\\n          </td>\\n        </tr>\\n  \"));\n  document.querySelector(\"button[data-label=\\\"\".concat(arr.fs_id, \"\\\"]\")).addEventListener('click', function (e) {\n    var targetItem = _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].downloadingItems[arr.fs_id]; // Stop progress\n\n    if (targetItem) {\n      if (confirm('停止后将需要重新下载， 确认吗？')) {\n        targetItem.request.abort();\n        clearInterval(targetItem.progressLoader);\n        var target = e.target;\n        target.innerText = '重新下载';\n        _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].stoppedItems[arr.fs_id] = arr;\n        delete _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].downloadingItems[arr.fs_id];\n        addNextDownloadRequest();\n      }\n\n      return false;\n    } // Restart progress\n\n\n    downloadItem(arr);\n  });\n  document.getElementById(\"delete-item-\".concat(arr.fs_id)).addEventListener('click', function () {\n    if (confirm('确认删除？')) {\n      arr.request && arr.request.abort();\n      delete _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].allDownloads[arr.fs_id];\n      delete _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].downloadingItems[arr.fs_id];\n      delete _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].completedItems[arr.fs_id];\n      delete _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].stoppedItems[arr.fs_id];\n      document.getElementById('popup-tbody').removeChild(document.getElementById(\"row-\".concat(arr.fs_id)));\n      addNextDownloadRequest();\n    }\n  });\n}\n\nfunction initStyle() {\n  // @ts-ignore\n  var newCSS = GM_getResourceText('customStyle'); // @ts-ignore\n\n  GM_addStyle(newCSS);\n  document.body.insertAdjacentHTML('beforeend', \"\\n        <div class=\\\"modal-wrapper\\\">\\n            <div class=\\\"modal-overlay\\\"></div>\\n            <div class=\\\"modal-window\\\">\\n                <div class=\\\"modal-content\\\">\\n<!--                    <button id=\\\"copy-code\\\" class=\\\"disable\\\">\\u590D\\u5236\\u5230\\u526A\\u5207\\u677F</button>-->\\n              <table>\\n                <thead>\\n                  <tr>\\n                    <th scope=\\\"col\\\">\\u6587\\u4EF6</th>\\n                    <th scope=\\\"col\\\">\\u8FDB\\u5EA6</th>\\n                    <th scope=\\\"col\\\">\\u5927\\u5C0F</th>\\n                    <th scope=\\\"col\\\">\\u901F\\u5EA6</th>\\n                    <th scope=\\\"col\\\">\\u64CD\\u4F5C</th>\\n                  </tr>\\n                </thead>\\n                <tbody id=\\\"popup-tbody\\\"></tbody>\\n              </table>\\n                </div>\\n<!--                <span class=\\\"modal-close\\\">\\xD7</a>-->\\n            </div>\\n        </div>\\n        <div id=\\\"container-floating\\\">\\n          <div class=\\\"nd1 nds\\\" data-toggle=\\\"tooltip\\\" data-placement=\\\"left\\\" onclick=\\\"alert('\\u6B64\\u529F\\u80FD\\u6B63\\u5728\\u5F00\\u53D1\\u4E2D...')\\\">\\n              <img class=\\\"reminder\\\" src=\\\"https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/bt_compose2_1x.png\\\">\\n          </div>\\n          <div id=\\\"floating-button\\\" data-toggle=\\\"tooltip\\\" data-placement=\\\"left\\\" data-original-title=\\\"Create\\\">\\n            <p class=\\\"plus\\\">+</p>\\n            <img class=\\\"edit\\\" src=\\\"//ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_reminders_speeddial_white_24dp.png\\\">\\n          </div>\\n        </div>\\n    \");\n  document.querySelectorAll('.modal-overlay,.modal-close').forEach(function (e) {\n    return e.addEventListener('click', closeModal);\n  });\n  document.querySelector('#floating-button').addEventListener('click', openModal); // document.getElementById('copy-code').addEventListener('click', copyCode)\n}\n\nfunction startInstance() {\n  var selectedList = _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].selectedList,\n      allDownloads = _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].allDownloads,\n      autoStart = _InstaceForSystem__WEBPACK_IMPORTED_MODULE_0__[\"InstanceForSystem\"].autoStart;\n  var requestList = [];\n  selectedList.forEach(function (arr) {\n    if (typeof allDownloads[arr.fs_id] === 'undefined') {\n      allDownloads[arr.fs_id] = arr;\n      requestList.push(getDownloadUrl(arr));\n    }\n  });\n  Promise.all(requestList).then(function (arrs) {\n    arrs.forEach(function (arr) {\n      if (autoStart) {\n        downloadItem(arr);\n      }\n    });\n  });\n}\n\n//# sourceURL=webpack:///./src/baiduPanDownloader/index.ts?");

/***/ })

/******/ });
