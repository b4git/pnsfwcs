
cd ./private/tsrc/
:: Usually git clone will create a file so try to remove it

del /q Common
rmdir /s Common

mklink /d .\Common ..\..\common\tsrc

cd ../../public/tsrc


del /q Common
rmdir /s Common

mklink /d .\Common ..\..\common\tsrc

cd ../../

echo "Done. Press any key to exit/continue."

pause
