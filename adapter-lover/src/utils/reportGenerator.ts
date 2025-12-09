import { Dimensions, EmotionalType, IdealPartnerProfile, CompatibilityAnalysis, PersonalGrowthGuide, MeetingGuide } from '../types';

// 情感类型定义库
const emotionalTypes: Record<string, Omit<EmotionalType, 'id'> & { id?: string }> = {
  'warm-seeker': {
    name: '温暖寻求者',
    description: '你渴望一份稳定而温暖的感情，在关系中注重安全感和深度的情感连接。你天生敏感细腻，能够敏锐地察觉他人的情感需求。',
    attachmentStyle: 'secure',
    emotionalPattern: '你倾向于通过深度的情感交流来建立亲密感，需要被理解和被接纳。在面对冲突时，你可能会有点焦虑，但最终愿意通过沟通解决问题。',
    loveLanguage: ['高质量的陪伴', '肯定的言语', '贴心的服务'],
    strengths: ['共情能力强', '善解人意', '情感细腻', '忠诚专一'],
    growthAreas: ['建立健康的边界感', '提升自我价值感', '学会独立面对情绪'],
    relationshipAdvantages: [
      '能够提供深度的情感支持',
      '善于营造温馨的家庭氛围',
      '在关系中非常投入和认真',
      '能够敏锐察觉伴侣的需求'
    ],
    potentialChallenges: [
      '可能过度依赖外部确认',
      '容易把伴侣的情绪当作自己的责任',
      '在关系中容易失去自我',
      '对分离和拒绝特别敏感'
    ]
  },
  'independent-explorer': {
    name: '独立探索者',
    description: '你重视个人自由和成长空间，在关系中寻求平衡——既要有亲密连接，也要保持独立性。你理性且自主，喜欢通过共同成长来加深感情。',
    attachmentStyle: 'avoidant',
    emotionalPattern: '你习惯独立处理情绪，不善于表达脆弱。在面对压力时，你倾向于退缩到自己的空间里，需要时间来消化和思考。',
    loveLanguage: ['服务的行动', '高质量的时间', '个人空间的尊重'],
    strengths: ['独立自主', '理性思考', '尊重边界', '支持成长'],
    growthAreas: ['学习表达脆弱', '主动分享感受', '接受他人的照顾'],
    relationshipAdvantages: [
      '不会过度依赖伴侣',
      '能够支持对方的个人发展',
      '关系不会让人窒息',
      '理性处理问题'
    ],
    potentialChallenges: [
      '可能显得疏离或冷漠',
      '不善于表达情感需求',
      '容易回避深度交流',
      '让伴侣感觉不被需要'
    ]
  },
  'balanced-builder': {
    name: '平衡建造者',
    description: '你在情感与理性、亲密与独立之间寻求平衡。你既重视关系的深度，也注重实际的稳定性。你是一个可靠的伴侣，愿意为关系投入努力。',
    attachmentStyle: 'secure',
    emotionalPattern: '你能够比较健康地处理情绪，既不过度压抑也不被情绪主导。你相信通过沟通和理解可以解决大部分关系问题。',
    loveLanguage: ['服务的行动', '高质量的陪伴', '赠送礼物'],
    strengths: ['情绪稳定', '务实可靠', '善于沟通', '平衡感好'],
    growthAreas: ['增加情感的浪漫表达', '在必要时更加果断', '创造更多惊喜'],
    relationshipAdvantages: [
      '提供稳定的情感支持',
      '理性处理冲突',
      '愿意为关系努力',
      '能够平衡各方需求'
    ],
    potentialChallenges: [
      '可能缺乏激情和浪漫',
      '过度理性显得冷淡',
      '容易忽视情感细节',
      '改变和适应较慢'
    ]
  },
  'passionate-connector': {
    name: '热情连接者',
    description: '你充满激情地寻求深度的情感连接，在关系中渴望灵魂层面的共鸣。你善于表达，喜欢通过各种方式传递爱意，让关系充满活力。',
    attachmentStyle: 'anxious',
    emotionalPattern: '你的情感丰富而强烈，需要频繁的情感交流来确认关系。当感觉不到连接时，你会变得焦虑，但这也让你更加努力地维护关系。',
    loveLanguage: ['肯定的言语', '身体接触', '高质量的时间'],
    strengths: ['情感丰富', '表达力强', '充满激情', '善于营造浪漫'],
    growthAreas: ['学会自我安抚', '建立内在安全感', '给伴侣更多空间'],
    relationshipAdvantages: [
      '让关系充满活力',
      '善于表达爱意',
      '重视情感交流',
      '能够创造深刻连接'
    ],
    potentialChallenges: [
      '可能情绪化',
      '过度依赖伴侣的确认',
      '容易胡思乱想',
      '给伴侣压力过大'
    ]
  },
  'rational-analyst': {
    name: '理性分析者',
    description: '你倾向于用理性来理解和经营关系，重视逻辑和实际。你虽然不善言辞，但会用实际行动来表达关心，是一个可靠且务实的伴侣。',
    attachmentStyle: 'secure',
    emotionalPattern: '你习惯用分析和逻辑来处理情感问题，可能显得有些疏离，但这实际上是你保护自己和他人的方式。',
    loveLanguage: ['服务的行动', '解决问题', '提供支持'],
    strengths: ['逻辑清晰', '解决问题能力强', '可靠务实', '情绪稳定'],
    growthAreas: ['学习情感表达', '增加浪漫行为', '理解情感需求'],
    relationshipAdvantages: [
      '理性处理冲突',
      '提供实际支持',
      '情绪稳定可靠',
      '善于规划和执行'
    ],
    potentialChallenges: [
      '显得不够浪漫',
      '不善于情感安慰',
      '可能忽视情感需求',
      '表达过于直接'
    ]
  }
};

