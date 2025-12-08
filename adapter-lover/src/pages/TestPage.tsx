import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Radio, Progress, Typography, Space, message } from 'antd';
import styled from 'styled-components';
import { questions } from '../data/questions';
import { calculateDimensions, normalizeScores, getDimensionLevel } from '../utils/calculator';
import { matchPartnerTypes } from '../utils/matcher';
import { partnerTypes } from '../data/partnerTypes';
import { UserAnswer, TestResult } from '../types';

const { Title } = Typography;

const TestContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const QuestionCard = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;

  .ant-card-body {
    padding: 40px;
  }
`;

const QuestionHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const QuestionTitle = styled(Title)`
  color: #333 !important;
  margin-bottom: 20px !important;
  line-height: 1.6 !important;
`;

const ProgressContainer = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const OptionCard = styled(Card)`
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  border-radius: 12px;

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
  }

  &.selected {
    border-color: #667eea;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  }

  .ant-card-body {
    padding: 20px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const NavigationButton = styled(Button)`
  margin: 0 10px;
  height: 45px;
  border-radius: 25px;
  font-weight: 600;
  min-width: 120px;
`;

const TestPage: React.FC<{ onComplete: (answers: UserAnswer[], result: TestResult) => void; answers: UserAnswer[] }> = ({
  onComplete,
  answers: initialAnswers
}) => {
  const history = useHistory();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>(initialAnswers);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    // 如果有之前的答案，恢复当前题目的选择
    const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
    if (existingAnswer) {
      setSelectedOption(existingAnswer.selectedOption);
    } else {
      setSelectedOption('');
    }
  }, [currentQuestionIndex, answers, currentQuestion.id]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (!selectedOption) {
      message.warning('请选择一个选项后再继续');
      return;
    }

    // 保存当前答案
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOption
    };

    const updatedAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    updatedAnswers.push(newAnswer);
    updatedAnswers.sort((a, b) => a.questionId - b.questionId);
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    }
  };

  const handleSubmit = async () => {
    if (!selectedOption) {
      message.warning('请选择一个选项后再提交');
      return;
    }

    setIsSubmitting(true);

    try {
      // 保存最后答案
      const newAnswer: UserAnswer = {
        questionId: currentQuestion.id,
        selectedOption
      };

      const finalAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
      finalAnswers.push(newAnswer);
      finalAnswers.sort((a, b) => a.questionId - b.questionId);

      // 计算结果
      const rawScores = calculateDimensions(finalAnswers, questions);
      const normalizedScores = normalizeScores(rawScores);

      // 计算匹配
      const { mainType, avoidType, compatibilityRanking } = matchPartnerTypes(normalizedScores, partnerTypes);

      const result: TestResult = {
        dimensions: normalizedScores,
        dimensionLevels: {
          S: getDimensionLevel(normalizedScores.S),
          A: getDimensionLevel(normalizedScores.A),
          G: getDimensionLevel(normalizedScores.G),
          R: getDimensionLevel(normalizedScores.R),
          E: getDimensionLevel(normalizedScores.E)
        },
        mainType,
        avoidType,
        compatibilityRanking,
        testDate: new Date()
      };

      onComplete(finalAnswers, result);
      history.push('/result');
    } catch (error) {
      message.error('计算结果时出现错误，请重试');
      console.error('Calculation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasPrevious = currentQuestionIndex > 0;

  return (
    <TestContainer>
      <QuestionCard>
        <QuestionHeader>
          <ProgressContainer>
            <Progress
              type="circle"
              percent={Math.round(progress)}
              size={80}
              strokeColor={{
                '0%': '#667eea',
                '100%': '#764ba2',
              }}
              format={() => `${currentQuestionIndex + 1}/${questions.length}`}
            />
          </ProgressContainer>
          <QuestionTitle level={3}>
            {currentQuestion.text}
          </QuestionTitle>
        </QuestionHeader>

        <Radio.Group value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {currentQuestion.options.map((option) => (
              <OptionCard
                key={option.id}
                className={selectedOption === option.id ? 'selected' : ''}
                onClick={() => handleOptionSelect(option.id)}
              >
                <Radio value={option.id} style={{ marginRight: 15 }}>
                  <span style={{ fontSize: '1rem', fontWeight: 500 }}>
                    {option.id}.
                  </span>
                </Radio>
                <span style={{ fontSize: '1rem' }}>{option.text}</span>
              </OptionCard>
            ))}
          </Space>
        </Radio.Group>

        <ButtonContainer>
          {hasPrevious && (
            <NavigationButton size="large" onClick={handlePrevious}>
              上一题
            </NavigationButton>
          )}

          {isLastQuestion ? (
            <NavigationButton
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={isSubmitting}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
                border: 'none'
              }}
            >
              提交测评
            </NavigationButton>
          ) : (
            <NavigationButton
              type="primary"
              size="large"
              onClick={handleNext}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none'
              }}
            >
              下一题
            </NavigationButton>
          )}
        </ButtonContainer>
      </QuestionCard>
    </TestContainer>
  );
};

export default TestPage;