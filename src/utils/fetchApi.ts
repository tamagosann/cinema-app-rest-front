import { GetServerSideProps } from 'next'

// これで、ssrが初期化時なのかspa遷移時なのかを確認できる。
const isSpaReq = (req: Parameters<GetServerSideProps>['0']['req']) =>
  !req.url?.startsWith('/_next')