// 获取用户的情感类型
export function getEmotionalType(dimensions: Dimensions): EmotionalType {
  const { S, A, G, R, E } = dimensions;

  // 根据维度组合确定情感类型
  if (S >= 70 && E >= 70) {
    return { ...emotionalTypes['passionate-connector'], id: 'passionate-connector' };
  } else if (A >= 70 && S <= 50) {
    return { ...emotionalTypes['independent-explorer'], id: 'independent-explorer' };
  } else if (R >= 70 && G >= 50) {
    return { ...emotionalTypes['balanced-builder'], id: 'balanced-builder' };
  } else if (E >= 70 && S >= 50) {
    return { ...emotionalTypes['warm-seeker'], id: 'warm-seeker' };
  } else if (R >= 70 && E <= 50) {
    return { ...emotionalTypes['rational-analyst'], id: 'rational-analyst' };
  } else {
    // 默认返回平衡型
    return { ...emotionalTypes['balanced-builder'], id: 'balanced-builder' };
  }
}

// 生成伴侣画像
export function generateIdealPartnerProfile(mainType: any, userDimensions: Dimensions): IdealPartnerProfile {
  const companionProfiles: Record<string, Partial<IdealPartnerProfile>> = {
    'stable-harbor': {
      personality: {
        coreStrengths: [
          '沉稳可靠：无论遇到什么困难，都能保持冷静，给你最坚实的依靠',
          '执行力强：说到做到，承诺的事情一定会努力兑现，让人安心',
          '情绪稳定：不会因为小事而情绪波动，能提供持续稳定的情感支持',
          '责任感强：对关系和家庭有强烈的责任心，愿意承担起应有的责任'
        ],
        quirks: [
          '可能有点固执：一旦形成自己的看法，不太容易改变，需要耐心沟通',
          '不太会制造惊喜：更注重实际的关心，可能缺少浪漫的惊喜表现',
          '偶尔显得木讷：不善于用花言巧语表达爱意，但行动上会默默付出'
        ],
        uniqueCharm: '用默默的行动证明爱意，虽然不善言辞但内心温暖',
        lovePhilosophy: '爱情是细水长流的陪伴，是用行动兑现的承诺'
      },
      loveLanguage: {
        expression: '通过默默的行动和坚定的承诺来表达爱意，比如准时接送、记得重要日子、为你解决实际问题',
        appreciation: '当你对TA说"有你在我很安心"或表达对TA可靠性的认可时，TA会觉得自己的付出被看见了',
        values: ['承诺', '稳定', '责任', '守护']
      },
      lifestyleScenes: {
        dailyLife: '规律的作息，会记得重要的日子，默默为你准备早餐',
        underPressure: '会冷静分析问题，寻找解决方案，给你可靠的依靠',
        celebration: '可能不会制造浪漫，但会准备实用的礼物，或者安排一次舒适的家庭聚餐',
        socialCircle: '有几个知心好友，重视家庭关系，社交圈稳定'
      },
      imperfections: ['不够浪漫', '不善表达', '可能有点无聊', '改变慢']
    },
    'shoulder-to-shoulder': {
      personality: {
        coreStrengths: [
          '目标明确：对自己的人生有清晰规划，并愿意与你一起制定共同目标',
          '积极进取：不断追求进步，会带动你也成为更好的自己',
          '支持成长：真心支持你的事业发展，愿意为你提供资源和帮助',
          '理性务实：用实际行动解决问题，而不是空谈或不切实际的幻想'
        ],
        quirks: [
          '可能工作狂：过于专注于事业，有时会忽视情感的细节需求',
          '有时忽视情感：习惯用逻辑思考，可能无法及时察觉你的情绪变化',
          '容易把感情当项目：有时会过度理性地分析关系，缺少一些浪漫'
        ],
        uniqueCharm: '把你当作人生合伙人，愿意和你一起打拼更好的未来',
        lovePhilosophy: '最好的爱情是一起成长，互相成就，成为更好的自己'
      },
      loveLanguage: {
        expression: '通过鼓励你追求梦想、分享成功经验、共同规划未来来表达爱意，会为你的成就感到骄傲',
        appreciation: '当你和TA分享职业成就或谈到未来规划时，TA会觉得你们是真正的人生合伙人',
        values: ['成长', '抱负', '伙伴关系', '未来']
      },
      lifestyleScenes: {
        dailyLife: '快节奏但有序，会和你讨论工作计划，一起学习提升',
        underPressure: '会加倍努力工作，相信解决问题是表达爱的方式',
        celebration: '会庆祝事业里程碑，把成就与你分享',
        socialCircle: '多是上进的朋友，喜欢交流和成长'
      },
      imperfections: ['可能忽视情感需求', '过度重视结果', '容易焦虑', '不够放松']
    },
    'nurturing-caregiver': {
      personality: {
        coreStrengths: [
          '细心体贴：能敏锐察觉你的情绪变化和需求，给予及时的关怀',
          '善于照顾：无论是生活起居还是情感支持，都能为你提供周到照料',
          '情感丰富：内心世界丰富多彩，能与你进行深度的情感交流',
          '有耐心：在你遇到困难或情绪低落时，能耐心陪伴和支持'
        ],
        quirks: [
          '可能过度付出：有时会牺牲自己的需求来满足你，需要学会平衡',
          '容易忽视自己：过于关注别人，可能会忽略自己的感受和需要',
          '有点控制欲：因为太想照顾你，有时会过度干预你的决定'
        ],
        uniqueCharm: '总能察觉你的需要，在你需要之前就已经准备好',
        lovePhilosophy: '爱就是细心的照料和无私的付出，让你感受到家的温暖'
      },
      loveLanguage: {
        expression: '通过无微不至的照顾来表达爱意，比如为你准备爱吃的食物、在你累时给按摩、记得你的小喜好',
        appreciation: '当你表达对TA照顾的感激或说"有你真好"时，TA会觉得所有的付出都很值得',
        values: ['关怀', '温柔', '陪伴', '滋养']
      },
      lifestyleScenes: {
        dailyLife: '会为你准备爱心便当，提醒你添衣，记得你的喜好',
        underPressure: '会第一时间关心你的感受，用温暖的方式安慰你',
        celebration: '会精心准备惊喜，用心的礼物让每个日子都特别',
        socialCircle: '多为关系亲密的朋友，喜欢照顾身边的人'
      },
      imperfections: ['可能失去自我', '过度付出', '容易受伤', '有点依赖']
    },
    'soul-conversationalist': {
      personality: {
        coreStrengths: [
          '思想深刻：对人生有独特的见解，能与你进行有深度的精神交流',
          '善于交流：不仅善于表达，更懂得倾听，能理解你最深层的想法',
          '独立自主：有自己的精神世界，不会过度依赖你，让关系保持健康',
          '精神丰富：内心世界丰富多彩，总能为关系带来新的思考和启发'
        ],
        quirks: [
          '可能过于理想化：有时会追求完美，对现实关系有过高的期待',
          '有点孤傲：因为精神世界丰富，有时会显得不太合群',
          '不善于处理琐事：更关注精神层面，可能忽视日常生活的细节'
        ],
        uniqueCharm: '能和你聊到深夜，理解你最深层的想法和感受',
        lovePhilosophy: '灵魂的共鸣胜过一切，好的关系是两个独立灵魂的相互照亮'
      },
      loveLanguage: {
        expression: '通过深度的精神交流和思想碰撞来表达爱意，比如深夜长谈、分享读书心得、探讨人生哲学',
        appreciation: '当你对TA说"你让我看到了不同的世界"或表达思想共鸣时，TA会觉得找到了知音',
        values: ['思想', '共鸣', '深度', '理解']
      },
      lifestyleScenes: {
        dailyLife: '喜欢安静的时光，会和你分享读书心得，讨论有趣的话题',
        underPressure: '会从哲学角度分析，给你理性的安慰和空间',
        celebration: '可能准备一本有意义的书，或者带你去看展览',
        socialCircle: '不多但都是知己，重视精神交流'
      },
      imperfections: ['可能不够实际', '显得疏离', '不善于处理日常', '过于理性']
    },
    'free-companion': {
      personality: {
        coreStrengths: [
          '独立自主：有自己的生活和追求，不会过度依赖你，让关系更健康',
          '边界清晰：懂得尊重个人空间，不会过度干涉你的私事和决定',
          '轻松灵活：不会给关系太大压力，能够包容和适应变化',
          '尊重他人：真心尊重你的选择和生活方式，不会试图改变你'
        ],
        quirks: [
          '可能不够主动：因为尊重你的空间，有时会让你觉得不够被关心',
          '有点难以捉摸：需要自己的空间思考，有时会显得神秘或疏离',
          '保持距离：为了避免过度依赖，可能会在关系中保持一定距离感'
        ],
        uniqueCharm: '给你足够的自由，让关系轻松而自然',
        lovePhilosophy: '好的关系是两个完整的人选择在一起，而不是彼此需要'
      },
      loveLanguage: {
        expression: '通过给予足够的个人空间和尊重来表达爱意，支持你的独立发展，不会过度干涉你的决定',
        appreciation: '当你主动分享自己的生活和成就，而不是过度依赖时，TA会觉得你们的关系很健康',
        values: ['自由', '尊重', '空间', '独立']
      },
      lifestyleScenes: {
        dailyLife: '各自有自己的生活，但会安排高质量的相处时间',
        underPressure: '需要自己的空间来处理，然后平静地讨论',
        celebration: '可能一起去旅行，或者做一些新鲜的事情',
        socialCircle: '多样化，尊重每个人的生活方式'
      },
      imperfections: ['可能显得冷淡', '不够投入', '难以预测', '缺乏安全感']
    },
    'rational-partner': {
      personality: {
        coreStrengths: [
          '逻辑清晰：善于分析问题，能够理性看待和处理关系中的各种情况',
          '高效执行：做事有条理，能够高效地解决生活和关系中的实际问题',
          '冷静稳重：遇到困难不会慌乱，能为你提供稳定的支持和方向',
          '值得信赖：言行一致，说到做到，是可靠的人生伙伴'
        ],
        quirks: [
          '情感表达较弱：不善于用言语表达情感，可能让你感觉不够浪漫',
          '过于理性：有时会过度分析，忽视情感的细微变化',
          '缺乏惊喜：更注重实际效果，可能缺少一些生活情趣'
        ],
        uniqueCharm: '用理性的方式爱你，为你解决实际问题，是生活的坚实后盾',
        lovePhilosophy: '爱情是理性的选择和责任的承担，是两个人共同面对生活的智慧'
      },
      loveLanguage: {
        expression: '通过帮你分析问题、制定解决方案、提高效率来表达关心，会给你清晰的逻辑分析和实用建议',
        appreciation: '当你采纳TA的建议并取得好结果，或者认可TA的理性思维时，TA会觉得自己的价值被体现了',
        values: ['逻辑', '效率', '理性', '实用']
      },
      lifestyleScenes: {
        dailyLife: '生活有序，注重计划和效率，会为你解决实际问题',
        underPressure: '会冷静分析情况，寻找最佳解决方案',
        celebration: '可能准备实用的礼物，或者安排有意义的活动',
        socialCircle: '多是理性思考的朋友，重视深度交流'
      },
      imperfections: ['不够浪漫', '过于理性', '忽视情感', '缺乏惊喜']
    },
    'reliable-pragmatist': {
      personality: {
        coreStrengths: [
          '踏实稳重：一步一个脚印，不好高骛远，给你稳稳的幸福',
          '执行力强：说到做到，不会空谈，用实际行动证明自己的爱',
          '责任感强：对家庭和关系有强烈的责任感，是值得依靠的港湾',
          '规划清晰：对未来有明确规划，并愿意为之持续努力'
        ],
        quirks: [
          '可能不够浪漫：更注重实际，有时会忽略情感的表达需求',
          '改变较慢：习惯稳定的生活，对变化可能有些抵触',
          '有点严肃：过于注重结果，可能缺少一些轻松幽默的时刻'
        ],
        uniqueCharm: '用踏实的行动为你构建未来，是那个最靠谱的伴侣',
        lovePhilosophy: '爱情是责任和承诺的体现，是用行动创造的美好生活'
      },
      loveLanguage: {
        expression: '通过履行承诺和承担责任来表达爱意，比如说到做到、为未来做实际规划、在困难时不离不弃',
        appreciation: '当你对TA说"你让我觉得生活很踏实"或表达对TA责任心的赞赏时，TA会觉得很安心',
        values: ['责任', '承诺', '靠谱', '踏实']
      },
      lifestyleScenes: {
        dailyLife: '生活规律有序，会为未来做详细规划并执行',
        underPressure: '会更加努力地承担责任，用行动解决问题',
        celebration: '会准备有意义的礼物，重视实际的纪念价值',
        socialCircle: '多是可靠务实的朋友，重视长期的友谊'
      },
      imperfections: ['不够浪漫', '改变较慢', '过于严肃', '缺乏灵活性']
    },
    'emotional-resonator': {
      personality: {
        coreStrengths: [
          '情感丰富：内心世界多彩，能与你分享各种美妙的情感体验',
          '共情力强：能深刻理解你的感受，与你产生强烈的情感共鸣',
          '表达力佳：善于用言语和行动表达爱意，让你时刻感受到被爱',
          '创造浪漫：懂得为关系增添情趣和惊喜，让生活充满色彩'
        ],
        quirks: [
          '可能过于敏感：情绪波动较大，有时会过度解读他人的言行',
          '需要较多关注：渴望被理解和回应，有时会给对方压力',
          '容易情绪化：在压力下可能被情绪主导，影响理性判断'
        ],
        uniqueCharm: '让你感受到被深深理解和珍视，是情感的完美知己',
        lovePhilosophy: '爱情是灵魂的共鸣，是情感的深度连接，是生命最美的体验'
      },
      loveLanguage: {
        expression: '通过丰富的情感表达和浪漫行动来传递爱意，比如深情对视、惊喜约会、写情书、制造浪漫氛围',
        appreciation: '当你对TA的情感表达做出热烈回应，或者和TA一起享受浪漫时光时，TA会觉得深深被爱',
        values: ['情感', '浪漫', '表达', '心动']
      },
      lifestyleScenes: {
        dailyLife: '生活充满情感色彩，会创造各种浪漫的时刻',
        underPressure: '需要情感的支持和理解，会寻求深度的交流',
        celebration: '会精心准备浪漫的惊喜，让每个日子都特别',
        socialCircle: '多是情感丰富的朋友，重视深度的情感连接'
      },
      imperfections: ['过于敏感', '情绪化', '需要关注', '缺乏理性']
    }
  };

  return {
    baseType: mainType,
    personality: companionProfiles[mainType.id]?.personality || {
      coreStrengths: [],
      quirks: [],
      uniqueCharm: '',
      lovePhilosophy: ''
    },
    loveLanguage: companionProfiles[mainType.id]?.loveLanguage || {
      expression: '',
      appreciation: '',
      values: []
    },
    lifestyleScenes: companionProfiles[mainType.id]?.lifestyleScenes || {
      dailyLife: '',
      underPressure: '',
      celebration: '',
      socialCircle: ''
    },
    imperfections: companionProfiles[mainType.id]?.imperfections || []
  };
}

