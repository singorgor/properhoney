import { Dimensions, UserAnswer, Question } from '../types';

// 计算维度得分
export function calculateDimensions(answers: UserAnswer[], questions: Question[]): Dimensions {
  const scores: Dimensions = { S: 0, A: 0, G: 0, R: 0, E: 0 };

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      const selectedOption = question.options.find(opt => opt.id === answer.selectedOption);
      if (selectedOption && selectedOption.scores) {
        Object.keys(selectedOption.scores).forEach(key => {
          const dimensionKey = key as keyof Dimensions;
          const scoreValue = selectedOption.scores[dimensionKey];
          if (scoreValue !== undefined) {
            scores[dimensionKey] += scoreValue;
          }
        });
      }
    }
  });

  return scores;
}

// 将原始分值转换为0-100分制
export function normalizeScores(scores: Dimensions): Dimensions {
  const normalized: Dimensions = { S: 0, A: 0, G: 0, R: 0, E: 0 };

  Object.keys(scores).forEach(key => {
    const dimensionKey = key as keyof Dimensions;
    const rawScore = scores[dimensionKey];

    // 优化后的归一化算法（v4.0 - 修正版）
    //
    // 实际情况分析：
    // - 每个维度8道题，每题至少有1个选项会给该维度加分
    // - 但很多选项给其他维度加分，或不给该维度加分
    // - 因此实际得分范围可能比预期更宽：最低约3-5分，最高约30-35分
    //
    // 新策略：使用更合理的范围映射
    let normalizedScore: number;

    // 基于实际答题的合理范围
    const minPossible = 3;   // 极低得分（几乎该维度的题目都选0分选项）
    const maxPossible = 35;  // 极高得分（该维度题目都选高分 + 跨维度加分）
    const range = maxPossible - minPossible;

    // 计算相对位置（0-1之间）
    let relativePos = (rawScore - minPossible) / range;
    relativePos = Math.max(0, Math.min(1, relativePos));

    // 使用分段线性映射，确保中等分数映射到中等区间
    // 目标：原始分15分（中等）应该映射到约50分
    if (relativePos <= 0.25) {
      // 0%-25% → 0-25分
      normalizedScore = Math.round(relativePos * 100);
    } else if (relativePos <= 0.5) {
      // 25%-50% → 25-50分
      normalizedScore = Math.round(25 + (relativePos - 0.25) * 100);
    } else if (relativePos <= 0.75) {
      // 50%-75% → 50-75分
      normalizedScore = Math.round(50 + (relativePos - 0.5) * 100);
    } else {
      // 75%-100% → 75-100分
      normalizedScore = Math.round(75 + (relativePos - 0.75) * 100);
    }

    normalized[dimensionKey] = Math.max(0, Math.min(100, normalizedScore));
  });

  return normalized;
}

// 获取维度级别
export function getDimensionLevel(score: number): '极高' | '较高' | '中等' | '较低' | '很低' {
  if (score >= 90) return '极高';
  if (score >= 70) return '较高';
  if (score >= 40) return '中等';
  if (score >= 20) return '较低';
  return '很低';
}

// 计算两个维度配置的差异度
export function calculateDifference(profile1: Dimensions, profile2: Dimensions): number {
  let totalDifference = 0;
  const dimensions: (keyof Dimensions)[] = ['S', 'A', 'G', 'R', 'E'];

  dimensions.forEach(dimension => {
    const diff = Math.abs(profile1[dimension] - profile2[dimension]);
    totalDifference += diff;
  });

  return totalDifference / dimensions.length; // 返回平均差异
}

// 计算适配度百分比
export function calculateCompatibility(difference: number): number {
  // 改进的适配度计算算法（最终优化版）
  // 考虑到实际得分范围通常在 0-100 分之间
  // 平均差异通常在 15-45 分之间
  //
  // 新的映射策略（更严格的曲线）：
  // 差异 0-15 分 → 90-100% (非常适配)
  // 差异 15-25 分 → 70-90% (较好适配)
  // 差异 25-35 分 → 50-70% (中等适配)
  // 差异 35-45 分 → 30-50% (较低适配)
  // 差异 45-55 分 → 10-30% (低适配)
  // 差异 55+ 分 → 0-10% (不适配)

  if (difference <= 15) {
    return Math.round(90 + (15 - difference) * 0.67); // 90-100%
  } else if (difference <= 25) {
    return Math.round(70 + (25 - difference) * 2); // 70-90%
  } else if (difference <= 35) {
    return Math.round(50 + (35 - difference) * 2); // 50-70%
  } else if (difference <= 45) {
    return Math.round(30 + (45 - difference) * 2); // 30-50%
  } else if (difference <= 55) {
    return Math.round(10 + (55 - difference) * 2); // 10-30%
  } else {
    return Math.max(0, Math.round(10 - (difference - 55) * 0.5)); // 0-10%
  }
}