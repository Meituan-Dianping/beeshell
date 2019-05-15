import React from 'react'
import { View, SafeAreaView } from 'react-native'

export default function () {
  return (
    <View style={{ maxHeight: 30 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 60 }}></View>
      </SafeAreaView>
    </View>
  )
}