// 生成相处指南
export function generateRelationshipGuide(mainType: any, userDimensions: Dimensions): {
  communicationStyle: {
    preferred: string[];
    avoid: string[];
    tips: string[];
  };
  conflictResolution: {
    commonTriggers: string[];
    solutions: string[];
    prevention: string[];
  };
  emotionalNeeds: {
    userNeeds: string[];
    partnerNeeds: string[];
    balance: string[];
  };
  growthAreas: {
    together: string[];
    individual: string[];
  };
} {
  const relationshipGuides: Record<string, any> = {
    'stable-harbor': {
      communicationStyle: {
        preferred: [
          '平和、稳定的对话方式，避免激烈的争论',
          '实际具体的表达，而不是抽象的情感描述',
          '定期的深度交流时间，建立安全感'
        ],
        avoid: [
          '突然的情感爆发或极端表达',
          '过多的变化和不确定性',
          '强迫快速做出决定'
        ],
        tips: [
          '用"我觉得"代替"你应该"，减少压力感',
          '给对方时间思考和处理情绪',
          '通过行动证明比语言承诺更重要'
        ]
      },
      conflictResolution: {
        commonTriggers: [
          '感觉被忽视或不被重视',
          '计划突然被改变',
          '情感需求被忽视'
        ],
        solutions: [
          '冷静下来后再讨论问题',
          '给彼此空间和时间',
          '寻求实际可行的解决方案'
        ],
        prevention: [
          '定期检查彼此的状态',
          '提前沟通重要决定',
          '保持生活的一致性和可预测性'
        ]
      },
      emotionalNeeds: {
        userNeeds: [
          '安全感和稳定性',
          '被需要和被依赖的感觉',
          '实际的支持和陪伴'
        ],
        partnerNeeds: [
          '被信任和被依靠',
          '情感表达的直接性',
          '生活的一致性和规律'
        ],
        balance: [
          '在稳定中适度增加新鲜感',
          '在理性中保留情感的温度',
          '在责任中也要照顾自己'
        ]
      },
      growthAreas: {
        together: [
          '学习更直接地表达情感需求',
          '一起尝试新的活动和体验',
          '培养共同的兴趣爱好'
        ],
        individual: [
          '学会适度表达脆弱',
          '培养更灵活的思维模式',
          '增加生活的情趣和惊喜'
        ]
      }
    },
    'shoulder-to-shoulder': {
      communicationStyle: {
        preferred: [
          '目标导向的讨论，关于未来规划',
          '高效直接的沟通，不拖泥带水',
          '理性分析问题，寻找解决方案'
        ],
        avoid: [
          '过度的情感宣泄',
          '没有目的的长谈',
          '模糊不清的表达'
        ],
        tips: [
          '把情感问题也当作"项目"来分析和解决',
          '定期复盘关系发展状况',
          '用数据和事实支撑观点'
        ]
      },
      conflictResolution: {
        commonTriggers: [
          '感觉对方不够上进或进步缓慢',
          '目标和计划不一致',
          '情感需求被忽视'
        ],
        solutions: [
          '设定共同的目标和里程碑',
          '制定明确的行动计划',
          '定期检查进度和调整策略'
        ],
        prevention: [
          '定期沟通个人发展和职业规划',
          '保持对彼此目标的理解和支持',
          '在忙碌中也要留出情感时间'
        ]
      },
      emotionalNeeds: {
        userNeeds: [
          '被理解和支持事业追求',
          '共同成长和进步',
          '高效和谐的关系'
        ],
        partnerNeeds: [
          '对事业的理解和支持',
          '个人发展的空间',
          '成就得到认可'
        ],
        balance: [
          '在追求目标时也要关注情感',
          '在效率中保留温度',
          '在共同成长中保持独立性'
        ]
      },
      growthAreas: {
        together: [
          '学习更多关注情感而非仅关注结果',
          '培养工作之外的生活情趣',
          '学会在关系中放松和享受'
        ],
        individual: [
          '提高情感表达能力',
          '学会享受过程而非仅关注结果',
          '培养更多的生活情趣'
        ]
      }
    },
    'nurturing-caregiver': {
      communicationStyle: {
        preferred: [
          '温暖关怀的对话，关心对方的感受',
          '细节的关注和体贴的表达',
          '情感深度交流'
        ],
        avoid: [
          '冷漠或忽视对方的情感',
          '过于理性或批判性的言辞',
          '急于解决问题而不先理解感受'
        ],
        tips: [
          '学会接受他人的照顾和关爱',
          '在关心他人的同时也要表达自己的需求',
          '避免过度付出而忽视自己'
        ]
      },
      conflictResolution: {
        commonTriggers: [
          '感觉付出没有得到回报',
          '被忽视或不被感激',
          '自己的需求被忽视'
        ],
        solutions: [
          '坦诚表达自己的感受和需求',
          '学会设立健康的边界',
          '寻求平衡的付出和接受'
        ],
        prevention: [
          '定期表达感激和欣赏',
          '主动沟通自己的需求',
          '学会适度自私，照顾自己'
        ]
      },
      emotionalNeeds: {
        userNeeds: [
          '被感激和被欣赏',
          '情感连接和深度交流',
          '照顾和被照顾的平衡'
        ],
        partnerNeeds: [
          '被理解和被接纳',
          '细致的关怀和体贴',
          '情感的温暖回应'
        ],
        balance: [
          '学会接受他人的关爱',
          '在照顾他人时也要照顾自己',
          '在给予中也要学会接受'
        ]
      },
      growthAreas: {
        together: [
          '学习更理性地处理问题',
          '培养独立性和自我边界',
          '在关爱中保持适度距离'
        ],
        individual: [
          '学会说"不"并设立边界',
          '发展自己的兴趣爱好',
          '减少对他人认可的依赖'
        ]
      }
    },
    'soul-conversationalist': {
      communicationStyle: {
        preferred: [
          '深度思想和精神的交流',
          '探讨抽象概念和人生哲学',
          '诚实而真实的自我表达'
        ],
        avoid: [
          '肤浅的闲聊和无意义对话',
          '过度的情感宣泄',
          '被强迫立即做出决定'
        ],
        tips: [
          '给彼此足够的思考时间',
          '尊重不同的观点和想法',
          '在精神交流中也要关注现实生活'
        ]
      },
      conflictResolution: {
        commonTriggers: [
          '感觉不被理解或被误解',
          '价值观和理念的冲突',
          '过度理性分析而忽视情感'
        ],
        solutions: [
          '从思想和理念层面寻找共识',
          '给彼此空间和时间思考',
          '通过深度对话理解对方观点'
        ],
        prevention: [
          '定期进行深度交流',
          '在理性分析中关注情感',
          '尊重并欣赏彼此的差异'
        ]
      },
      emotionalNeeds: {
        userNeeds: [
          '思想上的理解和共鸣',
          '精神上的连接和交流',
          '独立思考的空间'
        ],
        partnerNeeds: [
          '深度的精神交流',
          '思想上的启发和成长',
          '独立性和尊重'
        ],
        balance: [
          '在精神交流中也要关注现实',
          '在独立中保持连接',
          '在理性中保留情感'
        ]
      },
      growthAreas: {
        together: [
          '学习更多关注生活的实际方面',
          '培养更多的情趣和轻松感',
          '在思想交流中加入更多情感'
        ],
        individual: [
          '学会享受简单的生活乐趣',
          '培养更多的现实生活技能',
          '在思考中也要行动'
        ]
      }
    },
    'free-companion': {
      communicationStyle: {
        preferred: [
          '轻松自然的对话，没有压力',
          '尊重个人空间和独立性',
          '灵活而不过度的交流'
        ],
        avoid: [
          '过度的情感依赖',
          '频繁的联系和监控',
          '试图改变对方的想法'
        ],
        tips: [
          '在需要时主动表达关心',
          '尊重彼此的独立空间',
          '在关系中保持个人生活'
        ]
      },
      conflictResolution: {
        commonTriggers: [
          '感觉被控制或被束缚',
          '个人空间被侵犯',
          '过多的情感要求'
        ],
        solutions: [
          '给彼此空间和时间冷静',
          '在各自冷静后再沟通',
          '寻求平衡而非妥协'
        ],
        prevention: [
          '尊重个人边界和空间',
          '保持适度的联系频率',
          '在关系中保持独立性'
        ]
      },
      emotionalNeeds: {
        userNeeds: [
          '个人空间和自由',
          '被理解和被尊重',
          '轻松无压力的关系'
        ],
        partnerNeeds: [
          '独立性和自主权',
          '适度的关心和支持',
          '不干涉的生活方式'
        ],
        balance: [
          '在独立中保持适度连接',
          '在自由中保持责任',
          '在轻松中保持关心'
        ]
      },
      growthAreas: {
        together: [
          '学习更主动地表达关心',
          '培养更多的共同活动',
          '在独立中建立更深的连接'
        ],
        individual: [
          '学会适度依赖和表达需求',
          '培养更深的情感表达能力',
          '在独立中学会接受帮助'
        ]
      }
    },
    'rational-partner': {
      communicationStyle: {
        preferred: [
          '逻辑清晰、条理分明的讨论',
          '基于事实和数据的分析',
          '解决问题的理性方法'
        ],
        avoid: [
          '过度的情感表达',
          '模糊不清的表达',
          '情绪化的反应'
        ],
        tips: [
          '学会倾听情感而不急于解决',
          '在理性分析中加入情感考虑',
          '用简单直接的方式表达关心'
        ]
      },
      conflictResolution: {
        commonTriggers: [
          '情感需求被忽视',
          '过度理性化问题',
          '缺乏情感回应'
        ],
        solutions: [
          '先理解情感再解决问题',
          '寻求逻辑和情感的平衡',
          '提供实际的解决方案'
        ],
        prevention: [
          '定期关注彼此的情感状态',
          '学会表达基本的情感支持',
          '在分析中考虑情感因素'
        ]
      },
      emotionalNeeds: {
        userNeeds: [
          '逻辑上的理解和支持',
          '实际的帮助和解决方案',
          '高效和谐的关系'
        ],
        partnerNeeds: [
          '理性的分析和建议',
          '实际的行动和结果',
          '清晰明确的表达'
        ],
        balance: [
          '在理性中保留情感',
          '在分析中关注感受',
          '在效率中保持温度'
        ]
      },
      growthAreas: {
        together: [
          '学习更多的情感表达',
          '培养更多的浪漫和情趣',
          '在解决问题中关注情感'
        ],
        individual: [
          '提高情感表达能力',
          '学会享受无目的的情感交流',
          '培养更多的感性思维'
        ]
      }
    },
    'reliable-pragmatist': {
      communicationStyle: {
        preferred: [
          '实际、具体的讨论',
          '关于计划和执行的话题',
          '负责任和可靠的对话'
        ],
        avoid: [
          '空洞的承诺和夸大的言辞',
          '过于理想化的话题',
          '不切实际的幻想'
        ],
        tips: [
          '说到做到，用行动证明',
          '在现实基础上适度梦想',
          '培养适当的幽默感'
        ]
      },
      conflictResolution: {
        commonTriggers: [
          '承诺没有兑现',
          '计划被突然改变',
          '感觉对方不够务实'
        ],
        solutions: [
          '制定实际可行的计划',
          '坚持到底，不轻易放弃',
          '寻求务实的解决方案'
        ],
        prevention: [
          '设定合理的目标和期望',
          '定期检查进展和调整',
          '在务实中保持适度的灵活性'
        ]
      },
      emotionalNeeds: {
        userNeeds: [
          '可靠性和承诺',
          '实际的行动和支持',
          '安全感和稳定性'
        ],
        partnerNeeds: [
          '责任感和承诺',
          '实际的行动和结果',
          '稳定和可预测性'
        ],
        balance: [
          '在务实中保留一些浪漫',
          '在责任中保持一些轻松',
          '在现实中保留一些梦想'
        ]
      },
      growthAreas: {
        together: [
          '学习更多的灵活性',
          '培养更多的情趣和惊喜',
          '在责任中保持轻松'
        ],
        individual: [
          '学会接受不确定性',
          '培养更多的兴趣爱好',
          '在计划中保持一些灵活性'
        ]
      }
    },
    'emotional-resonator': {
      communicationStyle: {
        preferred: [
          '丰富情感的交流',
          '浪漫和诗意的表达',
          '深度情感的连接'
        ],
        avoid: [
          '冷漠或理性的分析',
          '忽视情感的表达',
          '过于实际的讨论'
        ],
        tips: [
          '学会在情感中保持理性',
          '接受现实的限制和挑战',
          '在浪漫中保持责任'
        ]
      },
      conflictResolution: {
        commonTriggers: [
          '情感被忽视或误解',
          '缺乏浪漫和情调',
          '过于理性的反应'
        ],
        solutions: [
          '先处理情感再解决问题',
          '创造情感连接的机会',
          '用浪漫的方式化解冲突'
        ],
        prevention: [
          '定期创造浪漫时刻',
          '保持情感的深度交流',
          '在浪漫中保持现实'
        ]
      },
      emotionalNeeds: {
        userNeeds: [
          '情感上的深度连接',
          '浪漫和情趣的表达',
          '被理解和被珍视'
        ],
        partnerNeeds: [
          '情感的丰富回应',
          '浪漫的共同体验',
          '情感的安全感'
        ],
        balance: [
          '在情感中保持理性',
          '在浪漫中保持现实',
          '在激情中保持稳定'
        ]
      },
      growthAreas: {
        together: [
          '学习更理性地处理问题',
          '培养更多的实际生活技能',
          '在情感中保持稳定'
        ],
        individual: [
          '学会管理情绪波动',
          '培养更多的理性思维',
          '在浪漫中保持责任'
        ]
      }
    }
  };

  return relationshipGuides[mainType.id] || relationshipGuides['stable-harbor'];
}

