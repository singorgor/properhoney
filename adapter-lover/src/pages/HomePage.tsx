import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Card, Row, Col, Space } from 'antd';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const ContentCard = styled(Card)`
  max-width: 800px;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  overflow: hidden;
`;

const HeaderSection = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  color: white;
`;

const MainTitle = styled(Title)`
  color: white !important;
  font-size: 2.5rem !important;
  margin-bottom: 10px !important;
  font-weight: 700 !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const SubTitle = styled(Paragraph)`
  color: rgba(255, 255, 255, 0.95) !important;
  font-size: 1.2rem !important;
  margin-bottom: 30px !important;
  font-weight: 300;
`;

const InfoSection = styled.div`
  padding: 40px;
`;

const InfoCard = styled.div`
  text-align: center;
  padding: 30px 20px;
  height: 100%;

  .anticon {
    font-size: 3rem;
    color: #667eea;
    margin-bottom: 20px;
  }

  h3 {
    color: #333;
    margin-bottom: 15px;
    font-weight: 600;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const StartButton = styled(Button)`
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  border: none;
  height: 60px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 30px;
  box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(255, 107, 107, 0.4);
    background: linear-gradient(135deg, #ff5252 0%, #ffb142 100%);
  }

  &:focus {
    background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
    box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
  }
`;

const PrivacyNote = styled.div`
  text-align: center;
  margin-top: 30px;
  color: #999;
  font-size: 0.9rem;
`;

const HomePage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const history = useHistory();

  const handleStart = () => {
    history.push('/test');
    onStart();
  };

  return (
    <HomeContainer>
      <ContentCard>
        <HeaderSection>
          <MainTitle level={1}>适配恋人</MainTitle>
          <SubTitle>懂自己，才能遇见对的人</SubTitle>
          <StartButton type="primary" size="large" onClick={handleStart}>
            开始测评，遇见更好的爱情
          </StartButton>
        </HeaderSection>

        <InfoSection>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <InfoCard>
                <div className="anticon">🎯</div>
                <h3>科学测评</h3>
                <p>基于心理学五大维度，46道专业题目深度解析你的情感需求</p>
              </InfoCard>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <InfoCard>
                <div className="anticon">💝</div>
                <h3>精准匹配</h3>
                <p>八大伴侣类型，帮你找到最适合自己的那个人</p>
              </InfoCard>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <InfoCard>
                <div className="anticon">📊</div>
                <h3>详细报告</h3>
                <p>个性化测评报告，深度解读你的情感DNA和适配指南</p>
              </InfoCard>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <InfoCard>
                <div className="anticon">🔍</div>
                <h3>避雷指南</h3>
                <p>识别不适合的伴侣类型，避开情感陷阱</p>
              </InfoCard>
            </Col>
          </Row>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Title level={4} style={{ color: '#333', marginBottom: '20px' }}>
              测评信息
            </Title>
            <Space size="large">
              <span><strong>题目数量：</strong>46题</span>
              <span><strong>预计时间：</strong>10-15分钟</span>
              <span><strong>结果类型：</strong>深度分析报告</span>
            </Space>
          </div>

          <PrivacyNote>
            💡 我们承诺：不采集任何个人信息，您的答案仅用于生成本次测评结果
          </PrivacyNote>
        </InfoSection>
      </ContentCard>
    </HomeContainer>
  );
};

export default HomePage;