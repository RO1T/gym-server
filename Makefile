.SILENCE

# Сборка гимнастики
.build
	#Установить Golang
	#Brew install protoc
	#Brew install grpc
	#go install from grpc.io
	#export PATH="$PATH:$(go env GOPATH)/bin"
	#protoc -I api api/proto/auth.proto --go_out=./protoc-gen/ --go_opt=paths=source_relative \
	 --go-grpc_out=./protoc-gen/ --go-grpc_opt=paths=source_relative
	#go mod tidy