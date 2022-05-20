import React, { Component } from "react";
import "./DataSearcher.css";

class DataSearcher extends Component {
	render() {
		return (
			<div className="rs">
				<p className="information-text">
					Click below on the option you would like to receive
				</p>
				<div className="result-block">
					{this.props.data.length > 0 ? (
						this.props.data.map((item, index) => {
							return (
								<div key={index} className="rslt">
									<a href={item.link} target="_blank">
										{item.nameService}
									</a>
								</div>
							);
						})
					) : (
						<p className="information-text ani-load ani-pseudo">Please wait</p>
					)}
				</div>
			</div>
		);
	}
}

export default DataSearcher;
