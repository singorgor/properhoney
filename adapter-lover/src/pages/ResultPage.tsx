import React, { useRef, useState } from 'react';
import { Button, Card, Typography, Row, Col, Progress, Divider, Tag, Tabs, Timeline, Space } from 'antd';
import styled from 'styled-components';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { TestResult } from '../types';
import {
  HeartOutlined,
  StarOutlined,
  BulbOutlined,
  CompassOutlined,
  UserOutlined,
  ThunderboltOutlined,
  GiftOutlined,
  BookOutlined,
  TeamOutlined,
  FireOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  EyeOutlined
} from '@ant-design/icons';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const ResultContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const ResultCard = styled(Card)`
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border: none;

  .ant-card-body {
    padding: 40px;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 30px;
  border-radius: 15px;
`;

const MainTitle = styled(Title)`
  color: #667eea !important;
  margin-bottom: 10px !important;
  font-size: 2.5rem !important;
`;

const SubTitle = styled(Paragraph)`
  color: #666 !important;
  font-size: 1.2rem !important;
  margin-bottom: 0 !important;
`;

const SectionTitle = styled(Title)`
  color: #333 !important;
  margin: 40px 0 20px 0 !important;
  border-bottom: 3px solid #667eea;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;

  .anticon {
    color: #667eea;
  }
`;

const SectionCard = styled(Card)`
  margin-bottom: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: none;

  .ant-card-head {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px 15px 0 0;

    .ant-card-head-title {
      color: white !important;
      font-weight: 600;
      font-size: 1.1rem;
    }
  }

  .ant-card-body {
    padding: 30px;
  }
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-left: 4px solid #667eea;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
`;

const ChartContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const ScoreDisplay = styled.div`
  text-align: center;
  margin: 20px 0;

  .score-value {
    font-size: 3.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .score-label {
    color: #666;
    font-size: 1.1rem;
    margin-top: 5px;
  }
`;

const ActionButton = styled(Button)`
  height: 50px;
  border-radius: 25px;
  font-weight: 600;
  min-width: 150px;
  margin: 10px;
  font-size: 1rem;

  .anticon {
    margin-right: 8px;
  }
`;

const TraitTag = styled(Tag)`
  margin: 5px;
  padding: 8px 15px;
  font-size: 0.95rem;
  border-radius: 20px;
  border: none;

  &.strength {
    background: linear-gradient(135deg, #e6f7ff 0%, #d1f5e3 100%);
    color: #1890ff;
  }

  &.growth {
    background: linear-gradient(135deg, #fff7e6 0%, #ffece6 100%);
    color: #fa8c16;
  }
`;

const DimensionProgress = styled.div`
  margin: 15px 0;

  .dimension-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .dimension-description {
    color: #666;
    font-size: 0.9rem;
    margin-top: 8px;
    line-height: 1.5;
  }
`;

const StageCard = styled(Card)`
  margin: 20px 0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .ant-card-head {
    background: linear-gradient(135deg, #f0f5ff 0%, #e6f7ff 100%);
    border-radius: 12px 12px 0 0;
  }

  .ant-card-body {
    padding: 20px;
  }
`;

const TipList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    padding-left: 35px;

    &:last-child {
      border-bottom: none;
    }

    .anticon {
      position: absolute;
      left: 0;
      top: 14px;
      color: #52c41a;
    }
  }
