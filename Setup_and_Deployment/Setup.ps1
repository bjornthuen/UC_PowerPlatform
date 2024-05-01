$installPAC = Start-Job { dotnet tool install --global Microsoft.PowerApps.CLI.Tool }
Wait-Job $installPAC

Get-Command pac | Format-List

$installPRT = Start-Job { pac tool prt }
Wait-Job $installPRT

cd ..
cd CalendarComponent
npm install
npm run build
cd ..
cd LinearInputControl
npm install
npm run build

cd ../../
cd WebResources
npm install
