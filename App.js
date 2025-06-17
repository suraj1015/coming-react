/*
Creating a React element
	<div id='parent'>
		<div class='child'>
			<h1>Hi Im H1</h1>
		</div>
	</div>

*/

const parent = React.createElement("div", { "id": "parent" },
	[React.createElement("div", 
		{"id": "child" }, 
		[
		React.createElement("h1", null, "Hi Im H1"), 
		React.createElement("h2", null, "Hi Im H2"),
	]),React.createElement("div", 
		{"id": "child" }, 
		[
		React.createElement("h1", null, "Hi Im H1"), 
		React.createElement("h2", null, "Hi Im H2"),
	])]
);

//JSX 

console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);

const root2 = ReactDOM.createRoot(document.getElementById("root2"));
root2.render(React.createElement("h1", null, "Hello World from React"));

// const heading = React.createElement("h1", {
// 	"id": "heading",
// 	"className": "heading",
// }, "Hello World from React");

// console.log(heading);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);