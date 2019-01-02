module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "53ca2ddb9596ae321cc3";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	__webpack_require__.p = "http://localhost:3001/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/assets.json":
/*!***************************!*\
  !*** ./build/assets.json ***!
  \***************************/
/*! exports provided: client, default */
/***/ (function(module) {

module.exports = {"client":{"js":"http://localhost:3001/static/js/bundle.js"}};

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?300":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?300 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + (err.stack || err.message));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log(
							"warning",
							"[HMR] Update failed: " + (err.stack || err.message)
						);
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?300"))

/***/ }),

/***/ "./src/components/Accommodation.tsx":
/*!******************************************!*\
  !*** ./src/components/Accommodation.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet-async */ "react-helmet-async");
/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_helmet_async__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _organisms_Navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./organisms/Navigation */ "./src/components/organisms/Navigation.tsx");
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-config */ "react-router-config");
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_3__);




var Accommodation = function Accommodation(props) {
    var route = props.route;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_organisms_Navigation__WEBPACK_IMPORTED_MODULE_2__["default"], { route: route }), Object(react_router_config__WEBPACK_IMPORTED_MODULE_3__["renderRoutes"])(route.routes), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet_async__WEBPACK_IMPORTED_MODULE_1___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, "Accommodation"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "description", content: "The Accommodation page." })));
};
/* harmony default export */ __webpack_exports__["default"] = (Accommodation);

/***/ }),

/***/ "./src/components/App.tsx":
/*!********************************!*\
  !*** ./src/components/App.tsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet-async */ "react-helmet-async");
/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_helmet_async__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-config */ "react-router-config");
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/routes */ "./src/constants/routes.tsx");
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants/theme */ "./src/constants/theme.tsx");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_6__);








var App = function App(_a) {
    var context = _a.context,
        client = _a.client;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet_async__WEBPACK_IMPORTED_MODULE_1__["HelmetProvider"], { context: context }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_6__["ApolloProvider"], { client: client }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(styled_components__WEBPACK_IMPORTED_MODULE_3__["ThemeProvider"], { theme: _constants_theme__WEBPACK_IMPORTED_MODULE_5__["default"] }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet_async__WEBPACK_IMPORTED_MODULE_1___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, "Fallback title"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "description", content: "Fallback description in case routes don't add their own" })), Object(react_router_config__WEBPACK_IMPORTED_MODULE_2__["renderRoutes"])(_constants_routes__WEBPACK_IMPORTED_MODULE_4__["default"])))));
};
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/components/Dashboard.tsx":
/*!**************************************!*\
  !*** ./src/components/Dashboard.tsx ***!
  \**************************************/
/*! exports provided: ME_QUERY, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ME_QUERY", function() { return ME_QUERY; });
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_3__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};



var ME_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_2___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query MeQuery {\n        me {\n            id\n            email\n            firstName\n            lastName\n        }\n    }\n"], ["\n    query MeQuery {\n        me {\n            id\n            email\n            firstName\n            lastName\n        }\n    }\n"])));
var Dashboard = function Dashboard(props) {
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react_apollo__WEBPACK_IMPORTED_MODULE_3__["Query"], { fetchPolicy: 'no-cache', query: ME_QUERY }, function (_a) {
        var data = _a.data,
            loading = _a.loading;
        if (loading) {
            return null;
        }
        if (!data) {
            props.history.push('/login');
            return null;
        }
        if (!data.me) {
            return 'No users';
        }
        var _b = data.me,
            email = _b.email,
            firstName = _b.firstName,
            lastName = _b.lastName;
        return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", null, "Jij bent ", firstName + " " + lastName + " en je bent ingelogd met " + email);
    });
};
/* harmony default export */ __webpack_exports__["default"] = (Dashboard);
var templateObject_1;

/***/ }),

/***/ "./src/components/NotFound.tsx":
/*!*************************************!*\
  !*** ./src/components/NotFound.tsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-helmet-async */ "react-helmet-async");
/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_helmet_async__WEBPACK_IMPORTED_MODULE_3__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};



var Title = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'NotFound__Title',
    componentId: 'awptw1-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background: black;\n    padding: 4rem 1rem;\n    text-align: center;\n    color: white;\n    font-size: large;\n"], ["\n    background: black;\n    padding: 4rem 1rem;\n    text-align: center;\n    color: white;\n    font-size: large;\n"])));
var NotFound = function NotFound(_a) {
    var staticContext = _a.staticContext;
    if (staticContext) {
        staticContext.statusCode = 404;
    }
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_helmet_async__WEBPACK_IMPORTED_MODULE_3___default.a, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("title", null, "Page not found"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", { name: "description", content: "This page could not be found." })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Title, null, "Page not found!"));
};
/* harmony default export */ __webpack_exports__["default"] = (NotFound);
var templateObject_1;

/***/ }),

/***/ "./src/components/atoms/AnchorTag.tsx":
/*!********************************************!*\
  !*** ./src/components/atoms/AnchorTag.tsx ***!
  \********************************************/
/*! exports provided: AnchorTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnchorTag", function() { return AnchorTag; });
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};



var StyledLink = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    text-decoration: underline;\n    :hover {\n        color: ", ";\n    }\n"], ["\n    text-decoration: underline;\n    :hover {\n        color: ", ";\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.primary.turquoise;
});
var AnchorTag = function AnchorTag(_a) {
    var to = _a.to,
        children = _a.children;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledLink, { to: to }, children);
};
var templateObject_1;

/***/ }),

/***/ "./src/components/atoms/Checkbox.tsx":
/*!*******************************************!*\
  !*** ./src/components/atoms/Checkbox.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/get-own-property-symbols */ "babel-runtime/core-js/object/get-own-property-symbols");
/* harmony import */ var babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);



var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __assign = undefined && undefined.__assign || function () {
    __assign = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default.a || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0___default.a === "function") for (var i = 0, p = babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0___default()(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};


var Checkbox = function Checkbox(_a) {
    var absolute = _a.absolute,
        children = _a.children,
        props = __rest(_a, ["absolute", "children"]);
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("label", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Container, { absolute: absolute }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(HiddenCheckbox, __assign({}, props, { type: "checkbox" })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(StyledCheckbox, { checked: props.checked }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Icon, { viewBox: "0 0 24 24" }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("polyline", { points: "20 6 9 17 4 12" }))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Label, null, children)));
};
var Container = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
    displayName: "Checkbox__Container",
    componentId: "sc-10wra05-0"
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    align-content: center;\n    vertical-align: middle;\n    cursor: default;\n    margin: 1rem;\n    ", "\n"], ["\n    display: flex;\n    align-content: center;\n    vertical-align: middle;\n    cursor: default;\n    margin: 1rem;\n    ", "\n"])), function (_a) {
    var absolute = _a.absolute;
    return absolute && 'position: absolute; left: 0; top: 0;';
});
var Icon = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.svg.withConfig({
    displayName: "Checkbox__Icon",
    componentId: "sc-10wra05-1"
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    fill: none;\n    stroke: white;\n    stroke-width: 2px;\n"], ["\n    fill: none;\n    stroke: white;\n    stroke-width: 2px;\n"])));
var Label = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.span.withConfig({
    displayName: "Checkbox__Label",
    componentId: "sc-10wra05-2"
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    margin-left: 1rem;\n"], ["\n    margin-left: 1rem;\n"])));
var HiddenCheckbox = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.input.attrs({ type: 'checkbox' })(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    white-space: nowrap;\n    width: 1px;\n"], ["\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    white-space: nowrap;\n    width: 1px;\n"])));
var StyledCheckbox = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
    displayName: "Checkbox__StyledCheckbox",
    componentId: "sc-10wra05-3"
})(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    display: inline-block;\n    width: 25px;\n    height: 25px;\n    background: ", ";\n    border-radius: 5px;\n    transition: all 0.15s;\n\n    ", ":focus + & {\n        box-shadow: 0 0 0 3px ", ";\n    }\n\n    ", " {\n        visibility: ", ";\n    }\n"], ["\n    display: inline-block;\n    width: 25px;\n    height: 25px;\n    background: ", ";\n    border-radius: 5px;\n    transition: all 0.15s;\n\n    ", ":focus + & {\n        box-shadow: 0 0 0 3px ", ";\n    }\n\n    ", " {\n        visibility: ", ";\n    }\n"])), function (_a) {
    var theme = _a.theme,
        checked = _a.checked;
    return checked ? theme.colors.primary.turquoise : theme.colors.light.flash;
}, HiddenCheckbox, function (_a) {
    var theme = _a.theme,
        checked = _a.checked;
    return checked ? theme.colors.primary.waterspout : theme.colors.light.lavendar;
}, Icon, function (_a) {
    var checked = _a.checked;
    return checked ? 'visible' : 'hidden';
});
/* harmony default export */ __webpack_exports__["default"] = (Checkbox);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

/***/ }),

/***/ "./src/components/atoms/ContentBlock.tsx":
/*!***********************************************!*\
  !*** ./src/components/atoms/ContentBlock.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/theme */ "./src/constants/theme.tsx");

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};


var ContentBlock = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
    displayName: 'ContentBlock',
    componentId: 'wyhgr8-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: grid;\n    grid-row-gap: 2rem;\n    padding: 1rem 0;\n    grid-template-columns: 1fr;\n    @media ", " {\n        grid-template-columns: ", ";\n    }\n"], ["\n    display: grid;\n    grid-row-gap: 2rem;\n    padding: 1rem 0;\n    grid-template-columns: 1fr;\n    @media ", " {\n        grid-template-columns: ", ";\n    }\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_2__["device"].m, function (_a) {
    var threeColumns = _a.threeColumns;
    return threeColumns ? '0.4fr 1.1fr 0.5fr' : '0.4fr 1.6fr';
});
/* harmony default export */ __webpack_exports__["default"] = (ContentBlock);
var templateObject_1;

/***/ }),

/***/ "./src/components/atoms/DeleteButton.tsx":
/*!***********************************************!*\
  !*** ./src/components/atoms/DeleteButton.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};

var SecondaryButton = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.button.withConfig({
    displayName: "DeleteButton__SecondaryButton",
    componentId: "sc-3x0sko-0"
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    font-weight: 600;\n    color: white;\n    background-color: ", ";\n    padding: 1.5rem;\n    border: none;\n    outline: none;\n    text-transform: uppercase;\n    u :disabled {\n        background-color: grey;\n    }\n"], ["\n    font-weight: 600;\n    color: white;\n    background-color: ", ";\n    padding: 1.5rem;\n    border: none;\n    outline: none;\n    text-transform: uppercase;\n    u :disabled {\n        background-color: grey;\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.danger.rose;
});
/* harmony default export */ __webpack_exports__["default"] = (SecondaryButton);
var templateObject_1;

/***/ }),

/***/ "./src/components/atoms/Divider.tsx":
/*!******************************************!*\
  !*** ./src/components/atoms/Divider.tsx ***!
  \******************************************/
/*! exports provided: Divider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Divider", function() { return Divider; });
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/theme */ "./src/constants/theme.tsx");

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};


var Divider = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
    displayName: 'Divider',
    componentId: 'sc-1d4voy9-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    @media ", " {\n        margin-top: ", "rem;\n        margin-bottom: ", "rem;\n    }\n    margin-top: ", "rem;\n    margin-bottom: ", "rem;\n\n    width: 100%;\n    height: 1.1px;\n    background: ", ";\n"], ["\n    @media ", " {\n        margin-top: ", "rem;\n        margin-bottom: ", "rem;\n    }\n    margin-top: ", "rem;\n    margin-bottom: ", "rem;\n\n    width: 100%;\n    height: 1.1px;\n    background: ", ";\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_2__["device"].m, function (_a) {
    var small = _a.small;
    return small ? '1' : '4';
}, function (_a) {
    var small = _a.small;
    return small ? '1' : '4';
}, function (_a) {
    var small = _a.small;
    return small ? '0.8' : '1.5';
}, function (_a) {
    var small = _a.small;
    return small ? '0.8' : '1.5';
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.light.flash;
});
var templateObject_1;

/***/ }),

/***/ "./src/components/atoms/DoubleBedSVG.tsx":
/*!***********************************************!*\
  !*** ./src/components/atoms/DoubleBedSVG.tsx ***!
  \***********************************************/
/*! exports provided: DoubleBedSVG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoubleBedSVG", function() { return DoubleBedSVG; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var DoubleBedSVG = function DoubleBedSVG() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", { width: "32px", height: "28px", viewBox: "0 0 32 28", version: "1.1" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", { id: "UX", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", { id: "Facilities", transform: "translate(-456.000000, -244.000000)" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { x: "0", y: "0", width: "1440", height: "2000" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", { id: "Group-4", transform: "translate(440.000000, 216.000000)", stroke: "#000000", strokeWidth: "2" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", { id: "icon-/-king-bed", transform: "translate(16.000000, 24.000000)" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", { d: "M1,21 L1,26 C1,26.5522847 1.44771525,27 2,27 L30,27 C30.5522847,27 31,26.5522847 31,26 L31,21 L1,21 Z", id: "Rectangle-18" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", { d: "M1,21 L31,21 L31,20.1813346 L28.3069995,13 L3.69300047,13 L1,20.1813346 L1,21 Z", id: "Path-6" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", { d: "M3,27 L3,32", id: "Path-7", fill: "#FFFFFF", fillRule: "evenodd" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", { d: "M29,27 L29,32", id: "Path-7", fill: "#FFFFFF", fillRule: "evenodd" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", { d: "M4,13 L28,13 L28,6 C28,5.44771525 27.5522847,5 27,5 L5,5 C4.44771525,5 4,5.44771525 4,6 L4,13 Z", id: "Path-8", fillRule: "evenodd" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { id: "Rectangle-19", fill: "#FFFFFF", fillRule: "evenodd", x: "7", y: "9", width: "8", height: "6", rx: "2" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { id: "Rectangle-19", fill: "#FFFFFF", fillRule: "evenodd", x: "17", y: "9", width: "8", height: "6", rx: "2" }))))));
};

/***/ }),

/***/ "./src/components/atoms/Error.tsx":
/*!****************************************!*\
  !*** ./src/components/atoms/Error.tsx ***!
  \****************************************/
/*! exports provided: Error */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Error", function() { return Error; });
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};


var Container = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'Error__Container',
    componentId: 'sc-1ckqanh-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    color: red;\n"], ["\n    color: red;\n"])));
var Error = function Error(_a) {
    var children = _a.children;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, null, children);
};
var templateObject_1;

/***/ }),

/***/ "./src/components/atoms/GalleryPhoto.tsx":
/*!***********************************************!*\
  !*** ./src/components/atoms/GalleryPhoto.tsx ***!
  \***********************************************/
/*! exports provided: GalleryPhoto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryPhoto", function() { return GalleryPhoto; });
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ "babel-runtime/core-js/symbol/iterator");
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/symbol */ "babel-runtime/core-js/symbol");
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_image_loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-image-loading */ "react-image-loading");
/* harmony import */ var react_image_loading__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_image_loading__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Checkbox */ "./src/components/atoms/Checkbox.tsx");



var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && o[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};


// import ToggleSVG from './ToggleSVG';
// import { PicToggleButton } from './PicToggleButton';


var Container = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
    displayName: "GalleryPhoto__Container",
    componentId: "sc-1mv1h0n-0"
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position: relative;\n    height: 25rem;\n    background-image: url(", ");\n    background-size: cover;\n    cursor: grab;\n    list-style-type: none;\n    float: left;\n    width: 100%;\n    // * On safari and firefox it selects the other pics when dragging\n    user-select: none;\n    border-radius: 5%;\n    border: ", ";\n    border-color: ", ";\n    &.dragging-helper-class {\n        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.5);\n    }\n"], ["\n    position: relative;\n    height: 25rem;\n    background-image: url(", ");\n    background-size: cover;\n    cursor: grab;\n    list-style-type: none;\n    float: left;\n    width: 100%;\n    // * On safari and firefox it selects the other pics when dragging\n    user-select: none;\n    border-radius: 5%;\n    border: ", ";\n    border-color: ", ";\n    &.dragging-helper-class {\n        box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.5);\n    }\n"])), function (_a) {
    var src = _a.src;
    return src;
}, function (_a) {
    var checked = _a.checked;
    return checked ? '3px solid' : 'none';
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.primary.turquoise;
});
var Highlighted = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
    displayName: "GalleryPhoto__Highlighted",
    componentId: "sc-1mv1h0n-1"
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    text-transform: uppercase;\n    font-size: 0.8em;\n    color: white;\n    font-weight: 800;\n    opacity: 0.7;\n    background: black;\n    position: absolute;\n    right: 1rem;\n    border-radius: 20px;\n    padding: 0 1rem 0 1rem;\n    top: 1rem;\n"], ["\n    text-transform: uppercase;\n    font-size: 0.8em;\n    color: white;\n    font-weight: 800;\n    opacity: 0.7;\n    background: black;\n    position: absolute;\n    right: 1rem;\n    border-radius: 20px;\n    padding: 0 1rem 0 1rem;\n    top: 1rem;\n"])));
var GalleryPhoto = function GalleryPhoto(_a) {
    var src = _a.src,
        first = _a.first;
    var _b = __read(Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false), 2),
        hover = _b[0],
        setHover = _b[1];
    var _c = __read(Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false), 2),
        checked = _c[0],
        setChecked = _c[1];
    var handleCheckboxChange = function handleCheckboxChange(event) {
        setChecked(event.target.checked);
    };
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Container, { checked: checked, hover: hover, onMouseLeave: function onMouseLeave() {
            return setHover(!hover);
        }, onMouseEnter: function onMouseEnter() {
            return setHover(!hover);
        } }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_image_loading__WEBPACK_IMPORTED_MODULE_5__["Img"], { style: { pointerEvents: 'none', borderRadius: '4%', objectFit: 'cover' }, width: '100%', src: src, height: '100%' }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Checkbox__WEBPACK_IMPORTED_MODULE_6__["default"], { absolute: true, checked: checked, onChange: handleCheckboxChange }), first && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Highlighted, null, "Uitgelicht"));
};
var templateObject_1, templateObject_2;

/***/ }),

/***/ "./src/components/atoms/LanguageTextInput.tsx":
/*!****************************************************!*\
  !*** ./src/components/atoms/LanguageTextInput.tsx ***!
  \****************************************************/
/*! exports provided: LanguageTextInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageTextInput", function() { return LanguageTextInput; });
/* harmony import */ var babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/get-own-property-symbols */ "babel-runtime/core-js/object/get-own-property-symbols");
/* harmony import */ var babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Error */ "./src/components/atoms/Error.tsx");



