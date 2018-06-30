// update color wheel based on hex input
document.getElementById('hex-btn').onclick = () => {
    console.log($('#event-color').val())
    $('#color-input').wheelColorPicker('setValue', $('#event-color').val());
};

// slider move update function
$(function() {
    $('#color-input').on('slidermove', function() {
        $('#event-color').val($("#color-input").wheelColorPicker('getValue', 'hex'));
        var rgb = $("#color-input").wheelColorPicker('getValue', 'rgb');
        var arr = rgb.split(" ")
        $('#R-color').val(arr[0]);
        $('#G-color').val(arr[1]);
        $('#B-color').val(arr[2]);
        $('#r-slider').val(arr[0]);
        $('#g-slider').val(arr[1]);
        $('#b-slider').val(arr[2]);
    });
});
var rSlider = document.getElementById('r-slider');
var rInput = document.getElementById("R-color");
var gSlider = document.getElementById('g-slider');
var gInput = document.getElementById("G-color");
var bSlider = document.getElementById('b-slider');
var bInput = document.getElementById("B-color");

rSlider.onchange = function(){
    rInput.value = rSlider.value;
    var co = [rInput, bInput, gInput, 1]
    $('#color-input').wheelColorPicker('setValue', co);
}
rInput.onchange = function() {
    rSlider.value = rInput.value;
    //$('#color-input').wheelColorPicker('setValue', $('#event-color').val());
}