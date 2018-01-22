import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
export default class Untitled extends Component {
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.rect1} />
        <ScrollView style={styles.scrollArea1} horizontal={false} />

        <View style={styles.rect2}>
          <View style={styles.rect3} />
          <View style={styles.rect4} />
          <View style={styles.rect5} />
          <View style={styles.rect6} />
          <View style={styles.rect7} />
          <View style={styles.rect8} />
          <View style={styles.rect9} />
          <View style={styles.rect10} />
          <View style={styles.rect11} />
          <View style={styles.rect12} />
          <View style={styles.rect13} />
          <View style={styles.rect14} />
          <View style={styles.rect15} />
          <View style={styles.rect16} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: { backgroundColor: "white", flex: 1 },
  rect1: {
    top: 0,
    left: 0,
    right: 0,
    height: 79.97,
    position: "absolute",
    backgroundColor: "rgba(69,115,185,1)",
    opacity: 1,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0
  },

  scrollArea1: {
    top: 78.35,
    left: 0.01,
    bottom: 0,
    right: -0.01,
    position: "absolute",
    backgroundColor: "rgb(230, 230, 230)"
  },

  rect2: {
    top: 91.28,
    left: 50,
    right: 50,
    height: 820,
    position: "absolute",
    flexDirection: "column"
  },

  rect3: {
    flex: 0.07,
    backgroundColor: "rgba(253,211,91,1)",
    opacity: 1,
    marginBottom: 8
  },

  rect4: { flex: 0.07, backgroundColor: "rgb(253, 253, 253)", marginBottom: 8 },
  rect5: { flex: 0.07, backgroundColor: "rgb(211, 211, 211)", marginBottom: 8 },
  rect6: { flex: 0.07, backgroundColor: "rgb(249, 249, 249)", marginBottom: 8 },
  rect7: { flex: 0.07, backgroundColor: "rgb(207, 207, 207)", marginBottom: 8 },
  rect8: { flex: 0.07, backgroundColor: "rgb(219, 219, 219)", marginBottom: 8 },
  rect9: { flex: 0.07, backgroundColor: "rgb(253, 253, 253)", marginBottom: 8 },
  rect10: {
    flex: 0.07,
    backgroundColor: "rgb(240, 240, 240)",
    marginBottom: 8
  },

  rect11: {
    flex: 0.07,
    backgroundColor: "rgb(211, 211, 211)",
    marginBottom: 8
  },

  rect12: { flex: 0.07, marginBottom: 8, backgroundColor: "none" },
  rect13: {
    flex: 0.07,
    backgroundColor: "rgb(251, 251, 251)",
    marginBottom: 8
  },

  rect14: {
    flex: 0.07,
    backgroundColor: "rgb(235, 235, 235)",
    marginBottom: 8
  },

  rect15: {
    flex: 0.07,
    backgroundColor: "rgb(224, 224, 224)",
    marginBottom: 8
  },

  rect16: { flex: 0.09, backgroundColor: "rgb(240, 240, 240)", marginBottom: 8 }
});
