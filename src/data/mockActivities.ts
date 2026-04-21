import { ActivityContext } from '../types';

export const sessionActivities: ActivityContext[] = [
  {
    id: 'lit_letter_1',
    type: 'literacy',
    template: 'listen_select',
    skill: 'LIT_LETTER_RECOG',
    instruction: 'Con hãy tìm chữ "B" nhé!',
    promptAudioText: 'B', 
    stimulus: {
      options: [
        { id: 'opt_B', text: 'b', isCorrect: true, image: '🐮' },
        { id: 'opt_D', text: 'd', isCorrect: false, image: '🐐' }
      ]
    }
  },
  {
    id: 'lit_spell_1',
    type: 'literacy',
    template: 'spell_word',
    skill: 'LIT_SPELL_BASIC',
    instruction: 'Ghép âm "bờ" và vần "a" để được tiếng "ba"',
    promptAudioText: 'bờ a ba',
    stimulus: {
      targetWord: 'ba',
      targetSpelling: ['b', 'a'],
      options: ['c', 'a', 'b', 'o']
    }
  },
  {
    id: 'lit_tone_1',
    type: 'literacy',
    template: 'tone_match',
    skill: 'LIT_TONE_RECOG',
    instruction: 'Thêm dấu sắc để "ca" biến thành "cá" nhé',
    promptAudioText: 'cá',
    stimulus: {
      baseWord: 'ca',
      targetWord: 'cá',
      targetTone: '´',
      options: [
        { id: 'tone_sac', icon: '´', text: 'Dấu sắc', isCorrect: true },
        { id: 'tone_huyen', icon: '`', text: 'Dấu huyền', isCorrect: false },
        { id: 'tone_hoi', icon: '?', text: 'Dấu hỏi', isCorrect: false }
      ]
    }
  }
];
