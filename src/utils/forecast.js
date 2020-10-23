const request= require('request');

const forecast= (lat, long, callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=11712bef831cc20e94d8d8130a2636a7&query=${lat},${long}&units=m`
    
    request({url, json:true}, (error, {body})=>{
        if(error)
        {
            callback("Unable to connect to weather service", undefined);
        }
        else if(body.error)
        {
            callback("Unable to find location", undefined);
        }
        else
        {   
            const weather=`${body.current.weather_descriptions[0]}. it is currently ${body.current.temperature} degrees Celsius out there and feels like ${body.current.feelslike} `;
            callback(undefined, weather);
        }
    });
};

module.exports=forecast;
