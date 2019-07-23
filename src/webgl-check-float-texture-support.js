// This file can be required in NodeJS or directly included in a browser

// This contains a single function for retrieving whether or not the current browser supports WebGL float textures
// Taken and adapted from :
// https://www.khronos.org/registry/webgl/conformance-suites/1.0.0/conformance/oes-texture-float.html


(function() {

    let WebGLFloatTextureSupport = {
        check: () => {

            function create3DContext(canvas, attributes)
            {
                if (!canvas)
                    canvas = document.createElement("canvas");
                var context = null;
                try {
                    context = canvas.getContext("webgl", attributes);
                } catch(e) {}
                if (!context) {
                    try {
                        context = canvas.getContext("experimental-webgl", attributes);
                    } catch(e) {}
                }
                if (!context) {
                    throw "Unable to fetch WebGL rendering context for Canvas";
                }
                return context;
            }


            function allocateTexture()
            {
                let texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                if (gl.getError() !== gl.NO_ERROR)
                    return null;
                return texture;
            }


            let canvas = document.createElement("canvas");
            let gl = create3DContext(canvas);

            let extensionEnabled = gl.getExtension("OES_texture_float");

            if (extensionEnabled) {

                let texture = allocateTexture();
                if (!texture) return false;
                let width = 2;
                let height = 2;
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.FLOAT, null);
                if (gl.getError() !== gl.NO_ERROR)
                    return false;
                // glErrorShouldBe(gl, gl.NO_ERROR, "floating-point texture allocation should succeed if OES_texture_float is enabled");

                // Use this texture as a render target.
                let fbo = gl.createFramebuffer();
                gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
                gl.bindTexture(gl.TEXTURE_2D, null);
                // shouldBe("gl.checkFramebufferStatus(gl.FRAMEBUFFER)", "gl.FRAMEBUFFER_COMPLETE");
                // While strictly speaking it is probably legal for a WebGL implementation to support
                // floating-point textures but not as attachments to framebuffer objects, any such
                // implementation is so poor that it arguably should not advertise support for the
                // OES_texture_float extension. For this reason the conformance test requires that the
                // framebuffer is complete here.
                return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;

            } else {
                return false;
            }

        }
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
        module.exports = WebGLFloatTextureSupport;
    }else{
        window.WebGLFloatTextureSupport = WebGLFloatTextureSupport;
    }
})();