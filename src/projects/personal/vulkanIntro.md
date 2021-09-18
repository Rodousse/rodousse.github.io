---
title: Vulkan Qt Learning
image: "/img/pbrEditor.png"
date: 2018-11-21
---
End of masters degree project.
This is more of a personal project than a student one.
The aim was to learn the trending graphics API Vulkan by implementing a 3D viewer.


By the end of the semester, I was surprised to like this much the API. I decided to extend
the code,
and made it accessible to the community. Adding new features and refactoring the code on my
free time.


The software itself is implementing a 3D Vulkan viewer with texture mapping of course
lighted thanks to a simple phong illumination.
It provides also dynamic mesh loading and a user interface going with it allowing you to
move in the space.


The source code is crossplatform and available on github with the install steps. You'll only
need to have Qt 5.10 at least,
a lunarG SDK for vulkan install, and a cmake version 3.10 or newer : [Github Link](https://github.com/Rodousse/Arverne-Viewer/tree/development)