// 生成匹配度分析
export function generateCompatibilityAnalysis(userDimensions: Dimensions, partnerType: any): CompatibilityAnalysis {
  const compatibility = 100 - calculateDifference(userDimensions, partnerType.idealProfile);

  return {
    overallCompatibility: compatibility,
    dimensionCompatibility: [
      {
        dimension: 'S',
        score: 100 - Math.abs(userDimensions.S - partnerType.idealProfile.S),
        analysis: generateDimensionAnalysis('S', userDimensions.S, partnerType.idealProfile.S)
      },
      {
        dimension: 'A',
        score: 100 - Math.abs(userDimensions.A - partnerType.idealProfile.A),
        analysis: generateDimensionAnalysis('A', userDimensions.A, partnerType.idealProfile.A)
      },
      {
        dimension: 'G',
        score: 100 - Math.abs(userDimensions.G - partnerType.idealProfile.G),
        analysis: generateDimensionAnalysis('G', userDimensions.G, partnerType.idealProfile.G)
      },
      {
        dimension: 'R',
        score: 100 - Math.abs(userDimensions.R - partnerType.idealProfile.R),
        analysis: generateDimensionAnalysis('R', userDimensions.R, partnerType.idealProfile.R)
      },
      {
        dimension: 'E',
        score: 100 - Math.abs(userDimensions.E - partnerType.idealProfile.E),
        analysis: generateDimensionAnalysis('E', userDimensions.E, partnerType.idealProfile.E)
      }
    ],
    matchReasons: generateMatchReasons(userDimensions, partnerType),
    complementaryAspects: generateComplementaryAspects(userDimensions, partnerType),
    potentialChallenges: generatePotentialChallenges(userDimensions, partnerType),
    stageAdvice: {
      initial: generateStageAdvice('initial', userDimensions, partnerType),
      gettingToKnow: generateStageAdvice('gettingToKnow', userDimensions, partnerType),
      stable: generateStageAdvice('stable', userDimensions, partnerType),
      longTerm: generateStageAdvice('longTerm', userDimensions, partnerType)
    }
  };
}

