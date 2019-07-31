const express = require('express');
const morgan = require('morgan');
const googleApps = require('./database/database');

const app = express();
app.use(morgan('common'));


app.get('/apps',(req,res)=>{

    if(req.query.genres && req.query.sort){
        
        const genres = req.query.genres;
        const sort = req.query.sort;
            if( ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres.toLowerCase())){
                const filteredApps = googleApps.filter(ap=> ap.Genres.toLowerCase() === genres.toLowerCase());
                if(['Rating', 'App'].includes(sort)){
                    const sortFiltered = filteredApps.sort((a,b)=> a[sort] > b[sort]? 1 : a[sort] < b[sort]? -1 : 0 );
                    res.status(200).json(sortFiltered);
                } else {res.status(400).send('sort must be either "Rating" or "App" (case sensitive)')}
            } else{ res.status(400).send(" genre must be one of: 'action', 'puzzle', 'strategy', 'casual', 'arcade', 'card' ")}
        }
            
        else if(req.query.genres && !req.query.sort){
            const genres = req.query.genres;
            if( ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres.toLowerCase())){
                const filteredApps = googleApps.filter(ap=> ap.Genres.toLowerCase() === genres.toLowerCase());
                res.status(200).json(filteredApps);
            } else { res.status(400).send(" genre must be one of: 'action', 'puzzle', 'strategy', 'casual', 'arcade', 'card' ")}
        } 
        
        else if(req.query.sort && !req.query.genres){
            const sort = req.query.sort;
            if(['Rating', 'App'].includes(sort)){
                const sorted = googleApps.sort((a,b)=> a[sort] > b[sort]? 1 : a[sort] < b[sort]? -1 : 0 );
                res.status(200).json(sorted);
            } else {
                res.status(400).send('sort must be either "Rating" or "App" (case sensitive)')}
        }

        else {
            res.json(googleApps);
        }
    

});





app.listen(8000, ()=>{
    console.log('listening to PORT 8000')
})