import {date, origin_date} from './script'

const slider = document.getElementById("time-slider");
const slider_button = document.getElementById("slider-button");

let slider_val = 0;
export function get_slider_value()
{
    return slider_val;
}

function set_new_time(event) {
    event.cancelBubble = true;
    slider_val = parseInt(slider.value);
}

slider_button.onclick = set_new_time;
