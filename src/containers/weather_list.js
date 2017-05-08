import React, {Component} from "react";
import {connect} from "react-redux";

import Chart from "../components/chart";
import GoogleMap from "../components/google_map";

class WeatherList extends Component {
    renderWeather(cityData) {
        const temps = cityData.list.map(({ main: { temp } }) => temp);
        const pressures = cityData.list.map(({ main: { pressure } }) => pressure);
        const humidities = cityData.list.map(({ main: { humidity } }) => humidity);

        const { lon, lat } = cityData.city.coord;

        return (
            <tr key={ cityData.city.id }>
                <td>
                    <GoogleMap lon={ lon } lat={ lat } />
                </td>
                <td>
                    <Chart height={120} width={180} data={temps} color="orange" units="K" />
                </td>
                <td>
                    <Chart height={120} width={180} data={pressures} color="green" units="hPa" />
                </td>
                <td>
                    <Chart height={120} width={180} data={humidities} color="blue" units="%" />
                </td>
            </tr>
        );
    }

	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature (K)</th>
						<th>Presure (hPa)</th>
						<th>Humidity (%)</th>
					</tr>
				</thead>
				<tbody>
                    { this.props.weather.map(this.renderWeather) }
                </tbody>
			</table>
		);
	}
}

function mapStateToProps({ weather }) {
	return { weather };
}

export default connect(mapStateToProps)(WeatherList);
