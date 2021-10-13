# cinema-app

## 事前準備

### docker-compose 同士を繋げるために network を作る必要がある。

- `docker network create shared-network --subnet=172.30.0.0/16 --gateway=172.30.0.254`

※参照　https://qiita.com/blueskyarea/items/fc327ba5e6c5f4d75b12

を実行する。

消すときは

- `docker network rm shared-network`

###　 mysql 用の volumes も作る。

- `docker volume create --name shared-network`

も実行する。
