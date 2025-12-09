import { Dimensions, PartnerType, TestResult } from '../types';
import { calculateDifference, calculateCompatibility } from './calculator';
import { getEmotionalType, generateIdealPartnerProfile, generateCompatibilityAnalysis, generatePersonalGrowthGuide, generateMeetingGuide } from './reportGenerator';

export interface CompatibilityResult {
  type: PartnerType;
  compatibility: number;
  matchPoints: string[];
  potentialRisks: string[];
}

// 生成匹配点说明
export function generateMatchPoints(userProfile: Dimensions, partnerProfile: Dimensions): string[] {
  const matchPoints: string[] = [];

  if (Math.abs(userProfile.S - partnerProfile.S) <= 20) {
    matchPoints.push('情感安全感需求高度匹配');
  }
  if (Math.abs(userProfile.A - partnerProfile.A) <= 20) {
    matchPoints.push('个人空间需求相互尊重');
  }
  if (Math.abs(userProfile.G - partnerProfile.G) <= 20) {
    matchPoints.push('共同成长理念一致');
  }
  if (Math.abs(userProfile.R - partnerProfile.R) <= 20) {
    matchPoints.push('现实观念基本吻合');
  }
  if (Math.abs(userProfile.E - partnerProfile.E) <= 20) {
    matchPoints.push('情感表达方式兼容');
  }

  return matchPoints;
}

// 生成潜在风险说明
export function generateRisks(userProfile: Dimensions, partnerProfile: Dimensions): string[] {
  const risks: string[] = [];

  if (Math.abs(userProfile.S - partnerProfile.S) > 40) {
    risks.push('情感安全感需求差异较大，可能产生不安全感');
  }
  if (Math.abs(userProfile.A - partnerProfile.A) > 40) {
    risks.push('个人空间需求不匹配，可能出现束缚感');
  }
  if (Math.abs(userProfile.G - partnerProfile.G) > 40) {
    risks.push('成长理念差异明显，对未来的规划可能冲突');
  }
  if (Math.abs(userProfile.R - partnerProfile.R) > 40) {
    risks.push('现实观念差异较大，在重要决策上可能分歧');
  }
  if (Math.abs(userProfile.E - partnerProfile.E) > 40) {
    risks.push('情感表达方式不同，可能出现沟通障碍');
  }

  return risks;
}

// 匹配伴侣类型
export function matchPartnerTypes(
  userProfile: Dimensions,
  partnerTypes: PartnerType[]
): {
  mainType: PartnerType;
  avoidType: PartnerType;
  compatibilityRanking: CompatibilityResult[];
} {
  // 计算与每种类型的适配度
  const compatibilityResults: CompatibilityResult[] = partnerTypes.map(type => {
    const difference = calculateDifference(userProfile, type.idealProfile);
    const compatibility = calculateCompatibility(difference);
    const matchPoints = generateMatchPoints(userProfile, type.idealProfile);
    const potentialRisks = generateRisks(userProfile, type.idealProfile);

    return {
      type,
      compatibility,
      matchPoints,
      potentialRisks
    };
  });

  // 按适配度排序
  compatibilityResults.sort((a, b) => b.compatibility - a.compatibility);

  const mainType = compatibilityResults[0].type;
  const avoidType = compatibilityResults[compatibilityResults.length - 1].type;

  return {
    mainType,
    avoidType,
    compatibilityRanking: compatibilityResults
  };
}

// 生成完整的测评结果
export function generateTestResult(
  userProfile: Dimensions,
  dimensionLevels: TestResult['dimensionLevels'],
  partnerTypes: PartnerType[]
): TestResult {
  // 获取基础匹配结果
  const matchingResult = matchPartnerTypes(userProfile, partnerTypes);

  // 获取用户情感类型
  const emotionalType = getEmotionalType(userProfile);

  // 生成理想伴侣画像
  const idealPartner = generateIdealPartnerProfile(matchingResult.mainType, userProfile);

  // 生成匹配度分析
  const compatibilityAnalysis = generateCompatibilityAnalysis(userProfile, matchingResult.mainType);

  // 生成个人成长指南
  const personalGrowth = generatePersonalGrowthGuide(emotionalType, userProfile);

  // 生成相遇指南
  const meetingGuide = generateMeetingGuide(matchingResult.mainType);

  return {
    dimensions: userProfile,
    dimensionLevels,
    emotionalType,
    idealPartner,
    compatibilityAnalysis,
    personalGrowth,
    meetingGuide,
    mainType: matchingResult.mainType,
    avoidType: matchingResult.avoidType,
    compatibilityRanking: matchingResult.compatibilityRanking,
    testDate: new Date()
  };
}