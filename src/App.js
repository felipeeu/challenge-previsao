import React, {Component} from 'react';
import logo from './logo.svg';
import axios from 'axios'

import './App.css';

import Card from './components/Card'

const clientID = 'dj0yJmk9TU9RRHVCb2tGS3YyJmQ9WVdrOWNGTlVjblZRTlRRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0wOQ--';
const clientSecret = 'a7e51eca02dcd579d8da9cc43669f651c13ca6d6';

const inputStyle = {
    marginBottom: '5%',
    marginTop: '1%'
};
const buttonStyle = {};
const AppStyle = {
    backgroundColor: '#FDA328'
};
const secStyle = {}

class App extends Component {

    state = {
        query: 'rio',
        condition: '',
        location: '',
        wind: '',
        atmosphere: '',
        units: '',
        forecast: []
    };

    componentDidMount() {
        const url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20
        (select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${this.state.query}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`

        axios.get(`${url}`)
            .then(res => {
                const condition = res.data.query.results.channel.item.condition;
                this.setState({condition});
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(`${url}`)
            .then(res => {
                const location = res.data.query.results.channel.location;
                this.setState({location});
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(`${url}`)
            .then(res => {
                const wind = res.data.query.results.channel.wind;
                this.setState({wind});
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(`${url}`)
            .then(res => {
                const atmosphere = res.data.query.results.channel.atmosphere;
                this.setState({atmosphere});
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(`${url}`)
            .then(res => {
                const units = res.data.query.results.channel.units;
                this.setState({units});
            })
            .catch(function (error) {
                console.log(error);
            });


        axios.get(`${url}`)
            .then(res => {
                const forecast = res.data.query.results.channel.item.forecast;
                this.setState({forecast});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateQuery = (query) => {
        this.setState({query})
    };

    render() {

        const {condition, location, wind, atmosphere, units, forecast} = this.state;
        return (
            <div style={AppStyle} className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Previsão do Tempo</h1>
                </header>
                <section style={secStyle}>
                    <Card condition={condition}
                          location={location}
                          wind={wind}
                          atmosphere={atmosphere}
                          units={units}
                          forecast={forecast}/>
                    <input onChange={(event) => this.updateQuery(event.target.value)} type='text' style={inputStyle}/>
                    <button onClick={(event) => this.componentDidMount()} style={buttonStyle}>Buscar</button>
                    <hr/>
                    <h1>Capitais:</h1>
                </section>
            </div>
        );
    }
}

export default App;
