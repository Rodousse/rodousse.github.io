var vertexShaderText =
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
'varying vec3 fragColor;',
'varying highp float fAltitude;',
'varying float fDepth;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'uniform  float fTime;',
'',
'float pnoise(vec3 P, vec3 rep);',
'float cnoise(vec3 P);',
'vec3 mod289(vec3 x)',
'{',
'    return x - floor(x * (1.0 / 289.0)) * 289.0;',
'}',
'',
'vec4 mod289(vec4 x)',
'{',
'    return x - floor(x * (1.0 / 289.0)) * 289.0;',
'}',
'',
'vec4 permute(vec4 x)',
'{',
'    return mod289(((x*34.0)+1.0)*x);',
'}',
'',
'vec4 taylorInvSqrt(vec4 r)',
'{',
'    return 1.79284291400159 - 0.85373472095314 * r;',
'}',
'',
'vec3 fade(vec3 t) {',
'    return t*t*t*(t*(t*6.0-15.0)+10.0);',
'}',
'float cnoise(vec3 P)',
'{',
'    vec3 Pi0 = floor(P); // Integer part for indexing',
'    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1',
'    Pi0 = mod289(Pi0);',
'    Pi1 = mod289(Pi1);',
'    vec3 Pf0 = fract(P); // Fractional part for interpolation',
'    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0',
'    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);',
'    vec4 iy = vec4(Pi0.yy, Pi1.yy);',
'    vec4 iz0 = Pi0.zzzz;',
'    vec4 iz1 = Pi1.zzzz;',
'',
'    vec4 ixy = permute(permute(ix) + iy);',
'    vec4 ixy0 = permute(ixy + iz0);',
'    vec4 ixy1 = permute(ixy + iz1);',
'',
'    vec4 gx0 = ixy0 * (1.0 / 7.0);',
'    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;',
'    gx0 = fract(gx0);',
'    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);',
'    vec4 sz0 = step(gz0, vec4(0.0));',
'    gx0 -= sz0 * (step(0.0, gx0) - 0.5);',
'    gy0 -= sz0 * (step(0.0, gy0) - 0.5);',
'',
'    vec4 gx1 = ixy1 * (1.0 / 7.0);',
'    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;',
'    gx1 = fract(gx1);',
'    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);',
'    vec4 sz1 = step(gz1, vec4(0.0));',
'    gx1 -= sz1 * (step(0.0, gx1) - 0.5);',
'    gy1 -= sz1 * (step(0.0, gy1) - 0.5);',
'',
'    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);',
'    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);',
'    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);',
'    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);',
'    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);',
'    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);',
'    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);',
'    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);',
'',
'    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));',
'    g000 *= norm0.x;',
'    g010 *= norm0.y;',
'    g100 *= norm0.z;',
'    g110 *= norm0.w;',
'    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));',
'    g001 *= norm1.x;',
'    g011 *= norm1.y;',
'    g101 *= norm1.z;',
'    g111 *= norm1.w;',
'',
'    float n000 = dot(g000, Pf0);',
'    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));',
'    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));',
'    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));',
'    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));',
'    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));',
'    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));',
'    float n111 = dot(g111, Pf1);',
'',
'    vec3 fade_xyz = fade(Pf0);',
'    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);',
'    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);',
'    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); ',
'    return 2.2 * n_xyz;',
'}',

'void main()',
'{',
'  ',
//'  vec3 vertexPosition = vec3(vertPosition.x, cnoise(vertPosition*(sin(vertPosition.x-vertPosition.z +fTime)/2.0)*cos(vertPosition.x)  )/3.0 /*sin(vertPosition.x+vertPosition.z +fTime)*/, vertPosition.z );',
'  vec3 vertexPosition = vec3(vertPosition.x, (sin(vertPosition.x-((sin(fTime)+1.0)/8.0)*vertPosition.z + vertPosition.z/5.0 +fTime)/1.4 + cos((vertPosition.x+vertPosition.z+ fTime)+ 1.0)/4.0 )/3.0 +cnoise(vertPosition)/7.0 , vertPosition.z );',

'  gl_Position = mProj * mView * mWorld * vec4(vertexPosition, 1.0);',
'  fAltitude = vertexPosition.y ;',
'  fDepth = gl_Position.z / 5.0;',
'}'
// Classic Perlin noise



].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying float fAltitude;',
'uniform  float fTime;',
'varying float fDepth;',
'void main()',
'{',
'  gl_FragColor = vec4(0.4,0.4,0.4, 1.0);//mix(vec4(0,0.2080, 0.5,1.0), vec4(0.0,0.4, 0.8,1.0), fAltitude*2.0);',
'}'
].join('\n');

