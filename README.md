# hanja: 한자 유틸리티 for Typescript

* 한자-한글 변환 (두음법칙 포함)
* 한자 구성 필획

## Installation
```
npm install hanja
# yarn add hanja
# pnpm install hanja
```

## Usage
### 필요한 모듈 Import 하기
```typescript
import hanja from 'hanja'
// or const { default: hanja } = require('hanja')
```

### 문장 변환
치환 모드 변환:
```typescript
hanja.translate('大韓民國은 民主共和國이다.', 'SUBSTITUTE')
// => '대한민국은 민주공화국이다.'
```

한글(한자) 모드 변환:
```typescript
hanja.translate('大韓民國은 民主共和國이다.', 'PARENTHESIS_HANJA')
// => '대한민국(大韓民國)은 민주공화국(民主共和國)이다.'
```

한자(한글) 모드 변환:
```typescript
hanja.translate('大韓民國은 民主共和國이다.', 'PARENTHESIS_HANGUL')
// => '大韓民國(대한민국)은 民主共和國(민주공화국)이다.'
```

커스텀 모드 변환:
```typescript
hanja.translate('大韓民國은 民主共和國이다.', (hanja, hangul) => `<ruby>${hanja}<rt>${hangul}</rt></ruby>`)
// => '<ruby>大韓民國<rt>대한민국</rt></ruby>은 <ruby>民主共和國<rt>민주공화국</rt></ruby>이다.'
```

### 구성 필획
치환 모드 변환:
```typescript
hanja.getStrokes('大', '一丨丿丶乙')
// => 一丿丶
hanja.getStrokes('韓', '一丨丿丶乙')
// => 一丨丨乙一一一丨乙丨一丨乙一一乙丨
hanja.getStrokes('民', '一丨丿丶乙')
// => 乙一乙一乙
hanja.getStrokes('國', '一丨丿丶乙')
// => 丨乙一丨乙一一乙丶丿一
```

필획 치환 형식:
```typescript
hanja.getStrokes('合') // === hanja.getStrokes('合', '12345')
// => 341251
hanja.getStrokes('合', '一丨丿丶乚')
// => 丿丶一丨乚一
hanja.getStrokes('合', '一丨丿丶乙')
// => 丿丶一丨乙一
hanja.getStrokes('合', 'MLJKN')
// => JKMLNM
hanja.getStrokes('合', 'hspnz')
// => pnhszh

```


## 데이터
한자-한글 데이터: suminb님이 관리하시는 [Python Library](https://github.com/suminb/hanja)

한자-필획 데이터: 대만 [정부자료개방 플랫폼](https://data.gov.tw/dataset/5961)