var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __assign = undefined && undefined.__assign || function () {
    __assign = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default.a || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0___default.a === "function") for (var i = 0, p = babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0___default()(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};



var StyledInput = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.input.withConfig({
    displayName: "LanguageTextInput__StyledInput",
    componentId: "sc-1jop7yg-0"
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    font-family: inherit;\n    font-size: inherit;\n    outline: none;\n    border: none;\n    background-color: ", ";\n    width: 100%;\n"], ["\n    font-family: inherit;\n    font-size: inherit;\n    outline: none;\n    border: none;\n    background-color: ", ";\n    width: 100%;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.light.snow;
});
var StyledTextArea = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.textarea.withConfig({
    displayName: "LanguageTextInput__StyledTextArea",
    componentId: "sc-1jop7yg-1"
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-family: inherit;\n    font-size: inherit;\n    outline: none;\n    border: none;\n    background-color: ", ";\n    width: 100%;\n    resize: vertical;\n"], ["\n    font-family: inherit;\n    font-size: inherit;\n    outline: none;\n    border: none;\n    background-color: ", ";\n    width: 100%;\n    resize: vertical;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.light.snow;
});
var LanguageTextInput = function LanguageTextInput(_a) {
    var field = _a.field,
        _b = _a.form,
        errors = _b.errors,
        touched = _b.touched,
        big = _a.big,
        props = __rest(_a, ["field", "form", "big"]);
    return big ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(StyledTextArea, __assign({ autoComplete: "off" }, field, props)), errors[field.name] && touched[field.name] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Error__WEBPACK_IMPORTED_MODULE_5__["Error"], null, errors[field.name])) : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(StyledInput, __assign({ autoComplete: "off" }, field, props)), errors[field.name] && touched[field.name] && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Error__WEBPACK_IMPORTED_MODULE_5__["Error"], null, errors[field.name]));
};
var templateObject_1, templateObject_2;

/***/ }),

/***/ "./src/components/atoms/Logo.tsx":
/*!***************************************!*\
  !*** ./src/components/atoms/Logo.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/get-own-property-symbols */ "babel-runtime/core-js/object/get-own-property-symbols");
/* harmony import */ var babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);


var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0___default.a === "function") for (var i = 0, p = babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0___default()(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};



var Container = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.svg.withConfig({
    displayName: "Logo__Container",
    componentId: "sc-1xqfr3h-0"
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin: 0 5rem 0 0;\n    display: flex;\n    height: 100%;\n    align-self: center;\n"], ["\n    margin: 0 5rem 0 0;\n    display: flex;\n    height: 100%;\n    align-self: center;\n"])));
var Logo = function Logo(_a) {
    var _b = _a.variant,
        variant = _b === void 0 ? 'light' : _b,
        _c = _a.color,
        color = _c === void 0 ? 'currentColor' : _c,
        _d = _a.size,
        size = _d === void 0 ? 'medium' : _d,
        rest = __rest(_a, ["variant", "color", "size"]);
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], { to: "/" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Container, { width: "48", height: "21", viewBox: "0 0 48 21" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("g", { fill: "none", fillRule: "evenodd" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("path", { d: "M3.44250024.8h5.4v3.6h4.19999996v4.35H8.84250024v5.1c0 .99.45 1.5 1.34999996 1.5.63 0 1.5-.12 1.95-.21l.3-.09.6 4.5c-1.2.51-2.64.75-4.34999996.75-3.24 0-5.25-1.83-5.25-4.95v-6.6h-2.7V4.4h2.7V.8zM15.9112501 18.02c-1.59-1.53-2.4-3.42-2.4-5.73 0-2.31.84-4.23 2.49-5.82 1.65-1.59 3.72-2.37 6.15-2.37s4.47.75 6.06 2.28c1.59 1.53 2.4 3.42 2.4 5.73 0 2.31-.84 4.23-2.49 5.82-1.65 1.59-3.72 2.37-6.15 2.37s-4.47-.75-6.06-2.28zm3.9-8.07c-1.2 1.23-1.2 3.27 0 4.47.6.63 1.35.93 2.25.93.9 0 1.65-.3 2.25-.93 1.2-1.2 1.2-3.24 0-4.47-.6-.6-1.35-.9-2.25-.9-.9 0-1.65.3-2.25.9zM37.38 20h-5.4V4.4h4.8l.27 2.79c1.11-2.07 2.94-3.09 5.52-3.09l-.09 5.55h-1.14c-2.61 0-3.93 1.23-3.96 4.14V20z", fill: variant === 'light' ? '#FFF' : '#000' }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("path", { d: "M41.7487499 19.34c-1.26-1.26-1.26-3.42 0-4.68 1.26-1.26 3.42-1.26 4.68 0 1.26 1.26 1.26 3.42 0 4.68-1.26 1.26-3.42 1.26-4.68 0z", fill: "#00EDF7" })))));
};
/* harmony default export */ __webpack_exports__["default"] = (Logo);
var templateObject_1;

/***/ }),

/***/ "./src/components/atoms/MenuItem.tsx":
/*!*******************************************!*\
  !*** ./src/components/atoms/MenuItem.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path-to-regexp */ "path-to-regexp");
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path_to_regexp__WEBPACK_IMPORTED_MODULE_4__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};




var MenuItem = function MenuItem(_a) {
    var to = _a.to,
        children = _a.children,
        params = _a.match.params;
    var generatePath = path_to_regexp__WEBPACK_IMPORTED_MODULE_4___default.a.compile(to);
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Link, { to: generatePath(params) }, children));
};
var Link = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    color: ", ";\n    transition: 0.25s color;\n\n    &:after {\n        content: '';\n        position: absolute;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: ", ";\n        height: 0.3rem;\n        opacity: 0;\n        pointer-events: none;\n        z-index: 1;\n        transition: 0.25s opacity;\n    }\n    &.active {\n        color: ", ";\n\n        &:after {\n            opacity: 1;\n        }\n    }\n"], ["\n    color: ", ";\n    transition: 0.25s color;\n\n    &:after {\n        content: '';\n        position: absolute;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: ", ";\n        height: 0.3rem;\n        opacity: 0;\n        pointer-events: none;\n        z-index: 1;\n        transition: 0.25s opacity;\n    }\n    &.active {\n        color: ", ";\n\n        &:after {\n            opacity: 1;\n        }\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.light.silver;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.primary.turquoise;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.light.white;
});
var Container = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.li.withConfig({
    displayName: 'MenuItem__Container',
    componentId: 'cfmmzf-0'
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-size: 1.4rem;\n    line-height: 3.2rem;\n    height: 7.2rem;\n    display: flex;\n    align-items: center;\n    font-weight: 500;\n    color: ", ";\n    margin: 0 3rem;\n    list-style: none;\n    position: relative;\n"], ["\n    font-size: 1.4rem;\n    line-height: 3.2rem;\n    height: 7.2rem;\n    display: flex;\n    align-items: center;\n    font-weight: 500;\n    color: ", ";\n    margin: 0 3rem;\n    list-style: none;\n    position: relative;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.dark.silver;
});
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["withRouter"])(MenuItem));
var templateObject_1, templateObject_2;

/***/ }),

/***/ "./src/components/atoms/PrimaryButton.tsx":
/*!************************************************!*\
  !*** ./src/components/atoms/PrimaryButton.tsx ***!
  \************************************************/
/*! exports provided: PrimaryButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrimaryButton", function() { return PrimaryButton; });
/* harmony import */ var babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/keys */ "babel-runtime/core-js/object/keys");
/* harmony import */ var babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);


var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};


var StyledButton = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.button.withConfig({
    displayName: 'PrimaryButton__StyledButton',
    componentId: 'xfbh1x-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    font-weight: 500;\n    font-size: 1em;\n    width: 100%;\n    color: white;\n    background-color: ", ";\n    padding: 1.4rem 2rem;\n    border: none;\n    outline: none;\n    display: flex;\n    font-style: inherit;\n\n    justify-content: ", ";\n    align-items: center;\n\n    :disabled {\n        background-color: grey;\n    }\n"], ["\n    font-weight: 500;\n    font-size: 1em;\n    width: 100%;\n    color: white;\n    background-color: ", ";\n    padding: 1.4rem 2rem;\n    border: none;\n    outline: none;\n    display: flex;\n    font-style: inherit;\n\n    justify-content: ", ";\n    align-items: center;\n\n    :disabled {\n        background-color: grey;\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.primary.turquoise;
}, function (_a) {
    var withArrow = _a.withArrow;
    return withArrow ? 'space-between' : 'center';
});
var PrimaryButton = function PrimaryButton(_a) {
    var type = _a.type,
        children = _a.children,
        onClick = _a.onClick,
        errors = _a.errors,
        withArrow = _a.withArrow;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledButton, { withArrow: withArrow, disabled: errors && babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(errors).length !== 0, onClick: onClick, type: type || 'button' }, children, withArrow && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("svg", { width: "24", fill: "#FFF", height: "24", xmlns: "http://www.w3.org/2000/svg", fillRule: "evenodd", clipRule: "evenodd" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("path", { stroke: "white", strokeWidth: "0.8", d: "M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" })));
};
var templateObject_1;

/***/ }),

/***/ "./src/components/atoms/PrimarySpanText.tsx":
/*!**************************************************!*\
  !*** ./src/components/atoms/PrimarySpanText.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};

var PrimarySpanText = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.span.withConfig({
    displayName: "PrimarySpanText",
    componentId: "mfs9og-0"
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin: 0;\n    color: ", ";\n"], ["\n    margin: 0;\n    color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.primary.turquoise;
});
/* harmony default export */ __webpack_exports__["default"] = (PrimarySpanText);
var templateObject_1;

/***/ }),

/***/ "./src/components/atoms/SecondaryButton.tsx":
/*!**************************************************!*\
  !*** ./src/components/atoms/SecondaryButton.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};

var SecondaryButton = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.button.withConfig({
    displayName: "SecondaryButton",
    componentId: "sc-8mv4zb-0"
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    font-weight: 600;\n    color: white;\n    background-color: ", ";\n    padding: 1.5rem;\n    border: none;\n    outline: none;\n    margin: 1.5rem;\n    text-transform: uppercase;\n    u :disabled {\n        background-color: grey;\n    }\n"], ["\n    font-weight: 600;\n    color: white;\n    background-color: ", ";\n    padding: 1.5rem;\n    border: none;\n    outline: none;\n    margin: 1.5rem;\n    text-transform: uppercase;\n    u :disabled {\n        background-color: grey;\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.dark.eerie;
});
/* harmony default export */ __webpack_exports__["default"] = (SecondaryButton);
var templateObject_1;

/***/ }),

/***/ "./src/components/atoms/SingleBedSVG.tsx":
/*!***********************************************!*\
  !*** ./src/components/atoms/SingleBedSVG.tsx ***!
  \***********************************************/
/*! exports provided: SingleBedSVG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingleBedSVG", function() { return SingleBedSVG; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var SingleBedSVG = function SingleBedSVG() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", { width: "24px", height: "28px", viewBox: "0 0 24 28", version: "1.1" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", { id: "UX", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", { id: "Facilities", transform: "translate(-532.000000, -244.000000)" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { x: "0", y: "0", width: "1440", height: "2000" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", { id: "Group-4", transform: "translate(440.000000, 216.000000)", stroke: "#000000", strokeWidth: "2" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", { id: "icon-/-single", transform: "translate(88.000000, 24.000000)" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", { d: "M5,21 L5,26 C5,26.5522847 5.44771525,27 6,27 L26,27 C26.5522847,27 27,26.5522847 27,26 L27,21 L5,21 Z", id: "Rectangle-18" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", { d: "M5,21 L27,21 L27,20.1813346 L24.3069995,13 L7.69300047,13 L5,20.1813346 L5,21 Z", id: "Path-6" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", { d: "M7,27 L7,32", id: "Path-7", fill: "#FFFFFF", fillRule: "evenodd" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", { d: "M25,27 L25,32", id: "Path-7", fill: "#FFFFFF", fillRule: "evenodd" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", { d: "M8,13 L24,13 L24,6 C24,5.44771525 23.5522847,5 23,5 L9,5 C8.44771525,5 8,5.44771525 8,6 L8,13 Z", id: "Path-8", fillRule: "evenodd" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", { id: "Rectangle-19", fill: "#FFFFFF", fillRule: "evenodd", x: "11", y: "9", width: "10", height: "6", rx: "2" }))))));
};

/***/ }),

/***/ "./src/components/atoms/TextInput.tsx":
/*!********************************************!*\
  !*** ./src/components/atoms/TextInput.tsx ***!
  \********************************************/
/*! exports provided: TextInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextInput", function() { return TextInput; });
/* harmony import */ var babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/get-own-property-symbols */ "babel-runtime/core-js/object/get-own-property-symbols");
/* harmony import */ var babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Error */ "./src/components/atoms/Error.tsx");



var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __assign = undefined && undefined.__assign || function () {
    __assign = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default.a || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0___default.a === "function") for (var i = 0, p = babel_runtime_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_0___default()(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};



var Container = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
    displayName: "TextInput__Container",
    componentId: "sc-15j7bqj-0"
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n"], ["\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n"])));
var StyledInput = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.input.withConfig({
    displayName: "TextInput__StyledInput",
    componentId: "sc-15j7bqj-1"
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-size: inherit;\n    font-style: inherit;\n    border: 1px solid ", ";\n    background-color: ", ";\n    width: ", ";\n    padding: 1.5rem 2rem;\n    outline: none;\n    direction: ", ";\n"], ["\n    font-size: inherit;\n    font-style: inherit;\n    border: 1px solid ", ";\n    background-color: ", ";\n    width: ", ";\n    padding: 1.5rem 2rem;\n    outline: none;\n    direction: ", ";\n"])), function (_a) {
    var theme = _a.theme,
        error = _a.error;
    return error ? 'red' : theme.colors.light.flash;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.light.snow;
}, function (_a) {
    var small = _a.small;
    return small ? '10rem' : '100%';
}, function (_a) {
    var right = _a.right;
    return right ? 'rtl' : '';
});
var InputWrapper = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
    displayName: "TextInput__InputWrapper",
    componentId: "sc-15j7bqj-2"
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n"], ["\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n"])));
var TextInput = function TextInput(_a) {
    var field = _a.field,
        _b = _a.form,
        touched = _b.touched,
        errors = _b.errors,
        children = _a.children,
        props = __rest(_a, ["field", "form", "children"]);
    return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](Container, null, react__WEBPACK_IMPORTED_MODULE_3__["createElement"](InputWrapper, null, react__WEBPACK_IMPORTED_MODULE_3__["createElement"](StyledInput, __assign({ error: !!(errors[field.name] && touched[field.name]), type: "text" }, field, props)), children && react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("p", { style: { marginLeft: '1rem' } }, " ", children)), errors[field.name] && touched[field.name] && react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_Error__WEBPACK_IMPORTED_MODULE_5__["Error"], null, errors[field.name]));
};
var templateObject_1, templateObject_2, templateObject_3;

/***/ }),

/***/ "./src/components/atoms/ToggleButton.tsx":
/*!***********************************************!*\
  !*** ./src/components/atoms/ToggleButton.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};


var ToggleButton = function ToggleButton(_a) {
    var fill = _a.fill,
        handleOnToggle = _a.handleOnToggle;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, { onClick: function onClick() {
            return handleOnToggle();
        } }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", { width: "4", height: "18", viewBox: "0 0 4 18" }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", { d: "M2 4C.895431 4 0 3.1045695 0 2s.895431-2 2-2c1.104569 0 2 .8954305 2 2s-.895431 2-2 2zm0 7c-1.104569 0-2-.8954305-2-2s.895431-2 2-2c1.104569 0 2 .8954305 2 2s-.895431 2-2 2zm0 7c-1.104569 0-2-.8954305-2-2s.895431-2 2-2c1.104569 0 2 .8954305 2 2s-.895431 2-2 2z", fill: fill || '#FFF', fillRule: "evenodd" })));
};
var Container = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'ToggleButton__Container',
    componentId: 'ku5nsx-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position: absolute;\n    height: 100%;\n    cursor: pointer;\n    padding: 0 1.6rem;\n    display: flex;\n    align-items: center;\n    z-index: 1;\n    right: 0;\n"], ["\n    position: absolute;\n    height: 100%;\n    cursor: pointer;\n    padding: 0 1.6rem;\n    display: flex;\n    align-items: center;\n    z-index: 1;\n    right: 0;\n"])));
/* harmony default export */ __webpack_exports__["default"] = (ToggleButton);
var templateObject_1;

/***/ }),

/***/ "./src/components/molecules/AccommodationPicker.tsx":
/*!**********************************************************!*\
  !*** ./src/components/molecules/AccommodationPicker.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ "babel-runtime/core-js/symbol/iterator");
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/symbol */ "babel-runtime/core-js/symbol");
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _AccommodationPickerEntry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AccommodationPickerEntry */ "./src/components/molecules/AccommodationPickerEntry.tsx");
/* harmony import */ var react_outside_click_handler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-outside-click-handler */ "react-outside-click-handler");
/* harmony import */ var react_outside_click_handler__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_outside_click_handler__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../constants/theme */ "./src/constants/theme.tsx");



var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && o[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};








var ACCOMMODATIONS_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_6___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query AccommodationsQuery {\n        accommodations {\n            id\n            name\n            code\n            photos {\n                url\n            }\n        }\n    }\n"], ["\n    query AccommodationsQuery {\n        accommodations {\n            id\n            name\n            code\n            photos {\n                url\n            }\n        }\n    }\n"])));
var AccommodationPicker = function AccommodationPicker(_a) {
    var match = _a.match,
        location = _a.location;
    var _b = __read(Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false), 2),
        opened = _b[0],
        setOpened = _b[1];
    var _c = __read(Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false), 2),
        isAnimating = _c[0],
        setIsAnimating = _c[1];
    // @ts-ignore
    var accommodationId = match.params.accommodationId;
    var AccommodationPickerEntries = function AccommodationPickerEntries() {
        return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_7__["Query"], { query: ACCOMMODATIONS_QUERY }, function (_a) {
            var loading = _a.loading,
                error = _a.error,
                data = _a.data;
            if (loading) {
                return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", null, "Loading!");
            }
            if (error || !data) {
                return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", null, "Something terribly went wrong!");
            }
            if (data.accommodations.length === 0) {
                return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", null, "Nieuwe accommdatie aanmaken");
            }
            var selectedAccommodation = data.accommodations.find(function (accommodation) {
                return accommodation.id === accommodationId;
            });
            var entries = data.accommodations.filter(function (accommodation) {
                return accommodation.id !== accommodationId;
            });
            if (selectedAccommodation) {
                entries = __spread([selectedAccommodation], entries);
            }
            return entries.map(function (entry, index) {
                return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_AccommodationPickerEntry__WEBPACK_IMPORTED_MODULE_8__["default"], { location: location, opened: opened, setOpened: setOpened, first: index === 0, key: entry.id, entry: entry, onlyOneEntry: entries.length === 1 });
            });
        });
    };
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Wrapper, { opened: opened, isAnimating: isAnimating }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_outside_click_handler__WEBPACK_IMPORTED_MODULE_9___default.a, { onOutsideClick: function onOutsideClick() {
            return opened && setOpened(!opened);
        } }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Container, { onTransitionEnd: function onTransitionEnd() {
            return setIsAnimating(true);
        }, opened: opened }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(AccommodationPickerEntries, null))));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_5__["withRouter"])(AccommodationPicker));
var Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
    displayName: "AccommodationPicker__Wrapper",
    componentId: "n2787o-0"
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    height: 7.2rem;\n    overflow: ", ";\n    position: relative;\n    display: none;\n    z-index: 1;\n    @media ", " {\n        display: initial;\n    }\n"], ["\n    height: 7.2rem;\n    overflow: ", ";\n    position: relative;\n    display: none;\n    z-index: 1;\n    @media ", " {\n        display: initial;\n    }\n"])), function (_a) {
    var opened = _a.opened,
        isAnimating = _a.isAnimating;
    return opened ? 'inherit' : 'hidden';
}, _constants_theme__WEBPACK_IMPORTED_MODULE_10__["device"].s);
// temp workaround for height because somehow it doesn't automatically scale...
var Container = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
    displayName: "AccommodationPicker__Container",
    componentId: "n2787o-1"
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    box-shadow: ", ";\n    border-radius: ", ";\n    display: flex;\n    flex-direction: column;\n    align-self: flex-start;\n    height: auto;\n    transition: all 0.25s;\n    overflow: hidden;\n"], ["\n    box-shadow: ", ";\n    border-radius: ", ";\n    display: flex;\n    flex-direction: column;\n    align-self: flex-start;\n    height: auto;\n    transition: all 0.25s;\n    overflow: hidden;\n"])), function (_a) {
    var opened = _a.opened;
    return opened ? '0 0 40px 0 rgba(0, 0, 0, 0.1)' : 'none';
}, function (_a) {
    var opened = _a.opened;
    return opened ? '0 0 4px 4px' : '0';
});
var templateObject_1, templateObject_2, templateObject_3;

/***/ }),

/***/ "./src/components/molecules/AccommodationPickerEntry.tsx":
/*!***************************************************************!*\
  !*** ./src/components/molecules/AccommodationPickerEntry.tsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _atoms_ToggleButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../atoms/ToggleButton */ "./src/components/atoms/ToggleButton.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};




var AccommodationPickerEntry = function AccommodationPickerEntry(_a) {
    var onlyOneEntry = _a.onlyOneEntry,
        entry = _a.entry,
        first = _a.first,
        setOpened = _a.setOpened,
        opened = _a.opened,
        location = _a.location;
    var name = entry.name,
        photos = entry.photos,
        code = entry.code,
        id = entry.id;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, { first: first, opened: opened }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Link, { exact: true, onClick: function onClick() {
            return setOpened(false);
        }, to: "/accommodation/" + id, opened: opened ? 1 : 0 }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Thumbnail, { src: photos[0].url }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Description, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Title, null, name.length > 40 ? name.substring(0, 35).trim().concat('...') : name), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Code, null, code))), first && !onlyOneEntry && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atoms_ToggleButton__WEBPACK_IMPORTED_MODULE_3__["default"], { fill: opened ? '#000' : '#FFF', handleOnToggle: function handleOnToggle() {
            return setOpened(!opened);
        } }));
};
/* harmony default export */ __webpack_exports__["default"] = (AccommodationPickerEntry);
var Container = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'AccommodationPickerEntry__Container',
    componentId: 'sc-1xq0d0r-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    color: ", ";\n    display: flex;\n    align-items: center;\n    height: 7.2rem;\n    background-color: ", ";\n    border-bottom: ", ";\n"], ["\n    color: ", ";\n    display: flex;\n    align-items: center;\n    height: 7.2rem;\n    background-color: ", ";\n    border-bottom: ", ";\n"])), function (_a) {
    var opened = _a.opened;
    return opened ? 'black' : 'white';
}, function (_a) {
    var opened = _a.opened;
    return opened && 'white';
}, function (_a) {
    var opened = _a.opened;
    return opened && '1px solid #F2F2F2';
});
var Link = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["NavLink"])(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    height: 7.2rem;\n    width: 100%;\n\n    &:after {\n        content: '';\n        position: absolute;\n        top: ", ";\n        left: ", ";\n        right: ", ";\n        width: ", ";\n        height: ", ";\n        bottom: 0;\n        background-color: ", ";\n        opacity: 0;\n        pointer-events: none;\n        z-index: 1;\n        transition: 0.25s opacity;\n    }\n\n    &.active {\n        &:after {\n            opacity: 1;\n        }\n    }\n\n    &:hover {\n        background-color: ", ";\n    }\n"], ["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    height: 7.2rem;\n    width: 100%;\n\n    &:after {\n        content: '';\n        position: absolute;\n        top: ", ";\n        left: ", ";\n        right: ", ";\n        width: ", ";\n        height: ", ";\n        bottom: 0;\n        background-color: ", ";\n        opacity: 0;\n        pointer-events: none;\n        z-index: 1;\n        transition: 0.25s opacity;\n    }\n\n    &.active {\n        &:after {\n            opacity: 1;\n        }\n    }\n\n    &:hover {\n        background-color: ", ";\n    }\n"])), function (_a) {
    var opened = _a.opened;
    return opened ? '0' : 'auto';
}, function (_a) {
    var opened = _a.opened;
    return opened ? '-1px' : '0';
}, function (_a) {
    var opened = _a.opened;
    return opened ? 'auto' : '0';
}, function (_a) {
    var opened = _a.opened;
    return opened ? '.4rem' : 'auto';
}, function (_a) {
    var opened = _a.opened;
    return opened ? '7.2rem' : '.4rem';
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.primary.turquoise;
}, function (_a) {
    var opened = _a.opened,
        theme = _a.theme;
    return opened && theme.colors.light.flash;
});
var Thumbnail = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.img.withConfig({
    displayName: 'AccommodationPickerEntry__Thumbnail',
    componentId: 'sc-1xq0d0r-1'
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    margin-left: 1rem;\n    width: 7.2rem;\n    height: 4.5rem;\n    object-fit: cover;\n    border-radius: 4px;\n"], ["\n    margin-left: 1rem;\n    width: 7.2rem;\n    height: 4.5rem;\n    object-fit: cover;\n    border-radius: 4px;\n"])));
var Description = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'AccommodationPickerEntry__Description',
    componentId: 'sc-1xq0d0r-2'
})(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    display: flex;\n    height: 4.5rem;\n    width: 25rem;\n    flex-direction: column;\n    justify-self: center;\n    margin: 0rem 1rem;\n"], ["\n    display: flex;\n    height: 4.5rem;\n    width: 25rem;\n    flex-direction: column;\n    justify-self: center;\n    margin: 0rem 1rem;\n"])));
var Title = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'AccommodationPickerEntry__Title',
    componentId: 'sc-1xq0d0r-3'
})(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    font-weight: 500;\n    line-height: 1.1em;\n    width: 20rem;\n"], ["\n    font-weight: 500;\n    line-height: 1.1em;\n    width: 20rem;\n"])));
var Code = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'AccommodationPickerEntry__Code',
    componentId: 'sc-1xq0d0r-4'
})(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    color: ", ";\n    font-size: 0.8em;\n"], ["\n    color: ", ";\n    font-size: 0.8em;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.dark.silver;
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;

/***/ }),

/***/ "./src/components/molecules/ContentHeader.tsx":
/*!****************************************************!*\
  !*** ./src/components/molecules/ContentHeader.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};


/* harmony default export */ __webpack_exports__["default"] = (function (props) {
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](ContentHeader, null, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Text, null, props.children));
});
var ContentHeader = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'ContentHeader',
    componentId: 'dc6mqg-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var Text = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'ContentHeader__Text',
    componentId: 'dc6mqg-1'
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 100%;\n"], ["\n    width: 100%;\n"])));
var templateObject_1, templateObject_2;

/***/ }),

/***/ "./src/components/molecules/HamburgerMenu.tsx":
/*!****************************************************!*\
  !*** ./src/components/molecules/HamburgerMenu.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ "babel-runtime/core-js/symbol/iterator");
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/symbol */ "babel-runtime/core-js/symbol");
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _atoms_SecondaryButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../atoms/SecondaryButton */ "./src/components/atoms/SecondaryButton.tsx");
/* harmony import */ var react_outside_click_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-outside-click-handler */ "react-outside-click-handler");
/* harmony import */ var react_outside_click_handler__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_outside_click_handler__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _organisms_info_SideMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../organisms/info/SideMenu */ "./src/components/organisms/info/SideMenu.tsx");
/* harmony import */ var _atoms_Divider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../atoms/Divider */ "./src/components/atoms/Divider.tsx");
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../constants/theme */ "./src/constants/theme.tsx");



var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && o[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};









var HamburgerMenu = function HamburgerMenu(_a) {
    var route = _a.route;
    var _b = __read(Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false), 2),
        isOpen = _b[0],
        setIsOpen = _b[1];
    var infoRoute = route.routes && route.routes.find(function (r) {
        return r.name === 'Gegevens';
    });
    return react__WEBPACK_IMPORTED_MODULE_3__["createElement"](react__WEBPACK_IMPORTED_MODULE_3__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_3__["createElement"](Container, { onClick: function onClick() {
            return setIsOpen(!isOpen);
        } }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("svg", { version: "1.1", viewBox: "0 0 25 25", width: "25px", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px" }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("rect", { y: "5", fill: "#FFF", width: "28", height: "3" }), react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("rect", { y: "12", fill: "#FFF", width: "28", height: "3" }), react__WEBPACK_IMPORTED_MODULE_3__["createElement"]("rect", { y: "19", fill: "#FFF", width: "28", height: "3" }))), react__WEBPACK_IMPORTED_MODULE_3__["createElement"](react_outside_click_handler__WEBPACK_IMPORTED_MODULE_6___default.a, { onOutsideClick: function onOutsideClick() {
            return isOpen && setIsOpen(!isOpen);
        } }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"](Menu, { isOpen: isOpen }, react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_atoms_SecondaryButton__WEBPACK_IMPORTED_MODULE_5__["default"], { onClick: function onClick() {
            return setIsOpen(!isOpen);
        } }, "Sluiten"), react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_atoms_Divider__WEBPACK_IMPORTED_MODULE_9__["Divider"], { small: true }), react__WEBPACK_IMPORTED_MODULE_3__["createElement"](InfoMenuItems, null, infoRoute && infoRoute.routes && react__WEBPACK_IMPORTED_MODULE_3__["createElement"](_organisms_info_SideMenu__WEBPACK_IMPORTED_MODULE_8__["default"], { hamburgerOpen: function hamburgerOpen() {
            return setIsOpen(!open);
        }, inHamburger: true, routes: infoRoute.routes, handlePageIndex: function handlePageIndex() {
            return null;
        } })))));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_7__["withRouter"])(HamburgerMenu));
var InfoMenuItems = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
    displayName: "HamburgerMenu__InfoMenuItems",
    componentId: "sc-173bbj6-0"
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    @media ", " {\n        display: none;\n    }\n"], ["\n    @media ", " {\n        display: none;\n    }\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_10__["device"].m);
var Container = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
    displayName: "HamburgerMenu__Container",
    componentId: "sc-173bbj6-1"
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n    min-width: 8rem;\n    padding-left: 2rem;\n    position: relative;\n"], ["\n    display: flex;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n    min-width: 8rem;\n    padding-left: 2rem;\n    position: relative;\n"])));
var Menu = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
    displayName: "HamburgerMenu__Menu",
    componentId: "sc-173bbj6-2"
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    padding: 1.5rem 1rem 3rem 3rem;\n    z-index: 2;\n    height: 100vh;\n    @media ", " {\n        width: 50rem;\n    }\n    width: 30rem;\n    background-color: ", ";\n    position: absolute;\n    border-right: 1px solid ", ";\n    left: -50rem;\n    ", ";\n    transition: all 0.5s;\n"], ["\n    padding: 1.5rem 1rem 3rem 3rem;\n    z-index: 2;\n    height: 100vh;\n    @media ", " {\n        width: 50rem;\n    }\n    width: 30rem;\n    background-color: ", ";\n    position: absolute;\n    border-right: 1px solid ", ";\n    left: -50rem;\n    ", ";\n    transition: all 0.5s;\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_10__["device"].s, function (_a) {
    var theme = _a.theme;
    return theme.colors.light.snow;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.light.flash;
}, function (_a) {
    var isOpen = _a.isOpen;
    return isOpen ? 'transform: translateX(50rem)' : '';
});
var templateObject_1, templateObject_2, templateObject_3;

/***/ }),

/***/ "./src/components/molecules/InfoStatus.tsx":
/*!*************************************************!*\
  !*** ./src/components/molecules/InfoStatus.tsx ***!
  \*************************************************/
/*! exports provided: InfoStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoStatus", function() { return InfoStatus; });
/* harmony import */ var babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/keys */ "babel-runtime/core-js/object/keys");
/* harmony import */ var babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _atoms_Checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../atoms/Checkbox */ "./src/components/atoms/Checkbox.tsx");
/* harmony import */ var _atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../atoms/PrimaryButton */ "./src/components/atoms/PrimaryButton.tsx");
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../constants/theme */ "./src/constants/theme.tsx");


var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};





var Status = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div.withConfig({
    displayName: 'InfoStatus__Status',
    componentId: 'sc-3ti1dq-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n    background: white;\n    height: 7rem;\n    @media ", " {\n        height: 10rem;\n        width: 80%;\n        padding: 0 15rem;\n        justify-content: space-between;\n    }\n    border-top: 2px solid ", ";\n    bottom: 0;\n    right: 0;\n    position: fixed;\n    width: 100%;\n    z-index: 1;\n"], ["\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n    background: white;\n    height: 7rem;\n    @media ", " {\n        height: 10rem;\n        width: 80%;\n        padding: 0 15rem;\n        justify-content: space-between;\n    }\n    border-top: 2px solid ", ";\n    bottom: 0;\n    right: 0;\n    position: fixed;\n    width: 100%;\n    z-index: 1;\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_6__["device"].m, function (_a) {
    var theme = _a.theme;
    return theme.colors.light.flash;
});
var Progress = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div.withConfig({
    displayName: 'InfoStatus__Progress',
    componentId: 'sc-3ti1dq-1'
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: none;\n\n    @media ", " {\n        display: flex;\n        align-items: center;\n    }\n"], ["\n    display: none;\n\n    @media ", " {\n        display: flex;\n        align-items: center;\n    }\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_6__["device"].s);
var ButtonWrapper = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div.withConfig({
    displayName: 'InfoStatus__ButtonWrapper',
    componentId: 'sc-3ti1dq-2'
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 25rem;\n    @media ", " {\n        width: 30rem;\n    }\n"], ["\n    width: 25rem;\n    @media ", " {\n        width: 30rem;\n    }\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_6__["device"].s);
var StatusText = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.h3.withConfig({
    displayName: 'InfoStatus__StatusText',
    componentId: 'sc-3ti1dq-3'
})(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    margin-left: 1rem;\n    color: ", ";\n"], ["\n    margin-left: 1rem;\n    color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.primary.turquoise;
});
var InfoStatus = function InfoStatus(_a) {
    var handleOnClick = _a.handleOnClick,
        page = _a.page,
        onLastPage = _a.onLastPage,
        errors = _a.errors;
    var hasErrors = babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(errors).length !== 0;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Status, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Progress, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_atoms_Checkbox__WEBPACK_IMPORTED_MODULE_4__["default"], { checked: !hasErrors, onChange: function onChange() {
            return null;
        } }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h3", null, "Voortgang: "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StatusText, null, " ", hasErrors ? 'Niet compleet' : 'Compleet')), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ButtonWrapper, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_5__["PrimaryButton"], { withArrow: true, onClick: handleOnClick }, onLastPage ? 'Accommodatie opslaan' : "Opslaan en naar " + page)));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

/***/ }),

/***/ "./src/components/molecules/InputWithToggle.tsx":
/*!******************************************************!*\
  !*** ./src/components/molecules/InputWithToggle.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _atoms_ToggleButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../atoms/ToggleButton */ "./src/components/atoms/ToggleButton.tsx");


var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __assign = undefined && undefined.__assign || function () {
    __assign = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default.a || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var InputWithToggle = function InputWithToggle(_a) {
    var small = _a.small,
        _b = _a.options,
        options = _b === void 0 ? [] : _b,
        optionValues = _a.optionValues,
        field = _a.field,
        form = _a.form;
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Container, { small: small }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Select, __assign({}, field, form), options.map(function (option, index) {
        return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Option, { value: optionValues ? optionValues[index] : option, key: option }, option);
    })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_ToggleButton__WEBPACK_IMPORTED_MODULE_4__["default"], { fill: '#0a1923', handleOnToggle: function handleOnToggle() {
            return alert('hey');
        } }));
};
/* harmony default export */ __webpack_exports__["default"] = (InputWithToggle);
var Option = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.option.withConfig({
    displayName: 'InputWithToggle__Option',
    componentId: 'sc-1ng56cb-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    align-items: center;\n    height: 100%;\n"], ["\n    display: flex;\n    align-items: center;\n    height: 100%;\n"])));
var Container = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'InputWithToggle__Container',
    componentId: 'sc-1ng56cb-1'
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    position: relative;\n    border: 1px solid ", ";\n    background-color: ", ";\n    width: ", ";\n    height: 4.5rem;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: nowrap;\n    padding-left: 1rem;\n"], ["\n    position: relative;\n    border: 1px solid ", ";\n    background-color: ", ";\n    width: ", ";\n    height: 4.5rem;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: nowrap;\n    padding-left: 1rem;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.light.flash;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.light.snow;
}, function (_a) {
    var small = _a.small;
    return small ? '10rem' : '100%';
});
var Select = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.select.withConfig({
    displayName: 'InputWithToggle__Select',
    componentId: 'sc-1ng56cb-2'
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    background-color: ", ";\n    position: relative;\n    width: 90%;\n    height: 100%;\n    appearance: none;\n    font-size: inherit;\n    padding: 1rem;\n    border: 0;\n    border-radius: 0%;\n    outline: none;\n"], ["\n    background-color: ", ";\n    position: relative;\n    width: 90%;\n    height: 100%;\n    appearance: none;\n    font-size: inherit;\n    padding: 1rem;\n    border: 0;\n    border-radius: 0%;\n    outline: none;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.light.snow;
});
var templateObject_1, templateObject_2, templateObject_3;

/***/ }),

/***/ "./src/components/molecules/LanguagesInputBlock.tsx":
/*!**********************************************************!*\
  !*** ./src/components/molecules/LanguagesInputBlock.tsx ***!
  \**********************************************************/
/*! exports provided: languagesFragment, LanguagesInputBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "languagesFragment", function() { return languagesFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguagesInputBlock", function() { return LanguagesInputBlock; });
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _atoms_LanguageTextInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../atoms/LanguageTextInput */ "./src/components/atoms/LanguageTextInput.tsx");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_5__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};





