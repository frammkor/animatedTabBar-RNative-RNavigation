import React from 'react'
import { SafeAreaView, View, StyleSheet, Text } from 'react-native'
import AnimatedTabButton from './AnimatedTabButton';

export default props => {
  const {
    state,
    descriptors, // contains tabs' information
    navigation,
    activeTintColor
  } = props;
  const {
    routes
  } = state;

  return (
    <SafeAreaView style={{ backgroundColor: activeTintColor }}>
      <View style={styles.constainer}>
        {
          routes.map((route, index) => {
            const handleNavigate = () => {
              navigation.navigate(route.name)
            }
            const { options } = descriptors[route.key];
            const isFocussed = state.index === index;
            return (
              <AnimatedTabButton key={index} title={options.title} icon={options.icon} isFocussed={isFocussed} handleNavigate={handleNavigate} />
            )
          })
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'space-around',
  }
})