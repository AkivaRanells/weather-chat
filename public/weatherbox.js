import Comments from './comment.js';

export default class WeatherBox{
    constructor(cityName, temp){
        this._id = Math.random()+0.12345*1000000;
        this._cityName = cityName;
        this._temp = {tempC: temp, tempF: temp*1.8+32};
        this._comments = [];
    }
    addComment (text){
        this._comments.push(new Comments(text));
    }
}


// tested classes let w = new WeatherBox(1, "Tel-Aviv", 30);
// w.addComment(1, 'were');
// console.log(w);