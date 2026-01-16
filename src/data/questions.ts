import { Question } from '../types';

// 40道测评题目
export const questions: Question[] = [
  // S维度题目
  {
    id: 1,
    category: 'S',
    text: '在你和伴侣稳定交往半年后，对方这几天工作特别忙，只给你发简单的信息："今天挺累的，先睡了。改天好好聊。"你最可能的反应是？',
    options: [
      { id: 'A', text: '有点失落，但能理解，对方先忙自己的事也正常。', scores: { S: 1, A: 1 } },
      { id: 'B', text: '会有些不安，会发消息问问是不是我哪里做得不好。', scores: { S: 2, E: 1 } },
      { id: 'C', text: '觉得对方挺真实，不必天天黏在一起，我也忙自己的。', scores: { A: 2 } },
      { id: 'D', text: '表面不说什么，但心里反复揣测，对方是不是没那么在乎了。', scores: { S: 3, E: 1 } }
    ]
  },
  {
    id: 2,
    category: 'S',
    text: '如果伴侣经常不回你消息，但线下见面时对你很好，你更真实的感受是？',
    options: [
      { id: 'A', text: '见面好就行，没必要天天在线上黏着。', scores: { A: 2 } },
      { id: 'B', text: '会感觉关系有点不安全，总担心自己被忽略。', scores: { S: 3 } },
      { id: 'C', text: '会和对方认真谈一次，希望他/她调整下节奏。', scores: { S: 2, E: 1 } },
      { id: 'D', text: '会忍着不说，但心里记分，"再这样就算了"。', scores: { S: 2 } }
    ]
  },
  {
    id: 3,
    category: 'S',
    text: '你对"公开关系"这件事的真实期待是？',
    options: [
      { id: 'A', text: '不一定要公开，彼此心里有数就行。', scores: { A: 1 } },
      { id: 'B', text: '希望在合适的时候，让身边亲近的人知道。', scores: { S: 1 } },
      { id: 'C', text: '希望尽快在朋友圈/家人那里公开，才有安全感。', scores: { S: 3, R: 1 } },
      { id: 'D', text: '不公开也行，但我会默默留意他/她有没有刻意隐藏我。', scores: { S: 2 } }
    ]
  },
  {
    id: 4,
    category: 'S',
    text: '当你在外面受了委屈，第一时间找伴侣，他/她却没空回复。你最常见的状态是？',
    options: [
      { id: 'A', text: '那就算了，我自己消化一下，等他/她有空再说。', scores: { A: 1 } },
      { id: 'B', text: '会特别难受，觉得"最需要的时候不在"。', scores: { S: 3, E: 1 } },
      { id: 'C', text: '会先难受，但会告诉自己：对方也有自己的事情。', scores: { S: 1 } },
      { id: 'D', text: '会翻出对方之前的类似行为，开始怀疑这段关系值不值。', scores: { S: 2, R: 1 } }
    ]
  },
  {
    id: 5,
    category: 'S',
    text: '谈恋爱时，你对"对方的情绪稳定性"的真实要求是？',
    options: [
      { id: 'A', text: '不用太稳定，有性格有情绪才有趣。', scores: { E: 1 } },
      { id: 'B', text: '希望对方情绪稳定，别突然冷淡或爆炸。', scores: { S: 2, R: 1 } },
      { id: 'C', text: '更看重真诚，偶尔崩一崩没关系。', scores: { S: 1, E: 1 } },
      { id: 'D', text: '只要对我态度始终如一，其他情绪我可以接受。', scores: { S: 2 } }
    ]
  },
  {
    id: 6,
    category: 'S',
    text: '你更害怕哪一种情况？',
    options: [
      { id: 'A', text: '两个人慢慢变成"室友"，没有亲密感。', scores: { S: 1, E: 1 } },
      { id: 'B', text: '对方突然消失联系，让你不知道发生了什么。', scores: { S: 3 } },
      { id: 'C', text: '一直吵架，但谁也不愿意分开。', scores: { S: 1, E: 1 } },
      { id: 'D', text: '彼此还在一起，却总感觉自己是"关系里更在意的那个"。', scores: { S: 3 } }
    ]
  },
  {
    id: 7,
    category: 'S',
    text: '对于"对方是否主动表达在乎"，你更接近哪个说法？',
    options: [
      { id: 'A', text: '我不需要太多表达，做出来比说更重要。', scores: { R: 1 } },
      { id: 'B', text: '偶尔的表达可以，但别太肉麻。', scores: { S: 1 } },
      { id: 'C', text: '我需要经常听到肯定和在乎的话，不然会不安。', scores: { S: 3, E: 1 } },
      { id: 'D', text: '说不清，但如果对方长期不表达，我会很难受。', scores: { S: 2 } }
    ]
  },
  {
    id: 8,
    category: 'S',
    text: '如果你发现对方删掉了你们的部分聊天记录，你第一反应是？',
    options: [
      { id: 'A', text: '无所谓，很多人会清理聊天记录。', scores: { A: 1 } },
      { id: 'B', text: '有点在意，会问问原因。', scores: { S: 1 } },
      { id: 'C', text: '会非常敏感，觉得对方在隐藏些什么。', scores: { S: 3 } },
      { id: 'D', text: '直接觉得不安全，开始动摇继续在一起的想法。', scores: { S: 3, R: 1 } }
    ]
  },

  // A维度题目
  {
    id: 9,
    category: 'A',
    text: '理想状态下，你希望和伴侣相处的频率是？',
    options: [
      { id: 'A', text: '每天都要有比较多的聊天或见面时间。', scores: { S: 2 } },
      { id: 'B', text: '每天简单聊聊就好，偶尔约会。', scores: { S: 1, A: 1 } },
      { id: 'C', text: '一周见几次，其他时间各忙各的。', scores: { A: 2 } },
      { id: 'D', text: '不固定，看各自工作和状态，合适就见。', scores: { A: 3 } }
    ]
  },
  {
    id: 10,
    category: 'A',
    text: '如果伴侣希望周末两天都一起，你更真实的感觉是？',
    options: [
      { id: 'A', text: '很好啊，周末就该一起过。', scores: { S: 1 } },
      { id: 'B', text: '一起可以，但偶尔我也想自己安排。', scores: { A: 1 } },
      { id: 'C', text: '两天都在一起有点累，最好只一天。', scores: { A: 2 } },
      { id: 'D', text: '听起来有点窒息，我需要自己的节奏。', scores: { A: 3 } }
    ]
  },
  {
    id: 11,
    category: 'A',
    text: '关于手机和隐私，你更可能的态度是？',
    options: [
      { id: 'A', text: '手机可以互看，没什么秘密。', scores: { S: 2 } },
      { id: 'B', text: '重要东西可以不看，但我希望有查看的权利。', scores: { S: 1 } },
      { id: 'C', text: '有事情可以说，但手机就是个人空间。', scores: { A: 2 } },
      { id: 'D', text: '非必要不要触碰对方隐私，彼此都需要边界。', scores: { A: 3, R: 1 } }
    ]
  },
  {
    id: 12,
    category: 'A',
    text: '当你状态不好、很丧的时候，你更希望伴侣怎么做？',
    options: [
      { id: 'A', text: '全程陪着我，听我倾诉、哄一哄。', scores: { S: 2, E: 1 } },
      { id: 'B', text: '陪一会儿就好，之后让我一个人静静。', scores: { A: 1, S: 1 } },
      { id: 'C', text: '告诉我他/她在，随时可以找，但不打扰。', scores: { A: 2, S: 1 } },
      { id: 'D', text: '不需要他/她参与太多，我自己调整就行。', scores: { A: 3 } }
    ]
  },
  {
    id: 13,
    category: 'A',
    text: '你对"各自异性朋友"的态度是？',
    options: [
      { id: 'A', text: '最好少接触，容易出问题。', scores: { S: 2 } },
      { id: 'B', text: '可以有，但需要向我报备重要接触。', scores: { S: 1 } },
      { id: 'C', text: '正常社交没问题，相信对方有边界感。', scores: { A: 2, R: 1 } },
      { id: 'D', text: '各自社交自由，不需要过多解释。', scores: { A: 3 } }
    ]
  },
  {
    id: 14,
    category: 'A',
    text: '你理想中的同居状态更接近？',
    options: [
      { id: 'A', text: '下班就一起待着，做什么都两个人。', scores: { S: 2 } },
      { id: 'B', text: '大部分时间一起，偶尔各自呆在自己的小角落。', scores: { A: 1, S: 1 } },
      { id: 'C', text: '同居但有自己的空间，互不干扰也没关系。', scores: { A: 2 } },
      { id: 'D', text: '我其实更倾向于先不同居，各自保留空间。', scores: { A: 3 } }
    ]
  },
  {
    id: 15,
    category: 'A',
    text: '当你需要全力冲刺一件事情（例如准备考试/重要项目）时，你对伴侣的期待是？',
    options: [
      { id: 'A', text: '暂时先不打扰我，等我忙完再好好相处。', scores: { A: 3 } },
      { id: 'B', text: '理解我会忙，但偶尔主动来关心一下。', scores: { A: 2, S: 1 } },
      { id: 'C', text: '继续保持平常相处模式，我会自己平衡。', scores: { A: 1 } },
      { id: 'D', text: '希望他/她可以多参与我的紧张和压力里，一起扛。', scores: { S: 2 } }
    ]
  },
  {
    id: 16,
    category: 'A',
    text: '你更讨厌哪种情况？',
    options: [
      { id: 'A', text: '对方总是查岗，连小细节都要问。', scores: { A: 3 } },
      { id: 'B', text: '对方对你太放养，什么都不问不管。', scores: { S: 2 } },
      { id: 'C', text: '对方口头说尊重你，但行为上经常侵犯你的边界。', scores: { A: 2, R: 1 } },
      { id: 'D', text: '对方说为了你，放弃了很多自己的生活。', scores: { A: 1, S: 1 } }
    ]
  },

  // G维度题目
  {
    id: 17,
    category: 'G',
    text: '在选择伴侣时，你对"对方事业心"的真实看法是？',
    options: [
      { id: 'A', text: '不需要太强，稳定过日子更重要。', scores: { R: 2 } },
      { id: 'B', text: '有一定事业心就好，不要太躺平。', scores: { G: 1 } },
      { id: 'C', text: '希望对方有清晰目标，愿意持续提升自己。', scores: { G: 2 } },
      { id: 'D', text: '非常看重，他/她最好在各自领域有追求甚至野心。', scores: { G: 3, R: 1 } }
    ]
  },
  {
    id: 18,
    category: 'G',
    text: '如果你跟伴侣的收入和职业发展差距比较大，你更在意的是？',
    options: [
      { id: 'A', text: '谁赚得多一点不重要，相处舒服最关键。', scores: { R: 1 } },
      { id: 'B', text: '差距太大，可能会影响彼此的观念和生活方式。', scores: { G: 1, R: 1 } },
      { id: 'C', text: '更希望我们都在往上走，而不是一个人拼命。', scores: { G: 3 } },
      { id: 'D', text: '我可以接受短期差距，但长期希望对方有上升势头。', scores: { G: 2 } }
    ]
  },
  {
    id: 19,
    category: 'G',
    text: '你理想中的两个人的生活节奏是？',
    options: [
      { id: 'A', text: '不用太高效，每天过得轻松一点就好。', scores: { R: 1 } },
      { id: 'B', text: '稍微有点忙，但能抽时间给彼此。', scores: { G: 1 } },
      { id: 'C', text: '都在各自领域努力，偶尔一起复盘生活和成长。', scores: { G: 2 } },
      { id: 'D', text: '像队友一样，一起规划项目、目标、投资等。', scores: { G: 3, R: 1 } }
    ]
  },
  {
    id: 20,
    category: 'G',
    text: '当对方说"我想换一个更有挑战的工作/方向"时，你更可能的反应是？',
    options: [
      { id: 'A', text: '太累就别折腾了，现状也不错。', scores: { R: 1 } },
      { id: 'B', text: '会有点担心，但还是愿意支持。', scores: { G: 1 } },
      { id: 'C', text: '会很兴奋，觉得他/她有上进心。', scores: { G: 2 } },
      { id: 'D', text: '会一起帮他/她分析利弊、做计划。', scores: { G: 3 } }
    ]
  },
  {
    id: 21,
    category: 'G',
    text: '如果你们的休息时间经常对不上（例如一方常加班），你更关注的是？',
    options: [
      { id: 'A', text: '只要有时间能在一起就好，工作随缘。', scores: { S: 1 } },
      { id: 'B', text: '希望他/她尽量平衡，不要工作占据一切。', scores: { G: 1 } },
      { id: 'C', text: '会想如果长期节奏对不上，会不会影响关系。', scores: { G: 2 } },
      { id: 'D', text: '愿意一起想办法调整，找到既不牺牲成长又能相处的方案。', scores: { G: 3 } }
    ]
  },
  {
    id: 22,
    category: 'G',
    text: '在谈未来时，你更自然提到的是？',
    options: [
      { id: 'A', text: '想去哪些地方玩、过什么样的日常生活。', scores: { E: 1 } },
      { id: 'B', text: '大概会住在哪里、工作怎样、父母如何安排。', scores: { G: 1, R: 1 } },
      { id: 'C', text: '你们各自事业想发展到什么位置。', scores: { G: 2 } },
      { id: 'D', text: '可以一起做什么项目、投资、长期规划。', scores: { G: 3, R: 1 } }
    ]
  },
  {
    id: 23,
    category: 'G',
    text: '如果伴侣的生活态度是"差不多就行"，你更真实的状态是？',
    options: [
      { id: 'A', text: '挺好，不用那么累。', scores: { R: 1 } },
      { id: 'B', text: '短期可以，但长期会有点失望。', scores: { G: 1 } },
      { id: 'C', text: '会觉得价值观不太合，开始犹豫要不要继续。', scores: { G: 2 } },
      { id: 'D', text: '基本无法接受，会考虑尽早结束关系。', scores: { G: 3 } }
    ]
  },
  {
    id: 24,
    category: 'G',
    text: '当你遇到瓶颈期（例如职业停滞），你更期待伴侣扮演的角色是？',
    options: [
      { id: 'A', text: '陪我放松，暂时别提成长这些。', scores: { E: 1 } },
      { id: 'B', text: '能安慰我就行，具体建议不强求。', scores: { G: 1 } },
      { id: 'C', text: '陪我一起分析、一起想办法。', scores: { G: 2, E: 1 } },
      { id: 'D', text: '成为我"教练 + 队友"，督促和支持我。', scores: { G: 3 } }
    ]
  },

  // R维度题目
  {
    id: 25,
    category: 'R',
    text: '在择偶时，你更看重哪一类因素？',
    options: [
      { id: 'A', text: '三观合得来、聊得来。', scores: { E: 1 } },
      { id: 'B', text: '人品靠谱、有责任感。', scores: { R: 1 } },
      { id: 'C', text: '经济基础、规划能力、抗风险能力。', scores: { R: 3, G: 1 } },
      { id: 'D', text: '是否懂我、能给我情绪价值。', scores: { S: 1, E: 1 } }
    ]
  },
  {
    id: 26,
    category: 'R',
    text: '如果对方很会说好听的话、也很浪漫，但在现实执行上总打折扣，你更可能的态度是？',
    options: [
      { id: 'A', text: '只要他/她真心喜欢我，这些都可以慢慢来。', scores: { E: 2 } },
      { id: 'B', text: '会有点失望，但暂时还能接受。', scores: { R: 1 } },
      { id: 'C', text: '会觉得不靠谱，开始重新评估这段关系。', scores: { R: 2 } },
      { id: 'D', text: '基本吃不消，会迅速降低投入。', scores: { R: 3 } }
    ]
  },
  {
    id: 27,
    category: 'R',
    text: '如果伴侣提出"先租房几年再考虑买房"，你更真实的反应是？',
    options: [
      { id: 'A', text: '没问题，开心过日子比买房更重要。', scores: { E: 1 } },
      { id: 'B', text: '只要有基本规划就可以。', scores: { R: 1 } },
      { id: 'C', text: '会担心他/她不够上心现实问题。', scores: { R: 2, G: 1 } },
      { id: 'D', text: '对我来说，买房是很重要的安全感来源。', scores: { R: 3 } }
    ]
  },
  {
    id: 28,
    category: 'R',
    text: '你理想中的"仪式感"是？',
    options: [
      { id: 'A', text: '不需要太多，过日子才是重点。', scores: { R: 2 } },
      { id: 'B', text: '有一些小仪式就好，比如纪念日。', scores: { R: 1, E: 1 } },
      { id: 'C', text: '希望有仪式，但更在意背后的用心和行动。', scores: { R: 2, E: 1 } },
      { id: 'D', text: '仪式感对我很重要，没有会觉得被敷衍。', scores: { E: 2, S: 1 } }
    ]
  },
  {
    id: 29,
    category: 'R',
    text: '遇到钱相关的分歧（例如谁付更多），你更自然的处理方式是？',
    options: [
      { id: 'A', text: '只要两个人开心就行，不必算太细。', scores: { E: 1 } },
      { id: 'B', text: '大概平衡一些，心里不要太失衡。', scores: { R: 1 } },
      { id: 'C', text: '会认真算清楚，保障双方都公平。', scores: { R: 2 } },
      { id: 'D', text: '更倾向于根据收入、投入等，做比较精细的划分。', scores: { R: 3, G: 1 } }
    ]
  },
  {
    id: 30,
    category: 'R',
    text: '你更讨厌哪种情况？',
    options: [
      { id: 'A', text: '明明很有感觉，但对方一点现实担当都没有。', scores: { R: 2 } },
      { id: 'B', text: '对方很靠谱，但和他/她在一起总有点无聊。', scores: { R: 1, E: 1 } },
      { id: 'C', text: '两个人都在逃避现实问题，只谈感受不谈责任。', scores: { R: 2 } },
      { id: 'D', text: '为了现实，一切浪漫和感受都被牺牲掉了。', scores: { R: 1, E: 1 } }
    ]
  },
  {
    id: 31,
    category: 'R',
    text: '如果要和伴侣一起做一个重大决定（例如换城市），你最希望是？',
    options: [
      { id: 'A', text: '只要感觉对就去，没必要想太多。', scores: { E: 1 } },
      { id: 'B', text: '大概聊一聊，顺着感觉和时机走。', scores: { R: 1 } },
      { id: 'C', text: '认真分析利弊后再决定。', scores: { R: 2 } },
      { id: 'D', text: '做详细的规划，包括财务、职业、家庭等。', scores: { R: 3, G: 1 } }
    ]
  },
  {
    id: 32,
    category: 'R',
    text: '对你来说，"婚姻"三个字更多意味着？',
    options: [
      { id: 'A', text: '两个人感情顺其自然的结果。', scores: { E: 1 } },
      { id: 'B', text: '有感情、有合适的时机就可以。', scores: { R: 1 } },
      { id: 'C', text: '是一份现实和责任的承诺，需要慎重。', scores: { R: 2 } },
      { id: 'D', text: '是一份需要综合考虑感情、现实、家庭的重大合作。', scores: { R: 3 } }
    ]
  },

  // E维度题目
  {
    id: 33,
    category: 'E',
    text: '吵架时，你更典型的反应是？',
    options: [
      { id: 'A', text: '情绪先上来，话会说得重一些。', scores: { E: 3, S: 1 } },
      { id: 'B', text: '虽然生气，但会尽量控制自己。', scores: { E: 1 } },
      { id: 'C', text: '更倾向于冷处理，懒得吵。', scores: { A: 1 } },
      { id: 'D', text: '会先理性分析问题，尽量不情绪化。', scores: { R: 1 } }
    ]
  },
  {
    id: 34,
    category: 'E',
    text: '当伴侣向你倾诉他/她的烦恼时，你更常见的做法是？',
    options: [
      { id: 'A', text: '先跟着一起吐槽、共情，陪他/她骂一骂。', scores: { E: 3 } },
      { id: 'B', text: '一边安慰，一边给一点建议。', scores: { E: 2 } },
      { id: 'C', text: '适度倾听，但不会太卷入情绪。', scores: { E: 1 } },
      { id: 'D', text: '直接帮他/她分析问题和解决方案。', scores: { R: 1 } }
    ]
  },
  {
    id: 35,
    category: 'E',
    text: '你对"表达爱意"的偏好更接近？',
    options: [
      { id: 'A', text: '多说，多表达，多发消息。', scores: { E: 3, S: 1 } },
      { id: 'B', text: '说 + 做结合，两者都要有。', scores: { E: 2 } },
      { id: 'C', text: '不太习惯说出口，更习惯用行动。', scores: { E: 1, R: 1 } },
      { id: 'D', text: '不太会表达，但心里有分寸。', scores: { R: 1 } }
    ]
  },
  {
    id: 36,
    category: 'E',
    text: '在关系中，你多久会想要"深聊一次内心和关系"？',
    options: [
      { id: 'A', text: '经常，需要不断确认彼此的感受和状态。', scores: { E: 3, S: 1 } },
      { id: 'B', text: '偶尔，但每次都聊得比较深入。', scores: { E: 2 } },
      { id: 'C', text: '有事再说，没事不用特意聊。', scores: { E: 1 } },
      { id: 'D', text: '不太喜欢聊太多感受，容易累。', scores: { R: 1 } }
    ]
  },
  {
    id: 37,
    category: 'E',
    text: '当对方说"你是不是太敏感了"的时候，你更真实的感觉是？',
    options: [
      { id: 'A', text: '很受伤，觉得自己被否定。', scores: { E: 3, S: 1 } },
      { id: 'B', text: '有点不舒服，但会反思是不是自己真的太敏感。', scores: { E: 2 } },
      { id: 'C', text: '不太在乎，对方只是表达方式问题。', scores: { E: 1 } },
      { id: 'D', text: '我本来就不太敏感，很少被这样说。', scores: { R: 1 } }
    ]
  },
  {
    id: 38,
    category: 'E',
    text: '你更希望伴侣如何对待你的"坏情绪"？',
    options: [
      { id: 'A', text: '陪在我身边，先安慰我再说。', scores: { E: 3, S: 1 } },
      { id: 'B', text: '理解并共情我，再和我一起想办法。', scores: { E: 2 } },
      { id: 'C', text: '告诉我他/她在，但不要过多干预。', scores: { E: 1, A: 1 } },
      { id: 'D', text: '适度关心就好，情绪还是我自己处理。', scores: { A: 2 } }
    ]
  },
  {
    id: 39,
    category: 'E',
    text: '你更容易被哪种人打动？',
    options: [
      { id: 'A', text: '很会说话、共情力很强的人。', scores: { E: 3 } },
      { id: 'B', text: '会认真听你说话，记得你说过的小细节的人。', scores: { E: 2, S: 1 } },
      { id: 'C', text: '行动力强、遇事冷静靠谱的人。', scores: { R: 2 } },
      { id: 'D', text: '不太会表达，但在关键时刻一定站在你这边的人。', scores: { E: 1, R: 1 } }
    ]
  },
  {
    id: 40,
    category: 'E',
    text: '在亲密关系中，你更希望你们的沟通风格偏向？',
    options: [
      { id: 'A', text: '多聊感受，多聊情绪，多聊内心。', scores: { E: 3 } },
      { id: 'B', text: '感受 + 事实结合，有情绪也有逻辑。', scores: { E: 2 } },
      { id: 'C', text: '以事实为主，感受点到为止。', scores: { R: 1 } },
      { id: 'D', text: '少聊感受，事情说清楚就行。', scores: { R: 2 } }
    ]
  },

  ];