var gl;

var InitDemo = function () {
  var canvas = document.getElementById('game-surface');
  gl = canvas.getContext('webgl');

  if (!gl) {
    console.log('WebGL not supported, falling back on experimental-webgl');
    gl = canvas.getContext('experimental-webgl');
  }

  if (!gl) {
    alert('Your browser does not support WebGL');
  }

  gl.clearColor(0.75, 0.85, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);

  //
  // Create shaders
  //
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
    return;
  }

  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
    return;
  }

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('ERROR linking program!', gl.getProgramInfoLog(program));
    return;
  }
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('ERROR validating program!', gl.getProgramInfoLog(program));
    return;
  }

  //
  // Create buffer
  //
  var nbVertexPlaneLength = 200;
  var boxVertices = initSquarePlaneVertices(nbVertexPlaneLength, 30);


  var boxIndices =initSquarePlaneIndex(nbVertexPlaneLength);



  var boxVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

  var boxIndexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);

  var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
  gl.vertexAttribPointer(
    positionAttribLocation, // Attribute location
    3, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE,
    3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 // Offset from the beginning of a single vertex to this attribute
  );

  gl.enableVertexAttribArray(positionAttribLocation);

  // Tell OpenGL state machine which program should be active.
  gl.useProgram(program);

  var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
  var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
  var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
  var fTimeUniformLocation = gl.getUniformLocation(program, 'fTime');

  var worldMatrix = new Float32Array(16);
  var viewMatrix = new Float32Array(16);
  var projMatrix = new Float32Array(16);
  mat4.identity(worldMatrix);
  //mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
  //mat4.lookAt(viewMatrix, [0, 5, 0], [0, 0, 0], [0, 0, 1]);
  mat4.lookAt(viewMatrix, [0, 2, -5], [0, 0, 0], [0, 1, 0.4]);
  mat4.perspective(projMatrix, glMatrix.toRadian(60), canvas.width / canvas.height, 0.1, 1000.0);

  gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
  gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
  gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
  var time = new Date();
  gl.uniform1f(fTimeUniformLocation, 0.0);

  var xRotationMatrix = new Float32Array(16);
  var yRotationMatrix = new Float32Array(16);

  //
  // Main render loop
  //
  var identityMatrix = new Float32Array(16);
  mat4.identity(identityMatrix);
  var angle = 0;
  mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
  mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
  var launchTime = new Date();
  var loop = function () {
    canvas = $("#game-surface");
    resizeCanvasToDisplaySize(gl.canvas)
    mat4.perspective(projMatrix, glMatrix.toRadian(60), gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 1000.0);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
    gl.viewport(0, 0, gl.canvas.clientWidth , gl.canvas.clientHeight);
    var currentTime = new Date();

    var deltaTime = (currentTime - launchTime)/1000;
    angle = performance.now() / 1000 / 6 * 2 * Math.PI;
    //mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
    //mat4.rotate(xRotationMatrix, identityMatrix, angle , [1, 0, 0]);
    mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniform1f(fTimeUniformLocation, deltaTime);

    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    gl.drawElements( gl.LINES/*gl.TRIANGLES*/,  boxIndices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
};

function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth  = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  const needResize = canvas.width  !== displayWidth ||
                     canvas.height !== displayHeight;
 
  if (needResize) {
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
 
  return needResize;
}

var initSquarePlaneVertices = function(nbVertices, sideLength){

  //nbVertices = Math.pow( 2, Math.round( Math.log( nbVertices ) / Math.log( 2 ) ) ) ;// find the nearest power of two
  var vertices = [];
  var nbLineVertices = Math.sqrt(nbVertices);
  for(var i = 0; i < nbVertices; i++){
    for(var j = 0; j<nbVertices; j++){

      vertices.push((i * sideLength/nbVertices)-sideLength/2 , 0, (j*sideLength/nbVertices) - sideLength/2); // Vertices position
    }

  }

  return vertices;

}

var initSquarePlaneIndex = function(nbVertices){
  //nbVertices = Math.pow( 2, Math.round( Math.log( nbVertices ) / Math.log( 2 ) ) ) ;
  var index = [];
  var nbLineVertices = Math.sqrt(nbVertices);
  for(var i = 0; i < nbVertices-1; i++){
    for(var j = 0; j< nbVertices-1; j++){

      index.push((i*nbVertices) + j , (i*nbVertices)+(j + 1), ((i+1)*nbVertices)+j);
      index.push((i*nbVertices) + j+1, ((i+1)*nbVertices)+(j+1), ((i+1)*nbVertices)+j);
    }

  }
  return index;
}
