import React, { useRef } from 'react';
import { Button, Card, Typography, Row, Col, Progress, Divider, Tag } from 'antd';
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

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const { Title, Paragraph, Text } = Typography;

const ResultContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const ResultCard = styled(Card)`
  max-width: 1000px;
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

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const MainTitle = styled(Title)`
  color: #667eea !important;
  margin-bottom: 10px !important;
  font-size: 2rem !important;
`;

const SubTitle = styled(Paragraph)`
  color: #666 !important;
  font-size: 1.1rem !important;
`;

const SectionTitle = styled(Title)`
  color: #333 !important;
  margin: 30px 0 20px 0 !important;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
`;

const DimensionCard = styled(Card)`
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  .ant-card-body {
    padding: 20px;
  }
`;

const ChartContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const PartnerTypeCard = styled(Card)<{ type?: 'recommended' | 'avoid' }>`
  margin: 20px 0;
  border-radius: 15px;
  border: 2px solid ${props => props.type === 'recommended' ? '#52c41a' : '#ff4d4f'};
  background: ${props => props.type === 'recommended'
    ? 'linear-gradient(135deg, rgba(82, 196, 26, 0.05) 0%, rgba(82, 196, 26, 0.1) 100%)'
    : 'linear-gradient(135deg, rgba(255, 77, 79, 0.05) 0%, rgba(255, 77, 79, 0.1) 100%)'
  };

  .ant-card-head {
    background: ${props => props.type === 'recommended' ? '#52c41a' : '#ff4d4f'};
    color: white;
    border-radius: 13px 13px 0 0;

    .ant-card-head-title {
      color: white !important;
      font-weight: 600;
    }
  }
`;

const TagContainer = styled.div`
  margin: 15px 0;
