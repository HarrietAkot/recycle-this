
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Leaderboard from 'react-native-leaderboard';
import Constants from './../Constants';
const WIDTH = Constants.WIDTH;
const HEIGHT = Constants.HEIGHT;


const GameOver = ({route, navigation}) => {
  const [points, setPoints] = useState([{}]);
  const [position, setPosition] = useState(1);
  let iconURL = 'https://www.flaticon.com/svg/static/icons/svg/860/860784.svg'
  let img = require('./../assets/trophy.png')
  
  const getData = async () => {
    AsyncStorage.getItem('points', (err,result) => {
      if (result !== null) {
        //console.log('Data found', result);
        setPoints(JSON.parse(result))

      }
})
  }

  useEffect(() => {
   getData();
  setPosition(points
    .sort((a,b) => a.points < b.points ? 1: -1)
    .findIndex(elem => elem.points <= route.params.points)+1)
  });

return(
  <View style={styles.container}>
    <View style={styles.header}> 
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.content}>
        <Text style={{color: 'white'}}>position {JSON.stringify(position)}</Text> 
        <Image source={img} style={styles.image}></Image>
        <Text style={{color: 'white'}}> {route.params.points} points </Text>
    </View>
    <TouchableOpacity
      style={styles.customBtnBG}
        onPress={() => navigation.navigate('Start')}>
          <Text style={styles.customBtnText}>Go back to menu</Text>
      </TouchableOpacity>

    </View>
  <Leaderboard 
  data={points} 
  sortBy='points' 
  labelBy='username'
  icon={iconURL}
  evenRowColor='gainsboro'
  containerStyle={styles.leaderboard}
  />
  </View>
)}


  
const styles = StyleSheet.create({
  container: {
    flex:1
  },
  header: {
    backgroundColor: 'green',
    height: HEIGHT * 0.3
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginTop: 10
  },
  content: {
    display: 'flex',
    flexDirection: 'row'
  },
  image: {
    height: 50,
    width: 50,

  },
  customBtnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Thonburi-Bold',
    color: "#fff",
    width: 200,
    marginTop: 0
  },
  customBtnBG: {
    backgroundColor: "#78E08F",
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 200,
    marginTop: 0,
    borderRadius: 30
  }
});
   
  export default GameOver;