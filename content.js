'use strict';

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
  var elements = document.getElementsByTagName('*');

  for(var i=0; i < elements.length; i++) {
    var element = elements[i];

    for(var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];

      if(node.nodeType === 3) {
        var text = node.nodeValue;
        var replacedText = text.replace(/(CEO)|(AKI\w+)|(arn:aws:[\w\/\.-_: ]+)|(demetrius johnson)|(123 main st)|(720-555-1234)|(zip code)|(state)|(\w+@\w+\.com)/gi, 'XXXXXXXXXXXX');
        if(replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
          element.classList.add('arn-blue')
        }
      }
    }
  }
});

// Register the element root you want to look for changes
observer.observe(document, {
  subtree: true,
  attributes: true
});
