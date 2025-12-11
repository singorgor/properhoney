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

  // 个性化描述生成系统
  const generatePersonalizedReason = (result: TestResult) => {
    const { dimensions, mainType } = result;

    // 表达变体库 - 打破固定句式
    const expressionLibrary = {
      openings: [
        '每一次深情的凝视，都让我看到你内心的',
        '在你的眼神里，我读到了一种独特的',
        '你身上有一种特别的气质，那是',
        '深入了解你之后，我发现你本质上',
        '你的灵魂散发着这样一种光芒：',
        '透过你的选择，我能感受到你对爱情的期待是'
      ],

      security_high: [
        '如同冬日里渴望温暖的拥抱，寻找那个能让自己完全放松的港湾',
        '对归属感有着天然的向往，希望找到一个能让心灵安放的地方',
        '在感情中有着深层的依赖需求，期待被无条件地接纳和保护',
        '像是寻找一个永恒的锚，让漂泊的心能够靠岸停泊',
        '对稳定的情感关系有着强烈的渴望，向往那种被深深珍视的感觉'
      ],

      security_medium: [
        '既享受甜蜜的依偎，也保持着内心的独立姿态',
        '在亲密与自我之间寻找着微妙的平衡点',
        '对感情有着清醒的认知，既投入又不过度依赖',
        '像是在爱情中跳舞，时而靠近时而远观，节奏恰到好处',
        '懂得在感情中保持自我，不轻易丢失自己'
      ],

      security_low: [
        '像风一样自由，不被任何形式的情感束缚所困扰',
        '内心有着强大的独立力量，不需要依靠外界来证明完整',
        '对爱情持有着难得的洒脱态度，相信最好的关系是相互成就',
        '如同独自绽放的花朵，美丽而自信，不依赖他人的赞美',
        '有着强大的内心世界，能够在独处中找到丰盈'
      ],

      autonomy_high: [
        '珍视如同呼吸般重要的个人空间，那是心灵充电的圣地',
        '对自由的渴望如同飞鸟向往天空，不愿被任何关系所定义',
        '需要大量的独处时光来与自己的灵魂对话',
        '像是拥有一个秘密花园，只有在独处时才能完全绽放',
        '对个人边界的守护近乎本能，那是自我存在的证明'
      ],

      autonomy_medium: [
        '在亲密与独处间优雅地切换，享受着两种状态的美好',
        '懂得平衡的艺术，既能深度依恋也能优雅独处',
        '像是一首和谐的独奏曲，既与他人合奏也珍爱自己的声音',
        '在感情中保持着恰到好处的距离，让关系更有韵味',
        '明白最好的陪伴是既能并肩而行，也能各自精彩'
      ],

      autonomy_low: [
        '渴望与另一个灵魂深度融合，仿佛找到失散已久的另一半',
        '对亲密关系有着天然的向往，希望与他人分享生命的每一个细节',
        '像是找到 missing piece，想要与对方编织完整的生活图景',
        '对共同体验有着强烈的期待，相信两个人在一起会更完整',
        '渴望深度连接，希望与伴侣分享每一个日出日落'
      ],

      growth_high: [
        '相信爱情不是终点，而是共同成长的起点',
        '对未来的可能有着无限的憧憬和期待',
        '将两个人的结合视为1+1>2的美好化学反应',
        '在关系中寻找着让彼此都变得更好的魔法',
        '把爱情看作是探索人生更深维度的邀请'
      ],

      growth_medium: [
        '对成长有着温和的理解，相信好的感情会自然而然地带来变化',
        '不会刻意强求共同进步，但珍惜一起学习的机会',
        '认为最好的成长是在享受过程中悄然发生的',
        '对未来的规划保持着开放的心态，既不盲从也不抗拒',
        '懂得在关系中寻找提升自我的契机'
      ],

      growth_low: [
        '更珍惜当下的美好，相信此刻的温暖比遥远的规划更重要',
        '对爱情保持着纯粹的期待，享受简单的陪伴和快乐',
        '认为最好的关系就是此刻的幸福，不需要太多未来的承诺',
        '活在当下的感受里，相信真爱不需要复杂的成长规划',
        '对简单的快乐有着敏锐的感受力'
      ],

      reality_high: [
        '深知爱情不仅需要诗意，也需要坚实的现实基础',
        '在感情中展现着难得的理性和清醒',
        '明白美好的关系需要脚踏实地的经营和规划',
        '对生活有着务实的态度，相信爱情要落地生根',
        '在感情中既浪漫又理性，懂得平衡理想与现实'
      ],

      reality_medium: [
        '在浪漫与现实之间寻找着智慧的平衡',
        '既相信爱情的魔力，也明白生活的真相',
        '心中住着一位诗人和一位建筑师',
        '懂得爱情既要有心跳的感觉，也要有生活的温度',
        '在理想和现实间优雅地舞蹈'
      ],

      reality_low: [
        '相信爱情的魔力能够超越一切现实的限制',
        '对感情保持着纯粹的向往，不被物质条件所束缚',
        '认为心灵的契合比外在的条件更重要',
        '在爱情中追随内心的声音，不问结果',
        '对浪漫有着坚定的信仰，相信真爱创造奇迹'
      ],

      emotion_high: [
        '情感丰富如同春天的花园，每一朵花都有着不同的故事',
        '善于用细腻的方式表达内心的感受',
        '对他人的情绪有着敏锐的洞察力',
        '在关系中创造着浓厚的情感氛围',
        '相信好的爱情需要深度的情感交流'
      ],

      emotion_medium: [
        '在情感表达上有着天然的分寸感',
        '既能分享内心的想法，也懂得理性的沟通',
        '在感性和理性间找到了和谐的平衡',
        '知道什么时候该用心，什么时候该用脑',
        '情感表达自然而真诚，不刻意也不压抑'
      ],

      emotion_low: [
        '将爱意深藏在心底，用行动代替言语',
        '不善花言巧语，却有着最真挚的内心',
        '情感如深海的珍珠，需要细心的人才能发现',
        '在沉默中表达着最深沉的关怀',
        '相信行动胜过千言万语的爱语'
      ]
    };

    // 动态生成个性化描述
    const generateUserDescription = () => {
      // 随机选择一个开场白
      const opening = expressionLibrary.openings[Math.floor(Math.random() * expressionLibrary.openings.length)];

      // 基于各维度得分构建特质描述
      const traits: string[] = [];


      // 选择2-3个最突出的维度特质
      const selectedDimensions = [
        { score: dimensions.S, type: 'security' },
        { score: dimensions.A, type: 'autonomy' },
        { score: dimensions.G, type: 'growth' },
        { score: dimensions.R, type: 'reality' },
        { score: dimensions.E, type: 'emotion' }
      ].sort((a, b) => b.score - a.score).slice(0, 3);

      selectedDimensions.forEach(dim => {
        const level = dim.score >= 70 ? 'high' : dim.score >= 50 ? 'medium' : 'low';
        const traitKey = `${dim.type}_${level}`;
        const variants = expressionLibrary[traitKey as keyof typeof expressionLibrary];

        if (variants && Array.isArray(variants)) {
          const trait = variants[Math.floor(Math.random() * variants.length)];
          traits.push(trait);
        }
      });

      // 生成有画面感的场景描述
      const generateSceneDescription = () => {
        const scenes = {
          'stable-harbor': [
            '想象在一个细雨绵绵的夜晚，你们依偎在沙发上，外面世界的喧嚣与你们无关，只有彼此的心跳声在耳边回响。',
            '就像疲惫一天回到家，有人为你留了一盏温暖的灯，那不是奢望，而是你们日常生活中最真实的写照。',
            '当你在人生的暴风雨中航行时，TA会是你最可靠的港湾，让你知道无论何时都有人等你回家。'
          ],
          'shoulder-to-shoulder': [
            '想象你们一起攀登一座高山，相互扶持着登顶，当看到壮丽的日出时，那种成就感与分享的喜悦，就是你们关系的写照。',
            '就像两个独立的行星，找到了共同的轨道，既保持着各自的转动，又和谐地围绕着同一个中心。',
            '在人生的赛场上，TA会是你最默契的队友，无论顺境逆境，都会与你并肩作战。'
          ],
          'nurturing-caregiver': [
            '想象在你最低谷的时候，有个人默默为你煮一碗热汤，那种无言的关怀，比任何甜言蜜语都更能触动心弦。',
            '就像春天的细雨滋润大地，他们的爱不张扬，却渗透在你生活的每一个细节里，让平凡的日子也闪闪发光。',
            '当你疲惫时，TA会为你轻轻按摩太阳穴；当你难过时，TA会给你一个不需要理由的拥抱。'
          ],
          'soul-conversationalist': [
            '想象深夜的长谈，从诗词歌赋聊到人生哲学，时间在你们的对话中仿佛静止了，那种心有灵犀的感觉实在难得。',
            '就像找到了一个能听懂你言外之意的人，有时候一个眼神就够了，那种默契让你们的交流超越了语言的局限。',
            '你们可以一起看一部老电影，然后聊上整整一夜，从剧情到人生，仿佛有说不完的话。'
          ],
          'free-companion': [
            '想象两只自由飞翔的鸟儿，选择了一起迁徙，但不强迫对方走相同的路线，这种相互尊重的自由格外珍贵。',
            '就像两棵并排生长的树，根系在地下交织，枝叶在天空各自舒展，既相互支撑又不束缚彼此。',
            'TA会鼓励你去追求自己的梦想，即使那意味着暂时的分离，因为TA知道真正的爱是让对方成为更好的自己。'
          ],
          'rational-partner': [
            '想象在你迷茫时，有人能帮你理清思路，不是替你做决定，而是让你看清自己的内心，这种理性的支持很难得。',
            '就像在迷雾中航行时有了一个可靠的罗盘，他们不能替你开船，但总能为你指明正确的方向。',
            '当你陷入情绪的漩涡时，TA会冷静地帮你分析问题，像一位智慧的朋友，让你重新找到平衡。'
          ],
          'reliable-pragmatist': [
            '想象一起规划未来的生活，不是空想而是脚踏实地地规划每一步，这种务实的态度让爱情有了坚实的根基。',
            '就像建造一座房子，一砖一瓦都用心，他们的爱不是浮在表面的浪漫，而是融入生活的点点滴滴。',
            'TA会记得你说过的每一个小愿望，然后悄悄为你实现，用实际行动告诉你什么是真正的在乎。'
          ],
          'emotional-resonator': [
            '想象在你还没开口时，对方就已经感受到你的情绪，那种被深深理解的感觉，就像是灵魂找到了共鸣的频率。',
            '就像一面清澈的湖水，能映照出天空最细微的变化，他们能捕捉到你最细微的情绪波动。',
            '当你开心时，TA会比你更开心；当你难过时，TA的心也会跟着痛。这种情感的同频共振，是世间最珍贵的礼物。'
          ]
        };

        const typeScenes = scenes[mainType.id as keyof typeof scenes] || ['你们的故事将是最美的遇见。'];
        return typeScenes[Math.floor(Math.random() * typeScenes.length)];
      };

      // 组合生成完整的个性化描述
      const userPart = `${opening}${traits.join('，')}。`;
      const scenePart = generateSceneDescription();
      const matchPart = `而这位${mainType.name}，恰恰能够满足你对爱情的所有想象。`;

      return `${userPart}\n\n${scenePart}\n\n${matchPart}`;
    };

    return generateUserDescription();
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