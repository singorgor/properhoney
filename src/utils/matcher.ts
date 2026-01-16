import { Dimensions, PartnerType, TestResult } from '../types';
import { calculateDifference, calculateCompatibility } from './calculator';
import { getEmotionalType, generateIdealPartnerProfile, generateCompatibilityAnalysis, generatePersonalGrowthGuide, generateMeetingGuide, generateRelationshipGuide } from './reportGenerator';

export interface CompatibilityResult {
  type: PartnerType;
  compatibility: number;
  matchPoints: string[];
  potentialRisks: string[];
}

// 生成匹配点说明（优化阈值）
export function generateMatchPoints(userProfile: Dimensions, partnerProfile: Dimensions): string[] {
  const matchPoints: string[] = [];

  // 优化阈值：差异 <= 25 分为匹配点（原来20分太严格）
  if (Math.abs(userProfile.S - partnerProfile.S) <= 25) {
    matchPoints.push('情感安全感需求高度匹配');
  }
  if (Math.abs(userProfile.A - partnerProfile.A) <= 25) {
    matchPoints.push('个人空间需求相互尊重');
  }
  if (Math.abs(userProfile.G - partnerProfile.G) <= 25) {
    matchPoints.push('共同成长理念一致');
  }
  if (Math.abs(userProfile.R - partnerProfile.R) <= 25) {
    matchPoints.push('现实观念基本吻合');
  }
  if (Math.abs(userProfile.E - partnerProfile.E) <= 25) {
    matchPoints.push('情感表达方式兼容');
  }

  return matchPoints;
}

// 生成潜在风险说明（优化阈值）
export function generateRisks(userProfile: Dimensions, partnerProfile: Dimensions): string[] {
  const risks: string[] = [];

  // 优化阈值：差异 >= 45 分为风险点（原来40分）
  // 25-45分之间既不是匹配点也不是风险点，属于"需要注意的区域"
  if (Math.abs(userProfile.S - partnerProfile.S) >= 45) {
    risks.push('情感安全感需求差异较大，可能产生不安全感');
  }
  if (Math.abs(userProfile.A - partnerProfile.A) >= 45) {
    risks.push('个人空间需求不匹配，可能出现束缚感');
  }
  if (Math.abs(userProfile.G - partnerProfile.G) >= 45) {
    risks.push('成长理念差异明显，对未来的规划可能冲突');
  }
  if (Math.abs(userProfile.R - partnerProfile.R) >= 45) {
    risks.push('现实观念差异较大，在重要决策上可能分歧');
  }
  if (Math.abs(userProfile.E - partnerProfile.E) >= 45) {
    risks.push('情感表达方式不同，可能出现沟通障碍');
  }

  return risks;
}

// 获取用户的主导维度（得分最高的2个维度）
function getDominantDimensions(profile: Dimensions): Array<{ dimension: keyof Dimensions; score: number }> {
  const dimensions: (keyof Dimensions)[] = ['S', 'A', 'G', 'R', 'E'];
  return dimensions
    .map(dim => ({ dimension: dim, score: profile[dim] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
}

// 计算主导维度匹配加分（优化版）
function calculateDominantBonus(
  userDominant: Array<{ dimension: keyof Dimensions; score: number }>,
  partnerProfile: Dimensions
): number {
  let bonus = 0;

  userDominant.forEach(({ dimension, score }) => {
    // 优化后的加分规则：
    // 1. 用户主导维度得分 >= 65，伴侣类型对应维度 >= 65 → 加3分（降低权重）
    // 2. 用户主导维度得分 >= 75，伴侣类型对应维度 >= 75 → 加4分
    // 3. 最高加分不超过 6 分（原来可能加10分）

    const partnerScore = partnerProfile[dimension];

    if (score >= 75 && partnerScore >= 75) {
      bonus += 4; // 极高匹配
    } else if (score >= 65 && partnerScore >= 65) {
      bonus += 3; // 较高匹配
    }

    // 互补性加分：如果用户某个维度很高（>=75），但伴侣类型该维度较低（<=45）
    // 且伴侣类型在另一个维度较高，这可能是好的互补
    // 这里暂时不加，避免过度复杂化
  });

  return Math.min(6, bonus); // 限制最高加分不超过6分
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
  // 获取用户的主导维度
  const userDominant = getDominantDimensions(userProfile);

  // 计算与每种类型的适配度
  const compatibilityResults: CompatibilityResult[] = partnerTypes.map(type => {
    const difference = calculateDifference(userProfile, type.idealProfile);
    let compatibility = calculateCompatibility(difference);

    // 应用主导维度加分
    const dominantBonus = calculateDominantBonus(userDominant, type.idealProfile);
    compatibility = Math.min(100, compatibility + dominantBonus);

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

  // 生成相处指南
  const relationshipGuide = generateRelationshipGuide(matchingResult.mainType, userProfile);

  return {
    dimensions: userProfile,
    dimensionLevels,
    emotionalType,
    idealPartner,
    compatibilityAnalysis,
    personalGrowth,
    meetingGuide,
    relationshipGuide,
    mainType: matchingResult.mainType,
    avoidType: matchingResult.avoidType,
    compatibilityRanking: matchingResult.compatibilityRanking,
    testDate: new Date()
  };
}