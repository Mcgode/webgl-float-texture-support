# webgl-float-texture-support

Most browsers today advertise the presence of the WebGL 1 float texture extension (known as 'OES_float_texture' extension),
but in reality don't support it, or support only very specific use cases only. Usually it is due to hardware limitations.
This module allows you to check the full support of WebGL 1 float textures extension. 


## Installation and usage

### Using NodeJS

Install with the folowing command
``` bash
npm install webgl-check-float-texture-support --save
```

You can then use the module any way you want to 
```javascript
// ES5 require
const WebGLFloatTextureSupport = require("webgl-float-texture-support");

// ES6 import
import WebGLFloatTextureSupport from "webgl-float-texture-support";

let floatTexturesSupported = WebGLFloatTextureSupport.check();

...
```

### For direct browser use

Copy the ```webgl-float-texture-support.js``` file to your script directory, then use the script in your page
```html
<body>
  <script src="./js/webgl-float-texture-support.js"></script>
  
  <script>
    let floatTexturesSupported = WebGLFloatTextureSupport.check();
    
    ...
  </script>
</body>
```
