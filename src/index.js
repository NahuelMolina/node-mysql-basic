require('./app');

app.listen(app.get('port'),app.get('hostname'), () => {
	console.log(`listening ${app.get('port')}`);
});
