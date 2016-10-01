Component.extend = function (Constructor) {
  if (!Constructor.prototype.addClass)
    Constructor.prototype.addClass = Component.prototype.addClass;
  if (!Constructor.prototype.append)
    Constructor.prototype.append = Component.prototype.append;
  if (!Constructor.prototype.appendTo)
    Constructor.prototype.appendTo = Component.prototype.appendTo;
  if (!Constructor.prototype.attr)
    Constructor.prototype.attr = Component.prototype.attr;
  if (!Constructor.prototype.column)
    Constructor.prototype.column = Component.prototype.column;
  if (!Constructor.prototype.mount)
    Constructor.prototype.mount = Component.prototype.mount;
  if (!Constructor.prototype.name)
    Constructor.prototype.name = Component.prototype.name;
  if (!Constructor.prototype.off)
    Constructor.prototype.off = Component.prototype.off;
  if (!Constructor.prototype.on)
    Constructor.prototype.on = Component.prototype.on;
  if (!Constructor.prototype.removeClass)
    Constructor.prototype.removeClass = Component.prototype.removeClass;
  if (!Constructor.prototype.style)
    Constructor.prototype.style = Component.prototype.style;
  if (!Constructor.prototype.target)
    Constructor.prototype.target = Component.prototype.target;
  if (!Constructor.prototype.trigger)
    Constructor.prototype.trigger = Component.prototype.trigger;
};
