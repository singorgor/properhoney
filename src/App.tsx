import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import { UserAnswer, TestResult } from './types';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const App: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleTestComplete = (answers: UserAnswer[], result: TestResult) => {
    setUserAnswers(answers);
    setTestResult(result);
  };

  const handleRestart = () => {
    setUserAnswers([]);
    setTestResult(null);
  };

  return (
    <ConfigProvider locale={zhCN}>
      <AppContainer>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage onStart={() => {}} />
            </Route>
            <Route path="/test">
              <TestPage
                onComplete={handleTestComplete}
                answers={userAnswers}
              />
            </Route>
            <Route path="/result">
              {testResult ? (
                <ResultPage
                  result={testResult}
                  onRestart={handleRestart}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Redirect from="/" to="/" />
          </Switch>
        </Router>
      </AppContainer>
    </ConfigProvider>
  );
};

export default App;