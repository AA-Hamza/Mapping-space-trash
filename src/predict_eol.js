//https://www.nasa.gov/news/debris_faq.html
//https://www.universetoday.com/150233/how-long-will-spacejunk-take-to-burn-up-heres-a-handy-chart/

export function predict_eol(height) {
    const mean = parseInt(height);//(apogee+penigee)/2;
    console.log(mean)
    if (mean <= 500) {
        return '1-25 years';
    }
    else if (mean < 800) {
        return '25-100 years';
    }
    else if (mean < 1000) {
        return '100-150 years';
    }
    else {
        return '150+ years';
    }
    return 'won\'t return';
}
