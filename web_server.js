const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {logger} = require('./middleware/logEvents.js')
const errorhandler = require('./middleware/errorhandler.js')
const PORT = process.env.PORT || 3500

app.use(logger)

const whitelist = ['https://www.googe.com','https:127.0.0.1:5500','https:localhost:3500']
const corsOptions = {
	origin:(origin,callback)=>{
		if(whitelist.indexOf(origin)!==-1 || !origin){
			callback(null,true)
		}
		else{
			callback(new Error("Not allowed by CORS"))
		}
	},
	optionsSuccessStatus:200
}
app.use(cors(corsOptions))


app.use(express.urlencoded({extended:false}))


app.use(express.json())


app.use(express.static(path.join(__dirname,'./public')))


app.use('/subdir',require('./routes/subdir.js'))

app.get('^/$|index(.html)?',(req,res)=>{
	res.sendFile(path.join(__dirname,"nodejs_web_server/views","index.html"))
})


app.get('/new-page(.html)?',(req,res)=>{
	res.sendFile(path.join(__dirname,"nodejs_web_server/views","new-page.html"))
})


app.get('/old-page(.html)?',(req,res)=>{
	res.redirect(301,'new-page.html')
})


app.get('/hello(.html)?',(req,res,next)=>{
		console.log("hello page load panna try pandrom")
		next()
	},(req,res)=>{
		res.send("Vanakam Dubaiiiiii!!!!!!!!!!")
	}
)


const one = (req,res,next)=>{
	console.log("One ")
	next()
}


const two = (req,res,next)=>{
	console.log("Two")
	next()
}


const three = (req,res)=>{
	console.log("Three")
	res.send("Finished!! Plan panni pannanum")
}


app.get('/chain(.html)?',[one,two,three])


app.get('/*',(req,res)=>{
	res.status(404).sendFile(path.join(__dirname,"nodejs_web_server/views","404.html"))
})


app.all('*',(req,res)=>{
	if(req.accepts('html')) {
		res.sendFile(path.join(__dirname,"nodejs_web_server/views","404.html"))
	}
	else if(req.accepts('json')) {
		res.json({"error":"404 not found"}) 
	}
	else{
		res.type('text').send('404 not found')
	}
})

app.use(errorhandler)
app.listen(PORT, ()=>{console.log(`The server is running on ${PORT}`)})