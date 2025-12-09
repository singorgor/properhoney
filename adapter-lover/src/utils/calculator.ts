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

  // 40道题，每道题单个维度最高3分
  // 每个维度大约8道题，最高约24分
  // 调整映射范围使其更合理
  const minScore = 0;
  const maxScore = 24;

  Object.keys(scores).forEach(key => {
    const dimensionKey = key as keyof Dimensions;
    const rawScore = scores[dimensionKey];
    // 线性映射到0-100
    normalized[dimensionKey] = Math.round(((rawScore - minScore) / (maxScore - minScore)) * 100);
    // 确保在0-100范围内
    normalized[dimensionKey] = Math.max(0, Math.min(100, normalized[dimensionKey]));
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
  // 差异越小，适配度越高
  // 差异为0时，适配度为100%；差异为100时，适配度为0
  return Math.max(0, Math.round(100 - difference));
}