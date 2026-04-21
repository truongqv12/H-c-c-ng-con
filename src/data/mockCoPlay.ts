export const coPlayActivities = [
  {
    id: 'cp_quant_1',
    title: 'Đếm đồ vật trong nhà',
    skill: 'MTH_COUNT_5',
    instruction: 'Ba mẹ hãy nhờ bé tìm và đếm các đồ vật nhé.',
    steps: [
      { text: 'Mẹ hãy nói: "Con lấy giúp mẹ 3 cái thìa (hoặc bát) nhé!"', isAction: false },
      { text: 'Chờ bé đi lấy đồ vật mang lại.', isAction: true },
      { text: 'Khi bé cầm 3 chiếc thìa tới, cùng bé nhấn từng đồ vật và đếm to: "Một... Hai... Ba..."', isAction: false },
      { text: 'Bé đã đếm đúng chưa?', isAction: true, type: 'feedback' }
    ]
  },
  {
    id: 'cp_lit_1',
    title: 'Tìm chữ cái trong sách',
    skill: 'LIT_LETTER_RECOG',
    instruction: 'Cùng bé tìm các chữ cái quen thuộc trên trang sách.',
    steps: [
      { text: 'Ba mẹ lấy một cuốn truyện tranh ngắn có chữ lớn.', isAction: false },
      { text: 'Hỏi bé: "Con có thấy chữ O (chữ o tròn) ở đâu không?"', isAction: false },
      { text: 'Chỉ tay theo bé khi bé tìm chữ.', isAction: true },
      { text: 'Bé đã tìm đúng chữ O chưa?', isAction: true, type: 'feedback' }
    ]
  }
];