var languagesFragment = graphql_tag__WEBPACK_IMPORTED_MODULE_5___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment LanguagesFragment on TranslatableString {\n        nl\n        en\n        de\n    }\n"], ["\n    fragment LanguagesFragment on TranslatableString {\n        nl\n        en\n        de\n    }\n"])));
var Container = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'LanguagesInputBlock__Container',
    componentId: 'sc-1e8q8rd-0'
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n"], ["\n    display: flex;\n    flex-direction: column;\n"])));
var LanguageWrapper = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'LanguagesInputBlock__LanguageWrapper',
    componentId: 'sc-1e8q8rd-1'
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: stretch;\n    background-color: ", ";\n    border: 1px solid ", ";\n\n    padding: 1rem 2rem;\n"], ["\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    align-items: stretch;\n    background-color: ", ";\n    border: 1px solid ", ";\n\n    padding: 1rem 2rem;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.light.snow;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.light.flash;
});
var Language = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'LanguagesInputBlock__Language',
    componentId: 'sc-1e8q8rd-2'
})(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    color: ", ";\n    padding-right: 1.5rem;\n"], ["\n    color: ", ";\n    padding-right: 1.5rem;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.dark.silver;
});
var LanguagesInputBlock = function LanguagesInputBlock(_a) {
    var errors = _a.errors,
        name = _a.name,
        _b = _a.big,
        big = _b === void 0 ? false : _b;
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Container, null, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](LanguageWrapper, null, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Language, null, "NL"), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](formik__WEBPACK_IMPORTED_MODULE_4__["Field"], { big: big, name: name + ".nl", component: _atoms_LanguageTextInput__WEBPACK_IMPORTED_MODULE_3__["LanguageTextInput"] })), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](LanguageWrapper, null, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Language, null, "EN"), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](formik__WEBPACK_IMPORTED_MODULE_4__["Field"], { big: big, name: name + ".en", component: _atoms_LanguageTextInput__WEBPACK_IMPORTED_MODULE_3__["LanguageTextInput"] })), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](LanguageWrapper, null, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](Language, null, "DE"), react__WEBPACK_IMPORTED_MODULE_1__["createElement"](formik__WEBPACK_IMPORTED_MODULE_4__["Field"], { big: big, name: name + ".de", component: _atoms_LanguageTextInput__WEBPACK_IMPORTED_MODULE_3__["LanguageTextInput"] })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

/***/ }),

/***/ "./src/components/molecules/LocationBlock.tsx":
/*!****************************************************!*\
  !*** ./src/components/molecules/LocationBlock.tsx ***!
  \****************************************************/
/*! exports provided: addressFragment, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addressFragment", function() { return addressFragment; });
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../atoms/ContentBlock */ "./src/components/atoms/ContentBlock.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _atoms_PrimarySpanText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../atoms/PrimarySpanText */ "./src/components/atoms/PrimarySpanText.tsx");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _atoms_TextInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../atoms/TextInput */ "./src/components/atoms/TextInput.tsx");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../constants/theme */ "./src/constants/theme.tsx");

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};








var addressFragment = graphql_tag__WEBPACK_IMPORTED_MODULE_7___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment AddressFragment on Address {\n        address\n        postcode\n        city\n    }\n"], ["\n    fragment AddressFragment on Address {\n        address\n        postcode\n        city\n    }\n"])));
var LocationBlock = function LocationBlock(_a) {
    var children = _a.children,
        sectionName = _a.sectionName,
        contact = _a.contact,
        name = _a.name;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_2__["default"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, sectionName), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, children), contact && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Naam ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atoms_PrimarySpanText__WEBPACK_IMPORTED_MODULE_4__["default"], null, "(van contactpersoon)")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Field"], { name: "contactPerson", type: "text", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_6__["TextInput"] })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Adres"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Field"], { name: name + ".address", type: "text", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_6__["TextInput"] }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Postcode / Plaats"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ZipCityWrapper, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Field"], { name: name + ".postcode", type: "text", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_6__["TextInput"] }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Field"], { name: name + ".city", type: "text", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_6__["TextInput"] })));
};
/* harmony default export */ __webpack_exports__["default"] = (LocationBlock);
var ZipCityWrapper = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div.withConfig({
    displayName: 'LocationBlock__ZipCityWrapper',
    componentId: 'sc-1ydpakc-0'
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: grid;\n    @media ", " {\n        grid-template-columns: 0.5fr 1.5fr;\n    }\n    column-gap: 1rem;\n"], ["\n    display: grid;\n    @media ", " {\n        grid-template-columns: 0.5fr 1.5fr;\n    }\n    column-gap: 1rem;\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_8__["device"].xs);
var templateObject_1, templateObject_2;

/***/ }),

/***/ "./src/components/molecules/MenuItems.tsx":
/*!************************************************!*\
  !*** ./src/components/molecules/MenuItems.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _atoms_MenuItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../atoms/MenuItem */ "./src/components/atoms/MenuItem.tsx");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants/theme */ "./src/constants/theme.tsx");

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};





var MenuItems = function MenuItems(_a) {
    var route = _a.route;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, null, route.routes && route.routes.map(function (child) {
        return child.displayInNav && child.path && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atoms_MenuItem__WEBPACK_IMPORTED_MODULE_3__["default"], { to: child.path, key: child.path }, child.name);
    }));
};
var Container = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'MenuItems__Container',
    componentId: 'q3rn2j-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin: 0 1rem;\n    padding: 0;\n    display: none;\n\n    @media ", " {\n        display: flex;\n    }\n"], ["\n    margin: 0 1rem;\n    padding: 0;\n    display: none;\n\n    @media ", " {\n        display: flex;\n    }\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_5__["device"].l);
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_4__["withRouter"])(MenuItems));
var templateObject_1;

/***/ }),

/***/ "./src/components/molecules/Profile.tsx":
/*!**********************************************!*\
  !*** ./src/components/molecules/Profile.tsx ***!
  \**********************************************/
/*! exports provided: Profile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Profile", function() { return Profile; });
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ "babel-runtime/core-js/symbol/iterator");
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/symbol */ "babel-runtime/core-js/symbol");
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _atoms_ToggleButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../atoms/ToggleButton */ "./src/components/atoms/ToggleButton.tsx");



var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && o[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};






var ME_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_4___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query ProfileQuery {\n        me {\n            id\n            email\n            firstName\n            lastName\n        }\n    }\n"], ["\n    query ProfileQuery {\n        me {\n            id\n            email\n            firstName\n            lastName\n        }\n    }\n"])));
var Logout = styled_components__WEBPACK_IMPORTED_MODULE_5___default()(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Link"])(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    color: white;\n"], ["\n    color: white;\n"])));
var Container = styled_components__WEBPACK_IMPORTED_MODULE_5___default.a.div.withConfig({
    displayName: "Profile__Container",
    componentId: "czqizu-0"
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    position: absolute;\n    width: 13rem;\n    right: 3rem;\n    display: flex;\n    flex-direction: row;\n    height: 100%;\n    align-items: center;\n"], ["\n    position: absolute;\n    width: 13rem;\n    right: 3rem;\n    display: flex;\n    flex-direction: row;\n    height: 100%;\n    align-items: center;\n"])));
var ProfilePic = styled_components__WEBPACK_IMPORTED_MODULE_5___default.a.div.withConfig({
    displayName: "Profile__ProfilePic",
    componentId: "czqizu-1"
})(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    background: url('https://source.unsplash.com/random?face');\n    object-fit: scale-down;\n    height: 4.5rem;\n    border-radius: 35%;\n    width: 5rem;\n    margin-right: 1rem;\n"], ["\n    background: url('https://source.unsplash.com/random?face');\n    object-fit: scale-down;\n    height: 4.5rem;\n    border-radius: 35%;\n    width: 5rem;\n    margin-right: 1rem;\n"])));
var Dropdown = styled_components__WEBPACK_IMPORTED_MODULE_5___default.a.div.withConfig({
    displayName: "Profile__Dropdown",
    componentId: "czqizu-2"
})(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    position: absolute;\n    background: white;\n    color: black;\n    width: 100%;\n"], ["\n    position: absolute;\n    background: white;\n    color: black;\n    width: 100%;\n"])));
var Profile = function Profile() {
    var _a = __read(Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false), 2),
        open = _a[0],
        setOpen = _a[1];
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_7__["Query"], { query: ME_QUERY }, function (_a) {
        var loading = _a.loading,
            data = _a.data,
            error = _a.error,
            client = _a.client;
        if (loading) {
            return null;
        }
        if (!data || error) {
            return null;
        }
        if (!data.me) {
            return 'Not logged in';
        }
        return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Container, null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(ProfilePic, null), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Logout, { onClick: function onClick() {
                client.resetStore();
                localStorage.removeItem('token');
            }, to: '/login' }, data.me.firstName), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_ToggleButton__WEBPACK_IMPORTED_MODULE_8__["default"], { fill: open ? '#000' : '#FFF', handleOnToggle: function handleOnToggle() {
                return setOpen(!open);
            } }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Dropdown, null));
    });
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

/***/ }),

/***/ "./src/components/molecules/bathroom/BathroomContainer.tsx":
/*!*****************************************************************!*\
  !*** ./src/components/molecules/bathroom/BathroomContainer.tsx ***!
  \*****************************************************************/
/*! exports provided: BathroomInputTypes, BedroomInputTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BathroomInputTypes", function() { return BathroomInputTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BedroomInputTypes", function() { return BedroomInputTypes; });
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _InputWithToggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../InputWithToggle */ "./src/components/molecules/InputWithToggle.tsx");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_5__);

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};





var BATHROOMTYPES_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query BathroomTypesQuery {\n        bathroomTypes {\n            id\n            name\n        }\n    }\n"], ["\n    query BathroomTypesQuery {\n        bathroomTypes {\n            id\n            name\n        }\n    }\n"])));
var BEDROOMTYPES_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    query BedroomTypesQuery {\n        bedroomTypes {\n            id\n            name\n        }\n    }\n"], ["\n    query BedroomTypesQuery {\n        bedroomTypes {\n            id\n            name\n        }\n    }\n"])));
var BathroomInputTypes = function BathroomInputTypes() {
    return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react_apollo__WEBPACK_IMPORTED_MODULE_5__["Query"], { query: BATHROOMTYPES_QUERY }, function (_a) {
        var data = _a.data,
            loading = _a.loading,
            error = _a.error;
        if (loading || error || !data) {
            return null;
        }
        var options = [];
        var optionValues = [];
        data.bathroomTypes.forEach(function (type) {
            options.push(type.name);
            optionValues.push(type.id);
        });
        return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](formik__WEBPACK_IMPORTED_MODULE_4__["Field"], { name: "type.id", options: options, optionValues: optionValues, component: _InputWithToggle__WEBPACK_IMPORTED_MODULE_3__["default"] });
    });
};
var BedroomInputTypes = function BedroomInputTypes() {
    return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react_apollo__WEBPACK_IMPORTED_MODULE_5__["Query"], { query: BEDROOMTYPES_QUERY }, function (_a) {
        var data = _a.data,
            loading = _a.loading,
            error = _a.error;
        if (loading || error || !data) {
            return null;
        }
        var options = [];
        var optionValues = [];
        data.bedroomTypes.forEach(function (type) {
            options.push(type.name);
            optionValues.push(type.id);
        });
        return react__WEBPACK_IMPORTED_MODULE_2__["createElement"](formik__WEBPACK_IMPORTED_MODULE_4__["Field"], { name: "type.id", options: options, optionValues: optionValues, component: _InputWithToggle__WEBPACK_IMPORTED_MODULE_3__["default"] });
    });
};
var templateObject_1, templateObject_2;

/***/ }),

/***/ "./src/components/molecules/bathroom/BathroomModal.tsx":
/*!*************************************************************!*\
  !*** ./src/components/molecules/bathroom/BathroomModal.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reusable_MakeModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../reusable/MakeModal */ "./src/components/reusable/MakeModal.tsx");
/* harmony import */ var _atoms_Divider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../atoms/Divider */ "./src/components/atoms/Divider.tsx");
/* harmony import */ var _atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../atoms/ContentBlock */ "./src/components/atoms/ContentBlock.tsx");
/* harmony import */ var _BathroomContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BathroomContainer */ "./src/components/molecules/bathroom/BathroomContainer.tsx");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _InputWithToggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../InputWithToggle */ "./src/components/molecules/InputWithToggle.tsx");
/* harmony import */ var _atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../atoms/PrimaryButton */ "./src/components/atoms/PrimaryButton.tsx");
/* harmony import */ var react_responsive_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-responsive-modal */ "react-responsive-modal");
/* harmony import */ var react_responsive_modal__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_responsive_modal__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _atoms_SecondaryButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../atoms/SecondaryButton */ "./src/components/atoms/SecondaryButton.tsx");
/* harmony import */ var _atoms_DeleteButton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../atoms/DeleteButton */ "./src/components/atoms/DeleteButton.tsx");

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};













var Container = styled_components__WEBPACK_IMPORTED_MODULE_10___default.a.div.withConfig({
    displayName: 'BathroomModal__Container',
    componentId: 'sc-12bey3c-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    padding: 2rem 5rem 3rem 5rem;\n"], ["\n    padding: 2rem 5rem 3rem 5rem;\n"])));
var BathroomModal = function BathroomModal(_a) {
    var edit = _a.edit;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_reusable_MakeModal__WEBPACK_IMPORTED_MODULE_2__["default"], null, function (_a) {
        var onCloseModal = _a.onCloseModal,
            open = _a.open,
            onOpenModal = _a.onOpenModal;
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_responsive_modal__WEBPACK_IMPORTED_MODULE_9___default.a, { open: open, center: true, onClose: onCloseModal }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Container, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null, "Badkamer toevoegen"), edit && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atoms_DeleteButton__WEBPACK_IMPORTED_MODULE_12__["default"], null, "Verwijderen"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_3__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolores incidunt ipsa, earum nobis beatae facilis, dolore harum vitae nihil molestias repudiandae non quisquam ab. Omnis unde atque voluptate ipsa!"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_4__["default"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Type"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_BathroomContainer__WEBPACK_IMPORTED_MODULE_5__["BathroomInputTypes"], null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Toilet"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_6__["Field"], { name: "toilet", options: [0, 1, 2, 3, 4, 5], component: _InputWithToggle__WEBPACK_IMPORTED_MODULE_7__["default"] }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Douche"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_6__["Field"], { name: "shower", options: [0, 1, 2, 3, 4, 5], component: _InputWithToggle__WEBPACK_IMPORTED_MODULE_7__["default"] }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Bad"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_6__["Field"], { name: "bath", options: [0, 1, 2, 3, 4, 5], component: _InputWithToggle__WEBPACK_IMPORTED_MODULE_7__["default"] })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_3__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_8__["PrimaryButton"], { onClick: onCloseModal, type: "button" }, !edit ? 'Badkamer toevoegen' : 'Wijzigingen opslaan'))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atoms_SecondaryButton__WEBPACK_IMPORTED_MODULE_11__["default"], { onClick: onOpenModal, type: "button" }, "Badkamer toevoegen"));
    });
};
/* harmony default export */ __webpack_exports__["default"] = (BathroomModal);
var templateObject_1;

/***/ }),

/***/ "./src/components/organisms/Navigation.tsx":
/*!*************************************************!*\
  !*** ./src/components/organisms/Navigation.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _atoms_Logo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../atoms/Logo */ "./src/components/atoms/Logo.tsx");
/* harmony import */ var _molecules_MenuItems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../molecules/MenuItems */ "./src/components/molecules/MenuItems.tsx");
/* harmony import */ var _molecules_AccommodationPicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../molecules/AccommodationPicker */ "./src/components/molecules/AccommodationPicker.tsx");
/* harmony import */ var _molecules_HamburgerMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../molecules/HamburgerMenu */ "./src/components/molecules/HamburgerMenu.tsx");
/* harmony import */ var _molecules_Profile__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../molecules/Profile */ "./src/components/molecules/Profile.tsx");


var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_1___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __assign = undefined && undefined.__assign || function () {
    __assign = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default.a || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};







var Navigation = function Navigation(props) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Container, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_molecules_HamburgerMenu__WEBPACK_IMPORTED_MODULE_7__["default"], { route: props.route }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_atoms_Logo__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_molecules_AccommodationPicker__WEBPACK_IMPORTED_MODULE_6__["default"], __assign({}, props)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_molecules_MenuItems__WEBPACK_IMPORTED_MODULE_5__["default"], { route: props.route }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_molecules_Profile__WEBPACK_IMPORTED_MODULE_8__["Profile"], null));
};
var Container = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div.withConfig({
    displayName: 'Navigation__Container',
    componentId: 'sc-2w1y2o-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background: ", ";\n    display: flex;\n    flex-direction: row;\n    /* align-items: center; */\n    height: 7.2rem;\n    position: relative;\n    /* z-index: 1; */\n"], ["\n    background: ", ";\n    display: flex;\n    flex-direction: row;\n    /* align-items: center; */\n    height: 7.2rem;\n    position: relative;\n    /* z-index: 1; */\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.dark.eerie;
});
/* harmony default export */ __webpack_exports__["default"] = (Navigation);
var templateObject_1;

/***/ }),

/***/ "./src/components/organisms/info/InfoDescription.tsx":
/*!***********************************************************!*\
  !*** ./src/components/organisms/info/InfoDescription.tsx ***!
  \***********************************************************/
/*! exports provided: InfoDescription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoDescription", function() { return InfoDescription; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../atoms/ContentBlock */ "./src/components/atoms/ContentBlock.tsx");
/* harmony import */ var _molecules_ContentHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../molecules/ContentHeader */ "./src/components/molecules/ContentHeader.tsx");
/* harmony import */ var _molecules_LanguagesInputBlock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../molecules/LanguagesInputBlock */ "./src/components/molecules/LanguagesInputBlock.tsx");
/* harmony import */ var _atoms_PrimarySpanText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../atoms/PrimarySpanText */ "./src/components/atoms/PrimarySpanText.tsx");
/* harmony import */ var _atoms_Divider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../atoms/Divider */ "./src/components/atoms/Divider.tsx");






var InfoDescription = function InfoDescription(_a) {
    var accommodation = _a.accommodation;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_molecules_ContentHeader__WEBPACK_IMPORTED_MODULE_2__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Omschrijving van het vakantiehuisje"), "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, fuga ducimus cum vel optio, perferendis deleniti deserunt sed reiciendis cumque tempore saepe a illo voluptas nesciunt sit? Eos, quas nihil."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_5__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_1__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Korte Omschrijving"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil minus iste nobis sit deserunt consequuntur non nam. Eum, omnis ullam nam nemo cumque ut aperiam, laudantium non optio id suscipit?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Korte Omschrijving ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_atoms_PrimarySpanText__WEBPACK_IMPORTED_MODULE_4__["default"], null, "max. 300 karakters")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_molecules_LanguagesInputBlock__WEBPACK_IMPORTED_MODULE_3__["LanguagesInputBlock"], { name: "description" })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_5__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_1__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Omschrijving ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_atoms_PrimarySpanText__WEBPACK_IMPORTED_MODULE_4__["default"], null, "max. 900 karakters")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_molecules_LanguagesInputBlock__WEBPACK_IMPORTED_MODULE_3__["LanguagesInputBlock"], { big: true, name: "description" })));
};

/***/ }),

/***/ "./src/components/organisms/info/InfoDetails.tsx":
/*!*******************************************************!*\
  !*** ./src/components/organisms/info/InfoDetails.tsx ***!
  \*******************************************************/
/*! exports provided: detailsFragment, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detailsFragment", function() { return detailsFragment; });
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/create */ "babel-runtime/core-js/object/create");
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/set-prototype-of */ "babel-runtime/core-js/object/set-prototype-of");
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _molecules_ContentHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../molecules/ContentHeader */ "./src/components/molecules/ContentHeader.tsx");
/* harmony import */ var _atoms_Divider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../atoms/Divider */ "./src/components/atoms/Divider.tsx");
/* harmony import */ var _atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../atoms/ContentBlock */ "./src/components/atoms/ContentBlock.tsx");
/* harmony import */ var _atoms_PrimarySpanText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../atoms/PrimarySpanText */ "./src/components/atoms/PrimarySpanText.tsx");
/* harmony import */ var _molecules_InputWithToggle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../molecules/InputWithToggle */ "./src/components/molecules/InputWithToggle.tsx");
/* harmony import */ var _molecules_LocationBlock__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../molecules/LocationBlock */ "./src/components/molecules/LocationBlock.tsx");
/* harmony import */ var _molecules_LanguagesInputBlock__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../molecules/LanguagesInputBlock */ "./src/components/molecules/LanguagesInputBlock.tsx");
/* harmony import */ var _atoms_TextInput__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../atoms/TextInput */ "./src/components/atoms/TextInput.tsx");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_13__);



