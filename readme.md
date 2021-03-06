# textType

textType is simple text editor.

Demo [here](https://rismanss.github.io/textType/).

Download library [here](https://github.com/rismanss/textType/archive/master.zip).

Or you can install:

```javascript
npm i --save texttype
```

### example

Example using textType :

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>textType</title>
    <link type="text/css" rel="stylesheet" href="textType.css" />
  </head>
  <body>

    <div id="textType"></div>

    <script src="textType.js"></script>
    <script>
      textType({
        selector: '#textType',
      });
    </script>
  </body>
</html>
```

### Customization

Customization selector, data, font, heading, align .

```javascript
textType({
  selector : '#example',
  data: ['align','heading','bold','italic','underline','font','link','image'], // should be array
  font: ["Times New Roman","Arial","Ubuntu","Courier New","Verdana","fantasy"], // should be array
  heading: ['H1','H2','H3'], // should be array
  align: ['Left','Center','Right','Full']
});
```

selector : all selector (id, class, tag) .

data : ['align','heading','bold','italic','underline','font','link','image'] .

font : [all font] .

heading: ['H1','H2','H3','H4','H5'] .

align: ['Left','Center','Right','Full'] .

### License

This plugin is available under the [MIT License](https://opensource.org/licenses/MIT).
