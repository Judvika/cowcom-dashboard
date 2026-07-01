export const company = {
  name: 'Cowcom',
  domain: 'cowcom.my',
  mission: 'AI와 사람이 함께 실제 수익을 만드는 작은 회사를 운영한다.',
  status: 'Dashboard v0 준비 중',
  updatedAt: '2026-07-01',
};

export const goals = [
  {
    period: '7일 목표',
    title: '스마트폰에서 열리는 Cowcom 대시보드 v0 만들기',
    progress: 65,
  },
  {
    period: '30일 목표',
    title: '첫 번째 수익 실험 1개를 공개하고 지표 추적 시작',
    progress: 20,
  },
  {
    period: '90일 목표',
    title: '반복 가능한 콘텐츠/상품/앱 운영 루프 구축',
    progress: 8,
  },
];

export const projects = [
  {
    name: 'Cowcom Dashboard',
    type: '운영 인프라',
    status: '진행 중',
    next: 'Vercel 배포 후 Gabia DNS 연결',
  },
  {
    name: 'Revenue Experiment #1',
    type: '수익 실험',
    status: '대기',
    next: '첫 실험 후보 선정',
  },
  {
    name: 'AI Operating System',
    type: '업무 자동화',
    status: '초기화',
    next: '목표/작업/승인 목록 구조화',
  },
];

export const approvals = [
  'Gabia DNS 관리 화면에서 Vercel 레코드 입력',
  'Vercel/GitHub 계정 연결 승인',
  '공개 가능한 정보와 내부 정보 범위 결정',
];

export const tasks = [
  { title: '대시보드 v0 코드 생성', owner: 'AI', done: true },
  { title: '로컬 빌드 검증', owner: 'AI', done: false },
  { title: 'GitHub 저장소 생성/업로드', owner: '사람 + AI', done: false },
  { title: 'Vercel 배포', owner: '사람 + AI', done: false },
  { title: 'cowcom.my DNS 연결', owner: '사람', done: false },
];
