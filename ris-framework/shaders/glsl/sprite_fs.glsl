#version 300 es
precision mediump float;
precision highp int;

struct VSOutput
{
    highp vec4 texCoord;
    highp vec2 _m1;
};

uniform highp sampler2D u_diffuseSampler;

in highp vec2 entryPointParam_main_vs_texCoord;
layout(location = 0) out highp vec4 entryPointParam_main_fs;

void main()
{
    highp vec4 _58 = texture(u_diffuseSampler, vec2(entryPointParam_main_vs_texCoord.x, 1.0 - entryPointParam_main_vs_texCoord.y));
    entryPointParam_main_fs = _58;
}