// 辅助函数：计算差异
function calculateDifference(profile1: Dimensions, profile2: Dimensions): number {
  let totalDifference = 0;
  const dimensions: (keyof Dimensions)[] = ['S', 'A', 'G', 'R', 'E'];

  dimensions.forEach(dimension => {
    const diff = Math.abs(profile1[dimension] - profile2[dimension]);
    totalDifference += diff;
  });

  return totalDifference / dimensions.length;
}

// 生成各维度的分析
function generateDimensionAnalysis(dimension: keyof Dimensions, userScore: number, partnerScore: number): string {
  const analyses: Record<string, Record<string, string>> = {
    'S': {
      'high_match': '你们都重视情感的确定性，能够给彼此足够的安全感',
      'complement': '一方需要安全感，另一方恰好能提供稳定支持',
      'mismatch': '在情感安全感的需求上可能存在差异，需要更多沟通'
    },
    'A': {
      'high_match': '双方都尊重个人空间，关系轻松自由',
      'complement': '一方需要更多空间，另一方乐于给予理解',
      'mismatch': '对个人空间的需求不同，需要找到平衡点'
    },
    'G': {
      'high_match': '都重视共同成长，能够互相激励进步',
      'complement': '一方注重成长，另一方欣赏并支持这种追求',
      'mismatch': '在成长节奏上可能不同步，需要调整期待'
    },
    'R': {
      'high_match': '都比较务实，能够理性规划未来',
      'complement': '理想与现实的结合，让关系既有梦想又脚踏实地',
      'mismatch': '一个理想化一个务实，需要理解彼此的视角'
    },
    'E': {
      'high_match': '情感表达方式相似，容易产生共鸣',
      'complement': '一个善于表达一个善于倾听，形成良好互补',
      'mismatch': '情感需求不同步，需要学习对方的语言'
    }
  };

  const diff = Math.abs(userScore - partnerScore);
  if (diff <= 20) {
    return analyses[dimension]?.high_match || '匹配度良好';
  } else if (diff <= 40) {
    return analyses[dimension]?.complement || '可以互补';
  } else {
    return analyses[dimension]?.mismatch || '需要注意差异';
  }
}

