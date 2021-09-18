---
title: Subsurface Scattering
video: "/img/SSSGems.webm"
date: 2019-10-17
---

Applied to a position as a 3D/Graphics Programmer at [SurgAR](http://www.surgar-surgery.com/), and I got hired ! Hourray, a first job ! 
Since I was a bit focused on Vulkan lately, I wanted to update my OpenGL skills.  


To do that I took one of the graphics programmer bible : GPU Gems, and implemented one of the [subsurface scattering implementation](http://developer.download.nvidia.com/books/HTML/gpugems/gpugems_ch16.html) they propose.
Nothing that fancy, just a depth map computed from the light, we compare the distance of the geometry contained in the current pixel to the light and the pixel associated to the same ray in the depth map. 


Works pretty well on convex meshes, but requires some adjustement otherwise.



You can find this project on [Github](https://github.com/Rodousse/SSSGems).


