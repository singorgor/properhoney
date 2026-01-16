/**
 * 测评逻辑测试脚本
 * 目的：验证不同答题组合能产生个性化的测评结果
 */

const { calculateDimensions, normalizeScores, getDimensionLevel, calculateDifference, calculateCompatibility } = require('./src/utils/calculator');
const { matchPartnerTypes, generateTestResult } = require('./src/utils/matcher');
const { questions } = require('./src/data/questions');
const { partnerTypes } = require('./src/data/partnerTypes');

// 颜色输出工具
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(color, ...args) {
  console.log(color, ...args, colors.reset);
}

function printSection(title) {
  console.log('\n' + colors.cyan + '='.repeat(80) + colors.reset);
  console.log(colors.cyan + title + colors.reset);
  console.log(colors.cyan + '='.repeat(80) + colors.reset + '\n');
}

// 测试用户类型定义
const testUsers = [
  {
    name: '情感导向型用户',
    description: '高安全感需求 + 高情感表达',
    answerPattern: (questionId) => {
      // 倾向选择需要安全感和情感表达的选项
      const category = questions.find(q => q.id === questionId)?.category;
      if (category === 'S' || category === 'E') {
        return 'D'; // 选择高分选项
      }
      return 'B';
    }
  },
  {
    name: '独立自由型用户',
    description: '高自主需求 + 低情感依赖',
    answerPattern: (questionId) => {
      const category = questions.find(q => q.id === questionId)?.category;
      if (category === 'A') {
        return 'D'; // 最高自主需求
      }
      if (category === 'S' || category === 'E') {
        return 'A'; // 低安全感和情感需求
      }
      return 'C';
    }
  },
  {
    name: '事业成长型用户',
    description: '高成长需求 + 高现实观念',
    answerPattern: (questionId) => {
      const category = questions.find(q => q.id === questionId)?.category;
      if (category === 'G' || category === 'R') {
        return 'D'; // 最高成长和现实需求
      }
      return 'B';
    }
  },
  {
    name: '理性务实型用户',
    description: '极高现实需求 + 低情感表达',
    answerPattern: (questionId) => {
      const category = questions.find(q => q.id === questionId)?.category;
      if (category === 'R') {
        return 'D'; // 极高现实需求
      }
      if (category === 'E') {
        return 'C'; // 低情感表达
      }
      return 'B';
    }
  },
  {
    name: '平衡型用户',
    description: '各维度相对均衡',
    answerPattern: (questionId) => {
      // 随机但保持平衡
      const random = Math.random();
      if (random < 0.25) return 'A';
      if (random < 0.5) return 'B';
      if (random < 0.75) return 'C';
      return 'D';
    }
  }
];

// 生成用户答案
function generateAnswers(answerPattern) {
  const answers = [];
  for (let i = 1; i <= 40; i++) {
    answers.push({
      questionId: i,
      selectedOption: answerPattern(i)
    });
  }
  return answers;
}

// 测试单个用户
function testUser(user) {
  printSection(`测试用户: ${user.name}`);
  log(colors.yellow, `描述: ${user.description}\n`);

  // 生成答案
  const answers = generateAnswers(user.answerPattern);

  // 计算原始分数
  const rawScores = calculateDimensions(answers, questions);
  log(colors.blue, '原始维度分数:', JSON.stringify(rawScores, null, 2));

  // 归一化分数
  const normalizedScores = normalizeScores(rawScores);
  log(colors.green, '归一化分数:', JSON.stringify(normalizedScores, null, 2));

  // 维度级别
  const dimensionLevels = {};
  Object.keys(normalizedScores).forEach(key => {
    dimensionLevels[key] = getDimensionLevel(normalizedScores[key]);
  });
  log(colors.magenta, '维度级别:', JSON.stringify(dimensionLevels, null, 2));

  // 生成完整测评结果
  const testResult = generateTestResult(
    normalizedScores,
    dimensionLevels,
    partnerTypes
  );

  // 输出关键结果
  log(colors.cyan, '\n---------- 测评结果摘要 ----------');
  log(colors.green, `情感类型: ${testResult.emotionalType.name}`);
  log(colors.green, `理想伴侣类型: ${testResult.mainType.name}`);
  log(colors.green, `适配度: ${testResult.compatibilityAnalysis.overallCompatibility}%`);
  log(colors.green, `避讳类型: ${testResult.avoidType.name}`);

  // 输出匹配点
  if (testResult.compatibilityRanking[0].matchPoints.length > 0) {
    log(colors.blue, '\n匹配点:');
    testResult.compatibilityRanking[0].matchPoints.forEach(point => {
      console.log(`  - ${point}`);
    });
  }

  // 输出潜在风险
  if (testResult.compatibilityRanking[0].potentialRisks.length > 0) {
    log(colors.red, '\n潜在风险:');
    testResult.compatibilityRanking[0].potentialRisks.forEach(risk => {
      console.log(`  - ${risk}`);
    });
  }

  // 输出所有类型的适配度排名
  log(colors.yellow, '\n适配度排名:');
  testResult.compatibilityRanking.forEach((result, index) => {
    console.log(`  ${index + 1}. ${result.type.name}: ${result.compatibility}%`);
  });

  return {
    user: user.name,
    emotionalType: testResult.emotionalType.name,
    mainType: testResult.mainType.name,
    avoidType: testResult.avoidType.name,
    compatibility: testResult.compatibilityAnalysis.overallCompatibility,
    scores: normalizedScores,
    ranking: testResult.compatibilityRanking.map(r => ({
      type: r.type.name,
      compatibility: r.compatibility
    }))
  };
}

