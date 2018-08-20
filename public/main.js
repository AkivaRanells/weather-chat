
import WeatherBox from './weatherbox.js';

const STORAGE_ID = 'weatherchat';
const My_Api_Key = 'fbe4f3586edf4bbe93590218181908';
const source = $('#city-template').html();
const template = Handlebars.compile(source);
const WeatherChat = function () {
    let cities = [];
    let fetch = function (input) {
        $.ajax({
            method: "get",
            url: 'http://api.apixu.com/v1/current.json?key=' + My_Api_Key + '&q=' + input,
            success: function (data) {
                _createCity(data);
                // console.log(data.location.name, data.current.temp_c); tested
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    };
    let _createCity = function (data) {
        let name = data.location.name;
        let temp = data.current.temp_c;
        let weatherbox = new WeatherBox(name, temp);
        cities.push(weatherbox);
        // tested console.log(cities);
        render();
    }
    let render = function(){
        $('.city-list').empty();
        let weatherHandle = {
            cities: cities
        }
        let newHTML = template(weatherHandle);
        $(".city-list").append(newHTML);
    }
    let postComment = function(cityID, commentText){
        // $('.city-list').empty();
        let city = _findCityById(cityID);
        city.addComment(commentText);
        render();
    }
    let deleteCity = function(deleteID){
        let index = _findDeleteIndex(deleteID);
        cities.splice(index, 1);
        // tested console.log(cities);
        render();
    }
    let _findCityById = function(cityID){
        for(let i = 0; i < cities.length; i++){
            if(cities[i]._id===cityID){
                // tested console.log(cities[i])
                return cities[i];
            }
        }
        // console.log(cities); tested
        return "ID Not found";
    }
    let _findDeleteIndex = function(deleteID){
        let index = 0;
        for(let i = 0; i < cities.length; i++){
            if(cities[i]._id===deleteID){
                // tested console.log(cities[i])
                index = i;
                return index;
            }
        }
        // console.log(cities); tested
        return "ID Not found";
    }
    return {
        fetch: fetch,
        postComment: postComment,
        render: render,
        deleteCity: deleteCity
    }
}
const app = WeatherChat();
app.render();
$('#button-get-temp').on('click', function (x) {
    x.preventDefault();
    let citySearch = $(this).closest('.input-group').find('#city-name').val();
    // tested returned input- console.log(citySearch);
    app.fetch(citySearch);
});
$('.city-list').on('click', '#button-get-comment' ,function(x){
    x.preventDefault();
    let cityID = $(this).closest('.card').find('.card-header').data().id;
    let commentText = $(this).closest('.input-group').find('#comment').val();
    // console.log(commentText, cityID); tested
    app.postComment(cityID, commentText);
});
$('.city-list').on('click', '.btn-danger' ,function(x){
    x.preventDefault();
    let deleteID = $(this).data().id;
    // tested console.log(deleteID);
    app.deleteCity(deleteID);
});
