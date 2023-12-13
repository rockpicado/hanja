# hanja: 한자-한글 변환 라이브러리 for Typescript

## Hanja data
한자-한글 데이터는 suminb님이 관리하시는 [Python Library](https://github.com/suminb/hanja)에서 가져왔습니다.

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
hanja.translate('大韓民國은 民主共和國이다.', hanja.TRANSLATE_TYPES.SUBSTITUTE)
// => '대한민국은 민주공화국이다.'
```

한글(한자) 모드 변환:
```typescript
hanja.translate('大韓民國은 民主共和國이다.', hanja.TRANSLATE_TYPES.PARENTHESIS_HANJA)
// => '대한민국(大韓民國)은 민주공화국(民主共和國)이다.'
```

한자(한글) 모드 변환:
```typescript
hanja.translate('大韓民國은 民主共和國이다.', hanja.TRANSLATE_TYPES.PARENTHESIS_HANGUL)
// => '大韓民國(대한민국)은 民主共和國(민주공화국)이다.'
```

커스텀 모드 변환:
```typescript
hanja.translate('大韓民國은 民主共和國이다.', hanja.TRANSLATE_TYPES.CUSTOM, (hanja, hangul) => `<ruby>${hanja}<rt>${hangul}</rt></ruby>`)
// => '<ruby>大韓民國<rt>대한민국</rt></ruby>은 <ruby>民主共和國<rt>민주공화국</rt></ruby>이다.'
```