var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default.a || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(b) : (__.prototype = b.prototype, new __());
    };
}();











var detailsFragment = graphql_tag__WEBPACK_IMPORTED_MODULE_12___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment DetailsFragment on Accommodation {\n        code\n        description {\n            ...LanguagesFragment\n        }\n        type {\n            name\n        }\n        livingArea\n        outsideArea\n        minCapacity\n        maxCapacity\n        address {\n            ...AddressFragment\n        }\n        keyAddress {\n            ...AddressFragment\n        }\n        contactPerson\n        contactPhone\n    }\n    ", "\n    ", "\n"], ["\n    fragment DetailsFragment on Accommodation {\n        code\n        description {\n            ...LanguagesFragment\n        }\n        type {\n            name\n        }\n        livingArea\n        outsideArea\n        minCapacity\n        maxCapacity\n        address {\n            ...AddressFragment\n        }\n        keyAddress {\n            ...AddressFragment\n        }\n        contactPerson\n        contactPhone\n    }\n    ", "\n    ", "\n"])), _molecules_LanguagesInputBlock__WEBPACK_IMPORTED_MODULE_10__["languagesFragment"], _molecules_LocationBlock__WEBPACK_IMPORTED_MODULE_9__["addressFragment"]);
var InfoDetails = /** @class */function (_super) {
    __extends(InfoDetails, _super);
    function InfoDetails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InfoDetails.prototype.render = function () {
        var typeOptions = ['Vakantiehuisje', 'Hotel', 'Kamperen']; // todo: Get from server
        var capacityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        var accommodation = this.props.accommodation;
        return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_molecules_ContentHeader__WEBPACK_IMPORTED_MODULE_4__["default"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h1", null, "Gegevens van het ", accommodation ? accommodation.type.name : 'Vakantiehuisje'), "Hello afjejf Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci voluptatum iste error, accusamus rem, alias omnis ducimus dolorum atque quaerat corporis, distinctio soluta excepturi aut neque modi nemo. Ipsam, eos."), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_5__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_6__["default"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h2", null, "Algemeen"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam praesentium enim modi fugiat voluptatem, atque quod eveniet mollitia quas deleniti."), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h4", null, "Naam ", accommodation.code !== 0 && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_PrimarySpanText__WEBPACK_IMPORTED_MODULE_7__["default"], null, "Code: ", accommodation.code)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_molecules_LanguagesInputBlock__WEBPACK_IMPORTED_MODULE_10__["LanguagesInputBlock"], { name: "description" }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h4", null, "Type ", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_PrimarySpanText__WEBPACK_IMPORTED_MODULE_7__["default"], null, "Verplicht")), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Field"], { options: typeOptions, name: "type.name", standardValue: 'Selecteer type accommodatie', component: _molecules_InputWithToggle__WEBPACK_IMPORTED_MODULE_8__["default"] }))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_5__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_6__["default"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h2", null, "Oppervlakte"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam praesentium enim modi fugiat voluptatem, atque quod eveniet mollitia quas deleniti."), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h4", null, "Woonoppervlakte"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Field"], { name: "livingArea", type: "number", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_11__["TextInput"], small: true }, "m2")), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h4", null, "Buitenruimte"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Field"], { name: "outsideArea", type: "number", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_11__["TextInput"], small: true }, "m2"))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_5__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_6__["default"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h2", null, "Capacity"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", null, "Maxime maiores est eveniet mollitia quas blanditiis debitis esse exercitationem odit hic voluptas tempora, ipsum facilis itaque nemo iste incidunt quibusdam? Nam."), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h4", null, "Minimaal"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Field"], { options: capacityOptions, name: "minCapacity", component: _molecules_InputWithToggle__WEBPACK_IMPORTED_MODULE_8__["default"] })), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h4", null, "Maximaal"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Field"], { options: capacityOptions, name: "maxCapacity", component: _molecules_InputWithToggle__WEBPACK_IMPORTED_MODULE_8__["default"] }))), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_5__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_molecules_LocationBlock__WEBPACK_IMPORTED_MODULE_9__["default"], { name: "address", sectionName: 'Locatie' }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores suscipit dicta odit repellat nisi? Vitae ducimus, iure quis animi possimus veritatis."), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_5__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_molecules_LocationBlock__WEBPACK_IMPORTED_MODULE_9__["default"], { name: "keyAddress", sectionName: 'Sleutel locatie', contact: accommodation ? { name: accommodation.contactPerson, phone: accommodation.contactPhone } : { name: '', phone: '' } }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, incidunt blanditiis? Asperiores officia assumenda suscipit fugiat ek accusamus."));
    };
    return InfoDetails;
}(react__WEBPACK_IMPORTED_MODULE_3__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (InfoDetails);
var templateObject_1;

/***/ }),

/***/ "./src/components/organisms/info/InfoFacilities.tsx":
/*!**********************************************************!*\
  !*** ./src/components/organisms/info/InfoFacilities.tsx ***!
  \**********************************************************/
/*! exports provided: bedroomFragment, bathroomFragment, facilitiesFragment, InfoFacilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bedroomFragment", function() { return bedroomFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bathroomFragment", function() { return bathroomFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "facilitiesFragment", function() { return facilitiesFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoFacilities", function() { return InfoFacilities; });
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ "babel-runtime/core-js/symbol/iterator");
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/symbol */ "babel-runtime/core-js/symbol");
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/object/create */ "babel-runtime/core-js/object/create");
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! babel-runtime/core-js/object/set-prototype-of */ "babel-runtime/core-js/object/set-prototype-of");
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _molecules_ContentHeader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../molecules/ContentHeader */ "./src/components/molecules/ContentHeader.tsx");
/* harmony import */ var _atoms_Divider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../atoms/Divider */ "./src/components/atoms/Divider.tsx");
/* harmony import */ var _atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../atoms/ContentBlock */ "./src/components/atoms/ContentBlock.tsx");
/* harmony import */ var _atoms_SecondaryButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../atoms/SecondaryButton */ "./src/components/atoms/SecondaryButton.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _atoms_Checkbox__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../atoms/Checkbox */ "./src/components/atoms/Checkbox.tsx");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_responsive_modal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-responsive-modal */ "react-responsive-modal");
/* harmony import */ var react_responsive_modal__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_responsive_modal__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _molecules_InputWithToggle__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../molecules/InputWithToggle */ "./src/components/molecules/InputWithToggle.tsx");
/* harmony import */ var _molecules_LanguagesInputBlock__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../molecules/LanguagesInputBlock */ "./src/components/molecules/LanguagesInputBlock.tsx");
/* harmony import */ var _atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../atoms/PrimaryButton */ "./src/components/atoms/PrimaryButton.tsx");
/* harmony import */ var _atoms_DoubleBedSVG__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../atoms/DoubleBedSVG */ "./src/components/atoms/DoubleBedSVG.tsx");
/* harmony import */ var _atoms_SingleBedSVG__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../atoms/SingleBedSVG */ "./src/components/atoms/SingleBedSVG.tsx");
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../constants/theme */ "./src/constants/theme.tsx");
/* harmony import */ var _molecules_bathroom_BathroomModal__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../molecules/bathroom/BathroomModal */ "./src/components/molecules/bathroom/BathroomModal.tsx");






var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_5___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_4___default.a || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_3___default()(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && (g[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && o[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};


















var bedroomFragment = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment BedroomFragment on Bedroom {\n        id\n        singleBed\n        doubleBed\n        type {\n            name\n        }\n        name {\n            nl\n            en\n            de\n        }\n    }\n"], ["\n    fragment BedroomFragment on Bedroom {\n        id\n        singleBed\n        doubleBed\n        type {\n            name\n        }\n        name {\n            nl\n            en\n            de\n        }\n    }\n"])));
var bathroomFragment = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    fragment BathroomFragment on Bathroom {\n        id\n        toilet\n        bath\n        shower\n        type {\n            name\n        }\n        name {\n            nl\n            en\n            de\n        }\n    }\n"], ["\n    fragment BathroomFragment on Bathroom {\n        id\n        toilet\n        bath\n        shower\n        type {\n            name\n        }\n        name {\n            nl\n            en\n            de\n        }\n    }\n"])));
var facilitiesFragment = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    fragment FacilitiesFragment on Accommodation {\n        bathrooms {\n            ...BathroomFragment\n        }\n        bedrooms {\n            ...BedroomFragment\n        }\n        sites {\n            name\n        }\n        features {\n            name\n        }\n    }\n    ", "\n    ", "\n"], ["\n    fragment FacilitiesFragment on Accommodation {\n        bathrooms {\n            ...BathroomFragment\n        }\n        bedrooms {\n            ...BedroomFragment\n        }\n        sites {\n            name\n        }\n        features {\n            name\n        }\n    }\n    ", "\n    ", "\n"])), bedroomFragment, bathroomFragment);
var SITES_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    query SitesQuery {\n        sites {\n            id\n            name\n        }\n    }\n"], ["\n    query SitesQuery {\n        sites {\n            id\n            name\n        }\n    }\n"])));
var FEATURES_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    query FeaturesQuery {\n        features {\n            id\n            name\n        }\n    }\n"], ["\n    query FeaturesQuery {\n        features {\n            id\n            name\n        }\n    }\n"])));
var BEDROOMTYPES_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    query BedroomTypesQuery {\n        bedroomTypes {\n            id\n            name\n        }\n    }\n"], ["\n    query BedroomTypesQuery {\n        bedroomTypes {\n            id\n            name\n        }\n    }\n"])));
var CREATE_BEDROOM = graphql_tag__WEBPACK_IMPORTED_MODULE_13___default()(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    mutation CreateBedroom($accommodationId: ID!, $bedroom: BedroomInput!) {\n        createBedroom(accommodationId: $accommodationId, bedroom: $bedroom) {\n            ...BedroomFragment\n        }\n    }\n    ", "\n"], ["\n    mutation CreateBedroom($accommodationId: ID!, $bedroom: BedroomInput!) {\n        createBedroom(accommodationId: $accommodationId, bedroom: $bedroom) {\n            ...BedroomFragment\n        }\n    }\n    ", "\n"])), bedroomFragment);
// const CREATE_BATHROOM = gql`
//     mutation CreateBathroom($accommodationId: ID!, $bathroom: BathroomInput!) {
//         createBathroom(accommodationId: $accommodationId, bathroom: $bathroom) {
//             ...BathroomFragment
//         }
//     }
//     ${bathroomFragment}
// `;
// const bedroomSchema = Yup.object().shape({
//     name: Yup.object({ nl: Yup.string().required('Is verplicht goos') }),
//     singleBed: Yup.number().required('Is verplicht'),
//     doubleBed: Yup.number().required('Is verplicht')
// });
var OptionsBlock = styled_components__WEBPACK_IMPORTED_MODULE_11___default.a.div.withConfig({
    displayName: "InfoFacilities__OptionsBlock",
    componentId: "ac7lkc-0"
})(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    display: grid;\n    @media ", " {\n        grid-template-columns: 0.5fr 0.5fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.333fr 0.333fr 0.333fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;\n    }\n"], ["\n    display: grid;\n    @media ", " {\n        grid-template-columns: 0.5fr 0.5fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.333fr 0.333fr 0.333fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;\n    }\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].xs, _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].s, _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].l);
var Bedroom = styled_components__WEBPACK_IMPORTED_MODULE_11___default.a.div.withConfig({
    displayName: "InfoFacilities__Bedroom",
    componentId: "ac7lkc-1"
})(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    padding: 2rem;\n    background: ", ";\n    display: flex;\n    flex-direction: column;\n    height: 15rem;\n    cursor: pointer;\n    p {\n        margin: 0;\n    }\n    h4 {\n        padding-top: 0.5rem;\n        line-height: 1.2em;\n    }\n"], ["\n    padding: 2rem;\n    background: ", ";\n    display: flex;\n    flex-direction: column;\n    height: 15rem;\n    cursor: pointer;\n    p {\n        margin: 0;\n    }\n    h4 {\n        padding-top: 0.5rem;\n        line-height: 1.2em;\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.light.flash;
});
var BedroomContainer = styled_components__WEBPACK_IMPORTED_MODULE_11___default.a.div.withConfig({
    displayName: "InfoFacilities__BedroomContainer",
    componentId: "ac7lkc-2"
})(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    padding: 0rem 1.5rem;\n    display: grid;\n    grid-template-columns: 1fr;\n    @media ", " {\n        grid-template-columns: 0.333fr 0.333fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.333fr 0.333fr 0.333fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr;\n    }\n    grid-column-gap: 1rem;\n    grid-row-gap: 1rem;\n"], ["\n    padding: 0rem 1.5rem;\n    display: grid;\n    grid-template-columns: 1fr;\n    @media ", " {\n        grid-template-columns: 0.333fr 0.333fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.333fr 0.333fr 0.333fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr;\n    }\n    grid-column-gap: 1rem;\n    grid-row-gap: 1rem;\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].xs, _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].s, _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].l, _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].xl);
var Beds = styled_components__WEBPACK_IMPORTED_MODULE_11___default.a.div.withConfig({
    displayName: "InfoFacilities__Beds",
    componentId: "ac7lkc-3"
})(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n"], ["\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n"])));
var InfoFacilities = /** @class */function (_super) {
    __extends(InfoFacilities, _super);
    function InfoFacilities() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false,
            bedrooms: []
        };
        _this.onOpenModal = function () {
            _this.setState({ open: true });
        };
        _this.onCloseModal = function () {
            _this.setState({ open: false });
        };
        _this.addToBedrooms = function (bedroom) {
            var bedrooms = _this.state.bedrooms;
            bedrooms.push(bedroom);
            _this.setState({ bedrooms: bedrooms });
        };
        _this.componentDidMount = function () {
            var accommodation = _this.props.accommodation;
            if (accommodation.bedrooms) {
                _this.setState({ bedrooms: accommodation.bedrooms });
            }
        };
        return _this;
    }
    InfoFacilities.prototype.render = function () {
        var _this = this;
        var accommodation = this.props.accommodation;
        var _a = this.state,
            open = _a.open,
            bedrooms = _a.bedrooms;
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_responsive_modal__WEBPACK_IMPORTED_MODULE_15___default.a, { open: open, onClose: this.onCloseModal, center: true }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", { style: { padding: '2rem 5rem 3rem 5rem' } }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h1", null, "Slaapkamer toevoegen"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_8__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolores incidunt ipsa, earum nobis beatae facilis, dolore harum vitae nihil molestias repudiandae non quisquam ab. Omnis unde atque voluptate ipsa!"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_14__["Mutation"], { mutation: CREATE_BEDROOM }, function (createBedroom) {
            return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_16__["Formik"], { initialValues: {
                    name: { en: '', nl: '', de: '' },
                    singleBed: 0,
                    doubleBed: 0,
                    type: { id: '' }
                }, onSubmit: function onSubmit(bedroom) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // Why tf do I need to do this ugly af workaround
                                    bedroom.doubleBed = Number(bedroom.doubleBed);
                                    bedroom.singleBed = Number(bedroom.singleBed);
                                    return [4 /*yield*/, createBedroom({
                                        variables: { accommodationId: accommodation.id, bedroom: bedroom }
                                    })];
                                case 1:
                                    response = _a.sent();
                                    if (response && response.data && response.data.createBedroom) {
                                        this.setState({ bedrooms: response.data.createBedroom });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                } }, function (_a) {
                var submitForm = _a.submitForm,
                    resetForm = _a.resetForm,
                    errors = _a.errors;
                return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_16__["Form"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", null, "Faciliteiten "), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", null, "Type slaapkamer"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_14__["Query"], { query: BEDROOMTYPES_QUERY }, function (_a) {
                    var data = _a.data,
                        error = _a.error,
                        loading = _a.loading;
                    if (loading || error || !data) {
                        return null;
                    }
                    var options = [];
                    var optionValues = [];
                    data.bedroomTypes.forEach(function (bedroom) {
                        options.push(bedroom.name);
                        optionValues.push(bedroom.id);
                    });
                    return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_16__["Field"], { name: "type.id", options: options, optionValues: optionValues, component: _molecules_InputWithToggle__WEBPACK_IMPORTED_MODULE_17__["default"] });
                })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", null, "Naam"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_molecules_LanguagesInputBlock__WEBPACK_IMPORTED_MODULE_18__["LanguagesInputBlock"], { errors: errors, name: "name" })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", null, "Eenpersoonsbed"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_16__["Field"], { type: "number", name: "singleBed", options: [0, 1, 2, 3, 4, 5], component: _molecules_InputWithToggle__WEBPACK_IMPORTED_MODULE_17__["default"] }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", null, "Tweepersoonsbed"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_16__["Field"], { type: "number", name: "doubleBed", options: [0, 1, 2, 3, 4, 5], component: _molecules_InputWithToggle__WEBPACK_IMPORTED_MODULE_17__["default"] })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_8__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_19__["PrimaryButton"], { onClick: function onClick() {
                        submitForm();
                        resetForm();
                        _this.onCloseModal();
                    } }, "Slaapkamer toevoegen"));
            });
        }))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_molecules_ContentHeader__WEBPACK_IMPORTED_MODULE_7__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h1", null, "Faciliteiten van het ", accommodation.type.name), "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quia reprehenderit minima nisi voluptates."), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_8__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], { threeColumns: true }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", null, "Slaapkamers"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam praesentium enim modi fugiat voluptatem, atque quod eveniet mollitia quas deleniti."), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_SecondaryButton__WEBPACK_IMPORTED_MODULE_10__["default"], { onClick: function onClick() {
                return _this.onOpenModal();
            }, type: "button" }, "Slaapkamer toevoegen")), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(BedroomContainer, null, bedrooms && bedrooms.map(function (bedroom, index) {
            var doubleBed = bedroom.doubleBed,
                singleBed = bedroom.singleBed;
            return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Bedroom, { onClick: function onClick() {
                    return _this.onOpenModal();
                }, key: 'bedroom'.concat(String(index)) }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Beds, null, __spread(Array(bedroom.doubleBed)).map(function (_, i) {
                return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_DoubleBedSVG__WEBPACK_IMPORTED_MODULE_20__["DoubleBedSVG"], { key: 'double'.concat(String(i)) });
            }), __spread(Array(bedroom.singleBed)).map(function (_, i) {
                return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_SingleBedSVG__WEBPACK_IMPORTED_MODULE_21__["SingleBedSVG"], { key: 'single'.concat(String(i)) });
            })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h4", null, bedroom.type.name), doubleBed > 0 && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, doubleBed + " tweepersoonsbed"), singleBed > 0 && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, singleBed + " eenpersoonsbed"));
        })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_8__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], { threeColumns: true }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", null, "Badkamers"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam praesentium enim modi fugiat voluptatem, atque quod eveniet mollitia quas deleniti."), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_molecules_bathroom_BathroomModal__WEBPACK_IMPORTED_MODULE_23__["default"], { edit: true })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_8__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", null, "Ligging"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quia maiores, deleniti quaerat, fuga quos earum impedit id dolorum tempora quo architecto iure asperiores officiis quisquam nobis atque. Voluptatem, provident.")), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(OptionsBlock, null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_14__["Query"], { query: SITES_QUERY }, function (_a) {
            var loading = _a.loading,
                data = _a.data,
                error = _a.error;
            if (loading || !data) {
                return 'Loading...';
            }
            if (error) {
                return null;
            }
            var sites = data.sites;
            var accommodationSites = accommodation.sites;
            return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, sites.map(function (_a) {
                var id = _a.id,
                    name = _a.name;
                var checked = false;
                if (accommodationSites) {
                    checked = !!accommodationSites.find(function (accSite) {
                        return accSite.name === name;
                    });
                }
                return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Checkbox__WEBPACK_IMPORTED_MODULE_12__["default"], { key: id, checked: checked, onChange: function onChange() {
                        return '';
                    } }, name);
            }));
        })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_8__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_9__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("h2", null, "Accommodatie kenmerken"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quia maiores, deleniti quaerat, fuga quos earum impedit id dolorum tempora quo architecto iure asperiores officiis quisquam nobis atque. Voluptatem, provident.")), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(OptionsBlock, null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_14__["Query"], { query: FEATURES_QUERY }, function (_a) {
            var loading = _a.loading,
                error = _a.error,
                data = _a.data;
            if (loading || !data) {
                return 'Loading...';
            }
            if (error) {
                return null;
            }
            var features = data.features;
            var accommodationFeatures = accommodation.features;
            return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6__["Fragment"], null, features.map(function (_a) {
                var id = _a.id,
                    name = _a.name;
                var checked = false;
                if (accommodationFeatures) {
                    checked = !!accommodationFeatures.find(function (accFeature) {
                        return accFeature.name === name;
                    });
                }
                return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_atoms_Checkbox__WEBPACK_IMPORTED_MODULE_12__["default"], { key: id, checked: checked, onChange: function onChange() {
                        return '';
                    } }, name);
            }));
        })));
    };
    return InfoFacilities;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;

