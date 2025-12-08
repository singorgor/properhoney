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