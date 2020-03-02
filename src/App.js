import React, { Component } from 'react';

import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import {
	Group,
	List,
	Header,
	Cell,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Search,
	View,
	Root,
	CellButton,
	Avatar,

} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			items1: [],
			activeView: 'studList',
		};

	}
	componentDidMount() {
		fetch("https://dt-prod.tk/api/v2/Api.php?apicall=getusers")
			.then(res => res.json())
			.then(
				result => {
					this.setState({
						isLoaded: true,
						items: result.stud
					});
				},
				// Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
				// чтобы не перехватывать исключения из ошибок в самих компонентах.
				error => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);
	}

	getLogs($id){
		fetch("https://dt-prod.tk/api/v2/Api.php?apicall=getlog&id="+$id)
			.then(res => res.json())
			.then(
				result => {
					this.setState({
						isLoaded: true,
						items1: result.logs
					});
				},
				// Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
				// чтобы не перехватывать исключения из ошибок в самих компонентах.
				error => {
					this.setState({
						isLoaded: false,
						error
					});
				}
			);
	}


	render() {
		const { error, isLoaded, items,items1 } = this.state;
		if (error) {
			return <div>Ошибка: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Загрузка...</div>;
		} else {
			return (
				<Root activeView={this.state.activeView}>
					<View activePanel="list" id="studList">
						<Panel id="list">
							<PanelHeader>
								Студенты
							</PanelHeader>
							<Group>
								<List>
									{items.map(item => (
										<Cell onClick={ () => {this.setState({ activeView: 'studLog' });  this.getLogs(item.ID)} } before={<Avatar />} key={item.ID}  >
											{item.FirstName} {item.LastName}
										</Cell>
									))}
								</List>
							</Group>

						</Panel>

					</View>
					<View header activePanel="logs" id="studLog">
						<Panel id="logs">
							<PanelHeader
								left={<PanelHeaderBack onClick={ () => this.setState({ activeView: 'studList' }) }/>} // Чтобы вернуться обратно
							>
								Посещаемость
							</PanelHeader>
							<Group>
								{/*// Тут активити*/}
								{/*<CellButton onClick={ () => this.getLogs() }> //*/}
								{/*	Back to View 1*/}
								{/*</CellButton>*/}
								<List>
									{items1.map(item => (
										<Cell before={<Avatar />} key={item.ID} >
											{item.IdStud}  {item.Time} {item.Event}
										</Cell>
									))}
								</List>
							</Group>
						</Panel>
					</View>
				</Root>

			);
		}
	}
}

export default App;