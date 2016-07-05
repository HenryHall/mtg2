window.projectLibrary = (function () {
    function Library (els) {

      for(var i = 0; i < els.length; i++ ) {
        this[i] = els[i];
    }
    this.length = els.length;
    }

    var projectLibrary = {

      get: function (selector) {
        var els;
        if (typeof selector === "string") {//If string, gather all elements
            els = document.querySelectorAll(selector);
        } else if (selector.length) {//If it has a length, its a NodeList
            els = selector;
        } else {//Otherwise, single element
            els = [selector];
        }
        return new Library(els);
      }
    };

    return projectLibrary;
}());
