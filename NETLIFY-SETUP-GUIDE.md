# Rayton Website — Netlify + Decap CMS 셋업 가이드

이 문서는 새로 만든 Developer 다운로드 페이지와 관리자 페이지를 Netlify에 올리는 방법을 안내합니다.
두 가지 경로가 있습니다 — **먼저 1번으로 디자인 확인 → 괜찮으면 2번으로 정식 배포**를 추천합니다.

---

## 경로 1. Netlify Drop — 1분 안에 미리보기

설치나 계정 없이, 지금 바로 디자인을 확인할 수 있는 방법입니다.

1. 브라우저에서 https://app.netlify.com/drop 접속
2. 워크스페이스 폴더에 있는 **`rayton-website-netlify.zip`** 파일을 드래그해서 페이지에 놓기
3. 업로드가 끝나면 `https://랜덤이름.netlify.app` 형태의 임시 URL이 나옵니다
4. 그 URL의 `/pages/developer.html` 로 접속하면 새 다운로드 페이지 확인 가능

제한사항: 이 방식은 **관리자 페이지(`/admin/`)가 동작하지 않습니다.** CMS는 GitHub 연동이 필요하기 때문입니다. 디자인만 확인하는 용도로 쓰세요.

---

## 경로 2. 정식 배포 — GitHub 연결 + 관리자 페이지 활성화

### 2-1. 새 파일들을 GitHub에 푸시

아래 파일들이 `rayton-ai/rayton-website` 저장소 main 브랜치에 올라가야 합니다.

- `pages/developer.html` (새 다운로드 페이지)
- `developer-thanks.html` (다운로드 감사/전달 페이지)
- `admin/index.html` (Decap CMS 로더)
- `admin/config.yml` (CMS 설정)
- `_data/downloads.json` (자료 목록 데이터)
- `netlify.toml` (Netlify 빌드 설정)
- `static/files/README.md` (파일 보관 폴더 설명)

가장 편한 방법은 워크스페이스 폴더 전체를 GitHub Desktop이나 터미널로 커밋/푸시하는 것입니다.

### 2-2. Netlify 계정 생성 & 저장소 연결

1. https://app.netlify.com 접속 → GitHub으로 로그인 (무료)
2. 상단 **Add new site → Import an existing project** 클릭
3. **Deploy with GitHub** 선택, `rayton-ai/rayton-website` 저장소 고르기
4. 빌드 설정은 그대로 두고 (netlify.toml이 자동으로 읽힙니다) **Deploy site** 클릭
5. 1–2분 안에 `https://랜덤이름.netlify.app` URL이 나옵니다

### 2-3. 사용자 정의 도메인 (선택)

- Netlify 대시보드에서 **Domain settings → Add custom domain**
- `rayton.ai` 혹은 `www.rayton.ai` 연결 (DNS 레코드 변경 필요)

### 2-4. 관리자 페이지 활성화 (핵심)

Decap CMS가 GitHub에 커밋하려면 Netlify Identity + Git Gateway 두 기능을 켜야 합니다.

1. Netlify 사이트 대시보드 → **Integrations** → **Identity** → **Enable Identity**
2. Identity 설정 화면에서:
   - **Registration preferences** → **Invite only** 선택 (외부인이 임의로 가입 못하도록)
   - **Git Gateway** → **Enable Git Gateway** 클릭
3. **Identity → Invite users** → 관리자 이메일 입력 (예: `daemin7364@gmail.com`)
4. 받은 초대 메일의 링크를 클릭 → 비밀번호 설정
5. 이제 `https://사이트주소/admin/` 으로 접속하면 로그인 화면이 나옵니다

### 2-5. 자료 업로드 워크플로

1. `/admin/` 로그인 → **다운로드 자료** 컬렉션
2. **자료 목록** 리스트에서 항목 추가
3. 제목, 카테고리, 제품명, 설명, 버전, 날짜, 크기 입력
4. **파일 업로드** 위젯으로 PDF / ZIP 업로드 → 자동으로 `/static/files/` 에 저장
5. **Publish** 클릭 → 몇 초 안에 GitHub에 커밋되고 Netlify가 재배포
6. 1–2분 뒤 Developer 페이지에 반영됨

---

## 폼 제출 확인

다운로드 요청 폼은 Netlify Forms가 자동으로 수집합니다.

- Netlify 대시보드 → **Forms** 탭
- 이름 / 이메일 / 회사명 / 사용 사례 / 동의 여부 모두 기록됨
- 새 제출이 오면 이메일 알림을 설정할 수 있음 (**Forms → Settings → Notifications**)

---

## 현재 샘플 데이터 정리

`_data/downloads.json`에 8개 샘플 항목이 들어 있습니다. 모두 `/static/files/sample-placeholder.pdf` / `.zip`을 가리킵니다. 배포 후 `/admin/`에서 실제 파일로 교체하세요.

---

## 자주 막히는 부분

- **`/admin/` 접속했는데 로그인 못함** → Identity + Git Gateway 둘 다 켰는지 확인
- **Publish 했는데 반영 안 됨** → Netlify 대시보드 **Deploys** 탭에서 배포 상태 확인
- **파일 올렸는데 404** → `published` 토글이 true인지 확인 (false면 목록에 안 보임)
- **`/admin` (슬래시 없음)으로 접속 시 실패** → `netlify.toml`의 리다이렉트가 처리하지만, 정상적으로는 슬래시 포함 `/admin/`
