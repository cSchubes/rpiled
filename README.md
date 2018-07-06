# Current Features
- Index page
    1. Color Wheel + Brightness slider
    2. RBG + Hex Value Fields
        -Properly update on change/submit

# Features to Implement
- Updating input fields
    1. Snap to white on color wheel (data-wcp-snap="true")

- Feature Page
    1. Create "preset colors changes"
    2. Add colors to "array", set time interval(static or dynamic?)
    3. Have given presets for every user(can upload our cool ones)
    4. Allow user to make own based on their login-- saved on to DB(mongo?)
    
- Hardware
    1. Accurate color rendition on the lights

# API Call Structure
POST with param *color* set to a 6 digit hex string

# Front-End TODO
- Update UI/UX
    - Currently looks fine on desktop, however mobile site is sloppy-- for unknown reasons
    - Probably will rebuild UI from scratch/diff template at later date
- Fix scrolling on mobile
    - Looked into this, tried a bunch of solutions, but none of them really work
        - Looks like this is impossible, I tried disabling scrolling completely, and it will still scroll the page
            - https://github.com/fujaru/jquery-wheelcolorpicker/issues/28
        - Some alternatives: 
            1. Use a different Color Picker(Spectrum,...,...)
                -This can be only for mobile
            2. Fuck the mobile users
    - Current workaround is to tap + use safari so page doesn't refresh accidentally
- Sliders are hard to use on mobile
    - Again, might need an AIO
- Dark/Light mode toggle
- Checkbox to disable/enable live update
- Log in Page - Front end Done
    - Passport.js
        - Handle Authentication w/ Mongo
        - Post using passport.local to backend, which sends to mongo?
    - MongoDB
        - User accounts created -> access to the DB
        - Website connects to the DB using user credientials
            - Provide URI
        - For the RPI, install Mongo DB on it, then connect somehow??
            - https://docs.mongodb.com/manual/reference/connection-string/

    



