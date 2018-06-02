git pull
npm install

npm run build

ZIPNAME='lambda.zip'

rc=$?

if [ $rc = 0 ] ; then
  cd dist/
  zip -r ${ZIPNAME} ./*
  cd ..
else
	echo 'npm build error'
	exit 1
fi
