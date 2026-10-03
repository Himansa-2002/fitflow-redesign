import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import {COLORS} from '../theme';

export default function PlaceholderScreen() {
  const route = useRoute();
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <Header title={route.name.toUpperCase()} />
      <View style={styles.center}>
        <Text style={styles.text}>{route.name} screen coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: COLORS.bg},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {color: COLORS.muted, fontSize: 16},
});