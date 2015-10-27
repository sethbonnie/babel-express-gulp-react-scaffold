import React from 'react';
import { render } from 'react-dom';

let AppContainer = React.createClass({
	render: function() {
		return (
			<div id="AppContainer">

			</div>
		);
	}
});// /<AppContainer />

render( <AppContainer />, document.getElementById('container') );