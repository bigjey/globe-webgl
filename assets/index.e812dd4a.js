import{W as P,P as S,O as D,S as N,G as T,V as v,a as p,b as h,T as u,M as g,A,B as F,c as V,d as _,F as C,e as k,f as I,g as U,C as z,h as G}from"./vendor.9197ca6f.js";const j=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=r(t);fetch(t.href,e)}};j();var B=`varying vec2 vertexUV;
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
}`,H=`varying vec2 vertexUV;
varying vec3 vertexNormal;

uniform sampler2D globeTextureDay;
uniform sampler2D globeTextureNight;
uniform float time;

void main() {
    float atmosphereIntencity = 0.8;
    vec3 colorDay = texture2D(globeTextureDay, vertexUV).rgb;
    vec3 colorNight = texture2D(globeTextureNight, vertexUV).rgb;

    vec3 sun = normalize(vec3(cos(time / 5.0), sin(time / 5.0), sin(time / 5.0)));
    float dayPercentage = max(0.0, dot(vertexNormal, sun));

    vec3 color = mix(colorNight, colorDay, dayPercentage);

    //float atmosphere = 1.0 - dot(vertexNormal, vec3(0, 0, 1));    
    //color += vec3(0.4, 0.6, 1) * atmosphere * atmosphereIntencity;
    gl_FragColor = vec4(color, 1);
}`,L=`varying vec2 vertexUV;
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
}`,O=`varying vec2 vertexUV;
varying vec3 vertexNormal;

uniform sampler2D globeTexture;
uniform sampler2D globeHeightTexture;

void main() {
    float atmosphereIntencity = 2.0;
    
    vec3 color = vec3(0.4, 0.6, 1);

    float atmosphere = dot(vertexNormal, vec3(0, 0, -1));
    
    gl_FragColor = vec4(color * atmosphere * 2.5, 1);
}`;const s=window.innerWidth,f=window.innerHeight,q=2,c=new P({canvas:document.querySelector("canvas"),antialias:!0});c.setPixelRatio(window.devicePixelRatio);c.setSize(s,f);const E=75,R=s/f,m=new S(E,R,.1,1e3);m.position.z=q;const x=new D(m,c.domElement),l=new N,w=new T;l.add(w);const d=new z;d.start();const y=J();w.add(y);const W=Q();l.add(W);const K=Y();l.add(K);const X=[{name:"Denchik",lat:52.5144,lng:4.9641},{name:"Katrusya",lat:41.3874,lng:2.1686},{name:"Chub",lat:49.423,lng:26.9871},{name:"Mr X",lat:49.75996,lng:27.19903},{name:"Wroclaw",lat:51.107883,lng:17.038538},{name:"Ancona",lat:43.616943,lng:13.516667}];for(const o of X){const n=Z();let r=1.001,a=(180-(o.lat+90))*Math.PI/180,t=(o.lng+90)*Math.PI/180;const e=new G(r,a,t);n.position.setFromSpherical(e);const i=new v().setFromSpherical(e).multiplyScalar(2);n.lookAt(i),n.rotation.x=Math.PI/2,n.rotation.z=Math.PI/2,l.add(n)}x.update();window.requestAnimationFrame(function o(){window.requestAnimationFrame(o),d.getDelta(),m.lookAt(new v(0,0,0)),y.material.uniforms.time.value=d.elapsedTime,x.update(),c.render(l,m)});function J(){const o=new p(1,256,256),n=new h({vertexShader:B,fragmentShader:H,uniforms:{globeTextureDay:{value:new u().load("./img/8k_earth_daymap.jpg")},globeTextureNight:{value:new u().load("./img/8k_earth_nightmap.jpg")},globeHeightTexture:{value:new u().load("./img/8081_earthbump4k.jpg")},time:{value:d.elapsedTime}}});return new g(o,n)}function Q(){const o=new p(1,16,16),n=new h({vertexShader:L,fragmentShader:O,blending:A,side:F}),r=new g(o,n);return r.scale.set(1.2,1.2,1.2),r}function Y(){const o=new V,n=new _({color:16777215}),r=5e3,a=new Array(r*3);for(let e=0;e<r;e++){const i=(Math.random()-.5)*s,b=(Math.random()-.5)*s,M=(Math.random()-.5)*2e3;a[e*3+0]=i,a[e*3+1]=b,a[e*3+2]=M}return o.setAttribute("position",new C(a,3)),new k(o,n)}function Z(){const o=new I(.001,.1,.001),n=new U({color:"white"});return new g(o,n)}