`;

const ResultPage: React.FC<{ result: TestResult; onRestart: () => void }> = ({ result, onRestart }) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('1');

  // 准备雷达图数据
  const radarData = {
    labels: [
      '情感安全感',
      '个人空间',
      '共同成长',
      '现实务实',
      '情绪表达'
    ],
    datasets: [
      {
        label: '你的情感画像',
        data: [
          result.dimensions.S,
          result.dimensions.A,
          result.dimensions.G,
          result.dimensions.R,
          result.dimensions.E
        ],
        fill: true,
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: 'rgb(102, 126, 234)',
        pointBackgroundColor: 'rgb(102, 126, 234)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(102, 126, 234)'
      },
      {
        label: '理想伴侣',
        data: [
          result.idealPartner.baseType.idealProfile.S,
          result.idealPartner.baseType.idealProfile.A,
          result.idealPartner.baseType.idealProfile.G,
          result.idealPartner.baseType.idealProfile.R,
          result.idealPartner.baseType.idealProfile.E
        ],
        fill: true,
        backgroundColor: 'rgba(82, 196, 26, 0.2)',
        borderColor: 'rgb(82, 196, 26)',
        pointBackgroundColor: 'rgb(82, 196, 26)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(82, 196, 26)'
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.r}分`;
          }
        }
      }
    }
  };

  const getDimensionColor = (level: string) => {
    switch (level) {
      case '极高': return '#52c41a';
      case '较高': return '#73d13d';
      case '中等': return '#faad14';
      case '较低': return '#ff7a45';
      case '很低': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  const getDimensionName = (key: keyof typeof result.dimensions) => {
    const names = {
      'S': '情感安全感需求',
      'A': '个人空间需求',
      'G': '共同成长重视度',
      'R': '现实务实程度',
      'E': '情绪表达偏好'
    };
    return names[key];
  };

  return (
    <ResultContainer ref={resultRef}>
      <ResultCard>
        {/* 报告头部 */}
        <HeaderSection>
          <MainTitle level={1}>
            <HeartOutlined /> 适配恋人测评报告
          </MainTitle>
          <SubTitle>
            {result.emotionalType.name} · 生成时间：{result.testDate.toLocaleString()}
          </SubTitle>
        </HeaderSection>

        {/* 核心概览 */}
        <SectionTitle level={2}>
          <StarOutlined /> 你的情感特质概览
        </SectionTitle>
        <Paragraph style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.8 }}>
          {result.emotionalType.description}
        </Paragraph>

        {/* 标签页内容 */}
        <Tabs activeKey={activeTab} onChange={setActiveTab} centered size="large">
          <TabPane tab={
            <span>
              <UserOutlined />
              你的情感画像
            </span>
          } key="1">
            <Row gutter={[30, 30]}>
              <Col xs={24} md={12}>
                <ChartContainer>
                  <Radar data={radarData} options={radarOptions} />
                </ChartContainer>
              </Col>
              <Col xs={24} md={12}>
                <Title level={4}>五维度解析</Title>
                {Object.entries(result.dimensions).map(([key, value]) => (
                  <DimensionProgress key={key}>
                    <div className="dimension-label">
                      <Text strong>{getDimensionName(key as keyof typeof result.dimensions)}</Text>
                      <Tag color={getDimensionColor(result.dimensionLevels[key as keyof typeof result.dimensionLevels])}>
                        {result.dimensionLevels[key as keyof typeof result.dimensionLevels]} ({value}分)
                      </Tag>
                    </div>
                    <Progress
                      percent={value}
                      strokeColor={getDimensionColor(result.dimensionLevels[key as keyof typeof result.dimensionLevels])}
                      showInfo={false}
                      strokeWidth={10}
                      style={{ marginBottom: 10 }}
                    />
                  </DimensionProgress>
                ))}
              </Col>
            </Row>

            <SectionCard title="关系中的优势与成长">
              <Row gutter={[20, 20]}>
                <Col xs={24} md={12}>
                  <Title level={4}>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> 你的优势
                  </Title>
                  <Space wrap>
                    {result.emotionalType.strengths.map((strength, index) => (
                      <TraitTag key={index} className="strength">{strength}</TraitTag>
                    ))}
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={4}>
                    <BulbOutlined style={{ color: '#fa8c16' }} /> 成长空间
                  </Title>
                  <Space wrap>
                    {result.emotionalType.growthAreas.map((area, index) => (
                      <TraitTag key={index} className="growth">{area}</TraitTag>
                    ))}
                  </Space>
                </Col>
              </Row>
            </SectionCard>
          </TabPane>

          <TabPane tab={
            <span>
              <HeartOutlined />
              理想伴侣画像
            </span>
          } key="2">
            <SectionCard>
              <Row gutter={[30, 30]}>
                <Col xs={24} md={8}>
                  <ScoreDisplay>
                    <div className="score-value">
                      {result.compatibilityAnalysis.overallCompatibility}%
                    </div>
                    <div className="score-label">整体匹配度</div>
                  </ScoreDisplay>
                </Col>
                <Col xs={24} md={16}>
                  <Title level={3}>TA的核心特质</Title>
                  <Paragraph style={{ fontSize: '1.1rem' }}>
                    {result.idealPartner.personality.uniqueCharm}
                  </Paragraph>
                  <Paragraph style={{ fontSize: '1rem', color: '#666' }}>
                    <strong>爱情观：</strong>{result.idealPartner.personality.lovePhilosophy}
                  </Paragraph>
                </Col>
              </Row>

              <Divider />

              <Row gutter={[30, 30]}>
                <Col xs={24} md={12}>
                  <Title level={4}>
                    <ThunderboltOutlined /> 闪光点
                  </Title>
                  <TipList>
                    {result.idealPartner.personality.coreStrengths.map((strength, index) => (
                      <li key={index}>
                        <CheckCircleOutlined />
                        {strength}
                      </li>
                    ))}
                  </TipList>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={4}>
                    <AlertOutlined /> 小缺点
                  </Title>
                  <TipList>
                    {result.idealPartner.personality.quirks.map((quirk, index) => (
                      <li key={index}>
                        <AlertOutlined style={{ color: '#faadc16' }} />
                        {quirk}
                      </li>
                    ))}
                  </TipList>
                </Col>
              </Row>

              <Divider />

              <Title level={4}>
                <GiftOutlined /> TA的爱语
              </Title>
              <Row gutter={[20, 20]}>
                <Col xs={24} md={12}>
                  <HighlightBox>
                    <Text strong>如何表达爱：</Text>
                    <Paragraph>{result.idealPartner.loveLanguage.expression}</Paragraph>
                  </HighlightBox>
                </Col>
                <Col xs={24} md={12}>
                  <HighlightBox>
                    <Text strong>如何感受爱：</Text>
                    <Paragraph>{result.idealPartner.loveLanguage.appreciation}</Paragraph>
                  </HighlightBox>
                </Col>
              </Row>
            </SectionCard>

            <SectionCard title="和TA的生活场景">
              <Row gutter={[20, 20]}>
                <Col xs={24} md={12}>
                  <Title level={5}>日常相处</Title>
                  <Paragraph>{result.idealPartner.lifestyleScenes.dailyLife}</Paragraph>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={5}>面对压力时</Title>
                  <Paragraph>{result.idealPartner.lifestyleScenes.underPressure}</Paragraph>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={5}>庆祝时刻</Title>
                  <Paragraph>{result.idealPartner.lifestyleScenes.celebration}</Paragraph>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={5}>社交圈</Title>
                  <Paragraph>{result.idealPartner.lifestyleScenes.socialCircle}</Paragraph>
                </Col>
              </Row>
            </SectionCard>
          </TabPane>

          <TabPane tab={
            <span>
              <CompassOutlined />
              相处指南
            </span>
          } key="3">
            <SectionCard>
              <Title level={3}>
                <FireOutlined /> 为什么你们如此契合
              </Title>
              <TipList>
                {result.compatibilityAnalysis.matchReasons.map((reason, index) => (
                  <li key={index}>
                    <CheckCircleOutlined />
                    {reason}
                  </li>
                ))}
              </TipList>
            </SectionCard>

            <Title level={3}>
              <BookOutlined /> 不同阶段的相处智慧
            </Title>
            <Row gutter={[20, 20]}>
              <Col xs={24} md={12}>
                <StageCard title="💫 初识阶段" size="small">
                  <TipList>
                    {result.compatibilityAnalysis.stageAdvice.initial.map((advice, index) => (
                      <li key={index}>
                        <EyeOutlined />
                        {advice}
                      </li>
                    ))}
                  </TipList>
                </StageCard>
              </Col>
              <Col xs={24} md={12}>
                <StageCard title="🌱 了解阶段" size="small">
                  <TipList>
                    {result.compatibilityAnalysis.stageAdvice.gettingToKnow.map((advice, index) => (
                      <li key={index}>
                        <EyeOutlined />
                        {advice}
                      </li>
                    ))}
                  </TipList>
                </StageCard>
              </Col>
              <Col xs={24} md={12}>
                <StageCard title="🏠 稳定交往" size="small">
                  <TipList>
                    {result.compatibilityAnalysis.stageAdvice.stable.map((advice, index) => (
                      <li key={index}>
                        <EyeOutlined />
                        {advice}
                      </li>
                    ))}
                  </TipList>
                </StageCard>
              </Col>
              <Col xs={24} md={12}>
                <StageCard title="💎 长期发展" size="small">
                  <TipList>
                    {result.compatibilityAnalysis.stageAdvice.longTerm.map((advice, index) => (
                      <li key={index}>
                        <EyeOutlined />
                        {advice}
                      </li>
                    ))}
                  </TipList>
                </StageCard>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab={
            <span>
              <BulbOutlined />
              个人成长
            </span>
          } key="4">
            <SectionCard>
              <Title level={3}>发挥你的优势</Title>
              {result.personalGrowth.advantageLeverage.map((item, index) => (
                <HighlightBox key={index}>
                  <Text strong style={{ color: '#1890ff' }}>{item.strength}</Text>
                  <Paragraph style={{ marginTop: 10 }}>{item.application}</Paragraph>
                </HighlightBox>
              ))}
            </SectionCard>

            <SectionCard>
              <Title level={3}>成长练习</Title>
              <Timeline>
                {result.personalGrowth.growthExercises.map((exercise, index) => (
                  <Timeline.Item key={index} color="green">
                    <Text strong>{exercise.area}</Text>
                    <Paragraph>{exercise.practice}</Paragraph>
                    <Text type="secondary">频率：{exercise.frequency}</Text>
                  </Timeline.Item>
                ))}
              </Timeline>
            </SectionCard>

            <SectionCard>
              <Title level={3}>需要留意的盲区</Title>
              {result.personalGrowth.blindSpots.map((blindSpot, index) => (
                <Card key={index} size="small" style={{ marginBottom: 15, backgroundColor: '#fff7e6' }}>
                  <Row gutter={[10, 10]}>
                    <Col xs={24} md={8}>
                      <Text strong style={{ color: '#fa8c16' }}>{blindSpot.blindSpot}</Text>
                    </Col>
                    <Col xs={24} md={8}>
                      <Text type="secondary">影响：{blindSpot.impact}</Text>
                    </Col>
                    <Col xs={24} md={8}>
                      <Text style={{ color: '#52c41a' }}>解决：{blindSpot.solution}</Text>
                    </Col>
                  </Row>
                </Card>
              ))}
            </SectionCard>
          </TabPane>

          <TabPane tab={
            <span>
              <TeamOutlined />
              遇见TA
            </span>
          } key="5">
            <SectionCard>
              <Title level={3}>最佳相遇场所</Title>
              <Row gutter={[15, 15]}>
                {result.meetingGuide.bestPlaces.map((place, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <Card size="small" style={{ textAlign: 'center', backgroundColor: '#f0f5ff' }}>
                      <TeamOutlined style={{ fontSize: 24, color: '#1890ff', marginBottom: 10 }} />
                      <div>{place}</div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </SectionCard>

            <Row gutter={[30, 30]}>
              <Col xs={24} md={12}>
                <SectionCard title="✨ 积极信号">
                  <TipList>
                    {result.meetingGuide.recognitionSignals.positive.map((signal, index) => (
                      <li key={index}>
                        <CheckCircleOutlined />
                        {signal}
                      </li>
                    ))}
                  </TipList>
                </SectionCard>
              </Col>
              <Col xs={24} md={12}>
                <SectionCard title="⚠️ 需要警惕">
                  <TipList>
                    {result.meetingGuide.recognitionSignals.warning.map((warning, index) => (
                      <li key={index}>
                        <AlertOutlined style={{ color: '#ff4d4f' }} />
                        {warning}
                      </li>
                    ))}
                  </TipList>
                </SectionCard>
              </Col>
            </Row>

            <SectionCard>
              <Title level={3}>吸引TA的策略</Title>
              <Row gutter={[20, 20]}>
                <Col xs={24} md={8}>
                  <HighlightBox>
                    <Text strong>自然展示</Text>
                    <Paragraph>{result.meetingGuide.attractionStrategies.naturalDisplay}</Paragraph>
                  </HighlightBox>
                </Col>
                <Col xs={24} md={8}>
                  <HighlightBox>
                    <Text strong>创造机会</Text>
                    <Paragraph>{result.meetingGuide.attractionStrategies.createOpportunities}</Paragraph>
                  </HighlightBox>
                </Col>
                <Col xs={24} md={8}>
                  <HighlightBox>
                    <Text strong>深度连接</Text>
                    <Paragraph>{result.meetingGuide.attractionStrategies.deepConnection}</Paragraph>
                  </HighlightBox>
                </Col>
              </Row>
            </SectionCard>
          </TabPane>
        </Tabs>

        {/* 操作按钮 */}
        <div style={{ textAlign: 'center', marginTop: 50, padding: '30px 0', borderTop: '1px solid #f0f0f0' }}>
          <ActionButton type="primary" size="large" onClick={onRestart}>
            <ThunderboltOutlined />
            重新测评
          </ActionButton>
          <ActionButton size="large" onClick={() => window.print()}>
            <BookOutlined />
            保存报告
          </ActionButton>
        </div>
      </ResultCard>
    </ResultContainer>
  );
};

export default ResultPage;