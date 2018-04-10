// 'use strict';
//
// const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
//
// const MutationOptions = {
//   childList: true
// };
//
// var observer = new MutationObserver(function(mutations, observer) {
//   console.log('observer here!!!!');
//   var elements2 = document.getElementsByTagName('iframe[id^=\'xdm\']');
//   console.log(elements2);
//   var elements = document.getElementsByTagName('*');
//   for(var i=0; i < elements.length; i++) {
//     var element = elements[i];
//
//     for(var j = 0; j < element.childNodes.length; j++) {
//       var node = element.childNodes[j];
//
//       if(node.nodeType === 3) {
//         var text = node.nodeValue;
//         var replacedText = text.replace(/(Twitter)|(AKI\w+)|(arn:aws:[\w\/\.-_: ]+)|(demetrius johnson)|(123 main st)|(720-555-1234)|(zip code)|(state)|(\w+@\w+\.com)/gi, 'XXXXXXXXXXXX');
//         if(replacedText !== text) {
//           element.replaceChild(document.createTextNode(replacedText), node);
//           element.classList.add('arn-blue')
//         }
//       }
//     }
//   }
// });
//
// // Register the element root you want to look for changes
// observer.observe(document, MutationOptions);

'use strict';

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var myIframes = {};
var observer = new MutationObserver(function(mutations, observer) {
  var myIframes = [];
  for(var i=0; i< mutations.length; i++){
    // console.log('i: ',i);
    if(mutations[i].type === 'childList'){
      var temp = mutations[i].target.querySelectorAll('iframe[id^=\'xdm\']');
      if(temp.length > 0){
        temp.forEach(thing => {
          var reema = thing.contentDocument.getElementsByTagName('h2');
          console.log('h2s: ', reema);
          // var frank = thing.contentDocument.getElementsByClassName('TwitterCard-title');
          var frank = thing.contentDocument.querySelectorAll('h2[class=\'TwitterCard-title\']');
          if(!frank[0]){ console.log('undefined? ', frank, temp)}
          else{
            console.log('title: ',frank[0].innerHTML);
          }
          if(!myIframes[thing.id]){
            myIframes[thing.id] = thing;
            // console.log(thing);
          }
        })
        // myIframes[temp.toString()] = temp;
      }
    }
  }
  // if(myIframes.length){

    // console.log('iframes: ', myIframes);
  // }

  var elements = document.getElementsByTagName('*');

  for(var i=0; i < elements.length; i++) {
    var element = elements[i];

    for(var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];

      if(node.nodeType === 3) {
        var text = node.nodeValue;
        var replacedText = text.replace(/(Twitter)|(AKI\w+)|(arn:aws:[\w\/\.-_: ]+)|(demetrius johnson)|(123 main st)|(720-555-1234)|(zip code)|(state)|(\w+@\w+\.com)/gi, 'XXXXXXXXXXXX');
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
  childList: true,
  subtree: true
});
