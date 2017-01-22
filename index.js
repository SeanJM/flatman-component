function getSelectorObject(a){var b=a.match(/\.[a-zA-Z0-9\-\_]+/g),c=a.match(/\#[a-zA-Z0-9\-\_]+/),d=a.match(/\[[^\]]+?\]/g),e=a.match(/^[a-zA-Z0-9\-\_]+/),f={tagName:!!e&&e[0],attributes:{}};return b&&(f.attributes.className=b.map(function(a){return a.slice(1)})),c&&(f.attributes.id=c[0].slice(1)),d&&d.forEach(function(a){var b=a.match(/\[([a-zA-Z0-9\-\_]+)(?:(\*|\^|\$|)=([^\]]+?)\]|)/);b[1]="class"===b[1]?"className":b[1],b[3]=!!b[3]&&b[3].slice(1,-1),b[2]?"*"===b[2]?f.attributes[b[1]]=new RegExp(b[3]):"^"===b[2]?f.attributes[b[1]]=new RegExp("^"+b[3]):"$"===b[2]&&(f.attributes[b[1]]=new RegExp(b[3]+"$")):b[3]?f.attributes[b[1]]=new RegExp("^"+b[3]+"$"):f.attributes[b[1]]=new RegExp(".+")}),f}function Component(){}Component.lib={},Component.function={},Component.create=function(a){function b(b){Component.function[a]=b}function c(b){function c(a){return function(b){a.call(this,b)}}function d(a){return function(){for(var c,d=0,e=arguments.length,f=new Array(e);d<e;d++)f[d]=arguments[d];return c=b[a].apply(this,f)}}var e=[],f=function(){};for(var g in b)b.hasOwnProperty(g)&&(e.push(g),"constructor"===g&&(f=c(b[g])));for(h in b)"append"===h?f.prototype.append=Component.facade.append(b[h]):"constructor"!==h&&(f.prototype[h]=d(h));for(var h in Component.prototype)"undefined"==typeof f.prototype[h]&&(f.prototype[h]=Component.prototype[h]);return Component.lib[a]=f,f}if(Component.lib[a]||Component.function[a])throw"Cannot create Component function: duplicate name '"+a+"'";return"function"==typeof arguments[1]?b(arguments[1]):c(arguments[1])},Component.extend=function(){function a(a){"function"==typeof a.prototype.append&&(a.prototype.append=Component.facade.append(a.prototype.append)),"function"==typeof a.prototype.remove&&(a.prototype.remove=Component.facade.remove(a.prototype.remove));for(var b in Component.prototype)"undefined"==typeof a.prototype[b]&&(a.prototype[b]=Component.prototype[b])}for(var b=0,c=arguments.length;b<c;b++)a(arguments[b])},Component.facade=function(a){if(!Array.isArray(a))throw"Invalid argument for Component.facade. The argument must be an array of methods.";a.forEach(function(a){Component.prototype[a]||(Component.prototype[a]=Component.facade.method(a))})},Component.facade.append=function(a){return function(b){return a.call(this,b),this.mapChildrenToNode(b),this}},Component.facade.method=function(a){return function(){for(var b,c=0,d=arguments.length,e=new Array(d),f=this.node.document;c<d;c++)e[c]=arguments[c];return b=f[a].apply(f,e),"undefined"==typeof b?this:b}},Component.prototype.after=function(a){var b=this.parentComponent.childNodes;return"undefined"==typeof a?b[b.indexOf(a)+1]:(this.node.document.after(a),b.splice(b.indexOf(this)+1,0,a),this)},Component.prototype.append=function(a){return this.mapChildrenToNode(a),this.node.document.append(a),this},Component.prototype.closest=function(a){var b=this.parentComponent;if(!Component.lib[a])return this.node.document.closest(a);for(a=Component.lib[a];b;){if(b instanceof a)return b;b=b.parentComponent}return!1},Component.prototype.disable=function(){return this.node.document.disable(),this.node.document.childNodes.forEach(function(a){a.disable()}),this},Component.prototype.enable=function(){return this.node.document.enable(),this.node.document.childNodes.forEach(function(a){a.enable()}),this},Component.prototype.mapChildrenToNode=function(a){var b=this;return a.forEach(function(a){var c=a.name&&a.name();c&&(b.node[c]=a)}),this},Component.prototype.mount=function(){function a(a){a.trigger("mount"),a.node.document&&a.node.document.trigger("mount")}a(this)},Component.prototype.off=function(a,b){var c=this;return"undefined"==typeof this.subscribers&&(this.subscribers={}),a.toLowerCase().split(",").forEach(function(a){var d;if(a=a.trim(),"undefined"!=typeof c.subscribers[a]){for(d=c.subscribers[a].indexOf(b);d!==-1;)c.subscribers[a].splice(d,1),d=c.subscribers[a].indexOf(b);if("undefined"==typeof b)for(;c.subscribers[a].length;)c.subscribers[a].shift()}}),this},Component.prototype.on=function(a,b){var c=this;return"undefined"==typeof this.subscribers&&(this.subscribers={}),a.toLowerCase().split(",").forEach(function(a){a=a.trim(),a.length&&("undefined"==typeof c.subscribers[a]&&(c.subscribers[a]=[]),c.subscribers[a].indexOf(b)===-1&&c.subscribers[a].push(b))}),this},Component.prototype.once=function(a,b){function c(e){b.call(d,e),d.off(a,c)}var d=this;return this.on(a,c),this},Component.prototype.prepend=function(a){var b=this;return this.childNodes=this.childNodes||[],this.mapChildrenToNode(a),this.node.document.prepend(a),[].shift.apply(this.childNodes,a),a.forEach(function(a){a.parentComponent=b,b.childNodes.push(a)}),this},Component.prototype.trigger=function(){function a(a){var b=a.split(","),d=[];for(i=0,n=b.length;i<n;i++)b[i]=b[i].trim(),b[i].length&&c.subscribers[b[i]]&&d.push(b[i]);return d}var b,c=this,d=arguments[0],e=arguments[1];return this.subscribers=this.subscribers||{},"string"==typeof d?(b=a(d.toLowerCase()),e=e||{target:this}):(b=a(e.type.toLowerCase()),e.target=e.target||this),b.forEach(function(a){c.subscribers[a].slice().forEach(function(b){var d=Object.assign({},e,{type:a});b.call(c,d)})}),this},"object"==typeof module&&module.exports&&(module.exports=Component);