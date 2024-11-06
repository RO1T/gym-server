FROM golang:alpine

WORKDIR /gymnastics-golang-main
COPY ./ /gymnastics-golang-main

RUN go mod download
RUN go get .
RUN go build
RUN go install

ENTRYPOINT [ "health", "api" ]