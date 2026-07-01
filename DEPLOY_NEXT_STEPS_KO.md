# Cowcom Dashboard 영구 배포 다음 단계

## 결론

공유기 포트포워딩은 필요 없습니다.

추천 구조:

```text
cowcom.my
  → Gabia DNS
  → Vercel
  → Cowcom Dashboard
```

Vercel 같은 호스팅 서비스를 쓰면 집/사무실 공유기 설정 없이 외부 접속이 됩니다.

## 현재 AI가 완료한 것

- Cowcom Dashboard v0 코드 생성
- 단일 HTML 미리보기 파일 생성
- Vite/React 앱 빌드 성공 확인
- 임시 외부 URL로 접속 확인

## 현재 막힌 부분

Vercel/GitHub는 계정 인증이 필요합니다. 현재 이 헤드리스 환경에는 Vercel 로그인 정보가 없습니다.

확인 결과:

```text
Vercel CLI: 설치/실행 가능
상태: No existing credentials found
필요: vercel login 또는 --token
```

따라서 사람이 한 번 계정 인증을 해줘야 합니다.

## 사람이 해야 할 최소 작업

### 옵션 A: 가장 쉬운 방법 — Vercel 웹사이트에서 직접 업로드

1. 이 대시보드 프로젝트 zip 파일을 다운로드합니다.
2. https://vercel.com 에 로그인합니다.
3. Add New Project 또는 Import Project를 선택합니다.
4. GitHub 저장소를 쓰거나, 프로젝트를 업로드합니다.
5. 배포가 끝나면 Vercel 임시 주소를 확인합니다.
6. Settings → Domains → `cowcom.my` 추가합니다.
7. Vercel이 보여주는 DNS 값을 Gabia에 입력합니다.

### 옵션 B: GitHub + Vercel 정석 방식

1. GitHub에서 `cowcom-dashboard` 저장소 생성
2. 이 프로젝트를 GitHub에 업로드
3. Vercel에서 해당 GitHub 저장소 Import
4. Domains에 `cowcom.my` 추가
5. Gabia DNS 설정

## Gabia DNS에서 하게 될 일

Vercel이 보통 다음 값을 안내합니다. 실제 화면에 나온 값을 우선하세요.

루트 도메인:

```text
Type: A
Name: @
Value: 76.76.21.21
```

www 도메인:

```text
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 보안 주의

현재 v0는 공개 페이지입니다. 내부 매출, 고객 정보, 계정 정보, API 키는 넣지 마세요.

다음 버전에서 로그인 보호를 추가하는 것을 권장합니다.
