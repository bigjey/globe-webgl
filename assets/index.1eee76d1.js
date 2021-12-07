import{W as S,P as T,S as P,G as N,g as D,V as A,a as h,b as y,T as u,M as w,A as V,B as _,c as F,d as z,F as C,e as L,C as U}from"./vendor.0cd9e4cf.js";const j=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerpolicy&&(e.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?e.credentials="include":r.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(r){if(r.ep)return;r.ep=!0;const e=o(r);fetch(r.href,e)}};j();var k=`varying vec2 vertexUV;\r
varying vec3 vertexNormal;\r
\r
uniform sampler2D globeHeightTexture;\r
\r
\r
void main() {\r
    float displacementScale = 0.05;\r
    float displacement = texture2D(globeHeightTexture, uv).r * displacementScale;\r
\r
    vertexUV = uv;\r
    vertexNormal = normalize(normalMatrix * normalize(normal));\r
    \r
    vec4 pos = vec4( position, 1.0 );\r
\r
    vec4 displacedPosition = pos + vec4(normal * displacement, 0);\r
    \r
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * displacedPosition;\r
}`,G=`varying vec2 vertexUV;\r
varying vec3 vertexNormal;\r
\r
uniform sampler2D globeTextureDay;\r
uniform sampler2D globeTextureNight;\r
uniform float time;\r
\r
void main() {\r
    float atmosphereIntencity = 0.8;\r
    vec3 colorDay = texture2D(globeTextureDay, vertexUV).rgb;\r
    vec3 colorNight = texture2D(globeTextureNight, vertexUV).rgb;\r
\r
    vec3 sun = normalize(vec3(cos(time), sin(time), sin(time)));\r
    float dayPercentage = max(0.0, dot(vertexNormal, sun));\r
\r
    vec3 color = mix(colorNight, colorDay, dayPercentage);\r
\r
    //float atmosphere = 1.0 - dot(vertexNormal, vec3(0, 0, 1));    \r
    //color += vec3(0.4, 0.6, 1) * atmosphere * atmosphereIntencity;\r
    gl_FragColor = vec4(color, 1);\r
}`,H=`varying vec2 vertexUV;\r
varying vec3 vertexNormal;\r
\r
uniform sampler2D globeHeightTexture;\r
\r
\r
void main() {\r
    float displacementScale = 0.1;\r
    float displacement = texture2D(globeHeightTexture, uv).r * displacementScale;\r
\r
    vertexUV = uv;\r
    vertexNormal = normalize(normalMatrix * normal);\r
    \r
    vec4 pos = vec4( position, 1.0 );\r
\r
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * pos;\r
\r
    return;\r
\r
    vec4 displacedPosition = pos + vec4(normal * displacement, 0);\r
    \r
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * displacedPosition;\r
}`,I=`varying vec2 vertexUV;\r
varying vec3 vertexNormal;\r
\r
uniform sampler2D globeTexture;\r
uniform sampler2D globeHeightTexture;\r
\r
void main() {\r
    float atmosphereIntencity = 2.0;\r
    \r
    vec3 color = vec3(0.4, 0.6, 1);\r
\r
    float atmosphere = dot(vertexNormal, vec3(0, 0, -1));\r
    \r
    gl_FragColor = vec4(color * atmosphere * 2.5, 1);\r
}`;const l=window.innerWidth,v=window.innerHeight,g=2.1,p=new S({canvas:document.querySelector("canvas"),antialias:!0});p.setPixelRatio(window.devicePixelRatio);p.setSize(l,v);const B=75,q=l/v,c=new T(B,q,.1,1e3);c.position.z=g;const m=new P,f=new N;m.add(f);const i=new U;i.start();const x=R();f.add(x);const E=W();m.add(E);const O=K();m.add(O);const d={x:0,y:0};document.addEventListener("mousemove",function(t){d.x=t.clientX/l*2-1,d.y=t.pageY/v*2-1});window.requestAnimationFrame(function t(){window.requestAnimationFrame(t),i.getDelta(),x.rotation.y+=.004,c.position.x=Math.cos(i.elapsedTime*.01)*g,c.position.z=Math.sin(i.elapsedTime*.01)*g,D.to(f.rotation,{y:d.x*Math.PI,z:-d.y*(Math.PI/2),duration:1}),c.lookAt(new A(0,0,0)),x.material.uniforms.time.value=i.elapsedTime,p.render(m,c)});function R(){const t=new h(1,256,256),n=new y({vertexShader:k,fragmentShader:G,uniforms:{globeTextureDay:{value:new u().load("./img/8k_earth_daymap.jpg")},globeTextureNight:{value:new u().load("./img/8k_earth_nightmap.jpg")},globeHeightTexture:{value:new u().load("./img/8081_earthbump4k.jpg")},time:{value:i.elapsedTime}}});return new w(t,n)}function W(){const t=new h(1,16,16),n=new y({vertexShader:H,fragmentShader:I,blending:V,side:_}),o=new w(t,n);return o.scale.set(1.2,1.2,1.2),o}function K(){const t=new F,n=new z({color:16777215}),o=5e3,a=new Array(o*3);for(let e=0;e<o;e++){const s=(Math.random()-.5)*l,b=(Math.random()-.5)*l,M=(Math.random()-.5)*2e3;a[e*3+0]=s,a[e*3+1]=b,a[e*3+2]=M}return t.setAttribute("position",new C(a,3)),new L(t,n)}
