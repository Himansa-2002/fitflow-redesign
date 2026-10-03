import React from 'react';
import {Alert, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, Coffee, Plus, Sandwich, UtensilsCrossed} from 'lucide-react-native';
import Header, {Logo} from '../components/Header';
import {COLORS, shadow} from '../theme';

const MEALS = [
  {name: 'Breakfast', kcal: null, Icon: Coffee, tint: COLORS.orangeSoft, color: '#F97316'},
  {name: 'Lunch', kcal: null, Icon: Sandwich, tint: COLORS.greenSoft, color: COLORS.green},
  {name: 'Dinner', kcal: null, Icon: UtensilsCrossed, tint: COLORS.primarySoft, color: COLORS.primary},
];

export default function NutritionScreen() {
  const comingSoon = (what: string) =>
    Alert.alert(what, 'This feature is coming soon.');

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <Header title={<Logo />} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>NUTRITION LOGGER</Text>

        <Pressable
          onPress={() => comingSoon('Scan Food')}
          style={({pressed}) => [styles.scan, pressed && styles.pressed]}>
          <View style={styles.scanIcon}>
            <Camera size={32} color={COLORS.primary} />
          </View>
          <Text style={styles.scanText}>SCAN FOOD</Text>
          <Text style={styles.scanHint}>Point your camera at your meal</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Today's Meals</Text>

        {MEALS.map(m => (
          <Pressable
            key={m.name}
            onPress={() => comingSoon(m.name)}
            style={({pressed}) => [styles.meal, pressed && styles.pressed]}>
            <View style={[styles.mealIcon, {backgroundColor: m.tint}]}>
              <m.Icon size={22} color={m.color} />
            </View>
            <Text style={styles.mealName}>{m.name}</Text>
            <Text style={styles.mealKcal}>
              {m.kcal === null ? '--- kcal' : `${m.kcal} kcal`}
            </Text>
          </Pressable>
        ))}

        <Pressable
          onPress={() => comingSoon('Add Manually')}
          style={({pressed}) => [styles.addButton, pressed && styles.pressed]}>
          <Plus size={20} color={COLORS.white} />
          <Text style={styles.addText}>ADD MANUALLY</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: COLORS.bg},
  content: {padding: 16, paddingBottom: 24},
  pressed: {opacity: 0.85, transform: [{scale: 0.98}]},

  heading: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },

  scan: {
    height: 170,
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  scanIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    ...shadow,
  },
  scanText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: COLORS.primaryDark,
  },
  scanHint: {fontSize: 12, color: COLORS.muted, marginTop: 2},

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },

  meal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    ...shadow,
  },
  mealIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealName: {
    flex: 1,
    marginLeft: 14,
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  mealKcal: {fontSize: 14, color: COLORS.muted, fontWeight: '600'},

  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 12,
    ...shadow,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
  },
  addText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 1.5,
  },
});