#!/bin/bash

dir="/home/fabian/jolly"

echo "🛠️  Compiling..."

protoc \
    -I=$dir/proto \
    --experimental_allow_proto3_optional \
    --plugin=$dir/frontend/node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_out=$dir/frontend/src/lib/pb \
    messages.proto

echo "✅ TS compiled"

protoc \
    -I=$dir/proto \
    --experimental_allow_proto3_optional \
    --go_out=$dir/backend \
    messages.proto

echo "✅ GO compiled"