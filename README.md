# super-front

## Project setuap
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 네이밍 규칙
#### 표기법
- 카멜 표기법 사용

#### 변수명
- Global Navigation Bar -> Gnb
- Navigation -> Nav
- Function -> Fun
- Message -> Msg
- Button -> Btn
- Object -> Obj
- Length -> Len
- Number -> Num
- String -> Str
- Array -> Arr
- Count -> Cnt
- Element -> el


#### AWS S3 수동으로 업로드
aws s3 cp dist/ s3://super-front --recursive --profile taskforce
