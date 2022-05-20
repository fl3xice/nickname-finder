import React, { useState } from "react";
import DataSearcher from "./DataSearcher";
import Modal from "./Modal";
import "./Search.css";

const Search = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isSearch, setSearch] = useState(false);
	const [nickname, setNickname] = useState("");
	const [failed, setFailed] = useState("");
	const [dataResult, setDataResult] = useState([]);
	const host = "http://localhost:3978";

	let interval;

	function toggleModal() {
		setIsOpen(!isOpen);
	}

	function _check(d) {
		fetch(`${host}/snoop/check/${nickname}`, {
			method: "GET",
		})
			.then(async (res) => {
				const r = await res.json();
				if (r.status === true) {
					_getData();
					setFailed("");
					setSearch(true);
				} else {
					if (d === true) {
						setFailed("Nickname not found");
						setSearch(false);
						clearInterval(interval);
					}
				}
			})
			.catch(() => {
				_setFailRequest();
			});
	}

	function _awaitResult() {
		interval = setInterval(_check, 3000);
	}

	function _search(d) {
		fetch(`${host}/snoop/search`, {
			method: "POST",
			body: JSON.stringify({
				nickname,
				again: d ? true : false,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(async (res) => {
				const r = await res.json();
				if (r.statusCode === 400) {
					_setFailRequest();
				}
				if (r.status === "await") {
					_awaitResult();
					setFailed("");
					setSearch(true);
				}
			})
			.catch(() => {
				_setFailRequest();
			});
	}

	function _setFailRequest() {
		setFailed("Failed request to the API");
		setSearch(false);
		clearInterval(interval);
	}

	function _getData() {
		fetch(`${host}/snoop/get/${nickname}`, {
			method: "GET",
		})
			.then(async (res) => {
				const r = await res.json();
				setDataResult(r.data);
				clearInterval(interval);
			})
			.catch(() => {
				_setFailRequest();
			});
	}

	function search(e) {
		e.preventDefault();
		const checkboxSearchAgain = e.target[1];

		if (isSearch) {
			setSearch(false);
			setNickname("");
			setDataResult([]);
			clearInterval(interval);
			return;
		}

		if (nickname.length > 0) {
			if (checkboxSearchAgain.checked) {
				_search(true);
			} else {
				_check(true);
			}
		} else {
			setFailed("Please enter a nickname");
		}
	}

	function changeNickname(e) {
		setNickname(e.target.value);
	}

	return (
		<div className="search-block">
			<Modal isOpen={isOpen} toggle={toggleModal}>
				<p>
					Hello, this site is designed to search for idle nicknames on various
					services
				</p>
			</Modal>
			<p className="information-text">All data received from open source</p>
			<form onSubmit={search}>
				<div className="input-search">
					<input
						type="text"
						className={`${isSearch ? "disabled-input" : null}`}
						disabled={isSearch}
						maxLength={120}
						value={nickname}
						onChange={changeNickname}
					/>
				</div>
				<div className="checkbox-search-again">
					<label className="information-text with-check-box">
						<input type="checkbox" name="search_again" /> Search again if the
						nickname has already been checked
					</label>
				</div>
				{failed.length > 0 ? (
					<p className="information-text error">{failed}</p>
				) : null}
				<div className="buttons-group">
					<button type="button" onClick={toggleModal} className="btn btn-info">
						Info
					</button>
					<button
						type="submit"
						className={`btn ${isSearch ? "btn-restart" : "btn-search"}`}
					>
						{isSearch ? "Restart Find" : "Find"}
					</button>
				</div>
				{isSearch ? <DataSearcher data={dataResult} /> : null}
			</form>
		</div>
	);
};

export default Search;