// 验证结果多样性
function validateDiversity(results) {
  printSection('验证结果多样性');

  const emotionalTypes = new Set(results.map(r => r.emotionalType));
  const mainTypes = new Set(results.map(r => r.mainType));
  const avoidTypes = new Set(results.map(r => r.avoidType));

  log(colors.green, `情感类型数量: ${emotionalTypes.size} / 5`);
  log(colors.green, `理想伴侣类型数量: ${mainTypes.size} / 8`);
  log(colors.green, `避讳类型数量: ${avoidTypes.size} / 8`);

  console.log('\n情感类型分布:');
  results.forEach(r => {
    console.log(`  ${r.user}: ${r.emotionalType}`);
  });

  console.log('\n理想伴侣类型分布:');
  results.forEach(r => {
    console.log(`  ${r.user}: ${r.mainType}`);
  });

  // 检查是否有重复
  const mainTypeCounts = {};
  results.forEach(r => {
    mainTypeCounts[r.mainType] = (mainTypeCounts[r.mainType] || 0) + 1;
  });

  console.log('\n理想伴侣类型统计:');
  Object.keys(mainTypeCounts).forEach(type => {
    console.log(`  ${type}: ${mainTypeCounts[type]}次`);
  });

  // 验证：不同用户应该有不同的主要类型
  const uniqueMainTypes = results.map(r => r.mainType);
  const uniqueCount = new Set(uniqueMainTypes).size;

  if (uniqueCount >= 3) {
    log(colors.green, '\n✅ 通过: 不同用户获得了不同的理想伴侣类型');
  } else {
    log(colors.red, `\n❌ 警告: 只有${uniqueCount}种不同的理想伴侣类型,多样性不足!`);
  }

  // 验证：避讳类型应该与主要类型不同
  let allDifferent = true;
  results.forEach(r => {
    if (r.mainType === r.avoidType) {
      log(colors.red, `❌ 错误: ${r.user} 的理想伴侣类型和避讳类型相同!`);
      allDifferent = false;
    }
  });

  if (allDifferent) {
    log(colors.green, '✅ 通过: 所有用户的避讳类型都与理想伴侣类型不同');
  }
}

// 验证分数逻辑
function validateScores(results) {
  printSection('验证分数逻辑');

  results.forEach(result => {
    log(colors.blue, `\n${result.user}:`);

    // 检查分数范围
    const scores = result.scores;
    let inRange = true;
    Object.keys(scores).forEach(key => {
      if (scores[key] < 0 || scores[key] > 100) {
        log(colors.red, `  ❌ 分数超出范围: ${key} = ${scores[key]}`);
        inRange = false;
      }
    });

    if (inRange) {
      log(colors.green, `  ✅ 所有分数在0-100范围内`);
    }

    // 检查适配度排名是否按分数排序
    const compatibilities = result.ranking.map(r => r.compatibility);
    let isSorted = true;
    for (let i = 0; i < compatibilities.length - 1; i++) {
      if (compatibilities[i] < compatibilities[i + 1]) {
        isSorted = false;
        break;
      }
    }

    if (isSorted) {
      log(colors.green, `  ✅ 适配度排名正确排序`);
    } else {
      log(colors.red, `  ❌ 适配度排名未正确排序!`);
      console.log('   ', compatibilities);
    }

    // 检查最高适配度是否合理
    const maxCompatibility = compatibilities[0];
    if (maxCompatibility >= 60 && maxCompatibility <= 100) {
      log(colors.green, `  ✅ 最高适配度合理: ${maxCompatibility}%`);
    } else {
      log(colors.red, `  ❌ 最高适配度异常: ${maxCompatibility}%`);
    }
  });
}

// 验证适配度差异
function validateCompatibilityDifferences(results) {
  printSection('验证适配度差异化');

  results.forEach(result => {
    log(colors.blue, `\n${result.user}:`);
    const compatibilities = result.ranking.map(r => r.compatibility);
    const max = compatibilities[0];
    const min = compatibilities[compatibilities.length - 1];
    const diff = max - min;

    log(colors.yellow, `  最高适配度: ${max}%`);
    log(colors.yellow, `  最低适配度: ${min}%`);
    log(colors.yellow, `  差异: ${diff}%`);

    if (diff >= 20) {
      log(colors.green, `  ✅ 适配度有足够差异 (${diff}%)`);
    } else if (diff >= 10) {
      log(colors.yellow, `  ⚠️  适配度差异较小 (${diff}%)`);
    } else {
      log(colors.red, `  ❌ 适配度差异过小 (${diff}%), 可能导致所有类型相似!`);
    }
  });
}

// 主测试函数
function runTests() {
  console.log(colors.cyan + '\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                  理想伴侣测试 - 逻辑验证测试                                    ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝' + colors.reset);

  const results = [];

  // 测试每个用户类型
  testUsers.forEach(user => {
    const result = testUser(user);
    results.push(result);
  });

  // 运行验证
  validateDiversity(results);
  validateScores(results);
  validateCompatibilityDifferences(results);

  // 最终总结
  printSection('测试总结');
  log(colors.green, '✅ 所有测试完成');
  log(colors.yellow, '\n建议:');
  log(colors.reset, '1. 检查不同用户类型是否产生了不同的结果');
  log(colors.reset, '2. 确认适配度排名是否合理且差异化明显');
  log(colors.reset, '3. 验证避讳类型是否与理想伴侣类型不同');
  log(colors.reset, '4. 查看分数是否在合理范围内');
}

// 运行测试
runTests();
