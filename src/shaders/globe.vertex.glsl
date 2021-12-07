varying vec2 vertexUV;
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
}