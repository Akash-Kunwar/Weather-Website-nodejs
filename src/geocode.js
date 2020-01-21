const request =require('request')


const geoCode=function(address,callback){
	const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoiYWthc2gta3Vud2FyIiwiYSI6ImNrNWpiY2x5ODAxaDkzcmxiZ2d4Y2N4dGoifQ.boCOgGfvJCLl8F4hs2HkSg&limit=1'
	request({url:url,json:true},function(error,response){

		if(error){
			callback('unable to connect to geoCoding web services',undefined)
		}
		else if(response.body.message){
			callback('unable to find co-ordinates',undefined)
		}
		else if(response.body.features.length===0){
			callback('Try with different city name!',undefined)
		}
		else{
			callback(undefined,{
				latitutde:response.body.features[0].center[1],
				longitude:response.body.features[0].center[0],
				location:response.body.features[0].place_name
			})
		}

	})

}

module.exports=geoCode