/***/ }),

/***/ "./src/components/organisms/info/InfoPhotos.tsx":
/*!******************************************************!*\
  !*** ./src/components/organisms/info/InfoPhotos.tsx ***!
  \******************************************************/
/*! exports provided: photoFragment, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "photoFragment", function() { return photoFragment; });
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ "babel-runtime/core-js/symbol/iterator");
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/symbol */ "babel-runtime/core-js/symbol");
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _molecules_ContentHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../molecules/ContentHeader */ "./src/components/molecules/ContentHeader.tsx");
/* harmony import */ var _atoms_Divider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../atoms/Divider */ "./src/components/atoms/Divider.tsx");
/* harmony import */ var _atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../atoms/ContentBlock */ "./src/components/atoms/ContentBlock.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _atoms_SecondaryButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../atoms/SecondaryButton */ "./src/components/atoms/SecondaryButton.tsx");
/* harmony import */ var react_sortable_hoc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-sortable-hoc */ "react-sortable-hoc");
/* harmony import */ var react_sortable_hoc__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_sortable_hoc__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _atoms_GalleryPhoto__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../atoms/GalleryPhoto */ "./src/components/atoms/GalleryPhoto.tsx");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../constants/theme */ "./src/constants/theme.tsx");



var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_2___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && o[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};










var photoFragment = graphql_tag__WEBPACK_IMPORTED_MODULE_11___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment PhotoFragment on Photo {\n        id\n        name {\n            en\n            nl\n            de\n        }\n        url\n    }\n"], ["\n    fragment PhotoFragment on Photo {\n        id\n        name {\n            en\n            nl\n            de\n        }\n        url\n    }\n"])));
var SortableItem = Object(react_sortable_hoc__WEBPACK_IMPORTED_MODULE_9__["SortableElement"])(function (_a) {
    var src = _a.src,
        first = _a.first;
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_GalleryPhoto__WEBPACK_IMPORTED_MODULE_10__["GalleryPhoto"], { first: first, src: src });
});
var SortableList = Object(react_sortable_hoc__WEBPACK_IMPORTED_MODULE_9__["SortableContainer"])(function (_a) {
    var photos = _a.photos;
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(PhotoBlock, null, photos.map(function (photo, index) {
        return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(SortableItem, { first: index === 0, key: photo.id, index: index, src: photo.url });
    }));
});
var InfoPhotos = function InfoPhotos(_a) {
    var accommodation = _a.accommodation;
    console.log(accommodation);
    var _b = __read(Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(accommodation.photos), 2),
        photos = _b[0],
        setPics = _b[1];
    var onSortEnd = function onSortEnd(_a) {
        var oldIndex = _a.oldIndex,
            newIndex = _a.newIndex;
        setPics(Object(react_sortable_hoc__WEBPACK_IMPORTED_MODULE_9__["arrayMove"])(photos, oldIndex, newIndex));
    };
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_molecules_ContentHeader__WEBPACK_IMPORTED_MODULE_4__["default"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h1", null, "Foto's van het ", accommodation.type.name), "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quia reprehenderit minima nisi voluptates."), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_5__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(StyledContentBlock, { threeColumns: true }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h2", null, "Gallerij"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam praesentium enim modi fugiat voluptatem, atque quod eveniet mollitia quas deleniti."), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_SecondaryButton__WEBPACK_IMPORTED_MODULE_8__["default"], null, "Foto toevoegen")), photos && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(SortableList, { onSortOver: function onSortOver() {
            return console.log('started moving');
        }, helperClass: 'dragging-helper-class', axis: 'xy', photos: photos, onSortEnd: onSortEnd, lockToContainerEdges: true }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_5__["Divider"], null));
};
/* harmony default export */ __webpack_exports__["default"] = (InfoPhotos);
var StyledContentBlock = styled_components__WEBPACK_IMPORTED_MODULE_7___default()(_atoms_ContentBlock__WEBPACK_IMPORTED_MODULE_6__["default"])(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    @media ", " {\n        grid-template-columns: 0.3fr 1.2fr 0.5fr;\n    }\n    margin-bottom: 2rem;\n    > button {\n        margin: 1rem;\n    }\n"], ["\n    @media ", " {\n        grid-template-columns: 0.3fr 1.2fr 0.5fr;\n    }\n    margin-bottom: 2rem;\n    > button {\n        margin: 1rem;\n    }\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_12__["device"].m);
var PhotoBlock = styled_components__WEBPACK_IMPORTED_MODULE_7___default.a.ul.withConfig({
    displayName: "InfoPhotos__PhotoBlock",
    componentId: "sc-39326a-0"
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    margin: 0;\n    padding: 0;\n    display: grid;\n    width: 100%;\n    grid-column-gap: 1rem;\n    grid-row-gap: 1rem;\n    grid-template-columns: 1fr;\n    @media ", " {\n        grid-template-columns: 0.5fr 0.5fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.33fr 0.33fr 0.33fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;\n    }\n"], ["\n    margin: 0;\n    padding: 0;\n    display: grid;\n    width: 100%;\n    grid-column-gap: 1rem;\n    grid-row-gap: 1rem;\n    grid-template-columns: 1fr;\n    @media ", " {\n        grid-template-columns: 0.5fr 0.5fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.33fr 0.33fr 0.33fr;\n    }\n    @media ", " {\n        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;\n    }\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_12__["device"].xs, _constants_theme__WEBPACK_IMPORTED_MODULE_12__["device"].s, _constants_theme__WEBPACK_IMPORTED_MODULE_12__["device"].m);
var templateObject_1, templateObject_2, templateObject_3;

/***/ }),

/***/ "./src/components/organisms/info/SideMenu.tsx":
/*!****************************************************!*\
  !*** ./src/components/organisms/info/SideMenu.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path-to-regexp */ "path-to-regexp");
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path_to_regexp__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _atoms_Divider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../atoms/Divider */ "./src/components/atoms/Divider.tsx");
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../constants/theme */ "./src/constants/theme.tsx");

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};






var SideMenu = function SideMenu(_a) {
    var params = _a.match.params,
        handlePageIndex = _a.handlePageIndex,
        routes = _a.routes,
        inHamburger = _a.inHamburger,
        hamburgerOpen = _a.hamburgerOpen;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Menu, { inHamburger: inHamburger }, routes.map(function (child, index) {
        if (child.path && child.name !== 'NotFound') {
            var generatePath = path_to_regexp__WEBPACK_IMPORTED_MODULE_4___default.a.compile(child.path);
            return child.path && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { key: child.path }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(MenuLink, { exact: true, onClick: function onClick() {
                    // check if menu is in the hamburger
                    if (hamburgerOpen) {
                        hamburgerOpen();
                    }
                    handlePageIndex(index);
                }, to: generatePath(params) }, child.name), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_5__["Divider"], { small: true }));
        } else {
            return null;
        }
    }));
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(SideMenu));
var Menu = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
    displayName: 'SideMenu__Menu',
    componentId: 'sc-1n95hdl-0'
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background: ", ";\n    padding: ", ";\n    display: flex;\n    flex-direction: column;\n    ", "\n\n    @media ", " {\n        display: initial;\n    }\n"], ["\n    background: ", ";\n    padding: ", ";\n    display: flex;\n    flex-direction: column;\n    ", "\n\n    @media ", " {\n        display: initial;\n    }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.light.snow;
}, function (_a) {
    var inHamburger = _a.inHamburger;
    return inHamburger ? '1.5rem' : '3rem';
}, function (_a) {
    var inHamburger = _a.inHamburger;
    return inHamburger ? '' : 'display: none;';
}, _constants_theme__WEBPACK_IMPORTED_MODULE_6__["device"].m);
var MenuLink = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"])(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    color: grey;\n    font-weight: 500;\n    &.active {\n        color: #000;\n    }\n"], ["\n    color: grey;\n    font-weight: 500;\n    &.active {\n        color: #000;\n    }\n"])));
var templateObject_1, templateObject_2;

/***/ }),

/***/ "./src/components/reusable/MakeModal.tsx":
/*!***********************************************!*\
  !*** ./src/components/reusable/MakeModal.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/create */ "babel-runtime/core-js/object/create");
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/object/set-prototype-of */ "babel-runtime/core-js/object/set-prototype-of");
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);


var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default.a || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(b) : (__.prototype = b.prototype, new __());
    };
}();

var ModalProvider = /** @class */function (_super) {
    __extends(ModalProvider, _super);
    function ModalProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false
        };
        _this.onOpenModal = function () {
            _this.setState({ open: true });
        };
        _this.onCloseModal = function () {
            _this.setState({ open: false });
        };
        return _this;
    }
    ModalProvider.prototype.render = function () {
        var open = this.state.open;
        var children = this.props.children;
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, children({
            onCloseModal: this.onCloseModal,
            onOpenModal: this.onOpenModal,
            open: open
        }));
    };
    return ModalProvider;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (ModalProvider);

/***/ }),

/***/ "./src/components/templates/Info.tsx":
/*!*******************************************!*\
  !*** ./src/components/templates/Info.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ "babel-runtime/core-js/symbol/iterator");
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/symbol */ "babel-runtime/core-js/symbol");
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! babel-runtime/core-js/object/create */ "babel-runtime/core-js/object/create");
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! babel-runtime/core-js/object/set-prototype-of */ "babel-runtime/core-js/object/set-prototype-of");
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-config */ "react-router-config");
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! path-to-regexp */ "path-to-regexp");
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(path_to_regexp__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _molecules_InfoStatus__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../molecules/InfoStatus */ "./src/components/molecules/InfoStatus.tsx");
/* harmony import */ var _organisms_info_InfoDetails__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../organisms/info/InfoDetails */ "./src/components/organisms/info/InfoDetails.tsx");
/* harmony import */ var _organisms_info_InfoPhotos__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../organisms/info/InfoPhotos */ "./src/components/organisms/info/InfoPhotos.tsx");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _organisms_info_SideMenu__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../organisms/info/SideMenu */ "./src/components/organisms/info/SideMenu.tsx");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! yup */ "yup");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _organisms_info_InfoFacilities__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../organisms/info/InfoFacilities */ "./src/components/organisms/info/InfoFacilities.tsx");
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../constants/theme */ "./src/constants/theme.tsx");







var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_6___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_5___default.a || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_4___default()(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = undefined && undefined.__assign || function () {
    __assign = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default.a || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && (g[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
















var GET_SELECTED_ACCOMMODATION_QUERY = graphql_tag__WEBPACK_IMPORTED_MODULE_10___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query SelectedAccommodationQuery($id: ID!) {\n        accommodation(id: $id) {\n            id\n            ...DetailsFragment\n            photos {\n                ...PhotoFragment\n            }\n            ...FacilitiesFragment\n        }\n    }\n    ", "\n    ", "\n    ", "\n"], ["\n    query SelectedAccommodationQuery($id: ID!) {\n        accommodation(id: $id) {\n            id\n            ...DetailsFragment\n            photos {\n                ...PhotoFragment\n            }\n            ...FacilitiesFragment\n        }\n    }\n    ", "\n    ", "\n    ", "\n"])), _organisms_info_InfoDetails__WEBPACK_IMPORTED_MODULE_15__["detailsFragment"], _organisms_info_InfoPhotos__WEBPACK_IMPORTED_MODULE_16__["photoFragment"], _organisms_info_InfoFacilities__WEBPACK_IMPORTED_MODULE_21__["facilitiesFragment"]);
var UPDATE_ACCOMMODATION_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_10___default()(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    mutation UpdateAccommodation(\n        $id: String!\n        $name: String\n        $description: TranslatableStringInput\n        $address: AddressInput\n        $keyAddress: AddressInput\n        $type: AccommodationTypeInput\n        $livingArea: Int\n        $outsideArea: Int\n        $contactPhone: String\n        $contactPerson: String\n        $minCapacity: Int\n        $maxCapacity: Int\n        $city: CityInput\n    ) {\n        updateAccommodation(\n            accommodationId: $id\n            input: {\n                description: $description\n                name: $name\n                address: $address\n                keyAddress: $keyAddress\n                type: $type\n                livingArea: $livingArea\n                outsideArea: $outsideArea\n                contactPhone: $contactPhone\n                contactPerson: $contactPerson\n                minCapacity: $minCapacity\n                maxCapacity: $maxCapacity\n                city: $city\n            }\n        ) {\n            id\n            name\n        }\n    }\n"], ["\n    mutation UpdateAccommodation(\n        $id: String!\n        $name: String\n        $description: TranslatableStringInput\n        $address: AddressInput\n        $keyAddress: AddressInput\n        $type: AccommodationTypeInput\n        $livingArea: Int\n        $outsideArea: Int\n        $contactPhone: String\n        $contactPerson: String\n        $minCapacity: Int\n        $maxCapacity: Int\n        $city: CityInput\n    ) {\n        updateAccommodation(\n            accommodationId: $id\n            input: {\n                description: $description\n                name: $name\n                address: $address\n                keyAddress: $keyAddress\n                type: $type\n                livingArea: $livingArea\n                outsideArea: $outsideArea\n                contactPhone: $contactPhone\n                contactPerson: $contactPerson\n                minCapacity: $minCapacity\n                maxCapacity: $maxCapacity\n                city: $city\n            }\n        ) {\n            id\n            name\n        }\n    }\n"])));
var InfoSchema = yup__WEBPACK_IMPORTED_MODULE_20__["object"]().shape({
    contactPerson: yup__WEBPACK_IMPORTED_MODULE_20__["string"]().required()
});
var Info = /** @class */function (_super) {
    __extends(Info, _super);
    function Info() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currentPage: 0,
            accommodation: {
                id: '',
                code: 0,
                description: { en: '', nl: '', de: '' },
                address: { address: '', postcode: '', city: '' },
                livingArea: 0,
                outsideArea: 0,
                minCapacity: 0,
                maxCapacity: 0,
                keyAddress: { address: '', postcode: '', city: '' },
                type: { name: '' },
                contactPhone: '',
                contactPerson: '',
                photos: [],
                bathrooms: [],
                bedrooms: [],
                sites: [],
                features: []
            }
        };
        _this.handleNextPage = function () {
            var _a = _this.props,
                routes = _a.route.routes,
                history = _a.history,
                params = _a.match.params;
            if (routes) {
                var nextPage = _this.state.currentPage + 1;
                var path = routes[nextPage].path;
                if (path) {
                    var generatePath = path_to_regexp__WEBPACK_IMPORTED_MODULE_13___default.a.compile(path);
                    history.push(generatePath(params));
                }
                if (nextPage <= routes.length) {
                    _this.setState(function (state) {
                        return { currentPage: state.currentPage + 1 };
                    });
                }
            }
        };
        _this.handlePageIndex = function (index) {
            return _this.setState(function (state) {
                return { currentPage: index };
            });
        };
        return _this;
    }
    Info.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            route = _a.route,
            accommodationId = _a.match.params.accommodationId;
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(Container, null, route.routes && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_organisms_info_SideMenu__WEBPACK_IMPORTED_MODULE_19__["default"], { routes: route.routes, handlePageIndex: this.handlePageIndex }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_11__["Query"], { variables: { id: accommodationId }, query: GET_SELECTED_ACCOMMODATION_QUERY }, function (_a) {
            var loading = _a.loading,
                error = _a.error,
                data = _a.data;
            if (loading) {
                return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", null, "Loading...");
            }
            if (error || !data) {
                if (error) {
                    console.log(error);
                }
                return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", null, "Error!!");
            }
            var accommodation = data.accommodation;
            var values;
            if (!accommodation) {
                // If the user has no accommodation initial values should be set to empty/standard ones.
                values = __assign({}, _this.state.accommodation);
            } else {
                values = __assign({}, Object(_utils__WEBPACK_IMPORTED_MODULE_18__["removeTypename"])(accommodation));
            }
            return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(Wrapper, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_11__["Mutation"], { mutation: UPDATE_ACCOMMODATION_MUTATION }, function (mutate) {
                return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_17__["Formik"], { initialValues: values, onSubmit: function onSubmit(variables, _a) {
                        var setSubmitting = _a.setSubmitting;
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        variables.maxCapacity = Number(variables.maxCapacity);
                                        variables.minCapacity = Number(variables.minCapacity);
                                        return [4 /*yield*/, mutate({ variables: variables })];
                                    case 1:
                                        _b.sent();
                                        setSubmitting(false);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    }, validationSchema: InfoSchema }, function (_a) {
                    var submitForm = _a.submitForm,
                        errors = _a.errors,
                        isSubmitting = _a.isSubmitting;
                    var routes = route.routes;
                    var amountOfPages = routes && routes.length - 2;
                    var currentPage = _this.state.currentPage;
                    var isLastPage = amountOfPages === currentPage;
                    if (isSubmitting) {
                        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", null, "Saving....");
                    }
                    return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(ContentWrapper, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_17__["Form"], null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(Content, null, Object(react_router_config__WEBPACK_IMPORTED_MODULE_12__["renderRoutes"])(routes, {
                        accommodation: accommodation ? accommodation : _this.state.accommodation
                    })), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_molecules_InfoStatus__WEBPACK_IMPORTED_MODULE_14__["InfoStatus"], { errors: errors, onLastPage: isLastPage, page: routes && routes[currentPage + 1].name.toLowerCase(), handleOnClick: function handleOnClick() {
                            submitForm();
                            if (!isLastPage) {
                                _this.handleNextPage();
                            }
                        } })));
                    // return <Content>{pages(accommodationData)[this.state.page]}</Content>;
                });
            }));
        }));
    };
    return Info;
}(react__WEBPACK_IMPORTED_MODULE_7__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_9__["withRouter"])(Info));
var Container = styled_components__WEBPACK_IMPORTED_MODULE_8___default.a.div.withConfig({
    displayName: "Info__Container",
    componentId: "sc-1uj9vaf-0"
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: grid;\n    grid-template-columns: 1fr;\n\n    @media ", " {\n        grid-template-columns: 0.4fr 1.6fr;\n    }\n    flex-direction: row;\n    height: calc(100vh - 7.2rem);\n"], ["\n    display: grid;\n    grid-template-columns: 1fr;\n\n    @media ", " {\n        grid-template-columns: 0.4fr 1.6fr;\n    }\n    flex-direction: row;\n    height: calc(100vh - 7.2rem);\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].m);
var ContentWrapper = styled_components__WEBPACK_IMPORTED_MODULE_8___default.a.div.withConfig({
    displayName: "Info__ContentWrapper",
    componentId: "sc-1uj9vaf-1"
})(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    padding: 2rem 4rem;\n    @media ", " {\n        padding: 3rem 5rem 0 5rem;\n    }\n\n    @media ", " {\n        padding: 3rem 15rem 0 15rem;\n    }\n"], ["\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    padding: 2rem 4rem;\n    @media ", " {\n        padding: 3rem 5rem 0 5rem;\n    }\n\n    @media ", " {\n        padding: 3rem 15rem 0 15rem;\n    }\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].s, _constants_theme__WEBPACK_IMPORTED_MODULE_22__["device"].xl);
var Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_8___default.a.div.withConfig({
    displayName: "Info__Wrapper",
    componentId: "sc-1uj9vaf-2"
})(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    overflow-y: scroll;\n    position: relative;\n"], ["\n    overflow-y: scroll;\n    position: relative;\n"])));
var Content = styled_components__WEBPACK_IMPORTED_MODULE_8___default.a.div.withConfig({
    displayName: "Info__Content",
    componentId: "sc-1uj9vaf-3"
})(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    padding-bottom: 12rem;\n"], ["\n    padding-bottom: 12rem;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;

/***/ }),

