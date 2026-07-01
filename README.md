# Cowcom Dashboard

`cowcom.my`에 연결할 Cowcom 회사 운영 대시보드 v0입니다.

## 목적

스마트폰으로 언제 어디서든 Cowcom의 목표, 프로젝트, 작업, 승인 필요 항목을 확인하는 공개/내부 운영 콘솔입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드 검증

```bash
npm run build
```

## 배포 권장 경로

1. GitHub에 이 폴더를 저장소로 업로드
2. Vercel에서 GitHub 저장소 Import
3. Vercel 프로젝트 Settings → Domains에서 `cowcom.my` 추가
4. Vercel이 안내하는 DNS 레코드를 Gabia DNS 관리에 입력
5. `https://cowcom.my` 접속 확인

## 보안 메모

현재 v0는 로그인 없는 대시보드입니다. 내부 정보나 민감한 작업 로그를 넣기 전에는 반드시 인증을 추가해야 합니다.
