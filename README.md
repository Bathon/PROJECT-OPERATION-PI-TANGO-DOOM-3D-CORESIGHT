# PROJECT-OPERATION-PI-TANGO-DOOM-3D-CORESIGHT

## Installation
To install this custom symbol, simply move the project files to the folder C:\Program Files\PIPC\PIVision\Scripts\app\editor\symbols\ext\. See the PIVision documentation for more detailed instructions if necessary.

## Usage
To use this custom symbol, simply open a display in PIVision, select the Floor Plan custom symbol (the treasure map), pick some arbitrary PI point or AF attribute, and drag it onto the display. The first waypoint detected will be the first to configure. Simply drag the PI point or AF attribute that you wish to associate with the indicated waypoint onto the symbol, and it will immediately be added and begin updating. Repeat this procedure until every waypoint has been populated.

## Features
* Import an image created by a Google Tango enabled device
* Automatically find the waypoints in the image and create indicators for the data
* Associate the waypoints with PI points or AF attributes
* See real-time data updates for each piece of data and each waypoint

## Credits
Team: Doomguy

Members:
* Johnathan Burns
* Andrew Bathon
* Phillip Little
* Simon Boka

## Future Feature Wishlist
* Modification of the waypoints
* More configuration options for waypoints, i.e. colors, opacity, etc.
* Persistent image uploads / data association
* 3D mapping and viewing (stretch goal)
