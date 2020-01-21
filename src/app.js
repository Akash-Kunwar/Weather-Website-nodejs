const path =require('path')
const express =require('express')
const hbs =require('hbs')
const forecast=require('./forecast')
const geocode=require('./geocode')

//using path(Absolute path)
const app =express()
console.log(__filename)
console.log(path.join(__dirname,'../public'))

//handelbars

const pathViews=path.join(__dirname,'../templates/views')
const pathPartials=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',pathViews)
hbs.registerPartials(pathPartials)


//pushing all the files of the directory to the server
app.use(express.static(path.join(__dirname,'../public')))


//seting the end-points
app.get('',function(req,res){
  
   res.render('index',{
   	title:'Weather App',
   	name:'Akash Kunwar'
   })

})

app.get('/about',function(req,res){
	res.render('about',{
		title:'About',
		name:'Akash Kunwar'
	})
})

// app.get('/help',function(req,res){
//     res.send({
//     	name:'Akash',
//     	age:20
//     })
// })

app.get('/weather',function(req,res){
	if(!req.query.address){
		return res.send({
			erorr:'Please Provide Address'
		})
	}

	geocode(req.query.address,function(error,response){
		if(error){
			return res.send({
			erorr:error
		})
		}else{
			forecast(response.longitude,response.latitutde,function(error,data){
				if(error){
					return res.send({
			erorr:error
		})
				}
				else{
					res.send({
						products:{

							forecast:data,
							location:response.location,
							address:req.query.address

						}
					})
				}
			})
		}
	})


	
})

app.get('*',function(req,res){
		res.render('error')
})



//app.com
//app.com/help
//app.com/contact

//setting up the ports
app.listen(3000,function(){
	console.log('Server is up and Running!')
})


