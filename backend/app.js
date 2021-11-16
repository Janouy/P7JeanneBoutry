const express = require('express');
const path = require('path');
const userRoutes = require ('./routes/user');
const textsRoutes = require('./routes/text');
const commentsRoutes = require('./routes/comment');
const mediasRoutes = require('./routes/media');
const picturesRoutes = require('./routes/picture');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/users', userRoutes);
app.use('/api/texts', textsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/medias', mediasRoutes);
app.use('/api/pictures', picturesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;
