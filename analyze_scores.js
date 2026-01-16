const questions = require('./src/data/questions.ts');

// 分析每个维度的题目数量和分值分布
const dimensions = ['S', 'A', 'G', 'R', 'E'];
const stats = {};

dimensions.forEach(dim => {
  const dimQuestions = questions.filter(q => q.category === dim);
  const totalOptions = dimQuestions.reduce((sum, q) => sum + q.options.length, 0);
  const maxScorePerQuestion = Math.max(...dimQuestions.map(q => 
    Math.max(...q.options.map(o => {
      const scores = o.scores || {};
      return (scores[dim] || 0) + Object.values(scores).reduce((a, b) => a + b, 0) - (scores[dim] || 0);
    }))
  ));
  
  stats[dim] = {
    questionCount: dimQuestions.length,
    totalOptions,
    maxScorePerQuestion
  };
});

console.log(JSON.stringify(stats, null, 2));
