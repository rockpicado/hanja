# Hanja: Sino-Korean Utilities for TypeScript

![npm](https://img.shields.io/npm/v/hanja.svg) ![NPM Downloads](https://img.shields.io/npm/d18m/hanja)


한자와 한글 변환 및 한자 필획 정보를 제공하는 TypeScript 라이브러리입니다.

## 기능
- 한자 → 한글 변환 (두음법칙 적용)
- 한자 구성 필획 제공

## 설치
```sh
npm install hanja
# 또는
# yarn add hanja
# pnpm install hanja
```

## 사용법

### 모듈 가져오기
```typescript
import hanja from 'hanja';
// 또는 CommonJS 방식:
// const { default: hanja } = require('hanja');
```

### 문장 변환
#### 한자 → 한글 변환
```typescript
hanja.translate('大韓民國은 民主共和國이다.', 'SUBSTITUTION');
// 결과: '대한민국은 민주공화국이다.'
```

#### 한글(한자) 변환
```typescript
hanja.translate('大韓民國은 民主共和國이다.', 'PARENTHESIS_HANJA');
// 결과: '대한민국(大韓民國)은 민주공화국(民主共和國)이다.'
```

#### 한자(한글) 변환
```typescript
hanja.translate('大韓民國은 民主共和國이다.', 'PARENTHESIS_HANGUL');
// 결과: '大韓民國(대한민국)은 民主共和國(민주공화국)이다.'
```

#### 사용자 정의 변환
```typescript
hanja.translate('大韓民國은 民主共和國이다.', (hanja, hangul) => `<ruby>${hanja}<rt>${hangul}</rt></ruby>`);
// 결과: '<ruby>大韓民國<rt>대한민국</rt></ruby>은 <ruby>民主共和國<rt>민주공화국</rt></ruby>이다.'
```
> 렌더링 예시:
> <ruby>大韓民國<rt>대한민국</rt></ruby>은 <ruby>民主共和國<rt>민주공화국</rt></ruby>이다.

---

### 한자 필획 정보 가져오기
#### 특정 필획 포함 여부 확인
```typescript
hanja.getStrokes('大', '一丨丿丶乙');
// 결과: '一丿丶'
```
```typescript
hanja.getStrokes('韓', '一丨丿丶乙');
// 결과: '一丨丨乙一一一丨乙丨一丨乙一一乙丨'
```

#### 필획 변환 형식 지정
```typescript
hanja.getStrokes('合'); // 기본값 ('12345' 사용)
// 결과: '341251'
```
```typescript
hanja.getStrokes('合', '一丨丿丶乚');
// 결과: '丿丶一丨乚一'
```
```typescript
hanja.getStrokes('合', 'hspnz');
// 결과: 'pnhszh'
```

## 데이터 출처
- **한자-한글 데이터**: [suminb님의 Python Library](https://github.com/suminb/hanja)
- **한자-필획 데이터**: [대만 정부 자료 개방 플랫폼](https://data.gov.tw/dataset/5961)

이 라이브러리를 통해 한자 변환 및 필획 분석을 간편하게 활용해 보세요!

