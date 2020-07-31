import React from "react";
import { connect } from "react-redux";

import { Route, Link } from "react-router-dom";

const ProtectedRoute = ({ component: Component, status, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (status === "success") {
					return <Component {...props} />;
				} else {
					return (
						<div className='my-5 container text-center'>
							<Link to='/login'> Unauthorized access</Link>
							<br />
							<br />
							<br />
							<Link to='/login'>Click here to login</Link>
						</div>
					);
				}
			}}
		/>
	);
};

const mapStateToProps = (state) => ({
	status: state.user.status,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
