const fs = require('fs')

if(fs.existsSync('./new'))
{	
	fs.rmdir('./new',
		(err)=>{
			if(err) throw err
			console.log('folder deleted')
		}
	)
}

process.on('uncaughtException',(err)=>{
	console.error('Caught an error',err)
	process.exit(1)
})