/***/ "./src/components/templates/Login.tsx":
/*!********************************************!*\
  !*** ./src/components/templates/Login.tsx ***!
  \********************************************/
/*! exports provided: Login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ "babel-runtime/core-js/symbol/iterator");
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/symbol */ "babel-runtime/core-js/symbol");
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../atoms/PrimaryButton */ "./src/components/atoms/PrimaryButton.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _atoms_AnchorTag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../atoms/AnchorTag */ "./src/components/atoms/AnchorTag.tsx");
/* harmony import */ var _atoms_Divider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../atoms/Divider */ "./src/components/atoms/Divider.tsx");
/* harmony import */ var _atoms_Logo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../atoms/Logo */ "./src/components/atoms/Logo.tsx");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! yup */ "yup");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _atoms_TextInput__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../atoms/TextInput */ "./src/components/atoms/TextInput.tsx");




var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_3___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && (g[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = undefined;












var LOGIN_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_7___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation LoginMutation($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            token\n        }\n    }\n"], ["\n    mutation LoginMutation($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            token\n        }\n    }\n"])));
var LoginSchema = yup__WEBPACK_IMPORTED_MODULE_14__["object"]().shape({
    email: yup__WEBPACK_IMPORTED_MODULE_14__["string"]().email('Vul een geldig email adres in').required('Email adres is verplicht'),
    password: yup__WEBPACK_IMPORTED_MODULE_14__["string"]().required('Wachtwoord is verplicht')
});
var Login = function Login(_a) {
    var history = _a.history;
    if (Object(_utils__WEBPACK_IMPORTED_MODULE_12__["readToken"])()) {
        history.push('/accommodation/dashboard');
    }
    // Read token from localStorage in order to check if the user is logged in.
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_8__["Mutation"], { mutation: LOGIN_MUTATION }, function (mutate, _a) {
        var error = _a.error,
            data = _a.data;
        return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Container, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(FormWrapper, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_atoms_Logo__WEBPACK_IMPORTED_MODULE_11__["default"], { variant: "dark" }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_10__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Formik"], { initialValues: { email: '', password: '' }, validationSchema: LoginSchema, onSubmit: function onSubmit(values) {
                return __awaiter(_this, void 0, void 0, function () {
                    var response, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2,, 3]);
                                return [4 /*yield*/, mutate({
                                    variables: values
                                })];
                            case 1:
                                response = _a.sent();
                                if (response && response.data) {
                                    Object(_utils__WEBPACK_IMPORTED_MODULE_12__["setToken"])(response.data.login.token);
                                    history.push('/accommodation/dashboard');
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                e_1 = _a.sent();
                                alert('Verkeerde gebruikersnaam en/of wachtwoord');
                                return [3 /*break*/, 3];
                            case 3:
                                return [2 /*return*/];
                        }
                    });
                });
            } }, function (_a) {
            var handleSubmit = _a.handleSubmit;
            return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Form"], null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Field"], { name: "email", type: "text", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_15__["TextInput"], placeholder: 'Email' }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_13__["Field"], { name: "password", type: "password", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_15__["TextInput"], placeholder: 'Wachtwoord' }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_5__["PrimaryButton"], { onClick: handleSubmit, type: "button" }, "Inloggen"));
        }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_10__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(LoginMenu, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_atoms_AnchorTag__WEBPACK_IMPORTED_MODULE_9__["AnchorTag"], { to: '/register' }, "account aanmaken"), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_atoms_AnchorTag__WEBPACK_IMPORTED_MODULE_9__["AnchorTag"], { to: '/login' }, "wachtwoord vergeten")))));
    });
};
var Container = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div.withConfig({
    displayName: "Login__Container",
    componentId: "sc-1tj3y1i-0"
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n"], ["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n"])));
var LoginMenu = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div.withConfig({
    displayName: "Login__LoginMenu",
    componentId: "sc-1tj3y1i-1"
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: flex;\n    justify-content: space-between;\n    width: 100%;\n"], ["\n    display: flex;\n    justify-content: space-between;\n    width: 100%;\n"])));
var FormWrapper = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div.withConfig({
    displayName: "Login__FormWrapper",
    componentId: "sc-1tj3y1i-2"
})(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    width: 50rem;\n    input {\n        padding: 1rem;\n        margin-bottom: 1rem;\n    }\n"], ["\n    width: 50rem;\n    input {\n        padding: 1rem;\n        margin-bottom: 1rem;\n    }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

/***/ }),

/***/ "./src/components/templates/Register.tsx":
/*!***********************************************!*\
  !*** ./src/components/templates/Register.tsx ***!
  \***********************************************/
/*! exports provided: Register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Register", function() { return Register; });
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ "babel-runtime/core-js/symbol/iterator");
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/symbol */ "babel-runtime/core-js/symbol");
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! babel-runtime/core-js/object/create */ "babel-runtime/core-js/object/create");
/* harmony import */ var babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! babel-runtime/core-js/object/set-prototype-of */ "babel-runtime/core-js/object/set-prototype-of");
/* harmony import */ var babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../atoms/PrimaryButton */ "./src/components/atoms/PrimaryButton.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _atoms_Divider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../atoms/Divider */ "./src/components/atoms/Divider.tsx");
/* harmony import */ var _atoms_Logo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../atoms/Logo */ "./src/components/atoms/Logo.tsx");
/* harmony import */ var _atoms_TextInput__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../atoms/TextInput */ "./src/components/atoms/TextInput.tsx");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! formik */ "formik");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_15__);







var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_6___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};
var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = babel_runtime_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_5___default.a || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? babel_runtime_core_js_object_create__WEBPACK_IMPORTED_MODULE_4___default()(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = undefined && undefined.__assign || function () {
    __assign = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default.a || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && (g[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var REGISTER_MUTATION = graphql_tag__WEBPACK_IMPORTED_MODULE_10___default()(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation RegisterMutation(\n        $email: String!\n        $password: String!\n        $firstName: String!\n        $lastName: String!\n        $phone: String!\n        $address: AddressInput!\n    ) {\n        signup(\n            firstName: $firstName\n            lastName: $lastName\n            email: $email\n            password: $password\n            phone: $phone\n            address: $address\n        ) {\n            token\n        }\n    }\n"], ["\n    mutation RegisterMutation(\n        $email: String!\n        $password: String!\n        $firstName: String!\n        $lastName: String!\n        $phone: String!\n        $address: AddressInput!\n    ) {\n        signup(\n            firstName: $firstName\n            lastName: $lastName\n            email: $email\n            password: $password\n            phone: $phone\n            address: $address\n        ) {\n            token\n        }\n    }\n"])));
var Register = /** @class */function (_super) {
    __extends(Register, _super);
    function Register() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Register.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_11__["Mutation"], { mutation: REGISTER_MUTATION }, function (mutate) {
            return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(Container, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(FormWrapper, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_atoms_Logo__WEBPACK_IMPORTED_MODULE_13__["default"], { variant: "dark" }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_atoms_Divider__WEBPACK_IMPORTED_MODULE_12__["Divider"], null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_15__["Formik"], { initialValues: { email: '', password: '', firstName: '', lastName: '', phone: '' }, onSubmit: function onSubmit(values) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, mutate({
                                        variables: __assign({ address: {
                                                postcode: '1095AZ',
                                                address: 'Fopolaan 9',
                                                city: 'Amsterdam'
                                            } }, values)
                                    })];
                                case 1:
                                    response = _a.sent();
                                    console.log(response);
                                    this.props.history.push('/login');
                                    return [2 /*return*/];
                            }
                        });
                    });
                } }, function () {
                return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_15__["Form"], null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_15__["Field"], { name: "email", type: "email", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_14__["TextInput"], placeholder: 'Email' }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_15__["Field"], { name: "password", type: "password", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_14__["TextInput"], placeholder: 'Wachtwoord' }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_15__["Field"], { name: "firstName", type: "text", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_14__["TextInput"], placeholder: 'Voornaam' }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_15__["Field"], { name: "lastname", type: "text", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_14__["TextInput"], placeholder: 'Achternaam' }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_15__["Field"], { name: "phone", type: "tel", component: _atoms_TextInput__WEBPACK_IMPORTED_MODULE_14__["TextInput"], placeholder: 'Telefoon' }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_atoms_PrimaryButton__WEBPACK_IMPORTED_MODULE_8__["PrimaryButton"], { type: "submit" }, "Registreren"));
            })));
        });
    };
    return Register;
}(react__WEBPACK_IMPORTED_MODULE_7__["PureComponent"]);

var Container = styled_components__WEBPACK_IMPORTED_MODULE_9___default.a.div.withConfig({
    displayName: "Register__Container",
    componentId: "v9moha-0"
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n"], ["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n"])));
var FormWrapper = styled_components__WEBPACK_IMPORTED_MODULE_9___default.a.div.withConfig({
    displayName: "Register__FormWrapper",
    componentId: "v9moha-1"
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 50rem;\n    input {\n        padding: 1rem;\n        margin-bottom: 1rem;\n    }\n"], ["\n    width: 50rem;\n    input {\n        padding: 1rem;\n        margin-bottom: 1rem;\n    }\n"])));
var templateObject_1, templateObject_2, templateObject_3;

/***/ }),

/***/ "./src/constants/routes.tsx":
/*!**********************************!*\
  !*** ./src/constants/routes.tsx ***!
  \**********************************/
/*! exports provided: homeRoute, someRoute, loginRoute, notFound, accommodationRoute, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "homeRoute", function() { return homeRoute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "someRoute", function() { return someRoute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginRoute", function() { return loginRoute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notFound", function() { return notFound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "accommodationRoute", function() { return accommodationRoute; });
/* harmony import */ var _components_NotFound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/NotFound */ "./src/components/NotFound.tsx");
/* harmony import */ var _components_Accommodation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Accommodation */ "./src/components/Accommodation.tsx");
/* harmony import */ var _components_Dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Dashboard */ "./src/components/Dashboard.tsx");
/* harmony import */ var _components_templates_Register__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/templates/Register */ "./src/components/templates/Register.tsx");
/* harmony import */ var _components_templates_Login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/templates/Login */ "./src/components/templates/Login.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_templates_Info__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/templates/Info */ "./src/components/templates/Info.tsx");
/* harmony import */ var _components_organisms_info_InfoDetails__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/organisms/info/InfoDetails */ "./src/components/organisms/info/InfoDetails.tsx");
/* harmony import */ var _components_organisms_info_InfoPhotos__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/organisms/info/InfoPhotos */ "./src/components/organisms/info/InfoPhotos.tsx");
/* harmony import */ var _components_organisms_info_InfoDescription__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/organisms/info/InfoDescription */ "./src/components/organisms/info/InfoDescription.tsx");
/* harmony import */ var _components_organisms_info_InfoFacilities__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/organisms/info/InfoFacilities */ "./src/components/organisms/info/InfoFacilities.tsx");











var homeRoute = {
    path: '/',
    component: _components_templates_Login__WEBPACK_IMPORTED_MODULE_4__["Login"],
    exact: true,
    name: 'Home'
};
var someRoute = {
    path: '/register',
    component: _components_templates_Register__WEBPACK_IMPORTED_MODULE_3__["Register"],
    exact: true,
    name: 'Register'
};
var loginRoute = {
    path: '/login',
    component: _components_templates_Login__WEBPACK_IMPORTED_MODULE_4__["Login"],
    exact: true,
    name: 'login'
};
var notFound = {
    name: 'NotFound',
    path: '*',
    component: _components_NotFound__WEBPACK_IMPORTED_MODULE_0__["default"],
    exact: true
};
var dummyComponent = function dummyComponent(name) {
    return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, name);
};
var accommodationRoute = {
    path: '/accommodation/:accommodationId',
    component: _components_Accommodation__WEBPACK_IMPORTED_MODULE_1__["default"],
    name: 'Accommodatie',
    routes: [{
        name: 'Dashboard',
        path: '/accommodation/:accommodationId',
        exact: true,
        component: _components_Dashboard__WEBPACK_IMPORTED_MODULE_2__["default"]
    }, {
        name: 'Prijzen',
        displayInNav: true,
        path: '/accommodation/:accommodationId/prices',
        exact: true,
        component: _components_templates_Register__WEBPACK_IMPORTED_MODULE_3__["Register"]
    }, {
        name: 'Beschikbaarheid',
        displayInNav: true,
        path: '/accommodation/:accommodationId/availability',
        exact: true,
        component: _components_templates_Info__WEBPACK_IMPORTED_MODULE_6__["default"]
    }, {
        name: 'Boekingen',
        displayInNav: true,
        path: '/accommodation/:accommodationId/bookings',
        exact: true,
        component: _components_templates_Info__WEBPACK_IMPORTED_MODULE_6__["default"]
    }, {
        name: 'Gegevens',
        displayInNav: true,
        path: '/accommodation/:accommodationId/info',
        component: _components_templates_Info__WEBPACK_IMPORTED_MODULE_6__["default"],
        routes: [{
            name: 'Gegevens',
            path: '/accommodation/:accommodationId/info',
            exact: true,
            component: _components_organisms_info_InfoDetails__WEBPACK_IMPORTED_MODULE_7__["default"]
        }, {
            name: 'Omschrijving',
            path: '/accommodation/:accommodationId/info/description',
            exact: true,
            component: _components_organisms_info_InfoDescription__WEBPACK_IMPORTED_MODULE_9__["InfoDescription"]
        }, {
            name: "Foto's",
            path: '/accommodation/:accommodationId/info/pictures',
            exact: true,
            component: _components_organisms_info_InfoPhotos__WEBPACK_IMPORTED_MODULE_8__["default"]
        }, {
            name: 'Faciliteiten',
            path: '/accommodation/:accommodationId/info/facilities',
            exact: true,
            component: _components_organisms_info_InfoFacilities__WEBPACK_IMPORTED_MODULE_10__["InfoFacilities"]
        }, {
            name: 'Opties',
            path: '/accommodation/:accommodationId/info/options',
            exact: true,
            component: function component() {
                return dummyComponent('Opties');
            }
        }, {
            name: 'Toeslagen',
            path: '/accommodation/:accommodationId/info/fee',
            exact: true,
            component: function component() {
                return dummyComponent('Toeslagen');
            }
        }, {
            name: 'Kortingen',
            path: '/accommodation/:accommodationId/info/discounts',
            exact: true,
            component: function component() {
                return dummyComponent('Kortingen');
            }
        }, {
            name: 'Overeenkomsten',
            path: '/accommodation/:accommodationId/info/agreements',
            exact: true,
            component: function component() {
                return dummyComponent('Overeenkomsten');
            }
        }, notFound]
    }, notFound]
};
var routes = [homeRoute, accommodationRoute, someRoute, loginRoute, notFound];
/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ }),

/***/ "./src/constants/theme.tsx":
/*!*********************************!*\
  !*** ./src/constants/theme.tsx ***!
  \*********************************/
/*! exports provided: default, device */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "device", function() { return device; });
var theme = {
    colors: {
        primary: {
            cerulean: '#0c537f',
            turquoise: '#00edf7',
            waterspout: '#a0f2fd',
            azureish: '#ddf2f7'
        },
        dark: {
            registrationBlack: '#000000',
            eerie: '#0a1923',
            gunmetal: '#0f2431',
            dim: '#61696f',
            silver: '#848c91'
        },
        light: {
            lavendar: '#c3ced0',
            flash: '#eef2f3',
            snow: '#f9f9fa',
            white: '#ffffff'
        },
        danger: {
            fire: '#f91c16',
            rose: '#df1711'
        },
        secondary: {
            india: '#0c7f0f',
            teal: '#9ffab0',
            platinum: '#ddf7e2'
        }
    },
    fonts: {
        title: '500 3.2rem/3.2rem Uniform, sans-serif',
        subtitle: '500 3.2rem/3.2rem Uniform, sans-serif',
        body: '400 1.4rem/2.4rem Uniform, sans-serif'
    },
    mediaQueries: {
        xs: '480px',
        s: '768px',
        m: '992px',
        l: '1200px',
        xl: '1440px',
        xxl: '1660px'
    },
    mediaQueriesValues: {
        xs: 400,
        s: 768,
        m: 992,
        l: 1200,
        xl: 1440,
        xxl: 1660
    },
    maxWidths: {
        xs: '464',
        s: '636',
        m: '960',
        l: '1152',
        xl: '1344',
        xxl: '1440'
    }
};
/* harmony default export */ __webpack_exports__["default"] = (theme);
var size = {
    xs: '480px',
    s: '768px',
    m: '992px',
    l: '1200px',
    xl: '1440px',
    xxl: '1660px'
};
var device = {
    xs: "(min-width: " + size.xs + ")",
    s: "(min-width: " + size.s + ")",
    m: "(min-width: " + size.m + ")",
    l: "(min-width: " + size.l + ")",
    xl: "(min-width: " + size.xl + ")",
    xxl: "(min-width: " + size.xxl + ")"
};

