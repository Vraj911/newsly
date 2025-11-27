export const useSpeech = () => ({
  stopSpeech: () => speechSynthesis.cancel()
});
