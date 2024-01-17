import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrack();
    isSetup = true;
  }
  catch {
    await TrackPlayer.setupPlayer();
    isSetup = true;
  }
  finally {
    return isSetup;
  }
}

export async function addTracks() {
  await TrackPlayer.add([
    {
      id: '1',
      url: 'http://159.223.36.4/storage/podcasts/RpElApWEKFTFK9vEpfoKd1iTUEL9QHRFu6FPgYiX.mp3',
      title: 'Fluidity',
      artist: 'tobylane',
      duration: 60,
    }
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  // TODO: Attach remote event handlers
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause())
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play())
}