var io="undefined"===typeof module?{}:module.exports;(function(){(function(e,t){var n=e;n.version="0.9.16";n.protocol=1;n.transports=[];n.j=[];n.sockets={};n.connect=function(e,r){var i=n.util.parseUri(e),s,o;if(t&&t.location){i.protocol=i.protocol||t.location.protocol.slice(0,-1);i.host=i.host||(t.document?t.document.domain:t.location.hostname);i.port=i.port||t.location.port}s=n.util.uniqueUri(i);var u={host:i.host,secure:"https"==i.protocol,port:i.port||("https"==i.protocol?443:80),query:i.query||""};n.util.merge(u,r);if(u["force new connection"]||!n.sockets[s]){o=new n.Socket(u)}if(!u["force new connection"]&&o){n.sockets[s]=o}o=o||n.sockets[s];return o.of(i.path.length>1?i.path:"")}})("object"===typeof module?module.exports:this.io={},this);(function(e,t){var n=e.util={};var r=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;var i=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];n.parseUri=function(e){var t=r.exec(e||""),n={},s=14;while(s--){n[i[s]]=t[s]||""}return n};n.uniqueUri=function(e){var n=e.protocol,r=e.host,i=e.port;if("document"in t){r=r||document.domain;i=i||(n=="https"&&document.location.protocol!=="https:"?443:document.location.port)}else{r=r||"localhost";if(!i&&n=="https"){i=443}}return(n||"http")+"://"+r+":"+(i||80)};n.query=function(e,t){var r=n.chunkQuery(e||""),i=[];n.merge(r,n.chunkQuery(t||""));for(var s in r){if(r.hasOwnProperty(s)){i.push(s+"="+r[s])}}return i.length?"?"+i.join("&"):""};n.chunkQuery=function(e){var t={},n=e.split("&"),r=0,i=n.length,s;for(;r<i;++r){s=n[r].split("=");if(s[0]){t[s[0]]=s[1]}}return t};var s=false;n.load=function(e){if("document"in t&&document.readyState==="complete"||s){return e()}n.on(t,"load",e,false)};n.on=function(e,t,n,r){if(e.attachEvent){e.attachEvent("on"+t,n)}else if(e.addEventListener){e.addEventListener(t,n,r)}};n.request=function(e){if(e&&"undefined"!=typeof XDomainRequest&&!n.ua.hasCORS){return new XDomainRequest}if("undefined"!=typeof XMLHttpRequest&&(!e||n.ua.hasCORS)){return new XMLHttpRequest}if(!e){try{return new(window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}}return null};if("undefined"!=typeof window){n.load(function(){s=true})}n.defer=function(e){if(!n.ua.webkit||"undefined"!=typeof importScripts){return e()}n.load(function(){setTimeout(e,100)})};n.merge=function(t,r,i,s){var o=s||[],u=typeof i=="undefined"?2:i,a;for(a in r){if(r.hasOwnProperty(a)&&n.indexOf(o,a)<0){if(typeof t[a]!=="object"||!u){t[a]=r[a];o.push(r[a])}else{n.merge(t[a],r[a],u-1,o)}}}return t};n.mixin=function(e,t){n.merge(e.prototype,t.prototype)};n.inherit=function(e,t){function n(){}n.prototype=t.prototype;e.prototype=new n};n.isArray=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"};n.intersect=function(e,t){var r=[],i=e.length>t.length?e:t,s=e.length>t.length?t:e;for(var o=0,u=s.length;o<u;o++){if(~n.indexOf(i,s[o]))r.push(s[o])}return r};n.indexOf=function(e,t,n){for(var r=e.length,n=n<0?n+r<0?0:n+r:n||0;n<r&&e[n]!==t;n++){}return r<=n?-1:n};n.toArray=function(e){var t=[];for(var n=0,r=e.length;n<r;n++)t.push(e[n]);return t};n.ua={};n.ua.hasCORS="undefined"!=typeof XMLHttpRequest&&function(){try{var e=new XMLHttpRequest}catch(t){return false}return e.withCredentials!=undefined}();n.ua.webkit="undefined"!=typeof navigator&&/webkit/i.test(navigator.userAgent);n.ua.iDevice="undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)})("undefined"!=typeof io?io:module.exports,this);(function(e,t){function n(){}e.EventEmitter=n;n.prototype.on=function(e,n){if(!this.$events){this.$events={}}if(!this.$events[e]){this.$events[e]=n}else if(t.util.isArray(this.$events[e])){this.$events[e].push(n)}else{this.$events[e]=[this.$events[e],n]}return this};n.prototype.addListener=n.prototype.on;n.prototype.once=function(e,t){function r(){n.removeListener(e,r);t.apply(this,arguments)}var n=this;r.listener=t;this.on(e,r);return this};n.prototype.removeListener=function(e,n){if(this.$events&&this.$events[e]){var r=this.$events[e];if(t.util.isArray(r)){var i=-1;for(var s=0,o=r.length;s<o;s++){if(r[s]===n||r[s].listener&&r[s].listener===n){i=s;break}}if(i<0){return this}r.splice(i,1);if(!r.length){delete this.$events[e]}}else if(r===n||r.listener&&r.listener===n){delete this.$events[e]}}return this};n.prototype.removeAllListeners=function(e){if(e===undefined){this.$events={};return this}if(this.$events&&this.$events[e]){this.$events[e]=null}return this};n.prototype.listeners=function(e){if(!this.$events){this.$events={}}if(!this.$events[e]){this.$events[e]=[]}if(!t.util.isArray(this.$events[e])){this.$events[e]=[this.$events[e]]}return this.$events[e]};n.prototype.emit=function(e){if(!this.$events){return false}var n=this.$events[e];if(!n){return false}var r=Array.prototype.slice.call(arguments,1);if("function"==typeof n){n.apply(this,r)}else if(t.util.isArray(n)){var i=n.slice();for(var s=0,o=i.length;s<o;s++){i[s].apply(this,r)}}else{return false}return true}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(exports,nativeJSON){"use strict";function f(e){return e<10?"0"+e:e}function date(e,t){return isFinite(e.valueOf())?e.getUTCFullYear()+"-"+f(e.getUTCMonth()+1)+"-"+f(e.getUTCDate())+"T"+f(e.getUTCHours())+":"+f(e.getUTCMinutes())+":"+f(e.getUTCSeconds())+"Z":null}function quote(e){escapable.lastIndex=0;return escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t==="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];if(a instanceof Date){a=date(e)}if(typeof rep==="function"){a=rep.call(t,e,a)}switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a){return"null"}gap+=indent;u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1){u[n]=str(n,a)||"null"}i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]";gap=o;return i}if(rep&&typeof rep==="object"){s=rep.length;for(n=0;n<s;n+=1){if(typeof rep[n]==="string"){r=rep[n];i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}else{for(r in a){if(Object.prototype.hasOwnProperty.call(a,r)){i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}";gap=o;return i}}if(nativeJSON&&nativeJSON.parse){return exports.JSON={parse:nativeJSON.parse,stringify:nativeJSON.stringify}}var JSON=exports.JSON={};var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;JSON.stringify=function(e,t,n){var r;gap="";indent="";if(typeof n==="number"){for(r=0;r<n;r+=1){indent+=" "}}else if(typeof n==="string"){indent=n}rep=t;if(t&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":e})};JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i==="object"){for(n in i){if(Object.prototype.hasOwnProperty.call(i,n)){r=walk(i,n);if(r!==undefined){i[n]=r}else{delete i[n]}}}}return reviver.call(e,t,i)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}})("undefined"!=typeof io?io:module.exports,typeof JSON!=="undefined"?JSON:undefined);(function(e,t){var n=e.parser={};var r=n.packets=["disconnect","connect","heartbeat","message","json","event","ack","error","noop"];var i=n.reasons=["transport not supported","client not handshaken","unauthorized"];var s=n.advice=["reconnect"];var o=t.JSON,u=t.util.indexOf;n.encodePacket=function(e){var t=u(r,e.type),n=e.id||"",a=e.endpoint||"",f=e.ack,l=null;switch(e.type){case"error":var c=e.reason?u(i,e.reason):"",h=e.advice?u(s,e.advice):"";if(c!==""||h!=="")l=c+(h!==""?"+"+h:"");break;case"message":if(e.data!=="")l=e.data;break;case"event":var p={name:e.name};if(e.args&&e.args.length){p.args=e.args}l=o.stringify(p);break;case"json":l=o.stringify(e.data);break;case"connect":if(e.qs)l=e.qs;break;case"ack":l=e.ackId+(e.args&&e.args.length?"+"+o.stringify(e.args):"");break}var d=[t,n+(f=="data"?"+":""),a];if(l!==null&&l!==undefined)d.push(l);return d.join(":")};n.encodePayload=function(e){var t="";if(e.length==1)return e[0];for(var n=0,r=e.length;n<r;n++){var i=e[n];t+="?"+i.length+"?"+e[n]}return t};var a=/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;n.decodePacket=function(e){var t=e.match(a);if(!t)return{};var n=t[2]||"",e=t[5]||"",u={type:r[t[1]],endpoint:t[4]||""};if(n){u.id=n;if(t[3])u.ack="data";else u.ack=true}switch(u.type){case"error":var t=e.split("+");u.reason=i[t[0]]||"";u.advice=s[t[1]]||"";break;case"message":u.data=e||"";break;case"event":try{var f=o.parse(e);u.name=f.name;u.args=f.args}catch(l){}u.args=u.args||[];break;case"json":try{u.data=o.parse(e)}catch(l){}break;case"connect":u.qs=e||"";break;case"ack":var t=e.match(/^([0-9]+)(\+)?(.*)/);if(t){u.ackId=t[1];u.args=[];if(t[3]){try{u.args=t[3]?o.parse(t[3]):[]}catch(l){}}}break;case"disconnect":case"heartbeat":break}return u};n.decodePayload=function(e){if(e.charAt(0)=="?"){var t=[];for(var r=1,i="";r<e.length;r++){if(e.charAt(r)=="?"){t.push(n.decodePacket(e.substr(r+1).substr(0,i)));r+=Number(i)+1;i=""}else{i+=e.charAt(r)}}return t}else{return[n.decodePacket(e)]}}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(e,t){function n(e,t){this.socket=e;this.sessid=t}e.Transport=n;t.util.mixin(n,t.EventEmitter);n.prototype.heartbeats=function(){return true};n.prototype.onData=function(e){this.clearCloseTimeout();if(this.socket.connected||this.socket.connecting||this.socket.reconnecting){this.setCloseTimeout()}if(e!==""){var n=t.parser.decodePayload(e);if(n&&n.length){for(var r=0,i=n.length;r<i;r++){this.onPacket(n[r])}}}return this};n.prototype.onPacket=function(e){this.socket.setHeartbeatTimeout();if(e.type=="heartbeat"){return this.onHeartbeat()}if(e.type=="connect"&&e.endpoint==""){this.onConnect()}if(e.type=="error"&&e.advice=="reconnect"){this.isOpen=false}this.socket.onPacket(e);return this};n.prototype.setCloseTimeout=function(){if(!this.closeTimeout){var e=this;this.closeTimeout=setTimeout(function(){e.onDisconnect()},this.socket.closeTimeout)}};n.prototype.onDisconnect=function(){if(this.isOpen)this.close();this.clearTimeouts();this.socket.onDisconnect();return this};n.prototype.onConnect=function(){this.socket.onConnect();return this};n.prototype.clearCloseTimeout=function(){if(this.closeTimeout){clearTimeout(this.closeTimeout);this.closeTimeout=null}};n.prototype.clearTimeouts=function(){this.clearCloseTimeout();if(this.reopenTimeout){clearTimeout(this.reopenTimeout)}};n.prototype.packet=function(e){this.send(t.parser.encodePacket(e))};n.prototype.onHeartbeat=function(e){this.packet({type:"heartbeat"})};n.prototype.onOpen=function(){this.isOpen=true;this.clearCloseTimeout();this.socket.onOpen()};n.prototype.onClose=function(){var e=this;this.isOpen=false;this.socket.onClose();this.onDisconnect()};n.prototype.prepareUrl=function(){var e=this.socket.options;return this.scheme()+"://"+e.host+":"+e.port+"/"+e.resource+"/"+t.protocol+"/"+this.name+"/"+this.sessid};n.prototype.ready=function(e,t){t.call(this)}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(e,t,n){function r(e){this.options={port:80,secure:false,document:"document"in n?document:false,resource:"socket.io",transports:t.transports,"connect timeout":1e4,"try multiple transports":true,reconnect:true,"reconnection delay":500,"reconnection limit":Infinity,"reopen delay":3e3,"max reconnection attempts":10,"sync disconnect on unload":false,"auto connect":true,"flash policy port":10843,manualFlush:false};t.util.merge(this.options,e);this.connected=false;this.open=false;this.connecting=false;this.reconnecting=false;this.namespaces={};this.buffer=[];this.doBuffer=false;if(this.options["sync disconnect on unload"]&&(!this.isXDomain()||t.util.ua.hasCORS)){var r=this;t.util.on(n,"beforeunload",function(){r.disconnectSync()},false)}if(this.options["auto connect"]){this.connect()}}function i(){}e.Socket=r;t.util.mixin(r,t.EventEmitter);r.prototype.of=function(e){if(!this.namespaces[e]){this.namespaces[e]=new t.SocketNamespace(this,e);if(e!==""){this.namespaces[e].packet({type:"connect"})}}return this.namespaces[e]};r.prototype.publish=function(){this.emit.apply(this,arguments);var e;for(var t in this.namespaces){if(this.namespaces.hasOwnProperty(t)){e=this.of(t);e.$emit.apply(e,arguments)}}};r.prototype.handshake=function(e){function s(t){if(t instanceof Error){n.connecting=false;n.onError(t.message)}else{e.apply(null,t.split(":"))}}var n=this,r=this.options;var o=["http"+(r.secure?"s":"")+":/",r.host+":"+r.port,r.resource,t.protocol,t.util.query(this.options.query,"t="+ +(new Date))].join("/");if(this.isXDomain()&&!t.util.ua.hasCORS){var u=document.getElementsByTagName("script")[0],a=document.createElement("script");a.src=o+"&jsonp="+t.j.length;u.parentNode.insertBefore(a,u);t.j.push(function(e){s(e);a.parentNode.removeChild(a)})}else{var f=t.util.request();f.open("GET",o,true);if(this.isXDomain()){f.withCredentials=true}f.onreadystatechange=function(){if(f.readyState==4){f.onreadystatechange=i;if(f.status==200){s(f.responseText)}else if(f.status==403){n.onError(f.responseText)}else{n.connecting=false;!n.reconnecting&&n.onError(f.responseText)}}};f.send(null)}};r.prototype.getTransport=function(e){var n=e||this.transports,r;for(var i=0,s;s=n[i];i++){if(t.Transport[s]&&t.Transport[s].check(this)&&(!this.isXDomain()||t.Transport[s].xdomainCheck(this))){return new t.Transport[s](this,this.sessionid)}}return null};r.prototype.connect=function(e){if(this.connecting){return this}var n=this;n.connecting=true;this.handshake(function(r,i,s,o){function u(e){if(n.transport)n.transport.clearTimeouts();n.transport=n.getTransport(e);if(!n.transport)return n.publish("connect_failed");n.transport.ready(n,function(){n.connecting=true;n.publish("connecting",n.transport.name);n.transport.open();if(n.options["connect timeout"]){n.connectTimeoutTimer=setTimeout(function(){if(!n.connected){n.connecting=false;if(n.options["try multiple transports"]){var e=n.transports;while(e.length>0&&e.splice(0,1)[0]!=n.transport.name){}if(e.length){u(e)}else{n.publish("connect_failed")}}}},n.options["connect timeout"])}})}n.sessionid=r;n.closeTimeout=s*1e3;n.heartbeatTimeout=i*1e3;if(!n.transports)n.transports=n.origTransports=o?t.util.intersect(o.split(","),n.options.transports):n.options.transports;n.setHeartbeatTimeout();u(n.transports);n.once("connect",function(){clearTimeout(n.connectTimeoutTimer);e&&typeof e=="function"&&e()})});return this};r.prototype.setHeartbeatTimeout=function(){clearTimeout(this.heartbeatTimeoutTimer);if(this.transport&&!this.transport.heartbeats())return;var e=this;this.heartbeatTimeoutTimer=setTimeout(function(){e.transport.onClose()},this.heartbeatTimeout)};r.prototype.packet=function(e){if(this.connected&&!this.doBuffer){this.transport.packet(e)}else{this.buffer.push(e)}return this};r.prototype.setBuffer=function(e){this.doBuffer=e;if(!e&&this.connected&&this.buffer.length){if(!this.options["manualFlush"]){this.flushBuffer()}}};r.prototype.flushBuffer=function(){this.transport.payload(this.buffer);this.buffer=[]};r.prototype.disconnect=function(){if(this.connected||this.connecting){if(this.open){this.of("").packet({type:"disconnect"})}this.onDisconnect("booted")}return this};r.prototype.disconnectSync=function(){var e=t.util.request();var n=["http"+(this.options.secure?"s":"")+":/",this.options.host+":"+this.options.port,this.options.resource,t.protocol,"",this.sessionid].join("/")+"/?disconnect=1";e.open("GET",n,false);e.send(null);this.onDisconnect("booted")};r.prototype.isXDomain=function(){var e=n.location.port||("https:"==n.location.protocol?443:80);return this.options.host!==n.location.hostname||this.options.port!=e};r.prototype.onConnect=function(){if(!this.connected){this.connected=true;this.connecting=false;if(!this.doBuffer){this.setBuffer(false)}this.emit("connect")}};r.prototype.onOpen=function(){this.open=true};r.prototype.onClose=function(){this.open=false;clearTimeout(this.heartbeatTimeoutTimer)};r.prototype.onPacket=function(e){this.of(e.endpoint).onPacket(e)};r.prototype.onError=function(e){if(e&&e.advice){if(e.advice==="reconnect"&&(this.connected||this.connecting)){this.disconnect();if(this.options.reconnect){this.reconnect()}}}this.publish("error",e&&e.reason?e.reason:e)};r.prototype.onDisconnect=function(e){var t=this.connected,n=this.connecting;this.connected=false;this.connecting=false;this.open=false;if(t||n){this.transport.close();this.transport.clearTimeouts();if(t){this.publish("disconnect",e);if("booted"!=e&&this.options.reconnect&&!this.reconnecting){this.reconnect()}}}};r.prototype.reconnect=function(){function i(){if(e.connected){for(var t in e.namespaces){if(e.namespaces.hasOwnProperty(t)&&""!==t){e.namespaces[t].packet({type:"connect"})}}e.publish("reconnect",e.transport.name,e.reconnectionAttempts)}clearTimeout(e.reconnectionTimer);e.removeListener("connect_failed",s);e.removeListener("connect",s);e.reconnecting=false;delete e.reconnectionAttempts;delete e.reconnectionDelay;delete e.reconnectionTimer;delete e.redoTransports;e.options["try multiple transports"]=n}function s(){if(!e.reconnecting){return}if(e.connected){return i()}if(e.connecting&&e.reconnecting){return e.reconnectionTimer=setTimeout(s,1e3)}if(e.reconnectionAttempts++>=t){if(!e.redoTransports){e.on("connect_failed",s);e.options["try multiple transports"]=true;e.transports=e.origTransports;e.transport=e.getTransport();e.redoTransports=true;e.connect()}else{e.publish("reconnect_failed");i()}}else{if(e.reconnectionDelay<r){e.reconnectionDelay*=2}e.connect();e.publish("reconnecting",e.reconnectionDelay,e.reconnectionAttempts);e.reconnectionTimer=setTimeout(s,e.reconnectionDelay)}}this.reconnecting=true;this.reconnectionAttempts=0;this.reconnectionDelay=this.options["reconnection delay"];var e=this,t=this.options["max reconnection attempts"],n=this.options["try multiple transports"],r=this.options["reconnection limit"];this.options["try multiple transports"]=false;this.reconnectionTimer=setTimeout(s,this.reconnectionDelay);this.on("connect",s)}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);(function(e,t){function n(e,t){this.socket=e;this.name=t||"";this.flags={};this.json=new r(this,"json");this.ackPackets=0;this.acks={}}function r(e,t){this.namespace=e;this.name=t}e.SocketNamespace=n;t.util.mixin(n,t.EventEmitter);n.prototype.$emit=t.EventEmitter.prototype.emit;n.prototype.of=function(){return this.socket.of.apply(this.socket,arguments)};n.prototype.packet=function(e){e.endpoint=this.name;this.socket.packet(e);this.flags={};return this};n.prototype.send=function(e,t){var n={type:this.flags.json?"json":"message",data:e};if("function"==typeof t){n.id=++this.ackPackets;n.ack=true;this.acks[n.id]=t}return this.packet(n)};n.prototype.emit=function(e){var t=Array.prototype.slice.call(arguments,1),n=t[t.length-1],r={type:"event",name:e};if("function"==typeof n){r.id=++this.ackPackets;r.ack="data";this.acks[r.id]=n;t=t.slice(0,t.length-1)}r.args=t;return this.packet(r)};n.prototype.disconnect=function(){if(this.name===""){this.socket.disconnect()}else{this.packet({type:"disconnect"});this.$emit("disconnect")}return this};n.prototype.onPacket=function(e){function r(){n.packet({type:"ack",args:t.util.toArray(arguments),ackId:e.id})}var n=this;switch(e.type){case"connect":this.$emit("connect");break;case"disconnect":if(this.name===""){this.socket.onDisconnect(e.reason||"booted")}else{this.$emit("disconnect",e.reason)}break;case"message":case"json":var i=["message",e.data];if(e.ack=="data"){i.push(r)}else if(e.ack){this.packet({type:"ack",ackId:e.id})}this.$emit.apply(this,i);break;case"event":var i=[e.name].concat(e.args);if(e.ack=="data")i.push(r);this.$emit.apply(this,i);break;case"ack":if(this.acks[e.ackId]){this.acks[e.ackId].apply(this,e.args);delete this.acks[e.ackId]}break;case"error":if(e.advice){this.socket.onError(e)}else{if(e.reason=="unauthorized"){this.$emit("connect_failed",e.reason)}else{this.$emit("error",e.reason)}}break}};r.prototype.send=function(){this.namespace.flags[this.name]=true;this.namespace.send.apply(this.namespace,arguments)};r.prototype.emit=function(){this.namespace.flags[this.name]=true;this.namespace.emit.apply(this.namespace,arguments)}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(e,t,n){function r(e){t.Transport.apply(this,arguments)}e.websocket=r;t.util.inherit(r,t.Transport);r.prototype.name="websocket";r.prototype.open=function(){var e=t.util.query(this.socket.options.query),r=this,i;if(!i){i=n.MozWebSocket||n.WebSocket}this.websocket=new i(this.prepareUrl()+e);this.websocket.onopen=function(){r.onOpen();r.socket.setBuffer(false)};this.websocket.onmessage=function(e){r.onData(e.data)};this.websocket.onclose=function(){r.onClose();r.socket.setBuffer(true)};this.websocket.onerror=function(e){r.onError(e)};return this};if(t.util.ua.iDevice){r.prototype.send=function(e){var t=this;setTimeout(function(){t.websocket.send(e)},0);return this}}else{r.prototype.send=function(e){this.websocket.send(e);return this}}r.prototype.payload=function(e){for(var t=0,n=e.length;t<n;t++){this.packet(e[t])}return this};r.prototype.close=function(){this.websocket.close();return this};r.prototype.onError=function(e){this.socket.onError(e)};r.prototype.scheme=function(){return this.socket.options.secure?"wss":"ws"};r.check=function(){return"WebSocket"in n&&!("__addTask"in WebSocket)||"MozWebSocket"in n};r.xdomainCheck=function(){return true};t.transports.push("websocket")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);(function(e,t,n){function r(e){if(!e)return;t.Transport.apply(this,arguments);this.sendBuffer=[]}function i(){}e.XHR=r;t.util.inherit(r,t.Transport);r.prototype.open=function(){this.socket.setBuffer(false);this.onOpen();this.get();this.setCloseTimeout();return this};r.prototype.payload=function(e){var n=[];for(var r=0,i=e.length;r<i;r++){n.push(t.parser.encodePacket(e[r]))}this.send(t.parser.encodePayload(n))};r.prototype.send=function(e){this.post(e);return this};r.prototype.post=function(e){function r(){if(this.readyState==4){this.onreadystatechange=i;t.posting=false;if(this.status==200){t.socket.setBuffer(false)}else{t.onClose()}}}function s(){this.onload=i;t.socket.setBuffer(false)}var t=this;this.socket.setBuffer(true);this.sendXHR=this.request("POST");if(n.XDomainRequest&&this.sendXHR instanceof XDomainRequest){this.sendXHR.onload=this.sendXHR.onerror=s}else{this.sendXHR.onreadystatechange=r}this.sendXHR.send(e)};r.prototype.close=function(){this.onClose();return this};r.prototype.request=function(e){var n=t.util.request(this.socket.isXDomain()),r=t.util.query(this.socket.options.query,"t="+ +(new Date));n.open(e||"GET",this.prepareUrl()+r,true);if(e=="POST"){try{if(n.setRequestHeader){n.setRequestHeader("Content-type","text/plain;charset=UTF-8")}else{n.contentType="text/plain"}}catch(i){}}return n};r.prototype.scheme=function(){return this.socket.options.secure?"https":"http"};r.check=function(e,r){try{var i=t.util.request(r),s=n.XDomainRequest&&i instanceof XDomainRequest,o=e&&e.options&&e.options.secure?"https:":"http:",u=n.location&&o!=n.location.protocol;if(i&&!(s&&u)){return true}}catch(a){}return false};r.xdomainCheck=function(e){return r.check(e,true)}})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);(function(e,t){function n(e){t.Transport.XHR.apply(this,arguments)}e.htmlfile=n;t.util.inherit(n,t.Transport.XHR);n.prototype.name="htmlfile";n.prototype.get=function(){this.doc=new(window[["Active"].concat("Object").join("X")])("htmlfile");this.doc.open();this.doc.write("<html></html>");this.doc.close();this.doc.parentWindow.s=this;var e=this.doc.createElement("div");e.className="socketio";this.doc.body.appendChild(e);this.iframe=this.doc.createElement("iframe");e.appendChild(this.iframe);var n=this,r=t.util.query(this.socket.options.query,"t="+ +(new Date));this.iframe.src=this.prepareUrl()+r;t.util.on(window,"unload",function(){n.destroy()})};n.prototype._=function(e,t){e=e.replace(/\\\//g,"/");this.onData(e);try{var n=t.getElementsByTagName("script")[0];n.parentNode.removeChild(n)}catch(r){}};n.prototype.destroy=function(){if(this.iframe){try{this.iframe.src="about:blank"}catch(e){}this.doc=null;this.iframe.parentNode.removeChild(this.iframe);this.iframe=null;CollectGarbage()}};n.prototype.close=function(){this.destroy();return t.Transport.XHR.prototype.close.call(this)};n.check=function(e){if(typeof window!="undefined"&&["Active"].concat("Object").join("X")in window){try{var n=new(window[["Active"].concat("Object").join("X")])("htmlfile");return n&&t.Transport.XHR.check(e)}catch(r){}}return false};n.xdomainCheck=function(){return false};t.transports.push("htmlfile")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(e,t,n){function r(){t.Transport.XHR.apply(this,arguments)}function i(){}e["xhr-polling"]=r;t.util.inherit(r,t.Transport.XHR);t.util.merge(r,t.Transport.XHR);r.prototype.name="xhr-polling";r.prototype.heartbeats=function(){return false};r.prototype.open=function(){var e=this;t.Transport.XHR.prototype.open.call(e);return false};r.prototype.get=function(){function t(){if(this.readyState==4){this.onreadystatechange=i;if(this.status==200){e.onData(this.responseText);e.get()}else{e.onClose()}}}function r(){this.onload=i;this.onerror=i;e.retryCounter=1;e.onData(this.responseText);e.get()}function s(){e.retryCounter++;if(!e.retryCounter||e.retryCounter>3){e.onClose()}else{e.get()}}if(!this.isOpen)return;var e=this;this.xhr=this.request();if(n.XDomainRequest&&this.xhr instanceof XDomainRequest){this.xhr.onload=r;this.xhr.onerror=s}else{this.xhr.onreadystatechange=t}this.xhr.send(null)};r.prototype.onClose=function(){t.Transport.XHR.prototype.onClose.call(this);if(this.xhr){this.xhr.onreadystatechange=this.xhr.onload=this.xhr.onerror=i;try{this.xhr.abort()}catch(e){}this.xhr=null}};r.prototype.ready=function(e,n){var r=this;t.util.defer(function(){n.call(r)})};t.transports.push("xhr-polling")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);(function(e,t,n){function i(e){t.Transport["xhr-polling"].apply(this,arguments);this.index=t.j.length;var n=this;t.j.push(function(e){n._(e)})}var r=n.document&&"MozAppearance"in n.document.documentElement.style;e["jsonp-polling"]=i;t.util.inherit(i,t.Transport["xhr-polling"]);i.prototype.name="jsonp-polling";i.prototype.post=function(e){function a(){f();n.socket.setBuffer(false)}function f(){if(n.iframe){n.form.removeChild(n.iframe)}try{u=document.createElement('<iframe name="'+n.iframeId+'">')}catch(e){u=document.createElement("iframe");u.name=n.iframeId}u.id=n.iframeId;n.form.appendChild(u);n.iframe=u}var n=this,r=t.util.query(this.socket.options.query,"t="+ +(new Date)+"&i="+this.index);if(!this.form){var i=document.createElement("form"),s=document.createElement("textarea"),o=this.iframeId="socketio_iframe_"+this.index,u;i.className="socketio";i.style.position="absolute";i.style.top="0px";i.style.left="0px";i.style.display="none";i.target=o;i.method="POST";i.setAttribute("accept-charset","utf-8");s.name="d";i.appendChild(s);document.body.appendChild(i);this.form=i;this.area=s}this.form.action=this.prepareUrl()+r;f();this.area.value=t.JSON.stringify(e);try{this.form.submit()}catch(l){}if(this.iframe.attachEvent){u.onreadystatechange=function(){if(n.iframe.readyState=="complete"){a()}}}else{this.iframe.onload=a}this.socket.setBuffer(true)};i.prototype.get=function(){var e=this,n=document.createElement("script"),i=t.util.query(this.socket.options.query,"t="+ +(new Date)+"&i="+this.index);if(this.script){this.script.parentNode.removeChild(this.script);this.script=null}n.async=true;n.src=this.prepareUrl()+i;n.onerror=function(){e.onClose()};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(n,s);this.script=n;if(r){setTimeout(function(){var e=document.createElement("iframe");document.body.appendChild(e);document.body.removeChild(e)},100)}};i.prototype._=function(e){this.onData(e);if(this.isOpen){this.get()}return this};i.prototype.ready=function(e,n){var i=this;if(!r)return n.call(this);t.util.load(function(){n.call(i)})};i.check=function(){return"document"in n};i.xdomainCheck=function(){return true};t.transports.push("jsonp-polling")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);if(typeof define==="function"&&define.amd){define([],function(){return io})}})();

var Paper = (function(socket){
/*
	socket.emit('publish',{
		title: 'Socket publish',
		url: 'Ima-link',
		body: 'azazaza'
	}, function(link){
		alert(link);
	})
	*/
	
	var Post = (function(){
	
		function get(data, fn){
			if(data.id.length){
				
				socket.emit('getPost', data, function(err, post){
					if(err) throw err;
					
					if(fn && typeof(fn) === 'function'){
						fn(post);
					}				
				});			
			} else {
				throw new Error().message = 'Paper.Post.get - enter post id';
			}
		};
		
		function publish(data, fn){
			if(data){
				
				socket.emit('publish', data, function(err, link){
					if(err){ throw err }
					if(fn && typeof(fn) === 'function'){
						fn(link);
					}
				});
				
			} else {
				throw new Error().message = 'Paper.Post.publish - enter post data';
			}
		}
		
		return {
			get: get,
			publish: publish
		}
	
	}())
	
	return {
		Post: Post
	}
	
}(io.connect('http://localhost:2020')))