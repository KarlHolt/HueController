# HueController
This project is split into 3 parts:
    1) The server side, created in Python, which will be doing the communication with the with the HueBridge
    2) The database which will keep track of all the information of the lights, this could also be done with calls to the API, but this would restrain me to only be able to use their commands when needing information. All information about the light can be collected with a single GET request. On this project latency on the internet is a lot worse than on the IO.
    3) The frontend written in JavaScript and HTML/CSS will be run on a Raspberry Pi with touchscreen.

The above is the minimum requiments for the project. Further work can be:
    - Connect a keyboard and bluetoth speaker to the raspberry pi, the keyboard for writng custome alarms and notifications, and the speaker to relai them (Can be combined with flickering of light if wanted).
    - Set a hook up to when a mobile connects to the internet, the lights will turn on if it is dark out. This makes it so you don't enter a dark appartment, can also be used to turn it off when no one is home. (Should have a toggle button, so that it is not a problem when rebooting phone while still in the apartment).
    - Connect a webcam to the Raspberry for it to use current visual recognition methods to see who is home. 
