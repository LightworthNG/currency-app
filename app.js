const express = require("express");
const path = require("path");

const app = express();
/* Static Resources */
app.use(express.static(path.join(__dirname, "public")));


/*	VIEWS and VIEWS ENGINE */
app.set("views", path.join(__dirname,"views")) ;

/*	ROUTES*/
// Homepage
app.get("/", (req, res, next) => {
	res.render("index")
})

app.use((req, res, next) => {
	//normally server and error page
	res.send("The requested page cannot be identified");
})

module.exports = app;