// 生成匹配原因
function generateMatchReasons(userDimensions: Dimensions, partnerType: any): string[] {
  const reasons = [];

  if (Math.abs(userDimensions.S - partnerType.idealProfile.S) <= 30) {
    reasons.push('情感需求相匹配，能给予彼此想要的安全感');
  }
  if (Math.abs(userDimensions.A - partnerType.idealProfile.A) <= 30) {
    reasons.push('对个人空间的理解相似，相处舒适自然');
  }
  if (Math.abs(userDimensions.G - partnerType.idealProfile.G) <= 30) {
    reasons.push('成长观念一致，能够成为彼此的助力');
  }
  if (Math.abs(userDimensions.R - partnerType.idealProfile.R) <= 30) {
    reasons.push('现实态度相似，对未来有相似的规划');
  }
  if (Math.abs(userDimensions.E - partnerType.idealProfile.E) <= 30) {
    reasons.push('情感表达方式相容，容易理解彼此');
  }

  return reasons;
}

// 生成互补方面
function generateComplementaryAspects(userDimensions: Dimensions, partnerType: any): string[] {
  const aspects = [];

  if (userDimensions.S < 50 && partnerType.idealProfile.S > 70) {
    aspects.push('你能给TA提供稳定感，TA能让你更安心地表达');
  }
  if (userDimensions.E > 70 && partnerType.idealProfile.E < 50) {
    aspects.push('你能带动TA的情感表达，TA能帮你保持理性');
  }
  if (userDimensions.A < 50 && partnerType.idealProfile.A > 70) {
    aspects.push('TA教会你尊重边界，你让TA体验亲密的美好');
  }

  return aspects;
}

