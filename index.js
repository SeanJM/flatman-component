function Component(){}Component.lib={},Component.function={},Component.onCreateListeners=[],Component.create=function(a){function b(b){Component.function[a]=b}function c(b){function c(a){return function(b){a.call(this,b)}}function d(a){return function(){for(var c=0,d=arguments.length,e=new Array(d);c<d;c++)e[c]=arguments[c];return b[a].apply(this,e)}}var e=[],f=function(){},g={};for(var h in b)b.hasOwnProperty(h)&&(e.push(h),"constructor"===h&&(f=c(b[h])));for(i in b)"append"===i?f.prototype.append=Component.facade.append(b[i]):"constructor"!==i&&(f.prototype[i]=d(i));for(var i in Component.prototype)void 0===f.prototype[i]&&(f.prototype[i]=Component.prototype[i]);return Component.lib[a]=f,g={name:a,constructor:f},Component.onCreateListeners.forEach(function(a){a(g)}),f}if(Component.lib[a]||Component.function[a])throw"Cannot create Component function: duplicate name '"+a+"'";return"function"==typeof arguments[1]?b(arguments[1]):c(arguments[1])},Component.facade=function(a){if(!Array.isArray(a))throw"Invalid argument for Component.facade. The argument must be an array of methods.";a.forEach(function(a){Component.prototype[a]||(Component.prototype[a]=Component.facade.method(a))})},Component.facade.append=function(a){return function(b){return b=Array.isArray(b)?b:[b],a.call(this,b),this.mapChildrenToNode(b),this}},Component.facade.method=function(a){return function(){for(var b,c=0,d=arguments.length,e=new Array(d),f=this.node.document;c<d;c++)e[c]=arguments[c];return b=f[a].apply(f,e),void 0===b?this:b}},Component.find=function(a){var b=[];for(var c in Component.lib)a.test(c)&&b.push(c);return b},Component.off=function(a,b){function c(a,b){var c=Component.subscribers[a];c.splice(c.indexOf(b),1)}a=a.toLowerCase().split(",");for(var d=0,e=a.length;d<e;d++)if(a[d]=a[d].trim(),a[d].length&&b)c(a[d],b);else for(;Component.subscribers[a[d]].length;)c(a[d],Component.subscribers[a[d]][0]);return Component},Component.onCreate=function(a){return Component.onCreateListeners.push(a),Component},Component.trigger=function(){var a,b,c=Component.subscribers;return"string"==typeof arguments[0]?(a=arguments[0],b=arguments[1]||{}):(a=arguments[0].type,b=arguments[0]),a=a.toLowerCase().split(","),Component.node.disabled||a.forEach(function(a){a=a.trim(),a.length&&c[a]&&c[a].forEach(function(c){c(Object.assign({},b,{type:a}))})}),Component},Component.prototype.after=function(a){var b=this.parentComponent.childNodes;return void 0===a?b[b.indexOf(a)+1]:(this.node.document.after(a),b.splice(b.indexOf(this)+1,0,a),this)},Component.prototype.append=function(a){return this.mapChildrenToNode(a),this.node.document.append(a),this},Component.prototype.closest=function(a){var b=this.parentComponent;if(!Component.lib[a])return this.node.document.closest(a);for(a=Component.lib[a];b;){if(b instanceof a)return b;b=b.parentComponent}return!1},Component.prototype.disable=function(){return this.node.document.disable(),this.node.document.childNodes.forEach(function(a){a.disable()}),this},Component.prototype.enable=function(){return this.node.document.enable(),this.node.document.childNodes.forEach(function(a){a.enable()}),this},Component.prototype.mapChildrenToNode=function(a){var b=this;return a=Array.isArray(a)?a:[a],a.forEach(function(a){var c=a.name&&a.name();c&&(b.node[c]=a)}),this},Component.prototype.mount=function(){function a(a){a.trigger("mount"),a.node.document&&a.node.document.trigger("mount")}a(this)},Component.prototype.off=function(a,b){var c=this;return void 0===this.subscribers&&(this.subscribers={}),a.toLowerCase().split(",").forEach(function(a){var d;if(a=a.trim(),void 0!==c.subscribers[a]){for(d=c.subscribers[a].indexOf(b);d!==-1;)c.subscribers[a].splice(d,1),d=c.subscribers[a].indexOf(b);if(void 0===b)for(;c.subscribers[a].length;)c.subscribers[a].shift()}}),this},Component.prototype.on=function(a,b){var c=this;return void 0===this.subscribers&&(this.subscribers={}),b&&a.toLowerCase().split(",").forEach(function(a){a=a.trim(),a.length&&(void 0===c.subscribers[a]&&(c.subscribers[a]=[]),c.subscribers[a].indexOf(b)===-1&&c.subscribers[a].push(b))}),this},Component.prototype.once=function(a,b){function c(e){b.call(d,e),d.off(a,c)}var d=this;return this.on(a,c),this},Component.prototype.prepend=function(a){var b=this;return this.childNodes=this.childNodes||[],this.mapChildrenToNode(a),this.node.document.prepend(a),[].shift.apply(this.childNodes,a),a.forEach(function(a){a.parentComponent=b,b.childNodes.push(a)}),this},Component.prototype.trigger=function(){function a(a){var b=a.split(","),d=[];for(i=0,n=b.length;i<n;i++)b[i]=b[i].trim(),b[i].length&&c.subscribers[b[i]]&&d.push(b[i]);return d}var b,c=this,d=arguments[0],e=arguments[1];return this.subscribers=this.subscribers||{},"string"==typeof d?(e=e||{},b=a(d.toLowerCase())):(e=arguments[0],b=a(e.type.toLowerCase())),b.forEach(function(a){c.subscribers[a].slice().forEach(function(a){a.call(c,e)})}),this},"object"==typeof module&&module.exports&&(module.exports=Component);