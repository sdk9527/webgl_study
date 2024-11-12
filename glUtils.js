/**
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} type
 * @param {string} source
 */
function createShader(gl, type, source) {
  // 创建 shader 对象
  let shader = gl.createShader(type);
  // 往 shader 中传入源代码
  gl.shaderSource(shader, source);
  // 编译 shader
  gl.compileShader(shader);
  // 判断 shader 是否编译成功
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  // 如果编译失败，则打印错误信息
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

/**
 *
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragmentShader
 */
function createProgram(gl, vertexShader, fragmentShader) {
  // 创建 program 对象
  let program = gl.createProgram();
  // 往 program 对象中传入 WebGLShader 对象
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  // 链接 program
  gl.linkProgram(program);
  // 判断 program 是否链接成功
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  // 如果 program 链接失败，则打印错误信息
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

/**
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} vertexSource
 * @param {string} fragmentSource
 */
function initWebGL(gl, vertexSource, fragmentSource) {
  // 根据源代码创建顶点着色器
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  // 根据源代码创建片元着色器
  let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  // 创建 WebGLProgram 程序
  let program = createProgram(gl, vertexShader, fragmentShader);
  return program;
}
/**
 *
 * @param {WebGLRenderingContext} gl
 */
function createTexture(gl) {
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // 这告诉WebGL如果纹理需要被缩小时，采用线性插值的方式来进行采样
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // 这告诉WebGL如果纹理需要被方法时，采用线性插值的方式来进行采样
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  // 告诉WebGL如果纹理坐标超出了s坐标的最大/最小值，直接取边界值
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  // 告诉WebGL如果纹理坐标超出了t坐标的最大/最小值，直接取边界值
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  // gl.generateMipmap(gl.TEXTURE_2D);
  return texture;
}
