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
  BulbOutlined,
  CompassOutlined,
  UserOutlined,
  ThunderboltOutlined,
  GiftOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  RocketOutlined
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

const RadarContainer = styled.div`
  position: relative;
  min-height: 800px;
  margin: 40px 0;

  .radar-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .dimension-card {
    position: absolute;
    width: 300px;
    z-index: 2;

    // 情感安全感 - 顶部
    &.dimension-s {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    // 个人空间 - 右上
    &.dimension-a {
      top: 10%;
      right: 5%;
      transform: translateY(0);
    }

    // 共同成长 - 右下
    &.dimension-g {
      bottom: 10%;
      right: 5%;
      transform: translateY(0);
    }

    // 现实务实 - 左下
    &.dimension-r {
      bottom: 10%;
      left: 5%;
      transform: translateY(0);
    }

    // 情绪表达 - 左上
    &.dimension-e {
      top: 10%;
      left: 5%;
      transform: translateY(0);
    }
  }

  // 响应式设计
  @media (max-width: 1200px) {
    min-height: 900px;

    .dimension-card {
      width: 280px;

      &.dimension-s {
        top: -20px;
      }

      &.dimension-a {
        top: 5%;
        right: 2%;
      }

      &.dimension-g {
        bottom: 5%;
        right: 2%;
      }

      &.dimension-r {
        bottom: 5%;
        left: 2%;
      }

      &.dimension-e {
        top: 5%;
        left: 2%;
      }
    }
  }

  @media (max-width: 768px) {
    min-height: auto;
    position: static;

    .radar-center {
      position: static;
      transform: none;
      margin-bottom: 30px;
    }

    .dimension-card {
      position: static;
      transform: none !important;
      width: 100%;
      margin-bottom: 20px;

      &.dimension-s,
      &.dimension-a,
      &.dimension-g,
      &.dimension-r,
      &.dimension-e {
        top: auto;
        left: auto;
        right: auto;
        bottom: auto;
      }
    }
  }
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

const DimensionCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .dimension-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .dimension-name {
    font-size: 16px;
    color: #262626;
    font-weight: 600;
  }

  .dimension-tag {
    font-size: 12px;
    font-weight: 500;
    border-radius: 20px;
    padding: 4px 12px;
    border: none;
  }

  .dimension-progress {
    margin-bottom: 16px;

    .ant-progress-bg {
      border-radius: 10px;
    }
  }

  .dimension-explanation {
    color: #595959;
    font-size: 14px;
    line-height: 1.6;
    padding: 12px 16px;
    background: #fafafa;
    border-radius: 8px;
    border-left: 4px solid #1890ff;
  }
`;


const TipList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    padding-left: 35px;
    line-height: 1.6;

    &:last-child {
      border-bottom: none;
    }

    .anticon {
      position: absolute;
      left: 0;
      top: 18px;
      color: #52c41a;
    }

    .trait-highlight {
      font-weight: 600;
      color: #1890ff;
    }

    .trait-description {
      color: #666;
      margin-top: 5px;
    }
  }
