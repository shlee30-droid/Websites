# Development Spec

> 목표: “개념 설명(대수/그래프) + 랜덤 퀴즈 + 즉시 피드백”을 제공하는 수학 학습용 SPA를 구축한다.

## 1) Product Goal

### 1.1 핵심 가치
- **친절한 설명**: 같은 개념을 **대수적 표현**과 **그래픽(시각화) 표현**으로 병렬 설명한다.
- **연습과 피드백 루프**: 단원별로 **5~10문항을 랜덤 제공**하고, 풀이 결과에 대해 **즉시 피드백**을 제공한다.

### 1.2 범위(Scope)
- 단원(Topic) 단위의 학습 페이지
    - 개념 설명(텍스트)
    - 그래프/도식 기반 시각화(예: 함수 그래프)
    - 퀴즈 세션(랜덤 5~10문항)
    - 채점 및 피드백(정답/오답, 해설, 힌트)

### 1.3 비목표(Non-goals)
- 계정/로그인, 결제, 서버 기반 사용자 데이터 저장(초기에는 제외)
- 고급 학습 추천/개인화(초기에는 제외)

## 2) UX / IA (Information Architecture)

### 2.1 페이지 구조(최소 스켈레톤)
- **Home**
    - 사이트 소개(한 줄 가치 제안)
    - 개발자 정보(Repo 링크, 이메일)
    - Contents 목록(단원 카드/리스트)
- **Contents(목차)**
    - 단원 목록
    - 각 단원 상세로 이동
- **Topic(단원 상세)**
    - 개념 설명: 대수적 설명 / 그래픽 설명
    - 예제(선택)
    - 퀴즈 시작 CTA
- **Quiz Session(퀴즈)**
    - 5~10문항 랜덤 출제
    - 진행 상태(예: 3/10)
    - 제출/다음/종료
- **Result(결과/피드백)**
    - 총점/정답률
    - 문항별 피드백(정답/오답, 해설)

### 2.2 사용자 플로우
1) Home → Contents → Topic
2) Topic에서 개념 학습 → “퀴즈 시작”
3) Quiz Session 진행(랜덤 출제) → Result에서 피드백 확인

## 3) Quiz Requirements

### 3.1 출제 규칙
- 단원별로 **5~10문항**을 랜덤으로 선택
- 문항 풀이 후 **즉시 채점** 또는 **세션 종료 후 일괄 채점** 중 하나를 택해 일관되게 제공(초기 MVP는 즉시 채점 권장)

### 3.2 피드백 정책
- 정답/오답 표시
- 오답일 경우:
    - 왜 틀렸는지에 대한 **짧은 설명**
    - 필요한 경우 **힌트/관련 개념 링크(해당 단원 섹션 앵커)**
- 정답일 경우:
    - 핵심 포인트를 1줄로 강화

### 3.3 데이터 모델(권장)
- Topic
    - `id`, `title`, `summary`, `sections[]`(대수/그래프), `quizzes[]`
- Quiz
    - `id`, `prompt`, `type`(객관식/단답/선택), `choices?`, `answer`, `explanation`, `hint?`, `tags?`

## 4) Tech Stack & Standards

### 4.1 Frontend
- **React + Vite**
- **TypeScript**
- SPA 라우팅(예: React Router) 기반

### 4.2 Quality
- **ESLint**: 코드 품질/규칙
- **Prettier**: 포맷 자동화
- (선택) **lint-staged + husky**: 커밋 전 자동 검사

### 4.3 Visualization (그래픽 설명)
- 함수 그래프/도식을 표시할 수 있는 방식으로 구성
    - 초기에는 “가벼운 구현”을 우선(필요 시 라이브러리 도입)

## 5) Deployment (GitHub Pages + CI/CD)

### 5.1 배포 목표
- GitHub Pages에서 동작하는 **SPA 배포**

### 5.2 CI/CD (GitHub Actions)
- Pull Request/Push 시:
    - `lint` 실행
    - `typecheck` 실행
    - `build` 실행
- main 브랜치(또는 release 브랜치) 기준:
    - 빌드 산출물을 GitHub Pages에 배포

### 5.3 SPA 라우팅 주의사항
- GitHub Pages 환경에서 새로고침 시 404가 나지 않도록 **SPA fallback 전략**을 적용한다.
    - 예: `404.html` 처리 또는 라우터/빌드 설정으로 대응

### 5.4 GitHub Pages 설정 가이드 (UI)
- Settings → Pages → Build and deployment: **Source = GitHub Actions** 선택
- (조직/레포 정책에 따라) Settings → Actions → General에서 워크플로 권한을 기본값 이상으로 허용(`pages: write`, `id-token: write` 필요)
- 최초 배포: Actions 탭에서 `Deploy to GitHub Pages` 워크플로를 수동 실행(workflow_dispatch)하거나 main에 push

### 5.5 Vite 배포 설정 팁
- 레포가 `https://<user>.github.io/Edward-s-codes/` 형태라면 `vite.config.ts`의 `base`를 `'/Edward-s-codes/'`로 설정 (이미 반영됨)
- 커스텀 도메인(CNAME) 또는 user/organization 페이지(`https://<user>.github.io/`)라면 `base: '/'`로 조정

## 6) Repository Conventions

### 6.1 기본 스크립트(권장)
- `dev`: 개발 서버
- `build`: 프로덕션 빌드
- `preview`: 빌드 결과 미리보기
- `lint`: ESLint
- `format`: Prettier
- `typecheck`: tsc

### 6.2 브랜치/PR 규칙(권장)
- 작은 단위로 PR 생성
- PR에는 “변경 목적 / 스크린샷(선택) / 테스트 방법”을 포함

## 7) Milestones (MVP → 확장)

### MVP
- Home / Contents / Topic / Quiz / Result 페이지
- 단원 1개 이상, 문항 10개 이상
- 랜덤 5~10문항 출제 + 피드백
- GitHub Pages + GitHub Actions CI/CD
- ESLint + Prettier 구성

### Next
- 단원 확장(콘텐츠/문항 추가)
- 시각화 고도화(인터랙션, 예제 다양화)
- 학습 기록(로컬 저장소 기반)

---

## Appendix: Quick Checklist
- [ ] React+Vite+TS 프로젝트 생성
- [ ] 라우팅 및 페이지 스켈레톤
- [ ] 단원/퀴즈 데이터 모델 확정
- [ ] 랜덤 출제 + 피드백 UI 구현
- [ ] ESLint/Prettier 자동화
- [ ] GitHub Actions CI/CD + GitHub Pages 배포