import React, { useState, useEffect, Fragment } from "react";
import Header from "../../common/header/Header";
import Heading from "../../common/banner/Banner";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Checkbox,
  Button,
} from "@material-ui/core";
import ReleasedMovies from "./ReleasedMovies";
import "./Home.css";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginBottom: "15px",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },

  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
});

const Home = () => {

  const [data, setData] = useState([]);
  const [artists, setArtists] = useState([]);
  const [artistChoice, setArtistChoice] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreChoice, setGenreChoice] = useState([]);


  useEffect(async () => {
    const rawData = await fetch("http://localhost:8085/api/v1/movies");
    const data = await rawData.json();
    setData(data.movies);

    const rawGenres = await fetch("http://localhost:8085/api/v1/genres")
    const genres = await rawGenres.json();
    setGenres(genres.genres);

    const rawArtists = await fetch("http://localhost:8085/api/v1/artists")
    const artists = await rawArtists.json();
    setArtists(artists.artists);

  }, []);

  async function fetchMovies() {
    const rawData = await fetch("http://localhost:8085/api/v1/movies");
    const data = await rawData.json();
    return await data.movies;
  }

  function filterByArtist(artistName) {


    const result = data.filter(movie => {
      const artists = movie.artists;
      if(artists == null)
      return false;
      console.log(artists);
      console.log(artists.length);
      for(let i=0; i<artists.length; i++) {
        if((artists[i].first_name + " " + artists[i].last_name) == artistName) {
          return true;
        }
      }
    });
    return result;
  }

  const changeHandler = (event) => {
    setGenreChoice(event.target.value);
  };

  const handleArtistChange = (event) => {
    console.log(event.target.value);
    const arr = event.target.value.length;
    const result = filterByArtist(event.target.value);
    setData(result);
    console.log({...result});
  };

  const handleChangeArtistMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setArtistChoice(value);
    console.log(artistChoice);
  };

  const classes = useStyles();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Fragment>
      <Header bookShow={false} />
      <Heading />

      <div className="second-section">
        <div className="released-movies">
          <ReleasedMovies movieData={data} />
        </div>
        <div className="filter-form">
          <Card>
            <CardContent>
              <InputLabel style={{ color: "#4791db" }}>
                FIND MOVIES BY:
              </InputLabel>
              <FormControl className="form-control-text-field">
                <TextField id="standard-basic" label="Movie Name" />
              </FormControl>
              <FormControl className="form-control-text-field">
                <InputLabel id="demo-mutiple-name-label">Genres</InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={genreChoice}
                  onChange={changeHandler}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.genre}>
                      <Checkbox color="primary" />
                      {genre.genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="form-control-text-field">
                <InputLabel id="demo-mutiple-name-label">Artists</InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={artistChoice}
                  onChange={handleArtistChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {artists.map((artist) => (
                    <MenuItem
                      key={artist.id}
                      value={artist.first_name + " " + artist.last_name}
                    >
                      <Checkbox color="primary" />
                      {artist.first_name + " " + artist.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="form-control-text-field">
                <TextField
                  name="Release Date Start"
                  id="standard-basic"
                  type="date"
                  label="Release Date Start"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl className="form-control-text-field">
                <TextField
                  name="Release Date End"
                  id="standard-basic"
                  type="date"
                  label="Release Date End"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <div>
                <FormControl className="form-control-text-field">
                  <Button variant="contained" name="Apply" color="primary">
                    Apply
                  </Button>
                </FormControl>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