`;

const ResultHighlight = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 40px;
  margin: 30px 0;
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-20px, -20px) rotate(180deg); }
  }

  .partner-type {
    text-align: center;
    margin-bottom: 35px;
    position: relative;
    z-index: 1;

    .type-label {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 15px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .type-name {
      font-size: 2.8rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 15px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      line-height: 1.2;
    }

    .type-description {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.95);
      line-height: 1.7;
      margin-bottom: 25px;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      font-weight: 400;
    }

    .match-score {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      padding: 12px 25px;
      border-radius: 30px;
      border: 1px solid rgba(255, 255, 255, 0.2);

      .score-label {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 500;
      }

      .score-value {
        font-size: 1.8rem;
        font-weight: 800;
        color: #ffffff;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }
    }
  }

  .match-reasons {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    z-index: 1;

    h4 {
      color: #ffffff;
      margin-bottom: 20px !important;
      font-size: 1.3rem;
      font-weight: 600;
      text-align: center;
    }

    .reason-content {
      color: rgba(255, 255, 255, 0.95);
      font-size: 1.1rem;
      line-height: 1.8;
      text-align: left;
      font-weight: 400;
      background: rgba(255, 255, 255, 0.05);
      padding: 20px;
      border-radius: 10px;
      border-left: 4px solid rgba(255, 255, 255, 0.3);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      margin-top: 20px;

      li {
        padding: 12px 0;
        padding-left: 35px;
        position: relative;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.6;

        &:before {
          content: '✦';
          position: absolute;
          left: 0;
          color: #ffd700;
          font-weight: bold;
          font-size: 1.2rem;
        }

        &:not(:last-child) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
      }
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

  
  // 获取维度解释文案
  const getDimensionExplanation = (key: keyof typeof result.dimensions, level: string) => {
    const explanations: Record<string, Record<string, string>> = {
      'S': {
        '极高': '在爱情里，你渴望一份可以让你完全放松的安心感。就像冬日里温暖的拥抱，让你感受到被珍视和保护。你希望找到那个能与你分享内心最深处的脆弱，依然被温柔以待的人。',
        '较高': '你希望在爱情中找到稳定的依靠，像是找到了人生的锚。这种对安全感的向往，让你在感情中格外认真，也让你成为一个值得托付的伴侣。',
        '中等': '你在爱情中展现了难得的平衡智慧——既能享受甜蜜的依偎，也保持独立的风采。这样的你，懂得爱情里最好的状态是：我爱你，但我也爱我自己。',
        '较低': '自由是你的翅膀，爱情是你的天空。你不需要时刻黏在一起来证明爱，因为你知道真正的感情是彼此信任、各自精彩。你希望的那个人，懂得欣赏你的独立之美。',
        '很低': '你的心像风一样自由，不被任何形式的爱情所束缚。你希望的关系是轻松随性的，像是春天的风，温柔地拂过却不停留。你寻找的是一个能与你一起自由的灵魂。'
      },
      'A': {
        '极高': '独处时光对你而言，像是为心灵充电的私密花园。你珍视与自己对话的宁静时刻，这让你在关系中更懂得自我。你期待的那个TA，会懂得给你足够的空间，让你做自己。',
        '较高': '你像一首优雅的独奏曲，享受二人世界的合奏，也珍爱独处的悠扬。这种平衡让你在爱情中保持自我，也让你成为更有魅力的伴侣。',
        '中等': '你在爱情中找到了最美的节奏——有时紧紧相拥，有时各自起舞。你明白，最好的爱情不是彼此凝视，而是一起望向同一个方向，同时保留各自的风景。',
        '较低': '与你相爱，就像融入了一首温暖的二重奏。你享受与伴侣分享生活的点点滴滴，希望两个人的世界紧密相连，每一天都因为彼此的存在而更加完整。',
        '很低': '爱情对你而言，是生命的主题曲。你渴望与心的人时刻相伴，分享每一个清晨和黄昏。你寻找的是一个愿意与你编织生活每一个细节的深情伴侣。'
      },
      'G': {
        '极高': '你相信爱情不是终点，而是共同成长的起点。你期待那个能与你并肩前行的人，一起探索人生的可能性，在彼此眼中看到更好的自己。',
        '较高': '在你心中，爱情应该让双方都成为更好的人。你希望找到那个能互相激励的伙伴，一起学习新知，追逐梦想，让生命因为这段关系而更加丰盛。',
        '中等': '你对成长有着温柔的理解——不强求，不忽视，让一切自然发生。你相信最好的成长是在享受当下的同时，悄然发生的变化。',
        '较低': '比起遥远的未来，你更在乎此刻的温柔。你希望爱情是简单的陪伴和当下的快乐，两个人在一起，就是最美的风景。',
        '很低': '对你而言，爱情最美的模样就是纯粹的此刻。不需要规划未来，不需要追求成长，只要此刻心与心的相通，就已足够。'
      },
      'R': {
        '极高': '你懂得爱情不仅需要诗意，也需要面包。这份务实让你在感情中格外可靠，你希望找到一个同样认真的伴侣，一起构建稳固美好的未来。',
        '较高': '你能在浪漫与现实间找到巧妙的平衡。既相信爱情的魔力，也明白生活需要经营。这样的你，注定会遇到一个同样懂得生活真谛的人。',
        '中等': '你的心中住着一位诗人和一位建筑师，既憧憬浪漫，也规划现实。你相信最好的爱情，既有心跳的感觉，也有生活的温度。',
        '较低': '你相信爱情的魔力超越一切物质条件。在你眼中，两颗心的连接比任何外在因素都重要，你寻找的是一个同样重视情感深度的灵魂。',
        '很低': '你是一个纯粹的浪漫主义者，完全跟随内心的声音。爱情对你而言，是灵魂的共鸣，不受任何现实的束缚。你等待的是一个同样敢于为爱奋不顾身的人。'
      },
      'E': {
        '极高': '你的心像一本打开的诗集，每一页都写满了温柔的情感。你善于表达爱意，也希望找到那个愿意与你进行深度情感对话的人，一起谱写恋爱的美好篇章。',
        '较高': '你不吝啬表达内心的情感，懂得用言语和行动传递爱意。这样的你，让爱情充满了温度，也期待遇到一个同样愿意分享内心的伴侣。',
        '中等': '你在情感的表达上有着天然的智慧，既能说出甜言蜜语，也能进行理性的沟通。这样的平衡，让你在任何关系中都能游刃有余。',
        '较低': '你的爱意像深藏的宝藏，不轻易示人，却格外珍贵。你习惯用行动表达关心，希望遇到一个懂得细读你心思的细心人。',
        '很低': '你的情感世界如同一片宁静的湖泊，表面平静，深处却藏着丰富的情感。你希望遇到一个愿意慢慢了解你、读懂你内心风景的人。'
      }
    };
    return explanations[key]?.[level] || '';
  };

  // 格式化特质文本，分离标题和描述
  const formatTrait = (trait: string) => {
    const colonIndex = trait.indexOf('：');
    if (colonIndex > -1) {
      return {
        title: trait.substring(0, colonIndex),
        description: trait.substring(colonIndex + 1)
      };
    }
    return {
      title: trait,
      description: ''
    };
  };

  // 生成个性化的匹配原因解释
  const generatePersonalizedReason = (result: TestResult) => {
    const { dimensions, mainType } = result;

    // 根据用户的五维度得分生成个性化的温暖描述
    const getWarmDescription = () => {
      let description = '在深入了解你的内心世界后，我发现你是一个';

      const traits = [];

      if (dimensions.S >= 70) {
        traits.push('渴望被珍视和呵护的人');
      } else if (dimensions.S >= 50) {
        traits.push('在感情中寻求稳定感的人');
      } else {
        traits.push('内心相对独立的人');
      }

      if (dimensions.A >= 70) {
        traits.push('珍视个人空间和自由的灵魂');
      } else if (dimensions.A >= 50) {
        traits.push('在亲密中仍保留自我的人');
      } else {
        traits.push('愿意全心投入感情的人');
      }

      if (dimensions.G >= 70) {
        traits.push('对未来充满期待和追求的梦想家');
      } else if (dimensions.G >= 50) {
        traits.push('希望和伴侣一起成长的人');
      } else {
        traits.push('更珍惜当下美好时光的人');
      }

      if (dimensions.R >= 70) {
        traits.push('脚踏实地的理想主义者');
      } else if (dimensions.R >= 50) {
        traits.push('在理性和感性间寻找平衡的人');
      } else {
        traits.push('相信爱情美好的浪漫主义者');
      }

      if (dimensions.E >= 70) {
        traits.push('情感细腻丰富的感受者');
      } else if (dimensions.E >= 50) {
        traits.push('需要被理解和被听见的人');
      } else {
        traits.push('用行动表达爱意的实干者');
      }

      return description + traits.join('，') + '。';
    };

    // 根据伴侣类型生成温暖匹配解释
    const getWarmMatchExplanation = () => {
      const explanations = {
        'stable-harbor': '就像温暖的港湾，在你需要的时候永远在那里，给你最踏实的依靠。TA会用行动告诉你什么是真正的安全感，让你在爱情中感受到家的温暖。',
        'shoulder-to-shoulder': '会成为你最亲密的战友和人生合伙人。你们会一起追逐梦想，在困难时互相扶持，在成功时共同庆祝。在这段关系中，你们都将成为更好的自己。',
        'nurturing-caregiver': '拥有天生的治愈能力，能敏锐地察觉你的情绪变化。TA会像温暖的阳光一样照顾你，让你感受到被珍视和被爱的幸福。',
        'soul-conversationalist': '是你灵魂的知己，能够理解你最深层的想法。和TA在一起，你们可以进行深夜的长谈，分享内心的世界，找到思想的共鸣。',
        'free-companion': '懂得爱情最美的样子是两个人都是独立的个体。TA会给你足够的空间去做自己，同时在你需要时给予陪伴，让关系轻松而自由。',
        'rational-partner': '会用理性的方式爱你，为你解决生活中的难题。TA不擅长甜言蜜语，但会用实际行动证明对你的在乎，让你感受到不一样的温暖。',
        'reliable-pragmatist': '是最值得信赖的人生伴侣，说到做到，从不空谈。TA会用踏实的行动为你构建未来，让你知道什么是真正的靠谱和安心。',
        'emotional-resonator': '是你情感的完美共鸣者，能深刻理解你的喜怒哀乐。和TA在一起，你不需要伪装，可以展现最真实的自己，感受到被深深理解和珍视。'
      };

      return explanations[mainType.id as keyof typeof explanations] || '你们将会是彼此最好的陪伴，共同书写美好的爱情故事。';
    };

    return `${getWarmDescription()}\n\n✨ 而这位${mainType.name}，正是那个能够与你心灵相通的人。${getWarmMatchExplanation()}\n\n💕 相信你们的相遇，将会是彼此生命中最美好的礼物。`;
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

        {/* 核心结果 */}
        <SectionTitle level={2}>
          <HeartOutlined /> 你的理想伴侣类型
        </SectionTitle>
        <ResultHighlight>
          <div className="partner-type">
            <div className="type-label">你的理想伴侣</div>
            <div className="type-name">{result.mainType.name}</div>
            <div className="type-description">{result.mainType.description}</div>
            <div className="match-score">
              <span className="score-label">匹配度</span>
              <span className="score-value">{result.compatibilityAnalysis.overallCompatibility}%</span>
            </div>
          </div>
          <div className="match-reasons">
            <Title level={4}>为什么这个类型最适合你？</Title>
            <div className="reason-content">
              {generatePersonalizedReason(result).split('\n').map((paragraph, index) => (
                <p key={index} style={{ margin: index === 0 ? 0 : '15px 0 0 0' }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <ul>
              {result.compatibilityAnalysis.matchReasons.slice(0, 3).map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
        </ResultHighlight>

        {/* 标签页内容 */}
        <Tabs activeKey={activeTab} onChange={setActiveTab} centered size="large">
          <TabPane tab={
            <span>
              <HeartOutlined />
              理想伴侣详情
            </span>
          } key="1">
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
                    {result.idealPartner.personality.coreStrengths.map((strength, index) => {
                      const trait = formatTrait(strength);
                      return (
                        <li key={index}>
                          <CheckCircleOutlined />
                          {trait.description ? (
                            <>
                              <span className="trait-highlight">{trait.title}</span>
                              <div className="trait-description">{trait.description}</div>
                            </>
                          ) : (
                            strength
                          )}
                        </li>
                      );
                    })}
                  </TipList>
                </Col>
                <Col xs={24} md={12}>
                  <Title level={4}>
                    <AlertOutlined /> 小缺点
                  </Title>
                  <TipList>
                    {result.idealPartner.personality.quirks.map((quirk, index) => {
                      const trait = formatTrait(quirk);
                      return (
                        <li key={index}>
                          <AlertOutlined style={{ color: '#fa8c16' }} />
                          {trait.description ? (
                            <>
                              <span className="trait-highlight">{trait.title}</span>
                              <div className="trait-description">{trait.description}</div>
                            </>
                          ) : (
                            quirk
                          )}
                        </li>
                      );
                    })}
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
              <UserOutlined />
              你的情感画像
            </span>
          } key="2">
            <Title level={4} style={{ marginBottom: 24, textAlign: 'center' }}>五维度解析</Title>

            <RadarContainer>
              <div className="radar-center">
                <ChartContainer>
                  <Radar data={radarData} options={radarOptions} />
                </ChartContainer>
              </div>

              <div className="dimension-card dimension-s">
                <DimensionCard>
                  <div className="dimension-header">
                    <Text strong className="dimension-name">情感安全感</Text>
                    <Tag
                      className="dimension-tag"
                      color={getDimensionColor(result.dimensionLevels.S)}
                    >
                      {result.dimensionLevels.S} ({result.dimensions.S}分)
                    </Tag>
                  </div>
                  <Progress
                    percent={result.dimensions.S}
                    strokeColor={getDimensionColor(result.dimensionLevels.S)}
                    showInfo={false}
                    strokeWidth={8}
                    className="dimension-progress"
                  />
                  <div className="dimension-explanation">
                    {getDimensionExplanation('S', result.dimensionLevels.S)}
                  </div>
                </DimensionCard>
              </div>

              <div className="dimension-card dimension-a">
                <DimensionCard>
                  <div className="dimension-header">
                    <Text strong className="dimension-name">个人空间</Text>
                    <Tag
                      className="dimension-tag"
                      color={getDimensionColor(result.dimensionLevels.A)}
                    >
                      {result.dimensionLevels.A} ({result.dimensions.A}分)
                    </Tag>
                  </div>
                  <Progress
                    percent={result.dimensions.A}
                    strokeColor={getDimensionColor(result.dimensionLevels.A)}
                    showInfo={false}
                    strokeWidth={8}
                    className="dimension-progress"
                  />
                  <div className="dimension-explanation">
                    {getDimensionExplanation('A', result.dimensionLevels.A)}
                  </div>
                </DimensionCard>
              </div>

              <div className="dimension-card dimension-g">
                <DimensionCard>
                  <div className="dimension-header">
                    <Text strong className="dimension-name">共同成长</Text>
                    <Tag
                      className="dimension-tag"
                      color={getDimensionColor(result.dimensionLevels.G)}
                    >
                      {result.dimensionLevels.G} ({result.dimensions.G}分)
                    </Tag>
                  </div>
                  <Progress
                    percent={result.dimensions.G}
                    strokeColor={getDimensionColor(result.dimensionLevels.G)}
                    showInfo={false}
                    strokeWidth={8}
                    className="dimension-progress"
                  />
                  <div className="dimension-explanation">
                    {getDimensionExplanation('G', result.dimensionLevels.G)}
                  </div>
                </DimensionCard>
              </div>

              <div className="dimension-card dimension-r">
                <DimensionCard>
                  <div className="dimension-header">
                    <Text strong className="dimension-name">现实务实</Text>
                    <Tag
                      className="dimension-tag"
                      color={getDimensionColor(result.dimensionLevels.R)}
                    >
                      {result.dimensionLevels.R} ({result.dimensions.R}分)
                    </Tag>
                  </div>
                  <Progress
                    percent={result.dimensions.R}
                    strokeColor={getDimensionColor(result.dimensionLevels.R)}
                    showInfo={false}
                    strokeWidth={8}
                    className="dimension-progress"
                  />
                  <div className="dimension-explanation">
                    {getDimensionExplanation('R', result.dimensionLevels.R)}
                  </div>
                </DimensionCard>
              </div>

              <div className="dimension-card dimension-e">
                <DimensionCard>
                  <div className="dimension-header">
                    <Text strong className="dimension-name">情绪表达</Text>
                    <Tag
                      className="dimension-tag"
                      color={getDimensionColor(result.dimensionLevels.E)}
                    >
                      {result.dimensionLevels.E} ({result.dimensions.E}分)
                    </Tag>
                  </div>
                  <Progress
                    percent={result.dimensions.E}
                    strokeColor={getDimensionColor(result.dimensionLevels.E)}
                    showInfo={false}
                    strokeWidth={8}
                    className="dimension-progress"
                  />
                  <div className="dimension-explanation">
                    {getDimensionExplanation('E', result.dimensionLevels.E)}
                  </div>
                </DimensionCard>
              </div>
            </RadarContainer>

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
              <CompassOutlined />
              相处指南
            </span>
          } key="3">
            <SectionCard>
              <Title level={3}>
                <MessageOutlined /> 最佳沟通方式
              </Title>
              <Row gutter={[20, 20]}>
                <Col xs={24} md={8}>
                  <HighlightBox>
                    <Text strong style={{ color: '#52c41a', fontSize: '1rem' }}>✨ 偏好的沟通</Text>
                    <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                      {result.relationshipGuide.communicationStyle.preferred.map((item, index) => (
                        <li key={index} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
                      ))}
                    </ul>
                  </HighlightBox>
                </Col>
                <Col xs={24} md={8}>
                  <HighlightBox>
                    <Text strong style={{ color: '#fa8c16', fontSize: '1rem' }}>⚠️ 避免的沟通</Text>
                    <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                      {result.relationshipGuide.communicationStyle.avoid.map((item, index) => (
                        <li key={index} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
                      ))}
                    </ul>
                  </HighlightBox>
                </Col>
                <Col xs={24} md={8}>
                  <HighlightBox>
                    <Text strong style={{ color: '#1890ff', fontSize: '1rem' }}>💡 沟通技巧</Text>
                    <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                      {result.relationshipGuide.communicationStyle.tips.map((item, index) => (
                        <li key={index} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
                      ))}
                    </ul>
                  </HighlightBox>
                </Col>
              </Row>
            </SectionCard>

            <SectionCard>
              <Title level={3}>
                <AlertOutlined /> 矛盾化解指南
              </Title>
              <Row gutter={[20, 20]}>
                <Col xs={24} md={8}>
                  <HighlightBox>
                    <Text strong style={{ color: '#ff4d4f', fontSize: '1rem' }}>🔥 常见矛盾点</Text>
                    <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                      {result.relationshipGuide.conflictResolution.commonTriggers.map((item, index) => (
                        <li key={index} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
                      ))}
                    </ul>
                  </HighlightBox>
                </Col>
                <Col xs={24} md={8}>
                  <HighlightBox>
                    <Text strong style={{ color: '#52c41a', fontSize: '1rem' }}>🛠️ 解决方案</Text>
                    <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                      {result.relationshipGuide.conflictResolution.solutions.map((item, index) => (
                        <li key={index} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
                      ))}
                    </ul>
                  </HighlightBox>
                </Col>
                <Col xs={24} md={8}>
                  <HighlightBox>
                    <Text strong style={{ color: '#1890ff', fontSize: '1rem' }}>🛡️ 预防措施</Text>
                    <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                      {result.relationshipGuide.conflictResolution.prevention.map((item, index) => (
                        <li key={index} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
                      ))}
                    </ul>
                  </HighlightBox>
                </Col>
              </Row>
            </SectionCard>

            <SectionCard>
              <Title level={3}>
                <HeartOutlined /> 情感需求平衡
              </Title>
              <Row gutter={[20, 20]}>
                <Col xs={24} md={8}>
                  <HighlightBox>
                    <Text strong style={{ color: '#722ed1', fontSize: '1rem' }}>🙋‍♂️ 你的需求</Text>
                    <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                      {result.relationshipGuide.emotionalNeeds.userNeeds.map((item, index) => (
                        <li key={index} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
                      ))}
                    </ul>
                  </HighlightBox>
                </Col>
                <Col xs={24} md={8}>
                  <HighlightBox>
                    <Text strong style={{ color: '#eb2f96', fontSize: '1rem' }}>🙋‍♀️ 伴侣的需求</Text>
                    <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                      {result.relationshipGuide.emotionalNeeds.partnerNeeds.map((item, index) => (
                        <li key={index} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
                      ))}
                    </ul>
                  </HighlightBox>
                </Col>
                <Col xs={24} md={8}>
                  <HighlightBox>
                    <Text strong style={{ color: '#13c2c2', fontSize: '1rem' }}>⚖️ 平衡之道</Text>
                    <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                      {result.relationshipGuide.emotionalNeeds.balance.map((item, index) => (
                        <li key={index} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
                      ))}
                    </ul>
                  </HighlightBox>
                </Col>
              </Row>
            </SectionCard>

            <SectionCard>
              <Title level={3}>
                <RocketOutlined /> 共同成长方向
              </Title>
              <Row gutter={[20, 20]}>
                <Col xs={24} md={12}>
                  <HighlightBox>
                    <Text strong style={{ color: '#1890ff', fontSize: '1rem' }}>🤝 共同成长</Text>
                    <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                      {result.relationshipGuide.growthAreas.together.map((item, index) => (
                        <li key={index} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
                      ))}
                    </ul>
                  </HighlightBox>
                </Col>
                <Col xs={24} md={12}>
                  <HighlightBox>
                    <Text strong style={{ color: '#52c41a', fontSize: '1rem' }}>🌱 个人成长</Text>
                    <ul style={{ marginTop: 10, paddingLeft: 20 }}>
                      {result.relationshipGuide.growthAreas.individual.map((item, index) => (
                        <li key={index} style={{ marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
                      ))}
                    </ul>
                  </HighlightBox>
                </Col>
              </Row>
            </SectionCard>
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
        </Tabs>

        {/* 操作按钮 */}
        <div style={{ textAlign: 'center', marginTop: 50, padding: '30px 0', borderTop: '1px solid #f0f0f0' }}>
          <ActionButton type="primary" size="large" onClick={onRestart}>
            <ThunderboltOutlined />
            重新测评
          </ActionButton>
        </div>
      </ResultCard>
    </ResultContainer>
  );
};

export default ResultPage;