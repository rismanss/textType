/*
*   textType.js
*   (c) 2016 by Kamarul Risman
*/
;(function(global){
  "use strict";
  var textType = function(opts) {
    // return constructor
    return new textType.init(opts);
  }

  // Set All the Default Values
  textType.defaults = {
    selector : '',
    color: '',
    data: ['bold','italic','underline','JustifyLeft','JustifyCenter','JustifyRight'],
    font: ["Times New Roman","Arial","Ubuntu","Courier New"],
    heading: ['H1','H2','H3','H4','H5']
  }

  // constructor of textType
  textType.init = function(opts) {
    this.options = Object.assign(textType.defaults , opts);
    var selector = document.querySelector(this.options.selector);

    // build element html for text editor
    selector.className = 'main-wrapper';
    var title = document.createElement('div');
    var titleText = document.createTextNode('textType');
    title.className = 'title';
    var menu = document.createElement('div');
    menu.className = 'menu';
    var ul = document.createElement('ul');
    title.appendChild(titleText);
    menu.appendChild(ul);

    // return data array in data textType.default.data/this.options.data
    this.options.data.map((data) => {
      var li = document.createElement('li');
      var button = document.createElement('button');
      var node = document.createTextNode(data);
      
      ul.appendChild(li);
      li.appendChild(button);
      button.appendChild(node);

      // func onclick for edit font
      button.onclick = function() {
        // getselection function "bold","italic","underline","left","center","right"
        if (data) {
          // bold text
          document.execCommand(data, false, null);
          // Set design mode to off
          document.designMode = "off";
        } 
      };
    });

    // getSelection func font family
    var uli = document.createElement('li');
    var selectFont = document.createElement('select');
    this.options.font.map((f) => {
      var opt = document.createElement('option');
      selectFont.value = f;
      opt.style.fontFamily = f;
      
      selectFont.onclick = function() {
        document.execCommand('fontName', false, selectFont.value);
        document.designMode = "off";
      }

      var optText = document.createTextNode(f);
      opt.appendChild(optText);
      selectFont.appendChild(opt);
    });
    ul.appendChild(uli);
    uli.appendChild(selectFont);

    // getSelection func for font heading
    var liSize = document.createElement('li');
    var selectSize = document.createElement('select');
    this.options.heading.map((h) => {
      var opt = document.createElement('option');
      selectSize.value = h;
      opt.className = h;

      selectSize.onclick = function() {
        document.execCommand('formatBlock', false, '<'+selectSize.value+'>');
        document.designMode = "off";
      }
      
      var optText = document.createTextNode(h);
      opt.appendChild(optText);
      selectSize.appendChild(opt);
    });
    ul.appendChild(liSize);
    liSize.appendChild(selectSize);

    // footer element
    var mainBody = document.createElement('div');
    mainBody.className = 'main-body';
    var editor = document.createElement('div');
    editor.className = 'editor';
    editor.contentEditable = "true";

    selector.appendChild(title);
    selector.appendChild(menu);
    mainBody.appendChild(editor);
    selector.appendChild(mainBody);

    // set color on textType.default
    selector.style.background = this.options.color;
  }


  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    // Set for module
    module.exports = textType;
  } else {
    // Set for global name in browser
    global.textType = textType;
  }
})(window);