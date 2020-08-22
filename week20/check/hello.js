var page = require('webpage').create();
page.open('http://baidu.com', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    var body = page.evaluate(function(){
        var toString = function(pad, element){
            var childrenString = '';
            for(var i=0; i<element.children.length; i++){
                childrenString += toString("   " + pad, element.children[i]) + '\n';
            }
            var name;
            if(element.nodyType === Node.TEXT_NODE){
                name = '#text' + JSON.stringify(element.textContent);

            }
            if(element.nodyType === Node.ELEMENT_NODE){
                name = element.tagName
            }
            return pad + element.tagName + (childrenString ? "\n" + childrenString : "" )
        }
        return toString('', document.body);
    });
    console.log(body);
  }
  phantom.exit();
});