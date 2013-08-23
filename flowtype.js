/*
* If you create a derivative, please leave this text intact:
*
* FlowType.JS 1.0
* Copyright (c) 2013, Simple Focus http://simplefocus.com/
*
* FlowType.JS by Simple Focus (http://simplefocus.com/)
* is licensed under the MIT License. Read a copy of the
* license in the LICENSE.txt file or at
* http://choosealicense.com/licenses/mit
*
* Thanks to Giovanni Difeterici (http://www.gdifeterici.com/)
*/
(function() {
  
  var defaults = {
    maximum   : 9999,
    minimum   : 1,
    maxFont   : 9999,
    minFont   : 1,
    fontRatio : 35,
    lineRatio : 1.45
  }
  
  var nodes = []
  var frame = null
  
  function flowtype( selector, settings ) {
    
    settings = settings || {}
    
    var nodeList = document.querySelectorAll( selector )
    var node, i = 0, options = {}
    
    for( var k in defaults ) {
      options[k] = settings[k] || defaults[k]
    }
    
    while( node = nodeList.item( i++ ) ) {
      nodes.push({
        element: node,
        options: options
      })
    }
    
    update()
    
  }
  
  function update() {
    
    var i = 0
    var node, element, options
    var width, fontBase, fontSize
    var elementWidth
    
    while( node = nodes[ i++ ] ) {
      
      element = node.element
      options = node.options
      
      elementWidth = element.getBoundingClientRect().width
      
      width = elementWidth > options.maximum ?
        options.maximum : elementWidth < options.minimum ?
          options.minimum : elementWidth
      
      fontBase = width / options.fontRatio
      
      fontSize = fontBase > options.maxFont ?
        options.maxFont : fontBase < options.minFont ?
          options.minFont : fontBase
      
      element.style.fontSize =
        fontSize + 'px'
      
      element.style.lineHeight =
        fontSize * options.lineRatio + 'px'
      
    }
    
  }
  
  window.addEventListener( 'resize', update )
  window.flowtype = flowtype
  
})()
