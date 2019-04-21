/*
*   textType.js
*   (c) 2019 by Kamarul Risman
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
    data: ['align','heading','bold','italic','underline','font','link'],
    font: ["Times New Roman","Arial","Ubuntu","Courier New"],
    heading: ['H1','H2','H3','H4','H5'],
    align: ['Left','Center','Right','Full']
  }

  // constructor of textType
  textType.init = function(opts) {
    this.options = Object.assign(textType.defaults , opts);
    var selector = document.querySelector(this.options.selector);

    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    head.appendChild(link);

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
      var select = document.createElement('select');
      switch (data) {
        case 'align':
          this.options.align.map((a) => {
            var opt = document.createElement('option');
            if (a == 'Center') {
              opt.innerHTML = '&#xf037; '+a;
            } else if (a == 'Left') {
              opt.innerHTML = '&#xf036; '+a;
            } else if (a == 'Right') {
              opt.innerHTML = '&#xf038; '+a;
            } else if (a == 'Full') {
              opt.innerHTML = '&#xf039; '+a;
            }
            opt.value = a;
            select.value = opt.value;

            select.onclick = function() {
              editor.focus();
              document.execCommand('Justify'+select.value, false, null);
              document.designMode = "off";
            }
            
            select.appendChild(opt);
          }); 
          ul.appendChild(li);
          li.appendChild(select);
          break;
        case 'font':
          this.options.font.map((f) => {
            var opt = document.createElement('option');
            select.value = f;
            opt.style.fontFamily = f;
            
            select.onclick = function() {
              editor.focus();
              document.execCommand('fontName', false, select.value);
              document.designMode = "off";
            }

            var optText = document.createTextNode(f);
            opt.appendChild(optText);
            select.appendChild(opt);
          });
          ul.appendChild(li);
          li.appendChild(select);
          break;
        case 'heading':
          this.options.heading.map((h) => {
            var opt = document.createElement('option');
            select.value = h;
            opt.className = h;

            select.onclick = function() {
              editor.focus();
              document.execCommand('formatBlock', false, '<'+select.value+'>');
              document.designMode = "off";
            }
            
            var optText = document.createTextNode(h);
            opt.appendChild(optText);
            select.appendChild(opt);
          });
          ul.appendChild(li);
          li.appendChild(select);
          break;
        default: 
          button.className = 'fa fa-'+data;  
          
          ul.appendChild(li);
          li.appendChild(button);

          // func onclick for edit font
          button.onclick = function() {
            if (data == 'link') {
              // for modal link
              var modal = document.getElementsByTagName("body")
                [0].appendChild(document.createElement("div"));
              modal.id = 'modal';

              var alertObj = modal.appendChild(document.createElement("div"));
              alertObj.id = "alertBox";

              var h1 = alertObj.appendChild(document.createElement("h1"));
              h1.appendChild(document.createTextNode("Insert Link"));

              var msg = alertObj.appendChild(document.createElement("input"));
              msg.className = 'inputLink';
              msg.placeholder = 'insert link';

              var displayLink = alertObj.appendChild(document.createElement("input"));
              displayLink.className = 'inputLink';
              displayLink.placeholder = 'display link';
              var sel = document.getSelection();
              displayLink.value = sel;

              var okbtn = alertObj.appendChild(document.createElement("a"));
              okbtn.id = "okBtn";
              okbtn.appendChild(document.createTextNode("ok"));
              okbtn.href = "#";

              var closebtn = alertObj.appendChild(document.createElement("a"));
              closebtn.id = "closeBtn";
              closebtn.appendChild(document.createTextNode("close"));
              closebtn.href = "#";

              editor.focus();
              const selected = sel.rangeCount > 0 ? sel.getRangeAt(0) : false;

              closebtn.onclick = function() {
                removeCustomAlert();
                return false;
              }

              okbtn.onclick = function() {
                editor.focus();
                document.getSelection().removeAllRanges();
                document.getSelection().addRange(selected);
                document.execCommand(
                  'insertHTML', 
                  false, 
                  '<a href="' + msg.value + '" target="_blank">' + displayLink.value + '</a>'
                );
                removeCustomAlert();
                return false; 
              }
              function removeCustomAlert() {
                document.getElementsByTagName("body")[0].removeChild(document.getElementById("modal"));
              }
            } else {
              editor.focus();
              // getselection function "bold","italic","underline"
              this.classList.toggle('active');
              // bold, underline, italic
              document.execCommand(data, false, null);
              // Set design mode to off
              document.designMode = "off";
            }
          };
      }
    });

    // body text element
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