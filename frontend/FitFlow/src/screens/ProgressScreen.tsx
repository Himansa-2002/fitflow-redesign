import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dumbbell, Flame} from 'lucide-react-native';
import Header, {Logo} from '../components/Header';
import {COLORS, shadow} from '../theme';

// minutes of activity per day (Mon..Sun)
const WEEK = [
  {day: 'M', value: 45},
  {day: 'T', value: 8},
  {day: 'W', value: 20},
  {day: 'T', value: 35},
  {day: 'F', value: 25, today: true},
  {day: 'S', value: 40},
  {day: 'S', value: 0},
];

const CHART_HEIGHT = 170;

function WeeklyActivityCard() {
  const max = Math.max(...WEEK.map(d => d.value), 1);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Weekly Activity</Text>
        <Text style={styles.cardRange}>Last 7 Days</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.chart}>
        {WEEK.map((d, i) => {
          const h = Math.max((d.value / max) * CHART_HEIGHT, 4);
          return (
            <View key={i} style={styles.barCol}>
              <View style={styles.barSlot}>
                <View
                  style={[
                    styles.bar,
                    {height: h},
                    d.today && styles.barToday,
                    d.value === 0 && styles.barEmpty,
                  ]}
                />
              </View>
              <Text style={[styles.barLabel, d.today && styles.barLabelToday]}>
                {d.day}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function StatBlock({
  icon,
  tint,
  label,
  value,
  caption,
}: {
  icon: React.ReactNode;
  tint: string;
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.statTop}>
        <View style={[styles.statIcon, {backgroundColor: tint}]}>{icon}</View>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.statCaption}>{caption}</Text>
    </View>
  );
}

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <Header title={<Logo />} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>MY PROGRESS</Text>
        <Text style={styles.sub}>Track your weekly activity and goals.</Text>

        <WeeklyActivityCard />

        <StatBlock
          icon={<Dumbbell size={26} color={COLORS.primary} />}
          tint={COLORS.primarySoft}
          label="WORKOUTS"
          value="4 / 5"
          caption="This Week"
        />
        <StatBlock
          icon={<Flame size={26} color="#F97316" />}
          tint={COLORS.orangeSoft}
          label="STREAK"
          value="12 days"
          caption="Current"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: COLORS.bg},
  content: {padding: 16, paddingBottom: 24},

  heading: {fontSize: 26, fontWeight: '900', color: COLORS.text},
  sub: {fontSize: 14, color: COLORS.muted, marginTop: 2, marginBottom: 16},

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    ...shadow,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  cardTitle: {fontSize: 18, fontWeight: '800', color: COLORS.text},
  cardRange: {fontSize: 12, color: COLORS.muted, fontWeight: '600'},
  divider: {height: 1, backgroundColor: COLORS.track, marginVertical: 12},

  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8,
  },
  barCol: {flex: 1, alignItems: 'center'},
  barSlot: {height: CHART_HEIGHT, justifyContent: 'flex-end', width: '100%'},
  bar: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    opacity: 0.85,
  },
  barToday: {backgroundColor: COLORS.green, opacity: 1},
  barEmpty: {backgroundColor: COLORS.track, opacity: 1},
  barLabel: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: '600',
  },
  barLabelToday: {color: COLORS.green, fontWeight: '800'},

  statTop: {alignItems: 'center', paddingTop: 4},
  statIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statLabel: {fontSize: 13, letterSpacing: 2, color: COLORS.muted, fontWeight: '600'},
  statValue: {fontSize: 28, fontWeight: '900', color: COLORS.text, marginTop: 4},
  statCaption: {fontSize: 12, color: COLORS.muted, textAlign: 'center'},
});