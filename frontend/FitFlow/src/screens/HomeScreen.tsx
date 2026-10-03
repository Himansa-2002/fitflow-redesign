import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Header, {Logo} from '../components/Header';
import {RootStackParamList} from '../navigation/types';
import {COLORS, shadow} from '../theme';

const WEEK = [
  {day: 'M', done: true},
  {day: 'T', done: true},
  {day: 'W', done: true},
  {day: 'T', done: true},
  {day: 'F', done: false, today: true},
  {day: 'S', done: false},
  {day: 'S', done: false},
];

function AiDailyFlowCard({onStart}: {onStart: () => void}) {
  return (
    <View style={styles.aiCard}>
      <View style={styles.circleBig} />
      <View style={styles.circleSmall} />

      <View style={styles.aiTopRow}>
        <View style={styles.aiBadge}>
          <Text style={styles.aiBadgeText}>⚡ AI DAILY FLOW</Text>
        </View>
      </View>

      <View style={styles.aiTitleRow}>
        <Text style={styles.aiTitle}>Full Body</Text>
        <Text style={styles.aiDuration}>30 Minutes</Text>
      </View>
      <Text style={styles.aiSubtitle}>
        Personalized for your goals and schedule today
      </Text>

      <Pressable
        onPress={onStart}
        style={({pressed}) => [
          styles.startButton,
          pressed && styles.startButtonPressed,
        ]}>
        <Text style={styles.startButtonText}>▶  START</Text>
      </Pressable>
    </View>
  );
}

function ProgressCard({progress}: {progress: number}) {
  return (
    <View style={styles.card}>
      <View style={styles.progressHeader}>
        <Text style={styles.cardTitle}>Today's Progress</Text>
        <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, {width: `${progress * 100}%`}]} />
      </View>
      <Text style={styles.cardHint}>Almost there, keep going! 💪</Text>
    </View>
  );
}

function QuickAction({
  icon,
  label,
  caption,
  tint,
  onPress,
}: {
  icon: string;
  label: string;
  caption: string;
  tint: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.actionCard, pressed && styles.pressed]}>
      <View style={[styles.actionIcon, {backgroundColor: tint}]}>
        <Text style={styles.actionEmoji}>{icon}</Text>
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
      <Text style={styles.actionCaption}>{caption}</Text>
    </Pressable>
  );
}

function StatCard({
  icon,
  value,
  label,
  tint,
}: {
  icon: string;
  value: string;
  label: string;
  tint: string;
}) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, {backgroundColor: tint}]}>
        <Text style={styles.statEmoji}>{icon}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function WeekStrip() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>This Week</Text>
      <View style={styles.weekRow}>
        {WEEK.map((d, i) => (
          <View key={i} style={styles.weekItem}>
            <View
              style={[
                styles.weekDot,
                d.done && styles.weekDotDone,
                d.today && styles.weekDotToday,
              ]}>
              <Text
                style={[
                  styles.weekDotText,
                  (d.done || d.today) && styles.weekDotTextActive,
                ]}>
                {d.done ? '✓' : ''}
              </Text>
            </View>
            <Text style={[styles.weekDay, d.today && styles.weekDayToday]}>
              {d.day}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <Header title={<Logo />} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>Hi Alex 👋</Text>
        <Text style={styles.greetingSub}>Ready for today's workout?</Text>

        <AiDailyFlowCard onStart={() => navigation.navigate('WorkoutPlan')} />
        <ProgressCard progress={0.8} />

        <View style={styles.row}>
          <QuickAction
            icon="🏋️"
            label="Workout"
            caption="Plan & log"
            tint={COLORS.primarySoft}
            onPress={() => navigation.navigate('Workout' as never)}
          />
          <QuickAction
            icon="🍴"
            label="Nutrition"
            caption="Scan your meal"
            tint={COLORS.greenSoft}
            onPress={() => navigation.navigate('Nutrition' as never)}
            />
        </View>

        <View style={styles.row}>
          <StatCard icon="🔥" value="12" label="Day streak" tint={COLORS.orangeSoft} />
          <StatCard icon="✅" value="4/5" label="Workouts" tint={COLORS.greenSoft} />
          <StatCard icon="⚡" value="1,850" label="Calories" tint={COLORS.primarySoft} />
        </View>

        <WeekStrip />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: COLORS.bg},
  content: {padding: 16, paddingBottom: 24},

  greeting: {fontSize: 26, fontWeight: '800', color: COLORS.text},
  greetingSub: {fontSize: 14, color: COLORS.muted, marginTop: 2, marginBottom: 16},

  aiCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
    marginBottom: 16,
    ...shadow,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
  },
  circleBig: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.10)',
    top: -50,
    right: -40,
  },
  circleSmall: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -30,
    left: -20,
  },
  aiTopRow: {flexDirection: 'row', marginBottom: 14},
  aiBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  aiBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  aiTitleRow: {flexDirection: 'row', alignItems: 'baseline'},
  aiTitle: {color: COLORS.white, fontSize: 30, fontWeight: '900'},
  aiDuration: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '600',
  },
  aiSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    marginTop: 6,
    marginBottom: 18,
  },
  startButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  startButtonPressed: {opacity: 0.85, transform: [{scale: 0.98}]},
  startButtonText: {
    color: COLORS.primaryDark,
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1.5,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    ...shadow,
  },
  cardTitle: {fontSize: 17, fontWeight: '800', color: COLORS.text},
  cardHint: {fontSize: 12, color: COLORS.muted, marginTop: 10},

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressPercent: {fontSize: 16, fontWeight: '800', color: COLORS.green},
  track: {
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.track,
    overflow: 'hidden',
  },
  fill: {height: '100%', borderRadius: 6, backgroundColor: COLORS.green},

  row: {flexDirection: 'row', gap: 12, marginBottom: 16},

  actionCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    ...shadow,
  },
  pressed: {opacity: 0.85, transform: [{scale: 0.98}]},
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionEmoji: {fontSize: 24},
  actionLabel: {fontSize: 16, fontWeight: '800', color: COLORS.text},
  actionCaption: {fontSize: 12, color: COLORS.muted, marginTop: 2},

  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
    ...shadow,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statEmoji: {fontSize: 18},
  statValue: {fontSize: 18, fontWeight: '900', color: COLORS.text},
  statLabel: {fontSize: 11, color: COLORS.muted, marginTop: 2},

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  weekItem: {alignItems: 'center', gap: 6},
  weekDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.track,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDotDone: {backgroundColor: COLORS.green},
  weekDotToday: {
    backgroundColor: COLORS.primarySoft,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  weekDotText: {color: COLORS.muted, fontWeight: '800'},
  weekDotTextActive: {color: COLORS.white},
  weekDay: {fontSize: 12, color: COLORS.muted, fontWeight: '600'},
  weekDayToday: {color: COLORS.primary, fontWeight: '800'},
});