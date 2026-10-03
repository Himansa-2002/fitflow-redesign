import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ArrowLeft, Menu, User} from 'lucide-react-native';
import {COLORS, shadow} from '../theme';

export function Logo() {
  return (
    <Text style={styles.title}>
      FIT<Text style={{color: COLORS.primary}}>FLOW</Text>
    </Text>
  );
}

type Props = {
  title: React.ReactNode;
  onBack?: () => void;
};

export default function Header({title, onBack}: Props) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.iconButton} onPress={onBack}>
        {onBack ? (
          <ArrowLeft size={22} color={COLORS.text} />
        ) : (
          <Menu size={22} color={COLORS.text} />
        )}
      </Pressable>
      {typeof title === 'string' ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        title
      )}
      <Pressable style={[styles.iconButton, {backgroundColor: COLORS.primary}]}>
        <User size={20} color={COLORS.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
    color: COLORS.text,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
});