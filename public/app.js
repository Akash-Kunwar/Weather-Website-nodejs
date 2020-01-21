const WeatherForm =document.querySelector('form')
const Search =document.querySelector('#place')
const summary=document.querySelector('#summary')
const temperature=document.querySelector('#temperature')
const rainy=document.querySelector('#rainy')


WeatherForm.addEventListener('submit',function(e){
	e.preventDefault()


	const place=Search.value
	const url='/weather?address='+place
	fetch(url).then(function(response){
	response.json().then(function(data){
		if(data.error){

			summary.textContent='unable to fech data ! please try with another search'
			temperature.textContent=''
			rainy.textContent=''


		}
		else{

			if(data.products){
			summary.textContent='Summary: '+data.products.forecast.summary+'\n'+'location: '+data.products.location
			temperature.textContent='Temperature: '+data.products.forecast.temperature
			rainy.textContent='Rain Percentage: '+data.products.forecast.Rainy
						}
			else{
				summary.textContent='unable to fech data ! please try with another search'
				temperature.textContent=''
			    rainy.textContent=''
			}

		}
	})
})
    

})