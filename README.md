# Current Features
- Index page
1. Color Wheel + Brightness slider
2. RBG + Hex Value Fields

# Features to Implement
- Updating input fields
    1. Map Button to JS
    2. Change Color wheel on RGB Sliders
        - Set slider value to default, update them on change
    3. Snap to white on color wheel (idk if this is good/possible)
    4. Prevent scrolling on mobile when controlling the color wheel/sliders

- Feature Page
    1. Create "preset colors changes"
    2. Add colors to "array", set time interval(static or dynamic?)
    3. Have given presets for every user(can upload our cool ones)
    4. Allow user to make own based on their login-- saved on to DB(mongo?)
    
- Hardware
    1. Accurate color rendition on the lights

# API Call Structure
POST with param *color* set to a 6 digit hex string

# Contributing
We will use commitizen to for commits. Instead of doing `git commit` just use `git cz`. 
Installing commitizen is as simple as doing `npm install` in the project directory and then doing `npm install -g commitizen` to install it on your system.