// 生成潜在挑战
function generatePotentialChallenges(userDimensions: Dimensions, partnerType: any): string[] {
  const challenges = [];

  if (Math.abs(userDimensions.S - partnerType.idealProfile.S) > 50) {
    challenges.push('在安全感需求上差异较大，需要更多耐心和理解');
  }
  if (Math.abs(userDimensions.E - partnerType.idealProfile.E) > 50) {
    challenges.push('情感表达方式不同，可能产生误解');
  }
  if (Math.abs(userDimensions.A - partnerType.idealProfile.A) > 50) {
    challenges.push('对个人空间的需求不同，需要找到平衡');
  }

  return challenges;
}

// 生成不同阶段的建议
function generateStageAdvice(stage: string, userDimensions: Dimensions, partnerType: any): string[] {
  const advices: Record<string, string[]> = {
    'initial': [
      '通过共同的兴趣爱好创造相遇机会',
      '展现真实的自己，不要刻意迎合',
      '观察TA处理压力和人际关系的方式'
    ],
    'gettingToKnow': [
      '分享彼此的成长经历和价值观',
      '通过深度对话了解彼此的情感需求',
      '注意观察TA对待他人的态度'
    ],
    'stable': [
      '建立定期的情感交流习惯',
      '共同制定短期和长期目标',
      '保持各自的兴趣爱好和社交圈'
    ],
    'longTerm': [
      '持续支持彼此的个人成长',
      '定期回顾和调整关系状态',
      '共同创造属于你们的仪式感'
    ]
  };

  return advices[stage] || [];
}

