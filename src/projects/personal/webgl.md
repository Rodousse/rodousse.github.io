---
title: WebGL Banner
image: "/img/webGLBanniere.PNG"
date: 2017-04-20
---
Front page made with pure WebGL. I wanted to bring some animation to the home page and gives a brief idea of the rest of the web site and who I am.
It's a simple discretization of a plan, the number of vertices per edge is an input giving the appropriate input for the VAO and EBO.
Then in the vertex shader, we simply transform the coordinates following a sum of sinusoid functions.
And finally we add some procedural perlin noise to bring some variation to the geometry.
All of this in function of time, that gives this simple effect of waves. It's really simple but it do the trick really well.
Download the source code on [GitHub](https://github.com/Rodousse/WebGLFirstStep).
