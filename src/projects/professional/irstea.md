---
title: IRSTEA
image: "/img/uwb.jpg"
date: 2018-08-30
---
From April 2018 to August 2018


Internship of my first year in masters degree in the laboratory [IRSTEA](http://www.irstea.fr/accueil) [TSCF](http://www.irstea.fr/la-recherche/unites-de-recherche/tscf) unit. The mission was the following :
Develop a test and configuration software for an Ultra Wide Band beacon.
For the [Baudet-Rob](http://www.irstea.fr/la-recherche/unites-de-recherche/tscf/robotique-mobilite-environnement-agriculture) project, a robot is using this device to track and follow a person or another robot.
The devices can compute distances. So with some of them, you can triangulate a position, but in the frames they exchange you can also send datas, like orders from a remote, or robot intern status datas.

My mission was to adapt the firmware and create a protocol of communication for the transmission of the datas(C).
But also I implemented a C++ API allowing the configuration of the devices linked to a computer using USB or CAN protocol.
A ROS node was also made and a Qt interface for a convenient and understandable fresh user configuration.

Tutor : Jean Laneurit
