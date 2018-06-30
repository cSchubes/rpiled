document.getElementById('hex-btn').onclick = () => {
    console.log($('#event-color').val())
    $('#color-input').wheelColorPicker('setValue', $('#event-color').val());
};