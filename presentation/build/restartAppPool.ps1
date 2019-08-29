Set-Location "C:\Windows\System32\inetsrv"
./appcmd stop apppool /apppool.name:"awdware2"
./appcmd start apppool /apppool.name:"awdware2"