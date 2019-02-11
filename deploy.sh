npm ci
npm i pm2 typescript serve -g
git submodule update --init --recursive
npm run build

cp ../dotenv/api.zijinluo.com.env .env

command="cd api.zijinluo.com && git pull && npm ci && git submodule update --remote --recursive && npm run build"
job="0 0 * * * $command"
cat <(fgrep -i -v "$command" <(crontab -l)) <(echo "$job") | crontab -
