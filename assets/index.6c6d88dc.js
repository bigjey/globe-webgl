import{W as S,P as T,S as P,G as N,g as D,V as A,a as h,b as y,T as u,M as w,A as V,B as _,c as F,d as z,F as C,e as L,C as U}from"./vendor.0cd9e4cf.js";const j=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=r(t);fetch(t.href,e)}};j();var k=`varying vec2 vertexUV;
varying vec3 vertexNormal;

uniform sampler2D globeHeightTexture;


void main() {
    float displacementScale = 0.05;
    float displacement = texture2D(globeHeightTexture, uv).r * displacementScale;

    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normalize(normal));
    
    vec4 pos = vec4( position, 1.0 );

    vec4 displacedPosition = pos + vec4(normal * displacement, 0);
    
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * displacedPosition;
}`,G=`varying vec2 vertexUV;
varying vec3 vertexNormal;

uniform sampler2D globeTextureDay;
uniform sampler2D globeTextureNight;
uniform float time;

void main() {
    float atmosphereIntencity = 0.8;
    vec3 colorDay = texture2D(globeTextureDay, vertexUV).rgb;
    vec3 colorNight = texture2D(globeTextureNight, vertexUV).rgb;

    vec3 sun = normalize(vec3(cos(time), sin(time), sin(time)));
    float dayPercentage = max(0.0, dot(vertexNormal, sun));

    vec3 color = mix(colorNight, colorDay, dayPercentage);

    //float atmosphere = 1.0 - dot(vertexNormal, vec3(0, 0, 1));    
    //color += vec3(0.4, 0.6, 1) * atmosphere * atmosphereIntencity;
    gl_FragColor = vec4(color, 1);
}`,H=`varying vec2 vertexUV;
varying vec3 vertexNormal;

uniform sampler2D globeHeightTexture;


void main() {
    float displacementScale = 0.1;
    float displacement = texture2D(globeHeightTexture, uv).r * displacementScale;

    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);
    
    vec4 pos = vec4( position, 1.0 );

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * pos;

    return;

    vec4 displacedPosition = pos + vec4(normal * displacement, 0);
    
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * displacedPosition;
}`,I=`varying vec2 vertexUV;
varying vec3 vertexNormal;

uniform sampler2D globeTexture;
uniform sampler2D globeHeightTexture;

void main() {
    float atmosphereIntencity = 2.0;
    
    vec3 color = vec3(0.4, 0.6, 1);

    float atmosphere = dot(vertexNormal, vec3(0, 0, -1));
    
    gl_FragColor = vec4(color * atmosphere * 2.5, 1);
}`;const l=window.innerWidth,v=window.innerHeight,g=2.1,p=new S({canvas:document.querySelector("canvas"),antialias:!0});p.setPixelRatio(window.devicePixelRatio);p.setSize(l,v);const B=75,q=l/v,c=new T(B,q,.1,1e3);c.position.z=g;const m=new P,f=new N;m.add(f);const i=new U;i.start();const x=R();f.add(x);const E=W();m.add(E);const O=K();m.add(O);const d={x:0,y:0};document.addEventListener("mousemove",function(n){d.x=n.clientX/l*2-1,d.y=n.pageY/v*2-1});window.requestAnimationFrame(function n(){window.requestAnimationFrame(n),i.getDelta(),x.rotation.y+=.004,c.position.x=Math.cos(i.elapsedTime*.01)*g,c.position.z=Math.sin(i.elapsedTime*.01)*g,D.to(f.rotation,{y:d.x*Math.PI/4,z:-d.y*(Math.PI/4),duration:1}),c.lookAt(new A(0,0,0)),x.material.uniforms.time.value=i.elapsedTime,p.render(m,c)});function R(){const n=new h(1,256,256),o=new y({vertexShader:k,fragmentShader:G,uniforms:{globeTextureDay:{value:new u().load("./img/8k_earth_daymap.jpg")},globeTextureNight:{value:new u().load("./img/8k_earth_nightmap.jpg")},globeHeightTexture:{value:new u().load("./img/8081_earthbump4k.jpg")},time:{value:i.elapsedTime}}});return new w(n,o)}function W(){const n=new h(1,16,16),o=new y({vertexShader:H,fragmentShader:I,blending:V,side:_}),r=new w(n,o);return r.scale.set(1.2,1.2,1.2),r}function K(){const n=new F,o=new z({color:16777215}),r=5e3,a=new Array(r*3);for(let e=0;e<r;e++){const s=(Math.random()-.5)*l,b=(Math.random()-.5)*l,M=(Math.random()-.5)*2e3;a[e*3+0]=s,a[e*3+1]=b,a[e*3+2]=M}return n.setAttribute("position",new C(a,3)),new L(n,o)}
