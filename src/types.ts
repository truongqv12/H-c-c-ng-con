export interface ActivityContext {
  id: string;
  type: 'literacy' | 'math';
  template: 'listen_select' | 'count_touch' | 'shape_match' | 'spell_word' | 'tone_match';
  skill: string;
  instruction: string;
  promptAudioText?: string;
  stimulus: any;
}
