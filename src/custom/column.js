function column(start, end) {
  var padding = 5;
  var b = padding / 2;
  var center = Math.floor(end / 2);
  var left;
  var right;

  if (start === 1) {
    left = 0;
  } else if (start === end) {
    right = 0;
  }

  if (end === 2) {
    if (start === 1) {
      right = b;
    } else {
      left  = b;
    }
  } else if (end === 3) {
    if (start === 1) {
      right = b;
    } else if (start === 2) {
      right = b * (end - start);
      left  = b * (end - start);
    } else {
      left = b;
    }
  } else {
    if (start === 1) {
      // start
      right = b * (end - 1);
    } else if (start === end) {
      // end
      left  = b * start;
    } else if (start === center && end % 2 !== 0) {
      // center
      left = b * start;
      right = b * start;
    } else {
      left  = b * start;
      right = b * (end - start);
    }
  }

  return {
    left : left,
    right : right
  };
}
