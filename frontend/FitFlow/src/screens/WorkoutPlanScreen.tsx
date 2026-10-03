import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Clock, Target} from 'lucide-react-native';
import Header from '../components/Header';
import {COLORS, shadow} from '../theme';
import {RootStackParamList} from '../navigation/types';

const EXERCISES = ['Squats', 'Push-ups', 'Alt. Lunges', 'Plank Hold'];

export default function WorkoutPlanScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {params} = useRoute<RouteProp<RootStackParamList, 'WorkoutPlan'>>();
  const goal = params?.goal ?? 'Strength';
  const duration = params?.duration ?? 30;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <Header title="AI PLAN" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Full Body Workout</Text>
          <View style={styles.metaRow}>
            <Clock size={14} color="rgba(255,255,255,0.85)" />
            <Text style={styles.meta}>{duration} min</Text>
            <Target size={14} color="rgba(255,255,255,0.85)" style={{marginLeft: 12}} />
            <Text style={styles.meta}>Focus: {goal}</Text>
          </View>
          <View style={styles.btnRow}>
            <Pressable style={[styles.btn, {backgroundColor: COLORS.white}]}>
              <Text style={[styles.btnText, {color: COLORS.primaryDark}]}>START</Text>
            </Pressable>
            <Pressable
              style={[styles.btn, styles.btnOutline]}
              onPress={() => navigation.goBack()}>
              <Text style={[styles.btnText, {color: COLORS.white}]}>CHANGE</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.section}>Exercises</Text>
        {EXERCISES.map((e, i) => (
          <View key={e} style={styles.exercise}>
            <View style={styles.num}>
              <Text style={styles.numText}>{i + 1}</Text>
            </View>
            <Text style={styles.exerciseName}>{e}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: COLORS.bg},
  content: {padding: 16, paddingBottom: 24},
  hero: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    ...shadow,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
  },
  heroTitle: {color: COLORS.white, fontSize: 24, fontWeight: '900'},
  metaRow: {flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 4},
  meta: {color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '600'},
  btnRow: {flexDirection: 'row', gap: 10, marginTop: 18},
  btn: {flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: 'center'},
  btnOutline: {borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.6)'},
  btnText: {fontWeight: '900', letterSpacing: 1.2},
  section: {fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: 12},
  exercise: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    ...shadow,
  },
  num: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numText: {color: COLORS.primary, fontWeight: '800'},
  exerciseName: {fontSize: 16, fontWeight: '700', color: COLORS.text},
});