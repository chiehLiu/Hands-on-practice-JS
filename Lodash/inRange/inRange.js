function inRange(value, start = 0, end) {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return value >= Math.min(start, end) && value < Math.max(start, end);
}

module.exports = inRange;


// Why do we swap bounds if start > end?
// Because the function should work regardless of the order of the bounds.


// How Default Parameters Work in JavaScript?
// Default parameters allow us to specify a default value for a function parameter right in the function declaration.
// if the caller does not provide a value for that parameter, the default value is used.
// otherwise, the provided value is used.


// Time complexity is O(1), as it’s a simple comparison.

