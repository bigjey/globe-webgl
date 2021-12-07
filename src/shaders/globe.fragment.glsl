varying vec2 vertexUV;
varying vec3 vertexNormal;

uniform sampler2D globeTexture;
uniform sampler2D globeHeightTexture;

void main() {
    float atmosphereIntencity = 0.8;
    vec3 color = texture2D(globeTexture, vertexUV).rgb;
    float atmosphere = 1.0 - dot(vertexNormal, vec3(0, 0, 1));
    
    color += vec3(0.4, 0.6, 1) * atmosphere * atmosphereIntencity;
    gl_FragColor = vec4(color, 1);
}