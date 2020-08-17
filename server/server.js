const express = require('express');
const app = express();
const path = require('path');
// const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
}); 


app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});

// app.use(express.static(publicPath));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });



