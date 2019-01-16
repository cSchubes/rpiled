# RPILED Backend

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
GET
POST

`/animations/templates`
GET
