FROM rails:5

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN apt-get update -qq && apt-get install -y imagemagick
RUN apt-get install -y optipng jpegoptim

RUN mkdir /renmade
WORKDIR /renmade


ADD Gemfile /renmade/Gemfile
ADD Gemfile.lock /renmade/Gemfile.lock

RUN bundle check || bundle install
ADD . /renmade/

# prepare foldes for puma
RUN mkdir -p shared/pids shared/sockets shared/log

CMD ./script/start
