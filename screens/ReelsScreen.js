import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

const ReelItem = ({ reel, isActive }) => {
  const [showDetails, setShowDetails] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const playerRef = useRef(null);

  // Call the hook at top level:
  const player = useVideoPlayer(reel.content, (playerInstance) => {
    playerInstance.loop = true;
    playerRef.current = playerInstance;
  });

  // Then manage side effects:
  useEffect(() => {
    playerRef.current = player;

    return () => {
      if (playerRef.current?.unload) {
        try {
          playerRef.current.pause?.();
          playerRef.current.unload();
        } catch (err) {
          console.warn('Error during player cleanup:', err);
        }
      }
      playerRef.current = null;
    };
  }, [player]);

  useEffect(() => {
    if (playerRef.current) {
      try {
        isActive ? playerRef.current.play() : playerRef.current.pause();
      } catch (err) {
        console.warn('Error controlling player:', err);
      }
    }
  }, [isActive]);

  // Handle fade animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showDetails ? 1 : 0,
      duration: showDetails ? 250 : 200,
      useNativeDriver: true,
    }).start();
  }, [showDetails]);

  useEffect(() => {
    if (!isActive && showDetails) {
      setShowDetails(false);
    }
  }, [isActive]);

  const isVideo = () => {
    if (!reel.content) return false;
    const videoExts = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
    const lower = reel.content.toLowerCase();
    return videoExts.some((ext) => lower.endsWith(ext));
  };

  return (
    <TouchableWithoutFeedback onPress={() => setShowDetails((v) => !v)}>
      <View style={styles.reel}>
        {isVideo() ? (
          isActive && playerRef.current ? (
            <VideoView
              player={playerRef.current}
              style={styles.video}
              resizeMode="cover"
              isMuted
              allowsFullscreen
              allowsPictureInPicture
              onError={(e) => {
                console.error('Video error:', e);
              }}
            />
          ) : (
            <View style={[styles.video, { backgroundColor: '#000' }]} />
          )
        ) : (
          <Image
            source={{ uri: reel.content }}
            style={styles.video}
            resizeMode="cover"
          />
        )}

        <View style={styles.darkOverlay} />

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {reel.title}
          </Text>

          <View style={styles.userRow}>
            <Animated.Image
              source={{ uri: reel.userThumbnail }}
              style={styles.avatar}
            />
            <Text style={styles.username}>@{reel.username}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={32} color="#fff" />
            <Text style={styles.actionText}>{reel.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={32} color="#fff" />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="share" size={28} color="#fff" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {showDetails && (
          <Animated.View style={[styles.detailsOverlay, { opacity: fadeAnim }]}>
            <Text style={styles.description}>#{reel.hashTags?.join(' #')}</Text>
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const ReelsScreen = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await axios.get(
          'https://revival.fivemade.in/app/unAuth/feed/reel'
        );
        setReels(response.data);
      } catch (err) {
        console.error('Error fetching reels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 80,
  }).current;

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
      >
        <ActivityIndicator color="#fff" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={reels}
        keyExtractor={(item, index) => `${item.userId}_${index}`}
        renderItem={({ item, index }) => (
          <ReelItem reel={item} isActive={index === activeIndex} />
        )}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate={0.98}
        showsVerticalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  reel: {
    height,
    width,
    position: 'relative',
    backgroundColor: '#000',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 12,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  actionButtons: {
    position: 'absolute',
    right: 10,
    bottom: 130,
    justifyContent: 'space-between',
    height: 160,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    marginTop: 6,
    fontSize: 14,
  },
  detailsOverlay: {
    position: 'absolute',
    bottom: 220,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 15,
    borderRadius: 12,
    zIndex: 10,
  },
  description: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReelsScreen;
