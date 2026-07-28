#version 300 es

struct VSOutput
{
    vec4 texCoord;
    vec2 _m1;
};

layout(location = 0) in vec3 input_position;
layout(location = 1) in vec2 input_texCoord;
out vec2 entryPointParam_main_vs_texCoord;

void main()
{
    VSOutput _output;
    _output.texCoord = vec4(input_position, 1.0);
    _output._m1 = input_texCoord;
    gl_Position = _output.texCoord;
    entryPointParam_main_vs_texCoord = _output._m1;
}

