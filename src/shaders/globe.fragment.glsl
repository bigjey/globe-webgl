varying vec2 vertexUV;
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
}