`;

const CompatibilityScore = styled.div`
  text-align: center;
  margin: 20px 0;

  .score {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .label {
    color: #666;
    font-size: 1rem;
    margin-top: 5px;
  }
`;

const ActionButton = styled(Button)`
  height: 45px;
  border-radius: 25px;
  font-weight: 600;
  min-width: 120px;
  margin: 10px;
`;

const ResultPage: React.FC<{ result: TestResult; onRestart: () => void }> = ({ result, onRestart }) => {
  const resultRef = useRef<HTMLDivElement>(null);

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
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed.r}分`;
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
    switch (key) {
      case 'S': return '情感安全感需求';
      case 'A': return '个人空间需求';
      case 'G': return '共同成长重视度';
      case 'R': return '现实务实程度';
      case 'E': return '情绪表达偏好';
      default: return '';
    }
  };

  const getDimensionDescription = (key: keyof typeof result.dimensions, level: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      'S': {
        '极高': '你极度需要关系中的稳定和安全感，非常重视情感的确定性',
        '较高': '你比较重视情感安全感，需要伴侣给予足够的关注和回应',
        '中等': '你在安全感需求上保持平衡，能够理解独立的重要性',
        '较低': '你不太依赖外部的情感确认，更相信自己的判断',
        '很低': '你基本不在意情感安全感，更相信感觉和直觉'
      },
      'A': {
        '极高': '你需要大量的个人时间和空间来保持自我独立性',
        '较高': '你比较重视个人空间，希望保持一定程度的独立性',
        '中等': '你在亲密与独立间寻求平衡点',
        '较低': '你倾向于与伴侣保持较紧密的连接',
        '很低': '你希望与伴侣时刻保持连接，不太需要个人空间'
      },
      'G': {
        '极高': '你极其重视与伴侣的共同成长和互相激励',
        '较高': '你比较看重伴侣的进取心和发展潜力',
        '中等': '你对成长有一定期待，但更看重关系的和谐',
        '较低': '你更关注当下的相处感受而非发展同步性',
        '很低': '你基本不在意伴侣的成长，更看重简单生活'
      },
      'R': {
        '极高': '你非常注重关系的现实基础和规划能力',
        '较高': '你比较看重关系的现实层面，希望伴侣有责任感',
        '中等': '你在理想和现实间寻求平衡',
        '较低': '你更相信感觉和情感，认为现实问题可以慢慢解决',
        '很低': '你几乎不考虑现实因素，完全相信感觉'
      },
      'E': {
        '极高': '你需要深度的情感交流和共情理解',
        '较高': '你比较重视情感交流，希望通过沟通加深理解',
        '中等': '你在情感表达和理性沟通间寻求平衡',
        '较低': '你更倾向于理性沟通，不太习惯情感表达',
        '很低': '你几乎不需要情感交流，完全倾向于理性沟通'
      }
    };
    return descriptions[key]?.[level] || '';
  };

  return (
    <ResultContainer ref={resultRef}>
      <ResultCard>
        <HeaderSection>
          <MainTitle level={1}>适配恋人测评报告</MainTitle>
          <SubTitle>生成时间：{result.testDate.toLocaleString()}</SubTitle>
        </HeaderSection>

        {/* 主要结果 */}
        <Row gutter={[24, 24]} style={{ marginBottom: 30 }}>
          <Col xs={24} md={12}>
            <PartnerTypeCard type="recommended">
              <Card.Meta
                title={`✅ 推荐伴侣类型：${result.mainType.name}`}
                description={
                  <div>
                    <Paragraph>{result.mainType.description}</Paragraph>
                    <CompatibilityScore>
                      <div className="score">
                        {result.compatibilityRanking[0].compatibility}%
                      </div>
                      <div className="label">匹配度</div>
                    </CompatibilityScore>
                  </div>
                }
              />
            </PartnerTypeCard>
          </Col>
          <Col xs={24} md={12}>
            <PartnerTypeCard type="avoid">
              <Card.Meta
                title={`⚠️ 避雷伴侣类型：${result.avoidType.name}`}
                description={
                  <div>
                    <Paragraph>{result.avoidType.description}</Paragraph>
                    <CompatibilityScore>
                      <div className="score" style={{
                        background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        {result.compatibilityRanking[result.compatibilityRanking.length - 1].compatibility}%
                      </div>
                      <div className="label">匹配度</div>
                    </CompatibilityScore>
                  </div>
                }
              />
            </PartnerTypeCard>
          </Col>
        </Row>

        {/* 五维度雷达图 */}
        <SectionTitle level={2}>你的情感画像</SectionTitle>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <ChartContainer>
              <Radar data={radarData} options={radarOptions} />
            </ChartContainer>
          </Col>
          <Col xs={24} md={12}>
            {Object.entries(result.dimensions).map(([key, value]) => (
              <DimensionCard key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <Text strong>{getDimensionName(key as keyof typeof result.dimensions)}</Text>
                  <Tag color={getDimensionColor(result.dimensionLevels[key as keyof typeof result.dimensionLevels])}>
                    {result.dimensionLevels[key as keyof typeof result.dimensionLevels]} ({value}分)
                  </Tag>
                </div>
                <Progress
                  percent={value}
                  strokeColor={getDimensionColor(result.dimensionLevels[key as keyof typeof result.dimensionLevels])}
                  showInfo={false}
                  strokeWidth={8}
                />
                <Paragraph style={{ margin: '10px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                  {getDimensionDescription(key as keyof typeof result.dimensions, result.dimensionLevels[key as keyof typeof result.dimensionLevels])}
                </Paragraph>
              </DimensionCard>
            ))}
          </Col>
        </Row>

        {/* 详细分析 */}
        <SectionTitle level={2}>深度分析</SectionTitle>
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <Card title="推荐类型特征" style={{ borderRadius: 12 }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Title level={4}>性格特征</Title>
                  <TagContainer>
                    {result.mainType.characteristics.personality.map((trait, index) => (
                      <Tag key={index} color="blue">{trait}</Tag>
                    ))}
                  </TagContainer>
                </Col>
                <Col xs={24} md={8}>
                  <Title level={4}>价值观</Title>
                  <Paragraph>{result.mainType.characteristics.values}</Paragraph>
                </Col>
                <Col xs={24} md={8}>
                  <Title level={4}>生活方式</Title>
                  <Paragraph>{result.mainType.characteristics.lifestyle}</Paragraph>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Title level={4}>识别信号</Title>
                  <ul>
                    {result.mainType.signals.earlySigns.map((signal, index) => (
                      <li key={index}>{signal}</li>
                    ))}
                  </ul>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={4}>相处建议</Title>
                  <ul>
                    {result.mainType.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* 操作按钮 */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <ActionButton type="primary" size="large" onClick={onRestart}>
            重新测评
          </ActionButton>
          <ActionButton size="large" onClick={() => window.print()}>
            打印报告
          </ActionButton>
        </div>
      </ResultCard>
    </ResultContainer>
  );
};

export default ResultPage;