// 生成个人成长指南
export function generatePersonalGrowthGuide(emotionalType: EmotionalType, dimensions: Dimensions): PersonalGrowthGuide {
  return {
    advantageLeverage: [
      {
        strength: emotionalType.strengths[0] || '共情能力强',
        application: '在关系中敏锐察觉对方需求，提供及时的情感支持'
      },
      {
        strength: emotionalType.strengths[1] || '善解人意',
        application: '成为伴侣愿意倾诉的对象，建立深度信任'
      }
    ],
    growthExercises: [
      {
        area: emotionalType.growthAreas[0] || '建立边界感',
        practice: '每天给自己10分钟独处时间，学会说"不"',
        frequency: '每天练习'
      },
      {
        area: emotionalType.growthAreas[1] || '提升自我价值',
        practice: '每周记录3件自己做得好的事情',
        frequency: '每周练习'
      }
    ],
    blindSpots: [
      {
        blindSpot: '可能过度付出',
        impact: '容易耗尽自己，也让伴侣感到压力',
        solution: '学会关爱自己，让关系更加平衡'
      },
      {
        blindSpot: '逃避冲突',
        impact: '小问题积累成大矛盾',
        solution: '勇敢面对分歧，相信关系能够经受考验'
      }
    ]
  };
}

// 生成相遇指南
export function generateMeetingGuide(partnerType: any): MeetingGuide {
  const places: Record<string, string[]> = {
    'stable-harbor': ['稳定的工作场所', '志愿者活动', '朋友的聚会', '专业的培训课程'],
    'shoulder-to-shoulder': ['行业会议', '创业活动', '学习小组', '健身房'],
    'nurturing-caregiver': ['志愿者活动', '兴趣班', '书店', '咖啡厅'],
    'soul-conversationalist': ['读书会', '艺术展', '讲座', '深度对话小组'],
    'free-companion': ['旅行团', '户外活动', '兴趣社群', '独立工作室']
  };

  return {
    bestPlaces: places[partnerType.id] || ['社交场合', '兴趣小组', '朋友介绍'],
    recognitionSignals: {
      positive: [
        '言行一致，承诺的事情会做到',
        '尊重他人的边界和选择',
        '在压力下保持冷静',
        '对生活和未来有自己的规划'
      ],
      warning: [
        '过度承诺但做不到',
        '不尊重你的感受',
        '情绪极不稳定',
        '对未来没有规划'
      ]
    },
    attractionStrategies: {
      naturalDisplay: '展现真实的自己，分享你的想法和感受',
      createOpportunities: '参与TA感兴趣的活动，创造共同话题',
      deepConnection: '通过有意义的对话建立情感连接'
    }
  };
}