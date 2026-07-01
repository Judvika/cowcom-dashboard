# cowcom.my 연결 가이드

이 문서는 Gabia에서 구매한 `cowcom.my`를 Cowcom Dashboard에 연결하는 순서입니다.

## 현재 상태

- 도메인: `cowcom.my`
- 대시보드 코드: `/home/judvika/cowcom-dashboard`
- 배포 권장 서비스: Vercel
- 현재 v0: 로그인 없는 모바일 우선 대시보드

## 전체 흐름

```text
스마트폰 브라우저
  → https://cowcom.my
  → DNS가 Vercel 서버를 찾음
  → Vercel이 Cowcom Dashboard 화면을 보여줌
```

## 1단계: GitHub 저장소 만들기

사람이 GitHub에서 새 저장소를 만듭니다.

추천 저장소 이름:

```text
cowcom-dashboard
```

그다음 이 폴더를 업로드합니다.

```bash
cd /home/judvika/cowcom-dashboard
git init
git add .
git commit -m "Create Cowcom dashboard v0"
git branch -M main
git remote add origin <GitHub 저장소 URL>
git push -u origin main
```

## 2단계: Vercel에 배포

1. https://vercel.com 접속
2. GitHub로 로그인
3. Add New Project
4. `cowcom-dashboard` 저장소 선택
5. Framework는 Vite로 자동 인식됨
6. Deploy 클릭

배포가 끝나면 임시 주소가 생깁니다.

예:

```text
https://cowcom-dashboard.vercel.app
```

## 3단계: Vercel에 도메인 추가

Vercel 프로젝트에서:

```text
Settings → Domains → cowcom.my 추가
```

Vercel이 DNS 레코드를 안내합니다.

보통 루트 도메인은 다음 중 하나입니다.

```text
Type: A
Name: @
Value: 76.76.21.21
```

`www`도 쓰고 싶다면 보통 다음을 추가합니다.

```text
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

주의: 실제 값은 Vercel 화면에 나오는 값을 우선해야 합니다.

## 4단계: Gabia DNS에 입력

Gabia 관리 화면에서:

```text
My Gabia → 도메인 관리 → cowcom.my → DNS 관리
```

Vercel이 요구한 레코드를 그대로 추가합니다.

## 5단계: 기다리기

DNS 반영은 보통 몇 분~몇 시간 걸릴 수 있습니다. 드물게 24시간까지 걸릴 수 있습니다.

확인 주소:

```text
https://cowcom.my
https://www.cowcom.my
```

## 보안 주의

현재 대시보드는 공개 페이지입니다. 내부 매출, 계정, API 키, 고객 정보, 비밀번호, 개인 정보는 넣으면 안 됩니다.

내부 운영용으로 쓰려면 다음 단계에서 로그인 보호를 추가하세요.
