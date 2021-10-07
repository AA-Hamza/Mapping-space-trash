import {date, origin_date} from './script'

const slider = document.getElementById("time-slider");
const slider_button = document.getElementById("slider-button");

let slider_val = 0;
export function get_slider_value()
{
    return slider_val;
    //return parseInt(slider.value);
}

function set_new_time(event) {
    event.cancelBubble = true;
    slider_val = parseInt(slider.value);
    //let diff = parseInt(get_slider_value());

    //if (diff || diff == 0){
    //    date.setHours(origin_date.getHours()+diff);
    //    console.log("Changed time to "+date)
    //}
}

slider_button.onclick = set_new_time;
