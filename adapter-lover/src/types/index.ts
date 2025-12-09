// 五维度定义
export interface Dimensions {
  S: number; // 情感安全感需求
  A: number; // 自主/空间需求
  G: number; // 共同成长/事业重视度
  R: number; // 现实务实度
  E: number; // 情绪共鸣/理性方式
}

// 题目选项
export interface Option {
  id: string;
  text: string;
  scores: Partial<Dimensions>;
}

// 题目
export interface Question {
  id: number;
  category: 'S' | 'A' | 'G' | 'R' | 'E' | 'mixed';
  text: string;
  options: Option[];
}

// 伴侣类型定义
export interface PartnerType {
  id: string;
  name: string;
  description: string;
  idealProfile: Dimensions;
  characteristics: {
    personality: string[];
    values: string;
    emotionalExpression: string;
    lifestyle: string;
  };
  suitableFor: {
    dimensions: Partial<Dimensions>;
    description: string;
  };
  signals: {
    earlySigns: string[];
    verificationMethods: string[];
  };
  tips: string[];
}

// 用户的情感类型
export interface EmotionalType {
  id: string;
  name: string;
  description: string;
  attachmentStyle: 'secure' | 'anxious' | 'avoidant' | 'disorganized';
  emotionalPattern: string;
  loveLanguage: string[];
  strengths: string[];
  growthAreas: string[];
  relationshipAdvantages: string[];
  potentialChallenges: string[];
}

// 扩展的匹配度分析
export interface CompatibilityAnalysis {
  overallCompatibility: number;
  dimensionCompatibility: {
    dimension: keyof Dimensions;
    score: number;
    analysis: string;
  }[];
  matchReasons: string[];
  complementaryAspects: string[];
  potentialChallenges: string[];
  stageAdvice: {
    initial: string[];
    gettingToKnow: string[];
    stable: string[];
    longTerm: string[];
  };
}

// 伴侣画像详情
export interface IdealPartnerProfile {
  baseType: PartnerType;
  personality: {
    coreStrengths: string[];
    quirks: string[];
    uniqueCharm: string;
    lovePhilosophy: string;
  };
  loveLanguage: {
    expression: string;
    appreciation: string;
    values: string[];
  };
  lifestyleScenes: {
    dailyLife: string;
    underPressure: string;
    celebration: string;
    socialCircle: string;
  };
  imperfections: string[];
}

// 个人成长指南
export interface PersonalGrowthGuide {
  advantageLeverage: {
    strength: string;
    application: string;
  }[];
  growthExercises: {
    area: string;
    practice: string;
    frequency: string;
  }[];
  blindSpots: {
    blindSpot: string;
    impact: string;
    solution: string;
  }[];
}

// 相遇指南
export interface MeetingGuide {
  bestPlaces: string[];
  recognitionSignals: {
    positive: string[];
    warning: string[];
  };
  attractionStrategies: {
    naturalDisplay: string;
    createOpportunities: string;
    deepConnection: string;
  };
}

// 测评结果
export interface TestResult {
  userId?: string;
  dimensions: Dimensions;
  dimensionLevels: {
    S: '极高' | '较高' | '中等' | '较低' | '很低';
    A: '极高' | '较高' | '中等' | '较低' | '很低';
    G: '极高' | '较高' | '中等' | '较低' | '很低';
    R: '极高' | '较高' | '中等' | '较低' | '很低';
    E: '极高' | '较高' | '中等' | '较低' | '很低';
  };
  emotionalType: EmotionalType;
  idealPartner: IdealPartnerProfile;
  compatibilityAnalysis: CompatibilityAnalysis;
  personalGrowth: PersonalGrowthGuide;
  meetingGuide: MeetingGuide;
  mainType: PartnerType;
  avoidType: PartnerType;
  compatibilityRanking: Array<{
    type: PartnerType;
    compatibility: number;
    matchPoints: string[];
    potentialRisks: string[];
  }>;
  testDate: Date;
}

// 用户答题记录
export interface UserAnswer {
  questionId: number;
  selectedOption: string;
}

// 计算配置
export interface CalculationConfig {
  dimensionMapping: {
    [key: string]: keyof Dimensions;
  };
  partnerTypeThresholds: {
    [key: string]: number;
  };
}