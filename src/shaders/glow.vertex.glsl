varying vec2 vertexUV;
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
}