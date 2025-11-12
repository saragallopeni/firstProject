
import './weatherCard.css';

const WeatherCard = () => {
  
return(

<div className="main-div" >
      <div
        className="card">
        <p className="city">C°</p>

        <p></p>
        <p>Sunset:</p>
        <p>Sunrise: </p>

        <div className="grid_wind_clouds">
          <div className="clouds">
            <div>
              <img src="/clouds.png" alt="clouds" />
            </div>
            <div></div>
          </div>

          <div className="wind">
            <div className="windLogo">
              <img src="/wind.png" alt="wind" />
            </div>
            <div>
              <div><img src="/windmill.png"></img></div>
              <p>Deg: </p>
              <p>Gust: </p>
            </div>
          </div>
        </div>

        <div className="conditions">
          <p>
            Conditions: 
            
          </p>
        </div>

        <p>Lon: </p>
        <p>Lat: </p>
      </div>
    </div>

)

}

export default WeatherCard;