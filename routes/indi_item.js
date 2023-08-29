app.get('/item_buyer/:id', (req, res) => {
  res.render('Indi_item_buyer');
});

app.get('/item_seller', (req, res) => {
  res.render('Indi_item_seller');
});

app.post('/item_buyer/:id', (req,res) => {
  // need to add query to change individual product in product table in database
  .then()
})
