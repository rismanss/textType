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
    data: ['align','heading','bold','italic','underline','font','link','image'],
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
            } else if (data == 'image') {
              var modalImg = document.getElementsByTagName("body")
                [0].appendChild(document.createElement("div"));
              modalImg.id = 'modal';

              var alertImg = modalImg.appendChild(document.createElement("div"));
              alertImg.id = "alertBoxImg";

              var h1 = alertImg.appendChild(document.createElement("h1"));
              h1.appendChild(document.createTextNode("Insert Link or Path Image"));

              var msg = alertImg.appendChild(document.createElement("input"));
              msg.className = 'inputLink';
              msg.placeholder = 'insert link or Path Image';

              var okbtn = alertImg.appendChild(document.createElement("a"));
              okbtn.id = "okBtn";
              okbtn.appendChild(document.createTextNode("ok"));
              okbtn.href = "#";

              var closebtn = alertImg.appendChild(document.createElement("a"));
              closebtn.id = "closeBtn";
              closebtn.appendChild(document.createTextNode("close"));
              closebtn.href = "#";

              closebtn.onclick = function() {
                removeCustomAlert();
                return false;
              }
              msg.focus();
              msg.value = 'http://placekitten.com/200/300';

              okbtn.onclick = function() {
                editor.focus();
                document.execCommand(
                  'insertHTML', 
                  false, 
                  '<img src="'+msg.value+'" class="img">'
                );
                // ======== for edit resize ========
                var resize = document.getElementsByClassName('img');
                var resizing = document.querySelector('.img');
                var current = document.getElementsByClassName("imgActive");
                var tooltip = document.createElement('span');
                var tooltipclass = document.getElementsByClassName('tooltip');

                var floatRight = document.createElement('button');
                var floatLeft = document.createElement('button');
                var imgSmall = document.createElement('button');
                var imgMedium = document.createElement('button');
                var imgFull = document.createElement('button');
                imgFull.appendChild(document.createTextNode('100%'));
                imgMedium.appendChild(document.createTextNode('50%'));
                imgSmall.appendChild(document.createTextNode('25%'));
                floatRight.className = 'fa fa-align-right tooltipButon';
                floatLeft.className = 'fa fa-align-left tooltipButon';
                imgSmall.className = 'tooltipButon';
                imgMedium.className = 'tooltipButon';
                imgFull.className = 'tooltipButon';
                tooltip.appendChild(imgFull);
                tooltip.appendChild(imgMedium);
                tooltip.appendChild(imgSmall);
                tooltip.appendChild(floatLeft);
                tooltip.appendChild(floatRight);

                for (var i = 0; i < resize.length; i++) {
                  resize[i].addEventListener("click", function() {
                    if (current.length > 0) { 
                      current[0].className = current[0].className.replace(" imgActive", "");
                    }
                    this.className += " imgActive";
                  });
                  editor.onclick = function(e){
                    if (current.length > 0 && tooltipclass.length > 0) {
                      if(e.target.className != 'img imgActive') {
                        removeSelectImage();
                      }
                    }
                  }
                }
                imgFull.onclick = function () {
                  resizing.style.width = '100%';
                  removeSelectImage();
                }
                imgMedium.onclick = function () {
                  resizing.style.width = '50%';
                  removeSelectImage();
                }
                imgSmall.onclick = function () {
                  resizing.style.width = '25%';
                  removeSelectImage();
                }
                floatLeft.onclick = function () {
                  resizing.style.float = 'left';
                  removeSelectImage();
                }
                floatRight.onclick = function () {
                  resizing.style.float = 'right';
                  removeSelectImage();
                }
                resizing.onclick = function () {
                  makeTooltip();
                  if (tooltipclass.length > 1) {
                    tooltipclass[0].classList.replace('tooltip', 'tooltipActive');
                  }
                }
                function removeSelectImage () {
                  tooltipclass[0].classList.replace('tooltip', 'tooltipActive');
                  current[0].classList.remove('imgActive');
                }
                function makeTooltip() {
                  tooltip.style.top = resizing.offsetTop - 50+'px';
                  tooltip.style.left = resizing.offsetLeft + (resizing.width / 2) - 130 +'px';
                  tooltip.className = 'tooltip';
                  tooltip.contentEditable = 'false';
                  selector.appendChild(tooltip);
                }
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