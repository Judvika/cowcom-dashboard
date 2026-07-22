import React from 'react';
import { createRoot } from 'react-dom/client';
import { Building2, CheckCircle2, Clock3, Globe2, LockKeyhole, Rocket, Smartphone, TrendingUp, Beaker } from 'lucide-react';
import { approvals, company, goals, projects, tasks } from './data/company.js';
import './styles.css';

function StatCard({ icon: Icon, label, value, tone = 'blue' }) {
  return (
    <section className={`stat-card ${tone}`}>
      <div className="stat-icon"><Icon size={20} /></div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </section>
  );
}

function Progress({ value }) {
  return (
    <div className="progress" aria-label={`progress ${value}%`}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

function App() {
  const completedTasks = tasks.filter((task) => task.done).length;

  const openPrototype = () => {
    window.open('demos/ai-moment.html', '_blank');
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <nav>
          <div className="brand-mark">C</div>
          <div>
            <p className="eyebrow">AI Company Dashboard</p>
            <h1>{company.name}</h1>
          </div>
        </nav>

        <section className="hero-card">
          <div className="domain-pill"><Globe2 size={16} /> {company.domain}</div>
          <h2>스마트폰에서 보는 Cowcom 운영 콘솔</h2>
          <p>{company.mission}</p>
          <div className="hero-actions">
            <a href="#today">오늘 상태 보기</a>
            <a className="secondary" href="#deploy">도메인 연결 단계</a>
          </div>
        </section>
      </header>

      <section id="today" className="stats-grid">
        <StatCard icon={Rocket} label="현재 상태" value={company.status} />
        <StatCard icon={CheckCircle2} label="작업 완료" value={`${completedTasks}/${tasks.length}`} tone="green" />
        <StatCard icon={TrendingUp} label="수익 실험" value="1개 준비" tone="purple" />
        <StatCard icon={Smartphone} label="접속 목표" value="모바일 우선" tone="orange" />
      </section>

      <section className="panel">
        <div className="section-title">
          <Building2 />
          <div>
            <p className="eyebrow">Goals</p>
            <h2>회사 목표</h2>
          </div>
        </div>
        <div className="goal-list">
          {goals.map((goal) => (
            <article className="goal-card" key={goal.period}>
              <div className="goal-header">
                <span>{goal.period}</span>
                <strong>{goal.progress}%</strong>
              </div>
              <h3>{goal.title}</h3>
              <Progress value={goal.progress} />
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-title">
          <Rocket />
          <div>
            <p className="eyebrow">Projects</p>
            <h2>진행 중인 프로젝트</h2>
          </div>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <div>
                <span>{project.type}</span>
                <h3>{project.name}</h3>
              </div>
              <p className="status">{project.status}</p>
              <p className="next">다음: {project.next}</p>
            </article>
          ))}
        </div>
      </section>

      {/* NEW: AI Prototypes section */}
      <section className="panel">
        <div className="section-title">
          <Beaker />
          <div>
            <p className="eyebrow">Prototypes</p>
            <h2>실험 / 데모</h2>
          </div>
        </div>
        <div className="project-list">
          <article 
            className="project-card" 
            style={{ cursor: 'pointer' }}
            onClick={openPrototype}
          >
            <div>
              <span>AI</span>
              <h3>오늘의 순간 v2</h3>
            </div>
            <p className="status">Interactive</p>
            <p className="next">활동 종료 후 generative visual + adaptive sound. 새 탭에서 열림.</p>
          </article>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>
          (로컬에서 볼 때 demos/ai-moment.html 파일이 함께 있어야 합니다)
        </p>
      </section>

      <section className="two-column">
        <div className="panel compact">
          <div className="section-title">
            <CheckCircle2 />
            <div>
              <p className="eyebrow">Tasks</p>
              <h2>작업 목록</h2>
            </div>
          </div>
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.title} className={task.done ? 'done' : ''}>
                <span>{task.done ? '✓' : '○'}</span>
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.owner}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel compact warning">
          <div className="section-title">
            <LockKeyhole />
            <div>
              <p className="eyebrow">Human Approval</p>
              <h2>사람이 해야 할 일</h2>
            </div>
          </div>
          <ul className="approval-list">
            {approvals.map((approval) => <li key={approval}>{approval}</li>)}
          </ul>
        </div>
      </section>

      <section id="deploy" className="deploy-card">
        <div>
          <p className="eyebrow">Domain Flow</p>
          <h2>cowcom.my가 실제로 연결되는 방식</h2>
        </div>
        <ol>
          <li><strong>대시보드 코드</strong>를 GitHub에 올립니다.</li>
          <li><strong>Vercel</strong>이 코드를 인터넷에 배포합니다.</li>
          <li><strong>Gabia DNS</strong>에서 cowcom.my를 Vercel 주소로 연결합니다.</li>
          <li><strong>스마트폰</strong>에서 https://cowcom.my 로 접속합니다.</li>
        </ol>
      </section>

      <footer>
        <Clock3 size={14} /> Last updated: {company.updatedAt} · Cowcom Dashboard v0
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
