import{W as S,P,S as T,G as A,g as N,V as D,a as f,b as x,T as h,M as w,A as V,B as F,c as C,d as z,F as H,e as L,C as G}from"./vendor.0cd9e4cf.js";const I=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerpolicy&&(e.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?e.credentials="include":r.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(r){if(r.ep)return;r.ep=!0;const e=o(r);fetch(r.href,e)}};I();var U=`varying vec2 vertexUV;\r
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
}`,_=`varying vec2 vertexUV;\r
varying vec3 vertexNormal;\r
\r
uniform sampler2D globeTexture;\r
uniform sampler2D globeHeightTexture;\r
\r
void main() {\r
    float atmosphereIntencity = 0.8;\r
    vec3 color = texture2D(globeTexture, vertexUV).rgb;\r
    float atmosphere = 1.0 - dot(vertexNormal, vec3(0, 0, 1));\r
    \r
    color += vec3(0.4, 0.6, 1) * atmosphere * atmosphereIntencity;\r
    gl_FragColor = vec4(color, 1);\r
}`,j=`varying vec2 vertexUV;\r
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
}`,k=`varying vec2 vertexUV;\r
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
    float atmosphere = pow(dot(vertexNormal, vec3(0, 0, -1)), 1.0);\r
    \r
    gl_FragColor = vec4(color * atmosphere * 2.5, 1);\r
}`;const s=window.innerWidth,u=window.innerHeight,v=2.5,g=new S({canvas:document.querySelector("canvas"),antialias:!0});g.setPixelRatio(window.devicePixelRatio);g.setSize(s,u);const B=75,q=s/u,c=new P(B,q,.1,1e3);c.position.z=v;const l=new T,p=new A;l.add(p);const m=new G;m.start();const y=R();p.add(y);const E=W();l.add(E);const O=K();l.add(O);const d={x:0,y:0};document.addEventListener("mousemove",function(n){d.x=n.clientX/s*2-1,d.y=n.pageY/u*2-1});window.requestAnimationFrame(function n(){window.requestAnimationFrame(n),m.getDelta(),y.rotation.y+=.001,c.position.x=Math.cos(m.elapsedTime*.01)*v,c.position.z=Math.sin(m.elapsedTime*.01)*v,N.to(p.rotation,{y:d.x*Math.PI,z:-d.y*(Math.PI/2),duration:1}),c.lookAt(new D(0,0,0)),g.render(l,c)});function R(){const n=new f(1,256,256),t=new x({vertexShader:U,fragmentShader:_,uniforms:{globeTexture:{value:new h().load("./img/globe-texture.jpg")},globeHeightTexture:{value:new h().load("./img/8081_earthbump4k.jpg")}}});return new w(n,t)}function W(){const n=new f(1,32,32),t=new x({vertexShader:j,fragmentShader:k,blending:V,side:F}),o=new w(n,t);return o.scale.set(1.2,1.2,1.2),o}function K(){const n=new C,t=new z({color:16777215}),o=1e4,a=new Array(o*3);for(let e=0;e<o;e++){const i=(Math.random()-.5)*s,b=(Math.random()-.5)*s,M=(Math.random()-.5)*2e3;a[e*3+0]=i,a[e*3+1]=b,a[e*3+2]=M}return n.setAttribute("position",new H(a,3)),new L(n,t)}
