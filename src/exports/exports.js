if (typeof window === 'object') {
  window.Component = Component;
} else if (typeof module === 'object' && module.exports) {
  module.exports = Component;
}
