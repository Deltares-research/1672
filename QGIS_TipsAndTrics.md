<h1> QGIS Tips and Tricks </h1>

This document intends to describe the basic tips and tricks designated to the Waterlinie1672 Mapathon project.
The project has been setup with QGIS is 3.22. Screendumps are derived from that specific versions. versions lower than 3 definitely don't work.

<h2> Requisites </h2>
- Enable the <b>digitizing toolbar</b> or in Dutch <b>Werkbalk Digitaliseren</b>
- Enable the <b>snapping toolbar</b> or in Dutch <b>Werkbalk Snappen</b>

Enabling a toolbar can be done by using the menu (view > toolbars or in Dutch interface Beeld > Werkbalken)

<h1> Digitizing features </h1>

<h2>Digitizing basics</h2>
GIS software recognizes rasters and vector datatypes. The vector data types consist of:
- points (x,y)
- line ({x,y},{x,y}) (or in words a list of a least 2 points)
- polygon ({x1,y1},{x2,y2},{x3,x3},{x1,y1}) (or in words, a list of at least 3 points, with the last point being equal to the first point, so a closed line)

For each of these types there is a different toolbar. The entire process of digitizing is explained in several online resources. Please check for instance the [QGIS training manual](https://docs.qgis.org/3.16/en/docs/training_manual/create_vector_data/create_new_vector.html).

<h2>Mapathon specific digitizing</h2>

The following list of features are available for digitizing:
- hydrology:waterway
- hydrology:structure
- hydrology:dike
- hydrology:waterbody

For modeling purposes it is in general important that objects are connected to each other. What does this mean in the digitizing process? Waterways need to be connected to each other (except for a start or end node).  So conjunctions need to be connected on the nodes of a line (arc in GIS terms).
![alt text](https://github.com/Deltares/1672/image/digitizing_waterways.png "Example of connected waterways")
This picture shows 2 waterways with a conjunction. The big yellow line is a selected waterway. This line is connected on a node of the thin red line. The small red x is the node of the yellow line that is connected to the node (the red circle) of the semi selected (this is done by hovering over an object) thin red linepart of the total thin red line. The grey colored plus sign is the midpoint of the linepart. The pink square indicates that a node will be snapped to a node of an existing feature. 
