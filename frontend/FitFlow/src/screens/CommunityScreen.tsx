import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Heart,
  Image as ImageIcon,
  MessageCircle,
  Share2,
  SlidersHorizontal,
  User,
} from 'lucide-react-native';
import Header from '../components/Header';
import {COLORS, shadow} from '../theme';

type Post = {
  id: string;
  user: string;
  time: string;
  text: string;
  hasImage: boolean;
  likes: number;
  comments: number;
};

const POSTS: Post[] = [
  {
    id: '1',
    user: 'user_runner_99',
    time: '2 hours ago',
    text: 'Just hit my personal best on the 5K! The new route through the park is amazing. Anyone else training for the city marathon next month?',
    hasImage: true,
    likes: 24,
    comments: 5,
  },
  {
    id: '2',
    user: 'fitness_guru_alex',
    time: '5 hours ago',
    text: 'Looking for accountability partners for morning workouts. Thinking 6 AM weekdays. Drop a comment if interested!',
    hasImage: false,
    likes: 12,
    comments: 8,
  },
];

function Avatar({size = 44}: {size?: number}) {
  return (
    <View
      style={[
        styles.avatar,
        {width: size, height: size, borderRadius: size / 2},
      ]}>
      <User size={size * 0.5} color={COLORS.primary} />
    </View>
  );
}

function ChallengeCard() {
  const [joined, setJoined] = useState(false);

  return (
    <View style={styles.challenge}>
      <View style={styles.circleBig} />
      <View style={styles.challengeTop}>
        <View style={{flex: 1}}>
          <Text style={styles.challengeTitle}>Monthly Step Challenge</Text>
          <Text style={styles.challengeSub}>100,000 steps in 30 days</Text>
        </View>
        <View style={styles.daysBadge}>
          <Text style={styles.daysBadgeText}>24 Days Left</Text>
        </View>
      </View>

      <View style={styles.participants}>
        <View style={styles.stack}>
          {[0, 1, 2].map(i => (
            <View key={i} style={[styles.stackDot, {marginLeft: i === 0 ? 0 : -12}]}>
              <User size={14} color={COLORS.primary} />
            </View>
          ))}
        </View>
        <Text style={styles.participantsText}>4,281 participants</Text>
      </View>

      <Pressable
        onPress={() => setJoined(j => !j)}
        style={({pressed}) => [
          styles.joinButton,
          joined && styles.joinButtonJoined,
          pressed && styles.pressed,
        ]}>
        <Text style={[styles.joinText, joined && styles.joinTextJoined]}>
          {joined ? '✓  JOINED' : 'JOIN CHALLENGE'}
        </Text>
      </Pressable>
    </View>
  );
}

function PostCard({post}: {post: Post}) {
  const [liked, setLiked] = useState(false);
  const likeCount = post.likes + (liked ? 1 : 0);

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Avatar />
        <View style={{marginLeft: 12}}>
          <Text style={styles.username}>{post.user}</Text>
          <Text style={styles.time}>{post.time}</Text>
        </View>
      </View>

      <Text style={styles.postText}>{post.text}</Text>

      {post.hasImage && (
        <View style={styles.imagePlaceholder}>
          <ImageIcon size={40} color={COLORS.primary} />
        </View>
      )}

      <View style={styles.postDivider} />
      <View style={styles.actions}>
        <View style={styles.actionsLeft}>
          <Pressable style={styles.action} onPress={() => setLiked(l => !l)}>
            <Heart
              size={22}
              color={liked ? '#EF4444' : COLORS.muted}
              fill={liked ? '#EF4444' : 'transparent'}
            />
            <Text style={styles.actionText}>{likeCount}</Text>
          </Pressable>
          <Pressable style={styles.action}>
            <MessageCircle size={22} color={COLORS.muted} />
            <Text style={styles.actionText}>{post.comments}</Text>
          </Pressable>
        </View>
        <Pressable>
          <Share2 size={22} color={COLORS.muted} />
        </Pressable>
      </View>
    </View>
  );
}

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <Header title="COMMUNITY" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <ChallengeCard />

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>RECENT POSTS</Text>
          <Pressable style={styles.filter}>
            <SlidersHorizontal size={16} color={COLORS.text} />
            <Text style={styles.filterText}>Filter</Text>
          </Pressable>
        </View>

        {POSTS.map(p => (
          <PostCard key={p.id} post={p} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: COLORS.bg},
  content: {padding: 16, paddingBottom: 24},
  pressed: {opacity: 0.85, transform: [{scale: 0.98}]},

  challenge: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
    marginBottom: 20,
    ...shadow,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
  },
  circleBig: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(255,255,255,0.10)',
    top: -50,
    right: -40,
  },
  challengeTop: {flexDirection: 'row', alignItems: 'flex-start'},
  challengeTitle: {color: COLORS.white, fontSize: 20, fontWeight: '900'},
  challengeSub: {color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4},
  daysBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginLeft: 8,
  },
  daysBadgeText: {color: COLORS.white, fontSize: 11, fontWeight: '700'},
  participants: {flexDirection: 'row', alignItems: 'center', marginTop: 16},
  stack: {flexDirection: 'row'},
  stackDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  participantsText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    marginLeft: 10,
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  joinButtonJoined: {backgroundColor: COLORS.green},
  joinText: {
    color: COLORS.primaryDark,
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 1.5,
  },
  joinTextJoined: {color: COLORS.white},

  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    letterSpacing: 1.5,
    fontWeight: '800',
    color: COLORS.muted,
  },
  filter: {flexDirection: 'row', alignItems: 'center', gap: 6},
  filterText: {fontSize: 13, fontWeight: '700', color: COLORS.text},

  post: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    ...shadow,
  },
  postHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 12},
  avatar: {
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {fontSize: 15, fontWeight: '800', color: COLORS.text},
  time: {fontSize: 12, color: COLORS.muted, marginTop: 1},
  postText: {fontSize: 15, lineHeight: 22, color: COLORS.text},
  imagePlaceholder: {
    height: 150,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  postDivider: {height: 1, backgroundColor: COLORS.track, marginTop: 14},
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  actionsLeft: {flexDirection: 'row', gap: 20},
  action: {flexDirection: 'row', alignItems: 'center', gap: 6},
  actionText: {fontSize: 13, fontWeight: '600', color: COLORS.muted},
});