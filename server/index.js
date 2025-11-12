const { ApolloServer, gql } = require("apollo-server");
const fetch = require("node-fetch");

const API_KEY = "895284fb2d2c50a520ea537456963d9c";

const typeDefs = gql`
  type Coord {
    lon: Float
    lat: Float
  }

  type WeatherDescription {
    id: Int
    main: String
    description: String
    icon: String
  }

  type MainWeather {
    temp: Float
    feels_like: Float
    temp_min: Float
    temp_max: Float
    pressure: Int
    humidity: Int
    sea_level: Int
    grnd_level: Int
  }

  type Wind {
    speed: Float
    deg: Float
    gust: Float
  }

  type Clouds {
    all: Int
  }

  type Sys {
    type: Int
    id: Int
    country: String
    sunrise: Int
    sunset: Int
  }

  type WeatherData {
    coord: Coord
    weather: [WeatherDescription]
    base: String
    main: MainWeather
    visibility: Int
    wind: Wind
    clouds: Clouds
    dt: Int
    sys: Sys
    timezone: Int
    id: Int
    name: String
    cod: Int
  }


  type Query {
    getWeather(location: String!): WeatherData
  }
`;

const resolvers = {
  Query: {
    getWeather: async (_, { location }) => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`
      );
      const data = await res.json();
      return data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
