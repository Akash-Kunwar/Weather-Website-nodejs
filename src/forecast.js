const request=require('request')


const forecast =function(lat,lon,callback){
	const url='https://api.darksky.net/forecast/2d573d48c9aa79a7cea64d7eeaaa30d5/'+encodeURIComponent(lat)+','+encodeURIComponent(lon)+'?units=si'
	request({url:url,json:true},function(error,response){
		if(error){
			callback('unable to connect to weather web service',undefined)
		}
		else if(response.body.error){
			callback('unable to find location',undefined)
		}
		else{
			callback(undefined,{
				summary:response.body.daily['summary'],
				temperature:response.body.currently.temperature,
				Rainy:response.body.currently.precipProbability


			})
		}
	})
}

module.exports=forecast