/***/ }),

/***/ "./src/createClient.ts":
/*!*****************************!*\
  !*** ./src/createClient.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-client */ "apollo-client");
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-cache-inmemory */ "apollo-cache-inmemory");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-link-http */ "apollo-link-http");
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(apollo_link_http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node-fetch */ "node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var apollo_link_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apollo-link-context */ "apollo-link-context");
/* harmony import */ var apollo_link_context__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(apollo_link_context__WEBPACK_IMPORTED_MODULE_5__);

var __assign = undefined && undefined.__assign || function () {
    __assign = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default.a || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};





var link = new apollo_link_http__WEBPACK_IMPORTED_MODULE_3__["HttpLink"]({
    uri: 'http://localhost:4000/',
    fetch: node_fetch__WEBPACK_IMPORTED_MODULE_4___default.a
});
var authLink = Object(apollo_link_context__WEBPACK_IMPORTED_MODULE_5__["setContext"])(function (_, _a) {
    var headers = _a.headers;
    // get the authentication token from local storage if it exists
    var token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: __assign({}, headers, { authorization: token ? "Bearer " + token : '' })
    };
});
var client = new apollo_client__WEBPACK_IMPORTED_MODULE_1__["ApolloClient"]({
    cache: new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_2__["InMemoryCache"](),
    link: authLink.concat(link)
});
/* harmony default export */ __webpack_exports__["default"] = (function () {
    return client;
});

/***/ }),

/***/ "./src/globalStyling.ts":
/*!******************************!*\
  !*** ./src/globalStyling.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");
/* harmony import */ var babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants/theme */ "./src/constants/theme.tsx");

var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
    if (babel_runtime_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default.a) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};


var GlobalStyle = Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["createGlobalStyle"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n html {\n        font-size: 10px;\n        height: 100%;\n    }\n    \n    * {\n        box-sizing: border-box;\n    }\n\n    body {\n        margin: 0;\n        padding: 0;\n        font: ", ";\n        \n    }\n    \n    a {\n        color: inherit;\n        text-decoration: none;\n    }\n\n    h1 {\n        font-weight: 500;\n\n    }\n\n    h2 {\n        font-weight: 500;\n    }\n\n    h3 {\n\n        font-weight: 500;\n\n    }\n    h4 {\n        display: flex;\n        flex-direction: column\n        margin: 0;\n        font-weight: 500;\n\n    }\n    \n\n    button {\n        cursor: pointer;\n    }\n    \n    @font-face{\n        font-family:\"Uniform\";\n        font-weight: 300;\n        src:url(\"/fonts/051903bc-b4fe-46c8-98e2-95962afcd52e.eot?#iefix\");\n        src:url(\"/fonts/051903bc-b4fe-46c8-98e2-95962afcd52e.eot?#iefix\") format(\"eot\"),url(\"/fonts/03a08762-460e-4500-ae81-0f86719cf0e5.woff2\") format(\"woff2\"),url(\"/fonts/8b984417-b738-4d2f-b7fd-88a16e7dd121.woff\") format(\"woff\"),url(\"/fonts/53311409-e161-4c9c-be17-9fb00984b6d9.ttf\") format(\"truetype\"),url(\"/fonts/119b2392-980e-4694-96a7-0a5ee4c094b1.svg#119b2392-980e-4694-96a7-0a5ee4c094b1\") format(\"svg\");\n    }\n    @font-face{\n        font-family:\"Uniform\";\n        font-weight: 400;\n        src:url(\"/fonts/872c49de-7e10-4dfc-875f-b7465f47fe83.eot?#iefix\");\n        src:url(\"/fonts/872c49de-7e10-4dfc-875f-b7465f47fe83.eot?#iefix\") format(\"eot\"),url(\"/fonts/e37866fa-e728-4623-96a9-44bf729bf17c.woff2\") format(\"woff2\"),url(\"/fonts/8c6c0966-73ba-4afc-86d7-cdb84fda6c97.woff\") format(\"woff\"),url(\"/fonts/683fe307-348b-44a6-98a8-be9da795e93c.ttf\") format(\"truetype\"),url(\"/fonts/4584092a-3d0f-43f7-b3f6-8c39deabb584.svg#4584092a-3d0f-43f7-b3f6-8c39deabb584\") format(\"svg\");\n    }\n    @font-face{\n        font-family:\"Uniform\";\n        font-weight: 500;;\n        src:url(\"/fonts/68b1cf55-8704-4498-ad8e-f0818e15c685.eot?#iefix\");\n        src:url(\"/fonts/68b1cf55-8704-4498-ad8e-f0818e15c685.eot?#iefix\") format(\"eot\"),url(\"/fonts/44435405-fa6c-40a4-929a-219d92a6eaa9.woff2\") format(\"woff2\"),url(\"/fonts/bcf10c7f-10a1-4907-ac78-f33a65e2f955.woff\") format(\"woff\"),url(\"/fonts/dc3edeb6-60be-4ce6-a3ac-36480780b440.ttf\") format(\"truetype\"),url(\"/fonts/0867e287-a3c8-40f9-b726-e141865215a2.svg#0867e287-a3c8-40f9-b726-e141865215a2\") format(\"svg\");\n    }\n    @font-face{\n        font-family:\"Uniform\";\n        font-weight: 700;\n        src:url(\"/fonts/983de45f-0033-4ef8-bccf-1f7860951215.eot?#iefix\");\n        src:url(\"/fonts/983de45f-0033-4ef8-bccf-1f7860951215.eot?#iefix\") format(\"eot\"),url(\"/fonts/3d9563f7-e06c-4a5f-8780-433c0a223d03.woff2\") format(\"woff2\"),url(\"/fonts/22a200e7-90c6-4fdf-83ff-4d7297591d88.woff\") format(\"woff\"),url(\"/fonts/1073acee-08e6-4332-beaa-f090924eed1f.ttf\") format(\"truetype\"),url(\"/fonts/92f1aa8a-d67c-4d78-a885-607b1693230b.svg#92f1aa8a-d67c-4d78-a885-607b1693230b\") format(\"svg\");\n    }\n"], ["\n html {\n        font-size: 10px;\n        height: 100%;\n    }\n    \n    * {\n        box-sizing: border-box;\n    }\n\n    body {\n        margin: 0;\n        padding: 0;\n        font: ", ";\n        \n    }\n    \n    a {\n        color: inherit;\n        text-decoration: none;\n    }\n\n    h1 {\n        font-weight: 500;\n\n    }\n\n    h2 {\n        font-weight: 500;\n    }\n\n    h3 {\n\n        font-weight: 500;\n\n    }\n    h4 {\n        display: flex;\n        flex-direction: column\n        margin: 0;\n        font-weight: 500;\n\n    }\n    \n\n    button {\n        cursor: pointer;\n    }\n    \n    @font-face{\n        font-family:\"Uniform\";\n        font-weight: 300;\n        src:url(\"/fonts/051903bc-b4fe-46c8-98e2-95962afcd52e.eot?#iefix\");\n        src:url(\"/fonts/051903bc-b4fe-46c8-98e2-95962afcd52e.eot?#iefix\") format(\"eot\"),url(\"/fonts/03a08762-460e-4500-ae81-0f86719cf0e5.woff2\") format(\"woff2\"),url(\"/fonts/8b984417-b738-4d2f-b7fd-88a16e7dd121.woff\") format(\"woff\"),url(\"/fonts/53311409-e161-4c9c-be17-9fb00984b6d9.ttf\") format(\"truetype\"),url(\"/fonts/119b2392-980e-4694-96a7-0a5ee4c094b1.svg#119b2392-980e-4694-96a7-0a5ee4c094b1\") format(\"svg\");\n    }\n    @font-face{\n        font-family:\"Uniform\";\n        font-weight: 400;\n        src:url(\"/fonts/872c49de-7e10-4dfc-875f-b7465f47fe83.eot?#iefix\");\n        src:url(\"/fonts/872c49de-7e10-4dfc-875f-b7465f47fe83.eot?#iefix\") format(\"eot\"),url(\"/fonts/e37866fa-e728-4623-96a9-44bf729bf17c.woff2\") format(\"woff2\"),url(\"/fonts/8c6c0966-73ba-4afc-86d7-cdb84fda6c97.woff\") format(\"woff\"),url(\"/fonts/683fe307-348b-44a6-98a8-be9da795e93c.ttf\") format(\"truetype\"),url(\"/fonts/4584092a-3d0f-43f7-b3f6-8c39deabb584.svg#4584092a-3d0f-43f7-b3f6-8c39deabb584\") format(\"svg\");\n    }\n    @font-face{\n        font-family:\"Uniform\";\n        font-weight: 500;;\n        src:url(\"/fonts/68b1cf55-8704-4498-ad8e-f0818e15c685.eot?#iefix\");\n        src:url(\"/fonts/68b1cf55-8704-4498-ad8e-f0818e15c685.eot?#iefix\") format(\"eot\"),url(\"/fonts/44435405-fa6c-40a4-929a-219d92a6eaa9.woff2\") format(\"woff2\"),url(\"/fonts/bcf10c7f-10a1-4907-ac78-f33a65e2f955.woff\") format(\"woff\"),url(\"/fonts/dc3edeb6-60be-4ce6-a3ac-36480780b440.ttf\") format(\"truetype\"),url(\"/fonts/0867e287-a3c8-40f9-b726-e141865215a2.svg#0867e287-a3c8-40f9-b726-e141865215a2\") format(\"svg\");\n    }\n    @font-face{\n        font-family:\"Uniform\";\n        font-weight: 700;\n        src:url(\"/fonts/983de45f-0033-4ef8-bccf-1f7860951215.eot?#iefix\");\n        src:url(\"/fonts/983de45f-0033-4ef8-bccf-1f7860951215.eot?#iefix\") format(\"eot\"),url(\"/fonts/3d9563f7-e06c-4a5f-8780-433c0a223d03.woff2\") format(\"woff2\"),url(\"/fonts/22a200e7-90c6-4fdf-83ff-4d7297591d88.woff\") format(\"woff\"),url(\"/fonts/1073acee-08e6-4332-beaa-f090924eed1f.ttf\") format(\"truetype\"),url(\"/fonts/92f1aa8a-d67c-4d78-a885-607b1693230b.svg#92f1aa8a-d67c-4d78-a885-607b1693230b\") format(\"svg\");\n    }\n"])), _constants_theme__WEBPACK_IMPORTED_MODULE_2__["default"].fonts.body);
/* harmony default export */ __webpack_exports__["default"] = (GlobalStyle);
var templateObject_1;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server */ "./src/server.tsx");


var server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(_server__WEBPACK_IMPORTED_MODULE_1__["default"]);
var currentApp = _server__WEBPACK_IMPORTED_MODULE_1__["default"];

server.listen("3000" || false, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('🚀 started');
});

if (true) {
    console.log('✅  Server-side HMR Enabled!');

    module.hot.accept(/*! ./server */ "./src/server.tsx", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server */ "./src/server.tsx");
(function () {
        console.log('🔁  HMR Reloading `./server`...');
        server.removeListener('request', currentApp);
        var newApp = __webpack_require__(/*! ./server */ "./src/server.tsx").default;
        server.on('request', newApp);
        currentApp = newApp;
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

/***/ }),

/***/ "./src/server.tsx":
/*!************************!*\
  !*** ./src/server.tsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/App */ "./src/components/App.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! morgan */ "morgan");
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _globalStyling__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./globalStyling */ "./src/globalStyling.ts");
/* harmony import */ var _createClient__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createClient */ "./src/createClient.ts");










var assets;
var syncLoadAssets = function syncLoadAssets() {
    assets = __webpack_require__(/*! ./build/assets.json */ "./build/assets.json");
};
syncLoadAssets();
var server = express__WEBPACK_IMPORTED_MODULE_1___default()();
server.disable('x-powered-by').use(morgan__WEBPACK_IMPORTED_MODULE_7___default()( false ? undefined : 'dev')).use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static("/Users/chrisneven/Documents/Oberon/tor-members-website-react/public")).get('/*', function (req, res) {
    var context = {};
    var client = Object(_createClient__WEBPACK_IMPORTED_MODULE_9__["default"])();
    var sheet = new styled_components__WEBPACK_IMPORTED_MODULE_6__["ServerStyleSheet"]();
    var tree = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["StaticRouter"], { context: context, location: req.url }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_5__["default"], { context: context, client: client })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_globalStyling__WEBPACK_IMPORTED_MODULE_8__["default"], null));
    var markup = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_3__["renderToString"])(sheet.collectStyles(tree));
    var styleTags = sheet.getStyleTags();
    var state = babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(client.extract()).replace(/</g, '\\u003c');
    if (context.url) {
        return res.redirect(301, context.url);
    }
    if (context.status) {
        res.status(context.status);
    }
    res.send("<!doctype html>\n    <html lang=\"\">\n    <head>\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta charSet='utf-8' />\n        " + (context.helmet ? "\n            " + context.helmet.title.toString() + "\n            " + context.helmet.meta.toString() + "\n        " : '') + "\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        <meta name=\"author\" content=\"Oberon Amsterdam, www.oberon.nl\" />\n        <script>\n            window.__initialState = " + state + ";\n        </script>\n        " + (assets.client.css ? "<link rel=\"stylesheet\" href=\"" + assets.client.css + "\">" : '') + "\n          " + ( false ? undefined : "<script src=\"" + assets.client.js + "\" defer crossorigin></script>") + "\n          " + styleTags + "\n    </head>\n    <body>\n        <div id=\"root\">" + markup + "</div>\n    </body>\n</html>");
});
/* harmony default export */ __webpack_exports__["default"] = (server);

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: readToken, setToken, removeTypename */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readToken", function() { return readToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setToken", function() { return setToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeTypename", function() { return removeTypename; });
/* harmony import */ var babel_runtime_core_js_object_entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/object/entries */ "babel-runtime/core-js/object/entries");
/* harmony import */ var babel_runtime_core_js_object_entries__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_entries__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/typeof */ "babel-runtime/helpers/typeof");
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ "babel-runtime/core-js/symbol/iterator");
/* harmony import */ var babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/symbol */ "babel-runtime/core-js/symbol");
/* harmony import */ var babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_3__);




var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof babel_runtime_core_js_symbol__WEBPACK_IMPORTED_MODULE_3___default.a === "function" && o[babel_runtime_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default.a];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var readToken = function readToken() {
    try {
        return localStorage.getItem('token');
    } catch (e) {
        return null;
    }
};
var setToken = function setToken(token) {
    // First check if there already is a token
    if (readToken()) {
        localStorage.removeItem('token');
    }
    localStorage.setItem('token', token);
};
/**
 * Util function to remove typename from the object. Apollo issue: https://github.com/apollographql/apollo-client/issues/2160
 * @param value object to remove typename from
 */
var removeTypename = function removeTypename(value) {
    if (value === null || value === undefined) {
        return value;
    } else if (Array.isArray(value)) {
        return value.map(function (v) {
            return removeTypename(v);
        });
    } else if ((typeof value === "undefined" ? "undefined" : babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(value)) === 'object') {
        var newObj_1 = {};
        babel_runtime_core_js_object_entries__WEBPACK_IMPORTED_MODULE_0___default()(value).forEach(function (_a) {
            var _b = __read(_a, 2),
                key = _b[0],
                v = _b[1];
            if (key !== '__typename') {
                newObj_1[key] = removeTypename(v);
            }
        });
        return newObj_1;
    }
    return value;
};

/***/ }),

/***/ 0:
/*!**************************************************************************!*\
  !*** multi razzle-dev-utils/prettyNodeErrors webpack/hot/poll?300 ./src ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! razzle-dev-utils/prettyNodeErrors */"razzle-dev-utils/prettyNodeErrors");
__webpack_require__(/*! webpack/hot/poll?300 */"./node_modules/webpack/hot/poll.js?300");
module.exports = __webpack_require__(/*! /Users/chrisneven/Documents/Oberon/tor-members-website-react/src */"./src/index.js");


/***/ }),

/***/ "apollo-cache-inmemory":
/*!****************************************!*\
  !*** external "apollo-cache-inmemory" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-cache-inmemory");

/***/ }),

/***/ "apollo-client":
/*!********************************!*\
  !*** external "apollo-client" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-client");

/***/ }),

/***/ "apollo-link-context":
/*!**************************************!*\
  !*** external "apollo-link-context" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-link-context");

/***/ }),

/***/ "apollo-link-http":
/*!***********************************!*\
  !*** external "apollo-link-http" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-link-http");

/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ "babel-runtime/core-js/object/assign":
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/assign" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ "babel-runtime/core-js/object/create":
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/create" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/create");

/***/ }),

/***/ "babel-runtime/core-js/object/define-property":
/*!***************************************************************!*\
  !*** external "babel-runtime/core-js/object/define-property" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/define-property");

/***/ }),

/***/ "babel-runtime/core-js/object/entries":
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/object/entries" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/entries");

/***/ }),

/***/ "babel-runtime/core-js/object/get-own-property-symbols":
/*!************************************************************************!*\
  !*** external "babel-runtime/core-js/object/get-own-property-symbols" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-own-property-symbols");

/***/ }),

/***/ "babel-runtime/core-js/object/keys":
/*!****************************************************!*\
  !*** external "babel-runtime/core-js/object/keys" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),

/***/ "babel-runtime/core-js/object/set-prototype-of":
/*!****************************************************************!*\
  !*** external "babel-runtime/core-js/object/set-prototype-of" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/set-prototype-of");

/***/ }),

/***/ "babel-runtime/core-js/promise":
/*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),

/***/ "babel-runtime/core-js/symbol":
/*!***********************************************!*\
  !*** external "babel-runtime/core-js/symbol" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/symbol");

/***/ }),

/***/ "babel-runtime/core-js/symbol/iterator":
/*!********************************************************!*\
  !*** external "babel-runtime/core-js/symbol/iterator" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/symbol/iterator");

/***/ }),

/***/ "babel-runtime/helpers/typeof":
/*!***********************************************!*\
  !*** external "babel-runtime/helpers/typeof" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "formik":
/*!*************************!*\
  !*** external "formik" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("formik");

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "path-to-regexp":
/*!*********************************!*\
  !*** external "path-to-regexp" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path-to-regexp");

/***/ }),

/***/ "razzle-dev-utils/prettyNodeErrors":
/*!****************************************************!*\
  !*** external "razzle-dev-utils/prettyNodeErrors" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("razzle-dev-utils/prettyNodeErrors");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-apollo":
/*!*******************************!*\
  !*** external "react-apollo" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-apollo");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-helmet-async":
/*!*************************************!*\
  !*** external "react-helmet-async" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-helmet-async");

/***/ }),

/***/ "react-image-loading":
/*!**************************************!*\
  !*** external "react-image-loading" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-image-loading");

/***/ }),

/***/ "react-outside-click-handler":
/*!**********************************************!*\
  !*** external "react-outside-click-handler" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-outside-click-handler");

/***/ }),

/***/ "react-responsive-modal":
/*!*****************************************!*\
  !*** external "react-responsive-modal" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-responsive-modal");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-sortable-hoc":
/*!*************************************!*\
  !*** external "react-sortable-hoc" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-sortable-hoc");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "yup":
/*!**********************!*\
  !*** external "yup" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yup");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map