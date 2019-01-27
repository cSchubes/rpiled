# RPILED Backend

The backend for the RPILED project. Designed to run on a Raspberry Pi 3 running balenaOS.

## Database Structure

### Templates
id: int
name: string
subtitle: string
icon: string

### Animations
id: int
name: string
template: string
favorite: bool

### rainbowGradient
id: int (foreign with animations)
time: int

### rainbowStrip
id: int (foreign)
time: int

### theaterChase
id: int (foreign)
time: int
colors: N/A (yet)

## REST API

### Animations

`/animations/`
GET (with query)
POST
PUT
DELETE

`/animations/templates`
GET (with query)
