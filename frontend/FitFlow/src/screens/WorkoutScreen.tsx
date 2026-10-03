import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Header from '../components/Header';
import {COLORS, shadow} from '../theme';
import {RootStackParamList} from '../navigation/types';

const GOALS = ['Strength', 'Flexibility', 'Cardio', 'Endurance'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const DURATIONS = [15, 30, 45, 60];

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View style={{gap: 8}}>
      {options.map(o => {
        const selected = o === value;
        return (
          <Pressable
            key={o}
            onPress={() => onChange(o)}
            style={[styles.option, selected && styles.optionSelected]}>
            <View style={[styles.radio, selected && styles.radioSelected]}>
              {selected && <View style={styles.radioDot} />}
            </View>
            <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
              {o}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function WorkoutScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [goal, setGoal] = useState('Strength');
  const [level, setLevel] = useState('Beginner');
  const [duration, setDuration] = useState(30);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <Header title="AI PLANNER" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Workout Setup</Text>
          <Text style={styles.cardSub}>
            Configure your parameters to generate a custom routine.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Primary Goal</Text>
          <RadioGroup options={GOALS} value={goal} onChange={setGoal} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fitness Level</Text>
          <RadioGroup options={LEVELS} value={level} onChange={setLevel} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Duration</Text>
          <View style={styles.durationRow}>
            {DURATIONS.map(d => {
              const selected = d === duration;
              return (
                <Pressable
                  key={d}
                  onPress={() => setDuration(d)}
                  style={[styles.durationBox, selected && styles.optionSelected]}>
                  <Text style={[styles.durationNum, selected && styles.optionTextSelected]}>
                    {d}
                  </Text>
                  <Text style={styles.durationUnit}>min</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          style={({pressed}) => [styles.generate, pressed && {opacity: 0.85}]}
          onPress={() => navigation.navigate('WorkoutPlan', {goal, level, duration})}>
          <Text style={styles.generateText}>GENERATE PLAN</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: COLORS.bg},
  content: {padding: 16, paddingBottom: 24},
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    ...shadow,
  },
  cardTitle: {fontSize: 17, fontWeight: '800', color: COLORS.text, marginBottom: 4},
  cardSub: {fontSize: 13, color: COLORS.muted},
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 12,
    marginTop: 8,
  },
  optionSelected: {borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft},
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioSelected: {borderColor: COLORS.primary},
  radioDot: {width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary},
  optionText: {fontSize: 15, color: COLORS.text, fontWeight: '600'},
  optionTextSelected: {color: COLORS.primary},
  durationRow: {flexDirection: 'row', gap: 8, marginTop: 8},
  durationBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
  },
  durationNum: {fontSize: 18, fontWeight: '800', color: COLORS.text},
  durationUnit: {fontSize: 11, color: COLORS.muted},
  generate: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  generateText: {color: COLORS.white, fontWeight: '900', fontSize: 16, letterSpacing: 1.5},
});