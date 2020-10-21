import { StatusBar } from 'expo-status-bar';
import React, {PureComponent} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { GameEngine } from "react-native-game-engine";
import { Item, Bin } from "./renderers";
import { MoveItem, Collision } from "./systems";
//import Constants from './Constants';
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;


export default class App extends PureComponent  {
  constructor() {
    super();
    this.setState ={
      running: true
    }
  }

  render() {
  return (
    <View style={styles.container}>
      <Text>TIME!</Text>
      <GameEngine
        style={styles.container}
        systems={[MoveItem, Collision]}
        entities={{
          1: { position: [WIDTH/2, HEIGHT-100], renderer: <Item />}, //-- Notice that each entity has a unique id (required)
          2: {position: [WIDTH - 40, HEIGHT/2], renderer: <Bin/>},
          3: {position: [WIDTH - 40, HEIGHT/4], renderer: <Bin/>},
          4: {position: [WIDTH/8, HEIGHT/2], renderer: <Bin/>},
          5: {position: [WIDTH/8, HEIGHT/4], renderer: <Bin/>},
          6: {position: [WIDTH/2, HEIGHT/6], renderer: <Bin/>},

        }}>
 
        <StatusBar hidden={true} />
 
      </GameEngine>
      <StatusBar style="auto" />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});