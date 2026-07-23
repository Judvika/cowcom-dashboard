import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Building2, CheckCircle2, Clock3, Globe2, LockKeyhole, Rocket, Smartphone, TrendingUp, Beaker, Upload, Video, Download } from 'lucide-react';
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

  // 영상 업로드 (Hermes 기기 저장용)
  const [videoFile, setVideoFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleVideoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('영상 파일만 업로드해주세요.');
      return;
    }

    setVideoFile(file);

    // 이전 URL 해제
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDownloadForHermes = () => {
    if (!videoFile) return;

    const date = new Date().toISOString().slice(0, 10);
    const safeTitle = videoTitle.trim()
      ? videoTitle.trim().replace(/[^a-zA-Z0-9가-힣_-]/g, '_')
      : '영상';

    const filename = `cowcom_${date}_${safeTitle}.mp4`;

    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 안내
    alert(`다운로드 완료: ${filename}\n\n이 파일을 Telegram 채팅으로 Hermes에게 보내주세요.\n기기에 /home/judvika/cowcom-media/ 폴더에 저장해드릴게요.`);
  };

  const clearVideo = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setVideoFile(null);
    setVideoTitle('');
    setPreviewUrl(null);
  };

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

      {/* Prototypes hub — one page for all experiments */}
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
            onClick={() => window.open('/prototypes.html', '_blank')}
          >
            <div>
              <span>지도</span>
              <h3>주변 활동 지도 (Nearby Pin)</h3>
            </div>
            <p className="status">Interactive</p>
            <p className="next">지금 하고 있는 일만 지도에 핀. 종료되면 사라짐. 공공 공간 중심.</p>
          </article>
        </div>
        
        <div style={{ marginTop: '10px', fontSize: '0.8rem' }}>
          <a href="/demos/ai-moment.html" target="_blank" 
             style={{ color: '#64748b', textDecoration: 'underline' }}>
            + 오늘의 순간 (AI Moment) 별도 페이지
          </a>
        </div>
        
        <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>
          전체 실험은 <a href="/prototypes.html" target="_blank" style={{color:'#bae6fd'}}>cowcom.my/prototypes.html</a> 에서 한 번에 볼 수 있어요.
        </p>
      </section>

      {/* 영상 업로드 - Hermes 기기 저장용 */}
      <section className="panel">
        <div className="section-title">
          <Video />
          <div>
            <p className="eyebrow">미디어 수집</p>
            <h2>영상 업로드 → Hermes 기기에 저장</h2>
          </div>
        </div>

        <div style={{ 
          border: '1px dashed rgba(148,163,184,0.3)', 
          borderRadius: '16px', 
          padding: '20px',
          background: 'rgba(15,23,42,0.4)'
        }}>
          {!previewUrl ? (
            <div style={{ textAlign: 'center' }}>
              <label 
                htmlFor="video-upload"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, #38bdf8, #8b5cf6)',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Upload size={18} />
                영상 파일 선택하기
              </label>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleVideoSelect}
                style={{ display: 'none' }}
              />
              <p style={{ marginTop: '12px', fontSize: '0.8rem', color: '#64748b' }}>
                업로드하면 미리보기가 나타납니다.<br />
                다운로드 후 이 채팅으로 보내주세요.
              </p>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="영상 제목 (선택, 파일명에 사용됨)"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(148,163,184,0.25)',
                    background: 'rgba(2,6,23,0.6)',
                    color: '#e2e8f0',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <video 
                src={previewUrl} 
                controls 
                style={{ 
                  width: '100%', 
                  maxHeight: '320px', 
                  borderRadius: '12px',
                  background: '#020617'
                }} 
              />

              <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                <button 
                  onClick={handleDownloadForHermes}
                  style={{
                    flex: 1,
                    minWidth: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    background: '#22c55e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Download size={18} />
                  Hermes 기기 저장용 다운로드
                </button>

                <button 
                  onClick={clearVideo}
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(148,163,184,0.15)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(148,163,184,0.25)',
                    borderRadius: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  지우기
                </button>
              </div>

              <p style={{ 
                marginTop: '12px', 
                fontSize: '0.75rem', 
                color: '#64748b',
                lineHeight: 1.4
              }}>
                1. 위 버튼으로 다운로드 받으세요<br />
                2. 이 Telegram 채팅으로 파일을 보내주세요<br />
                3. Hermes가 <code>/home/judvika/cowcom-media/</code> 에 저장합니다
              </p>
            </div>
          )}
        </div>
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
