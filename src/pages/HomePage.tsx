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
  padding: 40px 30px;
  height: 100%;
  border-radius: 16px;
  background: linear-gradient(145deg, #f8f9ff 0%, #ffffff 100%);
  border: 1px solid #e8ecff;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.15);
    border-color: #667eea;
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;
    margin: 0 auto 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      z-index: -1;
      opacity: 0.3;
      filter: blur(10px);
    }
  }

  h3 {
    color: #2c3e50;
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: -0.5px;
  }

  p {
    color: #64748b;
    line-height: 1.7;
    font-size: 0.95rem;
    margin: 0;
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
                <div className="icon-wrapper">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11L12 14L22 4" stroke="white" strokeWidth="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" stroke="white" strokeWidth="2.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <h3>科学测评</h3>
                <p>基于心理学五大维度，40道专业题目深度解析你的情感需求</p>
              </InfoCard>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <InfoCard>
                <div className="icon-wrapper">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/>
                  </svg>
                </div>
                <h3>精准匹配</h3>
                <p>八大伴侣类型，帮你找到最适合自己的那个人</p>
              </InfoCard>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <InfoCard>
                <div className="icon-wrapper">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2.5" fill="none"/>
                    <path d="M7 7h10M7 12h10M7 17h7" stroke="white" strokeWidth="2.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <h3>详细报告</h3>
                <p>个性化测评报告，深度解读你的情感DNA和适配指南</p>
              </InfoCard>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <InfoCard>
                <div className="icon-wrapper">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2.5"/>
                    <path d="M21 21L16.65 16.65M8 11L14 11M11 8L11 14" stroke="white" strokeWidth="2.5" stroke-linecap="round"/>
                    <circle cx="18" cy="6" r="3" fill="white"/>
                  </svg>
                </div>
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
              <span><strong>题目数量：</strong>40题</span>
              <span><strong>预计时间：</strong>8-12分钟</span>
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