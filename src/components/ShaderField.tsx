import { useEffect, useRef } from 'react';

// A slow, grainy mesh gradient drawn by one fragment shader, in the spirit of shadergradient.co
// without its three.js runtime. Rendered at half resolution: the picture is soft, so nobody sees it.
const VERTEX = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FRAGMENT = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec3 c1,c2,c3,bg;uniform vec2 f;
vec2 h(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.+2.*fract(sin(p)*43758.5453);}
float n(vec2 p){vec2 i=floor(p),q=fract(p);vec2 u=q*q*(3.-2.*q);
return mix(mix(dot(h(i),q),dot(h(i+vec2(1,0)),q-vec2(1,0)),u.x),mix(dot(h(i+vec2(0,1)),q-vec2(0,1)),dot(h(i+vec2(1,1)),q-vec2(1,1)),u.x),u.y);}
void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*1.4;float s=t*.05;
vec2 w=vec2(n(p+s),n(p+vec2(5.2,1.3)-s));float k=n(p+2.2*w+vec2(1.7,9.2)+s*.6);
float b=sin((uv.x*1.3+uv.y*.8+k*2.+s)*3.14159);
vec3 c=mix(c1,c2,smoothstep(-.9,.9,b));c=mix(c,c3,smoothstep(.2,.85,k+w.x*.6)*.85);
float g=smoothstep(1.15,.05,length((uv-f)*vec2(1.1,1.5)));c=mix(bg,c,g);
c+=(fract(sin(dot(gl_FragCoord.xy+fract(t),vec2(12.9898,78.233)))*43758.5453)-.5)*.06;
gl_FragColor=vec4(c,1.);}`;
const SCALE = 0.5;
const FRAME_MS = 1000 / 30;

type Rgb = [number, number, number];
const rgb = (hex: string): Rgb => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as Rgb;

interface Props {
  colors: [string, string, string];
  background: string;
  /** Where the colour pools, in 0..1 of the canvas (y up). */
  focus: [number, number];
  className?: string;
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

export function ShaderField({ colors, background, focus, className = 'shader-field' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const key = `${colors.join()}|${background}|${focus.join()}`;

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!canvas || !gl) return; // No WebGL: the section's CSS gradient stays as the background.
    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const at = gl.getAttribLocation(program, 'p');
    gl.enableVertexAttribArray(at);
    gl.vertexAttribPointer(at, 2, gl.FLOAT, false, 0, 0);
    const u = (name: string) => gl.getUniformLocation(program, name);
    colors.forEach((c, i) => gl.uniform3fv(u(`c${i + 1}`), rgb(c)));
    gl.uniform3fv(u('bg'), rgb(background));
    gl.uniform2fv(u('f'), focus);
    const res = u('r');
    const time = u('t');

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let last = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(res, canvas.width, canvas.height);
    };
    const draw = (now: number) => {
      gl.uniform1f(time, (now - start) / 1000 + 40);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const tick = (now: number) => {
      if (now - last >= FRAME_MS) {
        last = now;
        draw(now);
      }
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    resize();
    draw(start);
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !still && !frame) frame = requestAnimationFrame(tick);
    });
    io.observe(canvas);
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // key captures every input the shader reads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
