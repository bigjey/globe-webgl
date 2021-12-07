varying vec2 vertexUV;
varying vec3 vertexNormal;

uniform sampler2D globeTexture;
uniform sampler2D globeHeightTexture;

void main() {
    float atmosphereIntencity = 2.0;
    
    vec3 color = vec3(0.4, 0.6, 1);

    float atmosphere = dot(vertexNormal, vec3(0, 0, -1));
    
    gl_FragColor = vec4(color * atmosphere * 2.5, 1);
}