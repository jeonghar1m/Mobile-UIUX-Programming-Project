import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { movieApiBaseUrl, movieImageBaseUrl, api_key, movieLang, countriesLang } from '../../Config';
import MovieInfo from './Sections/MovieInfo';
import CreditsInfo from './Sections/CreditsInfo';

function MovieDetailPage({navigation, route}) {
  const [movieItems, setMovieItems] = useState([]);
  const [creditsItems, setCreditsItems] = useState([]);
  const [directorsItems, setDirectorsItems] = useState([]);
  const [creditsToggle, setCreditsToggle] = useState(false);
  const [mode, setMode] = useState("Loading");
  const [isFetching, setIsFetching] = useState(true);
  const [isLoadingMovie, setIsLoadingMovie] = useState(true);
  const [isLoadingCredits, setisLoadingCredits] = useState(true);

  const movieInfo = `${movieApiBaseUrl}${route.params.movieId}?api_key=${api_key}&language=ko-KR`;
  const creditsInfo = `${movieApiBaseUrl}${route.params.movieId}/credits?api_key=${api_key}`;

  let release_date = 0;

  useEffect(() => {
      fetchItems();
  })

  const fetchItems = async () => {
    if(isLoadingMovie) {
        fetch(movieInfo)
            .then(res => res.json())
            .then(data => {
                data.poster_path = `${movieImageBaseUrl}original${data.poster_path}`;
        
                // 언어 data값 문자열 한국어로 번역
                for(let index = 0; index < data.spoken_languages.length; index++)
                    data.spoken_languages[index].name = movieLang[data.spoken_languages[index].english_name];
                
                for(let index = 0; index < data.production_countries.length; index++)
                    data.production_countries[index].name = countriesLang[data.production_countries[index].iso_3166_1];

                release_date = new Date(data.release_date);
                
                setMovieItems(data);
                setMode("Normal");
                setIsLoadingMovie(false);
            })
            .catch(err => {
                setMode("404");
            });
    }
    if(isLoadingCredits) {
      fetch(creditsInfo)
        .then(res => res.json())
        .then(data => {
          for(let index = 0; index < data.cast.length; index++)
            if(data.cast[index].profile_path !== null)
              data.cast[index].profile_path = `${movieImageBaseUrl}original${data.cast[index].profile_path}`;
            else
              data.cast[index].profile_path = '../../../assets/profile_image_unknown.jpg';
            
            const director = data.crew.filter(crew => (crew.job === "Director"));

            for(let index = 0; index < director.length; index++)
              if(director[index].profile_path !== null)
                director[index].profile_path = `${movieImageBaseUrl}original${director[index].profile_path}`;
              else
                director[index].profile_path = '../../../assets/profile_image_unknown.jpg';

            setCreditsItems(data);
            setDirectorsItems(director);
            setCreditsToggle(true);
            setisLoadingCredits(false);

            console.log(director);
        })
        .catch(err => setMode("404"));
    }
  }

  if(mode === "Loading") {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
  else if(mode === "404") {
    return (
      <View style={styles.container}>
        <Text>404 Not Found</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button icon="arrow-left" mode="contained" style={{width: 100}} onPress={() => navigation.goBack(null)}>뒤로</Button>
        <MovieInfo movie={movieItems} />
        {creditsToggle &&
          <CreditsInfo credits={creditsItems} director={directorsItems} />
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default MovieDetailPage;